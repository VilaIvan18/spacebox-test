import { initializeApp, getApp, getApps } from "firebase/app";

import { getStorage } from "firebase/storage";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "AIzaSyAUvfdm8JiROklqq95rPxOPM2fwGd3_oIo",
  storageBucket: "spacebox-test-41b55.appspot.com",
  appId: "1:808303682411:web:43dc8b1fb7f3b26419a22e",
  projectId: "spacebox-test-41b55",
  authDomain: "spacebox-test-41b55.firebaseapp.com",
};

if (getApps.length === 0) {
  initializeApp(firebaseConfig);
}

const fbApp = getApp();
const fbStorage = getStorage();

const uploadImage = async (uri, name) => {
  const res = await fetch(uri);
  const blob = await res.blob();

  const imageRef = ref(getStorage(), `images/${name}`);

  const uploadTask = uploadBytesResumable(imageRef, blob);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        reject(error);
      },
      async () => {
        const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
        resolve({
          downloadUrl,
          metadata: uploadTask.snapshot.metadata,
        });
      }
    );
  });
};

export { fbApp, fbStorage, uploadImage };
