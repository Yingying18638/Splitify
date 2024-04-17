import { useState, useEffect } from "react";
import { storage } from "../firebase";
import { getDownloadURL, ref, uploadBytes, listAll } from "firebase/storage";

const useUploadImg = () => {
  const [imageUploaded, setImageUploaded] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const uploadImage = () => {
    if (imageUploaded === null) return;
    const imageRef = ref(storage, `images/${imageUploaded.name}`);
    uploadBytes(imageRef, imageUploaded).then((snapshot) => {
      getDownloadURL(snapshot.ref).then((url) => {
        setImageUrl(url);
      });
    });
  };
  const imagesListRef = ref(storage, "images/");
  useEffect(() => {
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrl(url);
        });
      });
    });
  }, []);
  return {
    imageUploaded,
    setImageUploaded,
    imageUrl,
    setImageUrl,
    uploadImage,
  };
};
export default useUploadImg;
