const MISSING_ENV_ERROR_MESSAGE = `Error: required environment variables are missing

Required environment variables:

  FIREBASE_API_KEY
  FIREBASE_AUTH_DOMAIN
  FIREBASE_PROJECT_ID
  FIREBASE_SERVICE_ACCOUNT_PATH

These can be defined in a .env file
See: https://github.com/caseydlvr/firebase_auth_token_gen#env-file-configuration`;

require('dotenv').config();

function validateEnv() {
  if (!(process.env.FIREBASE_SERVICE_ACCOUNT_PATH
    && process.env.FIREBASE_API_KEY
    && process.env.FIREBASE_AUTH_DOMAIN
    && process.env.FIREBASE_PROJECT_ID)) {
      console.error(MISSING_ENV_ERROR_MESSAGE);
      process.exit(1);
  }
}

validateEnv();

module.exports = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  serviceAccountPath: process.env.FIREBASE_SERVICE_ACCOUNT_PATH,
}