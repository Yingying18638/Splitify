import React from "react";
import useUploadImg from "../../utility/hooks/useUploadImg";

const Test = () => {
  const {
    imageUploaded,
    setImageUploaded,
    imageUrl,
    setImageUrl,
    uploadImage,
  } = useUploadImg();

  return (
    <>
      <input
        type="file"
        onChange={(event) => {
          setImageUploaded(event.target.files[0]);
        }}
      />
      <button onClick={uploadImage}> Upload Image</button>
      <img src={imageUrl} alt="image you uploaded" />
    </>
  );
};

export default Test;
