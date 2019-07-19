# firebase_auth_token_gen

A Node script to generate a valid Firebase Auth bearer token for a given user. This can be useful for testing a service (e.g. a REST API backend) that uses the Firebase Admin SDK to authenticate clients (e.g. an Android or iOS app) that use the Firebase Authentication SDK for authentication. The token returned by this script can be used with the `verifyIdToken()` (exact method varies by language) method (see https://firebase.google.com/docs/auth/admin/verify-id-tokens#verify_id_tokens_using_the_firebase_admin_sdk).

## Usage

`node firebase_auth_token_gen.js FIREBASE_UID`

### .env File Configuration

This script requires the following environmental variables to be set in order to successfully initialize Firebase and FirebaseAdmin. Create a .env file in the script directory with the following variables set:

- FIREBASE_SERVICE_ACCOUNT_PATH: Path to Firebase Admin SDK private key JSON file
  - For instructions on generating a Service Account json file, see: https://firebase.google.com/docs/admin/setup#initialize_the_sdk
- FIREBASE_API_KEY: the Web API key for the Firebase project
  - Can be found on the project settings page in the Firebase console
- FIREBASE_AUTH_DOMAIN
  - typically PROJECT_ID.firebaseapp.com
- FIREBASE_PROJECT_ID: the Firebase unique ID for the project. 
  - Can be found on the project settings page in the Firebase console, and also in the Firebase console URL (e.g. console.firebase.google.com/project/<PROJECT_ID>/...)

FIREBASE_SERVICE_ACCOUNT_PATH is used in the FirebaseAdmin initializeApp call. See :https://firebase.google.com/docs/reference/admin/node/admin.html#initializeapp

FIREBASE_API_KEY, FIREBASE_AUTH_DOMAIN and FIREBASE_PROJECT_ID are used in the Firebase initializeApp call. See: https://firebase.google.com/docs/reference/js/firebase.html#initializeapp

## Function

1. Uses the Firebase Admin SDK to create a custom for the provided FIREBASE_UID
   * https://firebase.google.com/docs/auth/admin/create-custom-tokens#create_custom_tokens_using_the_firebase_admin_sdk
1. Uses the Firebase Auth SDK to login the provided FIREBASE_UID using the custom token created in the previous step
   * https://firebase.google.com/docs/auth/web/custom-auth#authenticate-with-firebase
1. Once the user is successfully signed in, output the user's ID token
   * https://firebase.google.com/docs/reference/js/firebase.User.html#get-idtoken

## Warning

If the script is called with a FIREBASE_UID that doesn't exist for the Firebase project defined in the .env file, this may result in the creation of a user with the specified UID.
