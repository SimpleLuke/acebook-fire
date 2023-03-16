import React, { useState } from "react";

const Image = ({ handleImageUpload }) => {
  const [image, setImage] = useState("");

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    handleImageUpload(file);
    setImage(URL.createObjectURL(file));
  };

  return (
    <>
      <label htmlFor="img-upload">Add an image:</label>
      <input name="img-upload" type="file" onChange={handleFileChange} />
      {image && <img src={image} alt="Uploaded" />}
    </>
  );
};

export default Image;
