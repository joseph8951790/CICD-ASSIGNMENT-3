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
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }
        
        stage('Run Tests') {
            steps {
                sh 'npm test'
            }
        }
        
        stage('Deploy to Azure') {
            steps {
                withCredentials([
                    string(credentialsId: 'AZURE_SUBSCRIPTION_ID', variable: 'AZURE_SUBSCRIPTION_ID'),
                    string(credentialsId: 'AZURE_TENANT_ID', variable: 'AZURE_TENANT_ID'),
                    string(credentialsId: 'AZURE_CLIENT_ID', variable: 'AZURE_CLIENT_ID'),
                    string(credentialsId: 'AZURE_CLIENT_SECRET', variable: 'AZURE_CLIENT_SECRET'),
                    string(credentialsId: 'AZURE_FUNCTIONAPP_PUBLISH_PROFILE', variable: 'AZURE_FUNCTIONAPP_PUBLISH_PROFILE')
                ]) {
                    sh '''
                        az login --service-principal -u $AZURE_CLIENT_ID -p $AZURE_CLIENT_SECRET --tenant $AZURE_TENANT_ID
                        az account set --subscription $AZURE_SUBSCRIPTION_ID
                        az functionapp deployment source config-zip -g $AZURE_RESOURCE_GROUP -n $AZURE_FUNCTIONAPP_NAME --src ./
                    '''
                }
            }
        }
    }
    
    post {
        always {
            cleanWs()
        }
    }
} 