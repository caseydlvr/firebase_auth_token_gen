#!/usr/bin/env node

'use strict';

const dotenvConfig = require('dotenv').config();
const admin = require('firebase-admin');
const firebase = require('firebase');
const serviceAccount = require(process.env.FIREBASE_SERVICE_ACCOUNT_PATH);

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
    console.log('Error creating custom token:', err);
  }
}

async function handleAuthStateChanged(user) {
  if (user) {
    // User is signed in.
    try {
      const idToken = await user.getIdToken(true);
      console.log('ID token:', idToken);
    } catch (err) {
      console.log('Error getting ID token:', err);
    }
  }
}

function main() {
  const [,, uid] = process.argv;

  admin.initializeApp(adminConfig);
  firebase.initializeApp(firebaseConfig);
  firebase.auth().onAuthStateChanged(handleAuthStateChanged);

  logInWithCustomToken(uid);
}

main();
