import React, { useEffect, useState } from "react";

const Image = ({ handleImageUpload, isSent }) => {
  const [image, setImage] = useState("");

  useEffect(() => {
    if (isSent === true) {
      setImage("");
    }
  }, [isSent]);

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
