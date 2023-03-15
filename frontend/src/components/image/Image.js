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
      <label>
        Add an image:
        <input type="file" onChange={handleFileChange} />
      </label>
      {image && <img src={image} alt="Uploaded" />}
    </>
  );
};

export default Image;
