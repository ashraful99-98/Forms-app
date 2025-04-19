// import React, { useState, ChangeEvent } from "react";
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogContentText,
//   DialogActions,
//   Button,
//   TextField,
// } from "@mui/material";
// import UploadContext from "../../context/UploadContext";

// interface ImageUploadModelProps {
//   handleImagePopOpen: boolean;
//   handleImagePopClose: () => void;
//   updateImageLink: (imageLink: string, contextData: any) => void;
//   contextData: any;
// }

// const MAX_IMAGE_SIZE = 3110670; // Approx 3MB

// const ImageUploadModel: React.FC<ImageUploadModelProps> = ({
//   handleImagePopOpen,
//   handleImagePopClose,
//   updateImageLink,
//   contextData,
// }) => {
//   const [image, setImage] = useState<File | undefined>(undefined);
//   const [imageWarning, setImageWarning] = useState("");

//   const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files[0]) {
//       setImage(e.target.files[0]);
//       setImageWarning("");
//     }
//   };

//   const uploadImage = () => {
//     if (!image) {
//       setImageWarning("Please select an image.");
//       return;
//     }

//     if (image.size > MAX_IMAGE_SIZE) {
//       setImageWarning("File size is too big. Maximum allowed is ~3MB.");
//       return;
//     }

//     const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
//     if (!allowedTypes.includes(image.type)) {
//       setImageWarning("Only image files (JPG, PNG, GIF, WEBP) are allowed.");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("myfile", image);

//     UploadContext.uploadImage(formData).then(
//       (data: any) => {
//         const imageLink = `${data.host}/${data.image}`;
//         updateImageLink(imageLink, contextData);
//         handleImagePopClose();
//       },
//       (error: any) => {
//         const resMessage =
//           (error.response?.data?.message as string) ||
//           error.message ||
//           "An error occurred while uploading.";
//         setImageWarning(resMessage);
//       }
//     );
//   };

//   return (
//     <Dialog
//       open={handleImagePopOpen}
//       onClose={handleImagePopClose}
//       aria-labelledby="form-dialog-title"
//     >
//       <DialogTitle id="form-dialog-title">Upload Image</DialogTitle>
//       <DialogContent>
//         <DialogContentText>
//           Upload an image for your question. Only JPG, PNG, GIF, or WEBP are
//           allowed, up to 3MB.
//         </DialogContentText>
//         <TextField
//           type="file"
//           onChange={handleFileChange}
//           fullWidth
//           inputProps={{ accept: "image/*" }}
//         />
//         {imageWarning && <p style={{ color: "red" }}>{imageWarning}</p>}
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={handleImagePopClose} color="primary">
//           Cancel
//         </Button>
//         <Button onClick={uploadImage} color="primary" variant="contained">
//           Upload
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default ImageUploadModel;

import React, { useState, ChangeEvent } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  TextField,
} from "@mui/material";
import { useUpload } from "../../context/UploadContext"; // ✅ Correct import

interface ImageUploadModelProps {
  handleImagePopOpen: boolean;
  handleImagePopClose: () => void;
  updateImageLink: (imageLink: string, contextData: any) => void;
  contextData: any;
}

const MAX_IMAGE_SIZE = 3110670; // Approx 3MB

const ImageUploadModel: React.FC<ImageUploadModelProps> = ({
  handleImagePopOpen,
  handleImagePopClose,
  updateImageLink,
  contextData,
}) => {
  const [image, setImage] = useState<File | undefined>(undefined);
  const [imageWarning, setImageWarning] = useState("");

  const { uploadImage } = useUpload(); // ✅ Use context hook

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setImage(e.target.files[0]);
      setImageWarning("");
    }
  };

  const handleUpload = async () => {
    if (!image) {
      setImageWarning("Please select an image.");
      return;
    }

    if (image.size > MAX_IMAGE_SIZE) {
      setImageWarning("File size is too big. Maximum allowed is ~3MB.");
      return;
    }

    const allowedTypes = ["image/jpeg", "image/png", "image/gif", "image/webp"];
    if (!allowedTypes.includes(image.type)) {
      setImageWarning("Only image files (JPG, PNG, GIF, WEBP) are allowed.");
      return;
    }

    try {
      const data = await uploadImage(image);
      const imageLink = `${data.host}/${data.image}`;
      updateImageLink(imageLink, contextData);
      handleImagePopClose();
    } catch (error: any) {
      const resMessage =
        (error.response?.data?.message as string) ||
        error.message ||
        "An error occurred while uploading.";
      setImageWarning(resMessage);
    }
  };

  return (
    <Dialog
      open={handleImagePopOpen}
      onClose={handleImagePopClose}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">Upload Image</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Upload an image for your question. Only JPG, PNG, GIF, or WEBP are
          allowed, up to 3MB.
        </DialogContentText>
        <TextField
          type="file"
          onChange={handleFileChange}
          fullWidth
          inputProps={{ accept: "image/*" }}
        />
        {imageWarning && <p style={{ color: "red" }}>{imageWarning}</p>}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleImagePopClose} color="primary">
          Cancel
        </Button>
        <Button onClick={handleUpload} color="primary" variant="contained">
          Upload
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ImageUploadModel;
