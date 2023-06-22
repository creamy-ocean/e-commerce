import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
} from "firebase/auth";
import { getDatabase, ref, get, set } from "firebase/database";
import { getStorage, ref as sRef, uploadBytes } from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

const provider = new GoogleAuthProvider();
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const db = getDatabase(app);
const storage = getStorage(app);

export function onStateChanged(callback) {
  onAuthStateChanged(auth, async (user) => {
    const checkedUser = user ? await checkAdmin(user) : null;
    callback(checkedUser);
  });
}

export function login() {
  signInWithPopup(auth, provider).catch(console.error);
}

export function logout() {
  signOut(auth).catch(console.error);
}

export async function checkAdmin(user) {
  return get(ref(db, "admins"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const admins = snapshot.val();
        const isAdmin = admins.includes(user.uid);
        return { ...user, isAdmin };
      } else {
        return user;
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

export function addProduct({ name, category, price, desc, image }) {
  const productId = uuidv4();
  uploadImg(productId, image);
  set(ref(db, `products/${productId}`), {
    name,
    category,
    price,
    desc,
  });
}

async function uploadImg(productId, image) {
  const storageRef = sRef(storage, productId);
  uploadBytes(storageRef, image).then((snapshot) => {
    console.log("업로드가 완료되었습니다");
  });
}
