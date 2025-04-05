# Azure Function Hello World with Jenkins CI/CD

This project demonstrates a simple Azure Function with a complete CI/CD pipeline using Jenkins.

## Project Structure

```
.
├── src/
│   ├── function.json
│   └── index.js
├── tests/
│   └── function.test.js
├── package.json
├── Jenkinsfile
└── README.md
```

## Prerequisites

- Node.js and npm installed
- Azure CLI installed
- Jenkins server with the following plugins:
  - Azure CLI Plugin
  - Pipeline Plugin
  - GitHub Plugin

## Setup Instructions

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure Jenkins Credentials:
   - Add the following credentials in Jenkins:
     - AZURE_FUNCTIONAPP_PUBLISH_PROFILE
     - AZURE_SUBSCRIPTION_ID
     - AZURE_TENANT_ID
     - AZURE_CLIENT_ID
     - AZURE_CLIENT_SECRET

4. Update the Jenkinsfile:
   - Replace `your-function-app-name` with your Azure Function App name
   - Replace `your-resource-group` with your Azure Resource Group name

5. Create a new Pipeline job in Jenkins:
   - Configure the pipeline to use the Jenkinsfile from SCM
   - Point to your GitHub repository

## Testing

Run the tests locally:
```bash
npm test
```

## Deployment

The deployment is handled automatically by the Jenkins pipeline when changes are pushed to the repository.

## Function Endpoints

- GET /api/hello - Returns "Hello, World!"
- GET /api/hello?name=YourName - Returns "Hello, YourName!"
- POST /api/hello with body {"name": "YourName"} - Returns "Hello, YourName!" 