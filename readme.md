# Railway Automation — Cypress Project

This repository contains a Cypress-based IRCTC browser automation/testing project.

> **Important:** This project is intended for learning, local testing, and authorized use. IRCTC may apply CAPTCHA, rate limits, bot detection, login controls, payment controls, and other restrictions. Do not attempt to bypass those controls. Use the CAPTCHA manually when required and follow IRCTC's current terms and instructions.

## What was fixed in this version
- Cleaned .gitignore rules for Cypress artifacts, Python cache files, logs, and local credentials.
- Added a Render-compatible health service.
- Added render.yaml for a simple Render deployment.
- Added JavaScript validation scripts.
- Replaced the old GitHub Actions booking workflow with safe project validation. A GitHub push/PR no longer starts a real booking or payment attempt.
- Removed the public fixture's personal passenger information and replaced it with a safe template.
- Kept the existing local project structure and booking code intact; CAPTCHA-solving logic was not enhanced.

## Local Windows setup
Open the project in VS Code and use the VS Code terminal.

### 1. Check Node.js
```powershell
node -v
npm -v
```

Use a supported LTS Node.js release. Node 20 is used by the GitHub validation workflow.

### 2. Install JavaScript dependencies
```powershell
npm ci
```

### 3. Validate the project
```powershell
npm run validate:js
npm run validate:render
```

### 4. Python environment
Create/activate your Python virtual environment and install the Python dependencies only if you are running the local CAPTCHA helper:
```powershell
python -m pip install -r irctc-captcha-solver/requirements.txt
```

### 5. Local helper
The existing local helper can be started with:
```powershell
npm run start-captcha-server
```
Keep this service local. Do not deploy the CAPTCHA-solving endpoint as a public service.

### 6. Cypress
For authorized local testing:
```powershell
npm test
```
The project may still fail when IRCTC is unreachable from Cypress/Node even when the site opens normally in Chrome. That is an external connectivity/environment issue, not something a selector change can guarantee to fix.

## Passenger configuration
Edit cypress/fixtures/passenger_data.json and replace the placeholder values with your own test/authorized booking data locally.

Do not commit usernames, passwords, UPI IDs, passenger personal information, or other secrets. The repository ignores cypress.env.json, cypress/fixtures/passenger_data.local.json, and .env files.

For credentials, prefer environment variables or local ignored configuration.

## CAPTCHA
Manual CAPTCHA is supported by the existing project configuration. CAPTCHA is a security/anti-bot control, so this repository does not provide instructions for defeating or bypassing it.

## Render deployment
Render is configured for the project's health service, not for unattended ticket booking.

Deploying the full interactive Cypress + browser + login + CAPTCHA + payment flow as a Render web service is not equivalent to deploying a normal web application. Browser interaction, external IRCTC availability, CAPTCHA, authentication, and payment approval can all require user interaction or can be restricted by the external service.

The Render service starts:
```text
node render_health.js
```
Health endpoint: /health

It returns JSON similar to:
```json
{
  "status": "ok",
  "service": "railway-automation-health",
  "message": "Render service is running"
}
```

## GitHub Actions
The workflow in .github/workflows/irctc.yml performs:
1. checkout
2. Node.js setup
3. npm ci
4. JavaScript validation
5. Render health-service validation
6. required-file checks

It intentionally does not submit a real booking or payment request.

## Performance
The project has been cleaned for faster local startup and validation, but no responsible implementation can guarantee a fixed booking time or booking success. External website response time, availability, network conditions, CAPTCHA, authentication, payment approval, and IRCTC-side controls remain outside this repository.

## Repository
https://github.com/pk8873/Railway-automation