import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";
const firebaseConfig = {
  apiKey: "AIzaSyDKiHIKL5kVQmNLHDw_WseiTex-xyN0h5U",
  authDomain: "bunbuntest.firebaseapp.com",
  projectId: "bunbuntest",
  storageBucket: "bunbuntest.appspot.com",
  messagingSenderId: "731973272019",
  appId: "1:731973272019:web:ff36f73813342d47176f26",
  storageBucket: "gs://bunbuntest.appspot.com",
};

export default firebaseConfig;
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
