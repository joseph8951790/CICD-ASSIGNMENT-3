pipeline {
    agent any
    
    environment {
        // These values will be provided by your instructor
        AZURE_FUNCTIONAPP_NAME = 'func-cicd-joseph'
        AZURE_RESOURCE_GROUP = 'rg-cicd-func'
        NODE_VERSION = '22'
        AZURE_SUBSCRIPTION_ID = '2f19abaa-73c4-4c22-9841-9588ffe6b5f2'
        AZURE_TENANT_ID = 'dbb8b5e0-a43b-4759-a6eb-83192df9efef'
        AZURE_CLIENT_ID = '56f01f9c-e1e2-4afc-bd47-73e4f70399d9'
        AZURE_CLIENT_SECRET = '18ee4601-9ec3-4144-8ce0-5ba03038e2e2'
        AZURE_FUNCTIONAPP_PUBLISH_PROFILE = credentials('AZURE_FUNCTIONAPP_PUBLISH_PROFILE')
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }
        
        stage('Run Tests') {
            steps {
                bat 'npm test'
            }
        }
        
        stage('Deploy to Azure') {
            steps {
                bat 'npm run build --if-present'
                bat 'echo D | xcopy /s /y . %TEMP%\\azure-function-deploy\\'
                powershell '''
                    try {
                        # Get the publish profile XML
                        $publishProfile = $env:AZURE_FUNCTIONAPP_PUBLISH_PROFILE
                        
                        # Parse the XML to get the credentials for ZIP deploy
                        $xmlProfile = [xml]$publishProfile
                        $zipDeployProfile = $xmlProfile.publishData.publishProfile | Where-Object {$_.publishMethod -eq 'ZipDeploy'}
                        
                        $creds = $zipDeployProfile.userName + ":" + $zipDeployProfile.userPWD
                        
                        # Create auth header
                        $base64AuthInfo = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes($creds))
                        
                        # Build the API URL
                        $apiUrl = "https://" + $env:AZURE_FUNCTIONAPP_NAME + ".scm.azurewebsites.net/api/zipdeploy"
                        
                        Write-Host "Creating deployment package..."
                        Compress-Archive -Path "$env:TEMP\\azure-function-deploy\\*" -DestinationPath "$env:TEMP\\azure-function-deploy.zip" -Force
                        
                        Write-Host "Deploying to Azure Function App..."
                        $response = Invoke-RestMethod -Uri $apiUrl `
                            -Headers @{Authorization=("Basic $base64AuthInfo")} `
                            -UserAgent "powershell/1.0" `
                            -Method POST `
                            -InFile "$env:TEMP\\azure-function-deploy.zip" `
                            -ContentType "application/zip"
                            
                        Write-Host "Deployment successful!"
                    } catch {
                        Write-Error "Deployment failed: $_"
                        Write-Error $_.Exception.Message
                        throw
                    } finally {
                        if (Test-Path "$env:TEMP\\azure-function-deploy.zip") {
                            Remove-Item "$env:TEMP\\azure-function-deploy.zip" -Force
                        }
                    }
                '''
            }
        }
    }
    
    post {
        always {
            cleanWs()
        }
    }
} 