import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { ChangeEvent } from "react";

const firebaseConfig = {
  apiKey: "AIzaSyA-G3Jr-mWKnff2Jkpd2W_CCrkgh_D3PAY",
  authDomain: "slowtape-dcf48.firebaseapp.com",
  projectId: "slowtape-dcf48",
  storageBucket: "slowtape-dcf48.appspot.com",
  messagingSenderId: "41148374480",
  appId: "1:41148374480:web:26ddb70d64fd14b535edd5",
  measurementId: "G-BCHVEVF7GP",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const storage = getStorage(app);
export default storage;

export const firebaseHandler = (
  e: ChangeEvent<HTMLInputElement>,
  type: string,
  setPercent: any,
  setFormData: any,
  SetIsPercentageShow: any,
  formData: any
) => {
  const target = e.target as HTMLInputElement;
  const files = target.files as any;

  if (!files[0]) {
    throw new Error("Please upload a file");
    return;
  }
  const fileName = files[0].name.split(".");
  if (type === "audio") {
    if (fileName[fileName.length - 1] !== "mp3") {
      throw new Error("Please upload an mp3 audio file");
      return;
    }
  }
  if (type === "cover") {
    if (
      fileName[fileName.length - 1] !== "jpg" &&
      fileName[fileName.length - 1] !== "png" &&
      fileName[fileName.length - 1] !== "jpeg"
    ) {
      throw new Error(
        "Please upload image in a correct format (JPEG, JPG, PNG)"
      );
      return;
    }
  }
  SetIsPercentageShow(true);
  const storageRef = ref(
    storage,
    `/${type}/${Math.random() * 10 + files[0].name}`
  );
  const uploadTask = uploadBytesResumable(storageRef, files[0]);

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const percent = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );

      // update progress
      setPercent(percent);
    },
    (err) => console.log(err),
    () => {
      // download url
      getDownloadURL(uploadTask.snapshot.ref).then((url) => {
        console.log(url);
        if (type === "audio") {
          var au = document.createElement("audio");
          au.src = url;
          au.addEventListener(
            "loadedmetadata",
            () => {
              const duration = au.duration;
              setFormData({
                ...formData,
                audio: url,
                length: duration,
              });
            },
            false
          );
        } else if (type === "cover") {
          setFormData({
            ...formData,
            cover: url,
          });
        }
      });
    }
  );
};
