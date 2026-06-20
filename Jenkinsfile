pipeline {
    agent any

    tools {
        nodejs 'node-20' // Jenkins global tool name for Node.js 20+
    }

    environment {
        ENV = 'dev'
        CI = 'true'
        PLAYWRIGHT_HTML_REPORT = 'playwright-report'
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                echo 'Installing node packages...'
                sh 'npm ci'
            }
        }

        stage('Install Playwright Browsers') {
            steps {
                echo 'Installing system browser binaries...'
                sh 'npx playwright install --with-deps'
            }
        }

        stage('Run Automated Tests') {
            steps {
                echo "Running test suite on ${ENV.toUpperCase()}..."
                // Runs tests and prevents non-zero exit code from failing pipeline immediately
                // so we can capture reports in post-actions.
                sh 'npm run test:dev'
            }
        }
    }

    post {
        always {
            echo 'Archiving test results and publishing reports...'
            
            // 1. Archive Playwright HTML report
            publishHTML([
                allowMissing: false,
                alwaysLinkToLastBuild: true,
                keepAll: true,
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright HTML Report',
                reportTitles: 'E2E Test Report'
            ])

            // 2. Publish JUnit test result XML (if configured in playwright.config.ts)
            // junit allowEmptyResults: true, testResults: 'junit-results.xml'
            
            // 3. Clean workspace to save agent space
            cleanWs()
        }
        success {
            echo 'Pipeline completed successfully!'
            // Optional: Slack/Email notification triggers
            // slackSend channel: '#ci-alerts', color: 'good', message: "SUCCESS: Job '${env.JOB_NAME}' [Build #${env.BUILD_NUMBER}] completed successfully."
        }
        failure {
            echo 'Pipeline failed. Check build logs and test report.'
            // Optional: Slack/Email notification triggers
            // slackSend channel: '#ci-alerts', color: 'danger', message: "FAILURE: Job '${env.JOB_NAME}' [Build #${env.BUILD_NUMBER}] failed."
        }
    }
}
