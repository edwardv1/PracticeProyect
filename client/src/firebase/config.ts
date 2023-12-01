import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

const firebaseConfig = {
  apiKey: "AIzaSyASx7juJ3xeXlTSJ6SjDf-_SgXkcBLrRcM",
  authDomain: "practica-firebase-5f6b9.firebaseapp.com",
  projectId: "practica-firebase-5f6b9",
  storageBucket: "practica-firebase-5f6b9.appspot.com",
  messagingSenderId: "805375433389",
  appId: "1:805375433389:web:b58215f0b3df24879c4424",
  measurementId: "G-CXHXCQXDYT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app); //storage = donde voy a subir mis archivos

//Creo la referencia al storage de la nube con ref de tipo Blob o File usando la funcion uploadBytes
/**
 * Upload a file to firebase store
 * @param {File} file the file to upload
 * @returns {Promise<string>} url of the uploaded file
 */
export async function uploadFile (file : File) {
  const storageRef = ref(storage, v4());
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return url;
  // uploadBytes(storageRef, file).then( snapshot => {
  //   console.log(snapshot);
  // })
}