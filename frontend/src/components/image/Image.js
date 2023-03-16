import React, { useEffect, useState } from "react";
import { PaperClipIcon } from "@heroicons/react/20/solid";

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
      <div className="flex flex-col">
        <label htmlFor="img-upload">
          <div className="cursor-pointer -m-2.5 flex h-10 w-10 items-center justify-center rounded-full text-gray-400 hover:text-gray-500">
            <PaperClipIcon className="h-5 w-5" aria-hidden="true" />
          </div>
        </label>
        <input
          id="img-upload"
          name="img-upload"
          type="file"
          className="hidden"
          onChange={handleFileChange}
        />
        {image && <img className=" w-20 " src={image} alt="Uploaded" />}
      </div>
    </>
  );
};

export default Image;
