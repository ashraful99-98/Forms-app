import React, { createContext, useContext, useState, ReactNode } from "react";
import axios from "axios";

interface UploadContextType {
  uploadImage: (file: File) => Promise<UploadResponseType>;
  uploadedImages: UploadResponseType[];
  fetchUploadedImages: () => Promise<void>;
}

interface UploadResponseType {
  image: string;
  host: string;
}

const UploadContext = createContext<UploadContextType | undefined>(undefined);

export const UploadProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [uploadedImages, setUploadedImages] = useState<UploadResponseType[]>(
    []
  );

  const uploadImage = async (file: File): Promise<UploadResponseType> => {
    const formData = new FormData();
    formData.append("myfile", file);

    const res = await axios.post<UploadResponseType>(
      "http://localhost:8000/api/images",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    const uploaded = res.data;
    setUploadedImages((prev) => [...prev, uploaded]);
    return uploaded;
  };

  const fetchUploadedImages = async () => {
    const res = await axios.get<UploadResponseType[]>(
      "http://localhost:8000/api/images"
    );
    setUploadedImages(res.data);
  };

  return (
    <UploadContext.Provider
      value={{ uploadImage, uploadedImages, fetchUploadedImages }}
    >
      {children}
    </UploadContext.Provider>
  );
};

export const useUpload = (): UploadContextType => {
  const context = useContext(UploadContext);
  if (!context) {
    throw new Error("useUpload must be used within an UploadProvider");
  }
  return context;
};

// how to used this image upload context
// import React, { useState } from "react";
// import { useUpload } from "../contexts/UploadContext";

// const ImageUploader = () => {
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const { uploadImage } = useUpload();

//   const handleUpload = async () => {
//     if (selectedFile) {
//       const result = await uploadImage(selectedFile);
//       console.log("Uploaded:", result);
//     }
//   };

//   return (
//     <div>
//       <input type="file" onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} />
//       <button onClick={handleUpload}>Upload</button>
//     </div>
//   );
// };

// export default ImageUploader;
