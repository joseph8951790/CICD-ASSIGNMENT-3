pipeline {
    agent any
    
    environment {
        AZURE_FUNCTIONAPP_NAME = 'your-function-app-name'
        AZURE_FUNCTIONAPP_PUBLISH_PROFILE = credentials('AZURE_FUNCTIONAPP_PUBLISH_PROFILE')
        AZURE_SUBSCRIPTION_ID = credentials('AZURE_SUBSCRIPTION_ID')
        AZURE_TENANT_ID = credentials('AZURE_TENANT_ID')
        AZURE_CLIENT_ID = credentials('AZURE_CLIENT_ID')
        AZURE_CLIENT_SECRET = credentials('AZURE_CLIENT_SECRET')
        RESOURCE_GROUP = 'your-resource-group'
    }

    stages {
        stage('Build') {
            steps {
                sh 'npm install'
            }
        }
        
        stage('Test') {
            steps {
                sh 'npm test'
            }
        }
        
        stage('Deploy') {
            steps {
                sh '''
                    # Login to Azure
                    az login --service-principal -u $AZURE_CLIENT_ID -p $AZURE_CLIENT_SECRET --tenant $AZURE_TENANT_ID
                    
                    # Set subscription
                    az account set --subscription $AZURE_SUBSCRIPTION_ID
                    
                    # Create deployment package
                    zip -r function.zip . -x "*.git*" "tests/*" "node_modules/*"
                    
                    # Deploy to Azure Function
                    az functionapp deployment source config-zip -g $RESOURCE_GROUP -n $AZURE_FUNCTIONAPP_NAME --src function.zip
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