import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
} from "firebase/auth";
import { getDatabase, ref, get, set, remove } from "firebase/database";
import {
  getStorage,
  ref as sRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { v4 as uuidv4 } from "uuid";

const provider = new GoogleAuthProvider();

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

export function addProduct(product) {
  const id = uuidv4();
  uploadImg(id, product.image);
  const parsedPrice = parseInt(product.price);
  const OptionsArr = product.options.split(",");
  set(ref(db, `products/${id}`), {
    ...product,
    id,
    price: parsedPrice,
    options: OptionsArr,
  });
}

async function uploadImg(id, image) {
  const storageRef = sRef(storage, id);
  uploadBytes(storageRef, image).then((snapshot) => {
    console.log("업로드가 완료되었습니다");
  });
}

export function getProducts() {
  return get(ref(db, "products"))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const products = Object.values(snapshot.val());
        const productsWithImgs = Promise.all(
          products.map(async (product) => {
            const imgSrc = await getProductImg(product.id);
            return { ...product, imgSrc };
          })
        );
        return productsWithImgs;
      } else {
        return [];
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

async function getProductImg(id) {
  return getDownloadURL(sRef(storage, `${id}`))
    .then((url) => {
      return url;
    })
    .catch((error) => {
      console.log(error);
    });
}

export function addOrUpdateCart(userId, product) {
  const parsedPrice = parseInt(product.price);
  set(ref(db, `carts/${userId}/${product.id}`), {
    ...product,
    price: parsedPrice,
  });
}

export function getCart(userId) {
  return get(ref(db, `carts/${userId}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        const products = Object.values(snapshot.val());
        const productsWithImgs = Promise.all(
          products.map(async (product) => {
            const imgSrc = await getProductImg(product.id);
            return { ...product, imgSrc };
          })
        );
        return productsWithImgs;
      } else {
        return [];
      }
    })
    .catch((error) => {
      console.error(error);
    });
}

export function removeFromCart(userId, productId) {
  return remove(ref(db, `carts/${userId}/${productId}`));
}
