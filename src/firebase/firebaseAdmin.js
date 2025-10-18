// src/firebase/firebaseAdmin.js
const admin = require('firebase-admin');
const path = require('path');

const serviceAccount = require(path.join(__dirname, 'serviceAccountKey.json'));

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const verifyIdToken = async (idToken) => {
  try {
    const decoded = await admin.auth().verifyIdToken(idToken);
    return decoded; // contains uid, email, etc.
  } catch (err) {
    throw err;
  }
};

module.exports = { admin, verifyIdToken };
