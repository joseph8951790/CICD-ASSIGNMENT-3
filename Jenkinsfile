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
        AZURE_FUNCTIONAPP_PUBLISH_PROFILE = 'cicd-assignment3-func'
        AZURE_FUNCTIONAPP_PUBLISH_PROFILE_WITH_SECRETS = credentials('AZURE_FUNCTIONAPP_PUBLISH_PROFILE')
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
                    Compress-Archive -Path "$env:TEMP\\azure-function-deploy\\*" -DestinationPath "$env:TEMP\\azure-function-deploy.zip" -Force
                    $apiUrl = "https://func-cicd-joseph.scm.azurewebsites.net/api/zipdeploy"
                    $base64AuthInfo = [Convert]::ToBase64String([Text.Encoding]::ASCII.GetBytes(":$env:AZURE_FUNCTIONAPP_PUBLISH_PROFILE_WITH_SECRETS"))
                    $userAgent = "powershell/1.0"
                    Invoke-RestMethod -Uri $apiUrl -Headers @{Authorization=("Basic {0}" -f $base64AuthInfo)} -UserAgent $userAgent -Method POST -InFile "$env:TEMP\\azure-function-deploy.zip" -ContentType "application/zip"
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