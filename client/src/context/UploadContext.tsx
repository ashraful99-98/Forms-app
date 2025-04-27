// import React, { createContext, useContext, useState, ReactNode } from "react";
// import axios from "axios";

// interface UploadContextType {
//   uploadImage: (file: File) => Promise<UploadResponseType>;
//   uploadedImages: UploadResponseType[];
//   fetchUploadedImages: () => Promise<void>;
// }

// interface UploadResponseType {
//   image: string;
//   host: string;
// }

// const UploadContext = createContext<UploadContextType | undefined>(undefined);

// export const UploadProvider: React.FC<{ children: ReactNode }> = ({
//   children,
// }) => {
//   const [uploadedImages, setUploadedImages] = useState<UploadResponseType[]>(
//     []
//   );

//   const uploadImage = async (file: File): Promise<UploadResponseType> => {
//     const formData = new FormData();
//     formData.append("myfile", file);

//     const res = await axios.post<UploadResponseType>(
//       "http://localhost:8000/api/images",
//       formData,
//       {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       }
//     );

//     const uploaded = res.data;
//     setUploadedImages((prev) => [...prev, uploaded]);
//     return uploaded;
//   };

//   const fetchUploadedImages = async () => {
//     const res = await axios.get<UploadResponseType[]>(
//       "http://localhost:8000/api/images"
//     );
//     setUploadedImages(res.data);
//   };

//   return (
//     <UploadContext.Provider
//       value={{ uploadImage, uploadedImages, fetchUploadedImages }}
//     >
//       {children}
//     </UploadContext.Provider>
//   );
// };

// export const useUpload = (): UploadContextType => {
//   const context = useContext(UploadContext);
//   if (!context) {
//     throw new Error("useUpload must be used within an UploadProvider");
//   }
//   return context;
// };

// src/context/UploadContext.tsx

// 2ed atamp
// import React, {
//   createContext,
//   useContext,
//   useState,
//   useEffect,
//   ReactNode,
// } from "react";
// import axios from "axios";

// interface UploadedImageType {
//   _id: string;
//   public_id: string;
//   url: string;
//   createdAt?: string;
//   updatedAt?: string;
// }

// interface UploadContextType {
//   uploadedImages: UploadedImageType[];
//   uploadImage: (file: File) => Promise<UploadedImageType>;
//   fetchUploadedImages: () => Promise<void>;
// }

// const UploadContext = createContext<UploadContextType | undefined>(undefined);

// export const useUpload = (): UploadContextType => {
//   const context = useContext(UploadContext);
//   if (!context) {
//     throw new Error("useUpload must be used within an UploadProvider");
//   }
//   return context;
// };

// interface UploadProviderProps {
//   children: ReactNode;
// }

// export const UploadProvider: React.FC<UploadProviderProps> = ({ children }) => {
//   const [uploadedImages, setUploadedImages] = useState<UploadedImageType[]>([]);

//   const uploadImage = async (file: File): Promise<UploadedImageType> => {
//     const formData = new FormData();
//     formData.append("myfile", file);

//     try {
//       const res = await axios.post(
//         "http://localhost:8000/api/images",
//         formData,
//         {
//           headers: { "Content-Type": "multipart/form-data" },
//           withCredentials: true, // important if your server uses cookies
//         }
//       );

//       if (!res.data?.image) {
//         throw new Error("No image data returned from server.");
//       }

//       const uploaded = res.data.image as UploadedImageType;
//       setUploadedImages((prev) => [...prev, uploaded]);
//       return uploaded;
//     } catch (error: any) {
//       console.error("Upload error:", error.response?.data || error.message);
//       throw new Error(
//         error.response?.data?.message ||
//           "Image upload failed. Please try again."
//       );
//     }
//   };

//   const fetchUploadedImages = async () => {
//     try {
//       const res = await axios.get("http://localhost:8000/api/images", {
//         withCredentials: true,
//       });
//       const images = res.data.images as UploadedImageType[];
//       setUploadedImages(images);
//     } catch (error) {
//       console.error("Failed to fetch uploaded images:", error);
//     }
//   };

//   useEffect(() => {
//     fetchUploadedImages();
//   }, []);

//   return (
//     <UploadContext.Provider
//       value={{ uploadedImages, uploadImage, fetchUploadedImages }}
//     >
//       {children}
//     </UploadContext.Provider>
//   );
// };

// final attamp

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import axios from "axios";

interface UploadedImageType {
  _id: string;
  public_id: string;
  url: string;
  createdAt?: string;
  updatedAt?: string;
}

interface UploadContextType {
  uploadedImages: UploadedImageType[];
  uploadImage: (file: File) => Promise<UploadedImageType>;
  fetchUploadedImages: () => Promise<void>;
}

const UploadContext = createContext<UploadContextType | undefined>(undefined);

export const UploadProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [uploadedImages, setUploadedImages] = useState<UploadedImageType[]>([]);

  const uploadImage = async (file: File): Promise<UploadedImageType> => {
    const formData = new FormData();
    formData.append("myfile", file);

    try {
      const res = await axios.post(
        "http://localhost:8000/api/images",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true, // Important if server uses cookies!
        }
      );

      if (!res.data?.image) {
        throw new Error("No image data returned from server.");
      }

      const uploaded = res.data.image as UploadedImageType;
      setUploadedImages((prev) => [...prev, uploaded]);
      return uploaded;
    } catch (error: any) {
      console.error("Upload error:", error.response?.data || error.message);
      throw new Error(
        error.response?.data?.message ||
          "Image upload failed. Please try again."
      );
    }
  };

  const fetchUploadedImages = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/images", {
        withCredentials: true,
      });

      const images = res.data.images as UploadedImageType[];
      setUploadedImages(images);
    } catch (error: any) {
      console.error(
        "Failed to fetch uploaded images:",
        error.response?.data || error.message
      );
    }
  };

  useEffect(() => {
    fetchUploadedImages();
  }, []);

  return (
    <UploadContext.Provider
      value={{ uploadedImages, uploadImage, fetchUploadedImages }}
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
