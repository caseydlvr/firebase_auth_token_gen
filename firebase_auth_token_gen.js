#!/usr/bin/env node

'use strict';

const dotenvConfig = require('dotenv').config();
const admin = require('firebase-admin');
const firebase = require('firebase');
const serviceAccount = require(process.env.FIREBASE_SERVICE_ACCOUNT_PATH);
const argv = require('yargs')
  .command('uid', 'Firebase UID of user to generate auth token')
  .option('copy', {
    alias: 'c',
    description: 'Copy the auth token to the system clipboard',
    type: 'boolean',
    default: false,
  })
  .demandCommand(1, 'A Firebase UID argument is required')
  .usage('Usage: node firebase_auth_token_gen.js FIREBASE_UID [-c]')
  .help()
  .alias('help', 'h')
  .alias('version', 'v')
  .argv;

const adminConfig = {
  credential: admin.credential.cert(serviceAccount),
};
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
};

async function logInWithCustomToken(uid) {
  try {
    const token = await admin.auth().createCustomToken(uid);
    await firebase.auth().signInWithCustomToken(token);
  } catch (err) {
    console.error('Error creating custom token:', err);
  }
}

async function handleAuthStateChanged(user) {
  if (user) {
    // User is signed in.
    try {
      const idToken = await user.getIdToken(true);
      console.log(idToken);
    } catch (err) {
      console.error('Error getting ID token:', err);
    }
  }
}

function main() {
  const uid = argv._[0];

  admin.initializeApp(adminConfig);
  firebase.initializeApp(firebaseConfig);
  firebase.auth().onAuthStateChanged(handleAuthStateChanged);

  logInWithCustomToken(uid);
}

main();
