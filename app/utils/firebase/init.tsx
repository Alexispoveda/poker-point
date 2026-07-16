import { initializeApp, type FirebaseApp } from "firebase/app";
import { getFirestore, type Firestore } from "firebase/firestore";

type FirebaseClients = {
  app: FirebaseApp;
  firestore: Firestore;
};

let clients: FirebaseClients | null = null;

export const getFirebaseClients = (): FirebaseClients => {
  if (clients) {
    return clients;
  }

  const config = {
    apiKey: "AIzaSyCaf3Ii8wlzUpd_vln_9deUefbiH8FGtSc",
    authDomain: "point-poker-alexispoveda.firebaseapp.com",
    projectId: "point-poker-alexispoveda",
    storageBucket: "point-poker-alexispoveda.firebasestorage.app",
    messagingSenderId:"652703125370",
    appId: "1:652703125370:web:bee50157df4edfd80d50c3",
    measurementId:"G-8CJBL3RG17"
  };

  const app = initializeApp(config);
  clients = {
    app,
    firestore: getFirestore(app)
  };

  return clients;
};
