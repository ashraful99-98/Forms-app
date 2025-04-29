// import React, { useEffect, useState } from "react";
// import {
//   Accordion,
//   AccordionSummary,
//   AccordionDetails,
//   Typography,
//   TextField,
//   IconButton,
//   FormControlLabel,
//   Radio,
//   Grid,
//   Paper,
//   Button,
//   CircularProgress,
//   Divider,
//   Box,
//   Alert,
// } from "@mui/material";
// import CropOriginalIcon from "@mui/icons-material/CropOriginal";
// import CloseIcon from "@mui/icons-material/Close";
// import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
// import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
// import VisibilityIcon from "@mui/icons-material/Visibility";
// import FilterNoneIcon from "@mui/icons-material/FilterNone";
// import MoreVertIcon from "@mui/icons-material/MoreVert";
// import AddCircleIcon from "@mui/icons-material/AddCircle";
// import SaveIcon from "@mui/icons-material/Save";
// import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
// import ImageUploadModel from "./ImageUploadModel";
// import { useFormContext } from "../../context/FormContext";
// import { UploadProvider } from "../../context/UploadContext";
// import titleImg from "../../images/untitlteImg.avif";
// // Type definitions for a question, its options and the form data.
// interface OptionType {
//   optionText: string;
//   optionImage?: string;
// }

// export interface QuestionType {
//   questionText: string;
//   questionImage?: string;
//   options: OptionType[];
//   open: boolean;
// }

// // export interface FormDataType {
// //   _id: string;
// //   name: string;
// //   description: string;
// //   questions: QuestionType[];
// //   // add additional properties if needed
// // }

// export interface FormDataType {
//   _id: string;
//   name: string;
//   description?: string;
//   questions?: QuestionType[];
// }

// interface ImageContextData {
//   question: number | null;
//   option: number | null;
// }

// interface QuestionsTabProps {
//   formData: FormDataType;
// }

// const QuestionsTab: React.FC<QuestionsTabProps> = ({
//   formData: initialFormData,
// }) => {
//   const [questions, setQuestions] = useState<QuestionType[]>([]);
//   const [openUploadImagePop, setOpenUploadImagePop] = useState<boolean>(false);
//   const [imageContextData, setImageContextData] = useState<ImageContextData>({
//     question: null,
//     option: null,
//   });
//   const [formData, setFormData] = useState<FormDataType>(initialFormData);
//   const [loadingFormData, setLoadingFormData] = useState<boolean>(true);
//   const [successMessage, setSuccessMessage] = useState<string | null>(null);
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);

//   // Grab the editForm function from the context to update the form.
//   const { editForm } = useFormContext();

//   // Setup initial questions from formData
//   useEffect(() => {
//     if (initialFormData.questions) {
//       if (initialFormData.questions.length === 0) {
//         setQuestions([
//           {
//             questionText: "Question",
//             options: [{ optionText: "Option 1" }],
//             open: false,
//           },
//         ]);
//       } else {
//         setQuestions(initialFormData.questions);
//       }
//       setLoadingFormData(false);
//     }
//     setFormData(initialFormData);
//   }, [initialFormData]);

//   // Save questions using the context’s editForm function.
//   const saveQuestions = async () => {
//     const data = {
//       formId: formData._id,
//       name: formData.name,
//       description: formData.description,
//       questions: questions,
//     };

//     try {
//       const updatedForm = await editForm(data);
//       if (updatedForm?.questions) {
//         setQuestions(updatedForm.questions);
//         setSuccessMessage("Questions saved successfully!");
//         setErrorMessage(null);

//         setTimeout(() => {
//           setSuccessMessage(null);
//         }, 3000);
//       }
//     } catch (error: any) {
//       const resMessage =
//         error.response?.data?.message || error.message || error.toString();
//       console.error(resMessage);
//       setErrorMessage(resMessage);
//       setSuccessMessage(null);
//       setTimeout(() => {
//         setErrorMessage(null);
//       }, 3000);
//     }
//   };

//   // Helper for image checking
//   const isImagePresent = (img?: string) => Boolean(img && img.trim() !== "");

//   const addMoreQuestionField = () => {
//     // Close any open questions
//     const updated = questions.map((q) => ({ ...q, open: false }));
//     setQuestions([
//       ...updated,
//       {
//         questionText: "Question",
//         options: [{ optionText: "Option 1" }],
//         open: true,
//       },
//     ]);
//   };

//   const copyQuestion = (i: number) => {
//     const qs = [...questions];
//     // Close all before copying
//     const updated = qs.map((q) => ({ ...q, open: false }));
//     setQuestions(updated);
//     const copiedOptions = qs[i].options.map((op) => ({
//       optionText: op.optionText,
//       optionImage: op.optionImage,
//     }));
//     const newQuestion: QuestionType = {
//       questionText: qs[i].questionText,
//       questionImage: qs[i].questionImage || "",
//       options: copiedOptions,
//       open: true,
//     };
//     setQuestions((prev) => [...prev, newQuestion]);
//   };

//   const handleImagePopupOpen = () => setOpenUploadImagePop(true);

//   const uploadImage = (i: number, j: number | null) => {
//     setImageContextData({ question: i, option: j });
//     handleImagePopupOpen();
//   };

//   const updateImageLink = (link: string, context: ImageContextData) => {
//     const updated = [...questions];
//     if (context.option === null) {
//       updated[context.question!].questionImage = link;
//     } else {
//       updated[context.question!].options[context.option].optionImage = link;
//     }
//     setQuestions(updated);
//   };

//   const deleteQuestion = (i: number) => {
//     const updated = [...questions];
//     if (updated.length > 1) {
//       updated.splice(i, 1);
//     }
//     setQuestions(updated);
//   };

//   const handleOptionValue = (text: string, i: number, j: number) => {
//     const updated = [...questions];
//     updated[i].options[j].optionText = text;
//     setQuestions(updated);
//   };

//   const handleQuestionValue = (text: string, i: number) => {
//     const updated = [...questions];
//     updated[i].questionText = text;
//     setQuestions(updated);
//   };

//   const onDragEnd = (result: any) => {
//     if (!result.destination) return;
//     const reordered = reorder(
//       questions,
//       result.source.index,
//       result.destination.index
//     );
//     setQuestions(reordered);
//   };

//   const reorder = (
//     list: QuestionType[],
//     startIndex: number,
//     endIndex: number
//   ): QuestionType[] => {
//     const newList = Array.from(list);
//     const [removed] = newList.splice(startIndex, 1);
//     newList.splice(endIndex, 0, removed);
//     return newList;
//   };

//   const showAsQuestion = (i: number) => {
//     const updated = [...questions];
//     updated[i].open = false;
//     setQuestions(updated);
//   };

//   const addOption = (i: number) => {
//     const updated = [...questions];
//     if (updated[i].options.length < 5) {
//       updated[i].options.push({
//         optionText: `Option ${updated[i].options.length + 1}`,
//       });
//     } else {
//       console.log("Max 5 options allowed");
//     }
//     setQuestions(updated);
//   };

//   const removeOption = (i: number, j: number) => {
//     const updated = [...questions];
//     if (updated[i].options.length > 1) {
//       updated[i].options.splice(j, 1);
//       setQuestions(updated);
//     }
//   };

//   const handleExpand = (i: number) => {
//     const updated = questions.map((q, index) => ({
//       ...q,
//       open: index === i,
//     }));
//     setQuestions(updated);
//   };

//   // UI for rendering a question – wrapped inside Draggable for drag & drop.
//   const questionsUI = () => {
//     return questions.map((ques, i) => (
//       <Draggable key={i} draggableId={`${i}-id`} index={i}>
//         {(provided) => (
//           <div
//             ref={provided.innerRef}
//             {...provided.draggableProps}
//             {...provided.dragHandleProps}
//           >
//             <div style={{ marginBottom: "15px" }}>
//               <div style={{ width: "100%", marginBottom: "-7px" }}>
//                 <DragIndicatorIcon
//                   style={{ transform: "rotate(-90deg)", color: "#DAE0E2" }}
//                   fontSize="small"
//                 />
//               </div>
//               <Accordion onChange={() => handleExpand(i)} expanded={ques.open}>
//                 <AccordionSummary id={`panel1a-header-${i}`}>
//                   {!ques.open && (
//                     <div
//                       style={{
//                         display: "flex",
//                         flexDirection: "column",
//                         alignItems: "flex-start",
//                         marginLeft: "3px",
//                         paddingTop: "15px",
//                         paddingBottom: "15px",
//                       }}
//                     >
//                       <Typography variant="subtitle1">
//                         {i + 1}. {ques.questionText}
//                       </Typography>
//                       {isImagePresent(ques.questionImage) && (
//                         <div>
//                           <img
//                             src={ques.questionImage}
//                             width="400px"
//                             height="auto"
//                             alt="question"
//                           />
//                           <br />
//                           <br />
//                         </div>
//                       )}
//                       {ques.options.map((op, j) => (
//                         <div key={j}>
//                           <div style={{ display: "flex" }}>
//                             <FormControlLabel
//                               disabled
//                               control={<Radio style={{ marginRight: "3px" }} />}
//                               label={
//                                 <Typography style={{ color: "#555555" }}>
//                                   {op.optionText}
//                                 </Typography>
//                               }
//                             />
//                           </div>
//                           <div>
//                             {isImagePresent(op.optionImage) && (
//                               <img
//                                 src={op.optionImage}
//                                 width="160px"
//                                 height="auto"
//                                 alt="option"
//                               />
//                             )}
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </AccordionSummary>
//                 <AccordionDetails>
//                   <div
//                     style={{
//                       display: "flex",
//                       flexDirection: "column",
//                       alignItems: "flex-start",
//                       marginLeft: "15px",
//                       marginTop: "-15px",
//                     }}
//                   >
//                     <div
//                       style={{
//                         display: "flex",
//                         width: "100%",
//                         justifyContent: "space-between",
//                       }}
//                     >
//                       <Typography style={{ marginTop: "20px" }}>
//                         {i + 1}.
//                       </Typography>
//                       <TextField
//                         fullWidth
//                         placeholder="Question Text"
//                         style={{ marginBottom: "18px" }}
//                         multiline
//                         variant="filled"
//                         value={ques.questionText}
//                         onChange={(e) => handleQuestionValue(e.target.value, i)}
//                       />
//                       <IconButton
//                         aria-label="upload image"
//                         onClick={() => uploadImage(i, null)}
//                       >
//                         <CropOriginalIcon />
//                       </IconButton>
//                     </div>
//                     <div>
//                       {isImagePresent(ques.questionImage) && (
//                         <div
//                           style={{
//                             width: "150px",
//                             display: "flex",
//                             alignItems: "flex-start",
//                             paddingLeft: "20px",
//                           }}
//                         >
//                           <img
//                             src={ques.questionImage}
//                             width="150px"
//                             height="auto"
//                             alt="question"
//                           />
//                           <IconButton
//                             style={{
//                               marginLeft: "-15px",
//                               marginTop: "-15px",
//                               zIndex: 999,
//                               backgroundColor: "lightgrey",
//                               color: "grey",
//                             }}
//                             size="small"
//                             onClick={() =>
//                               updateImageLink("", { question: i, option: null })
//                             }
//                           >
//                             <CloseIcon />
//                           </IconButton>
//                         </div>
//                       )}
//                     </div>
//                     <div style={{ width: "100%" }}>
//                       {ques.options.map((op, j) => (
//                         <div key={j}>
//                           <div
//                             style={{
//                               display: "flex",
//                               flexDirection: "row",
//                               marginLeft: "-12.5px",
//                               justifyContent: "space-between",
//                               paddingTop: "5px",
//                               paddingBottom: "5px",
//                             }}
//                           >
//                             <Radio disabled />
//                             <TextField
//                               fullWidth
//                               placeholder="Option text"
//                               style={{ marginTop: "5px" }}
//                               value={op.optionText}
//                               onChange={(e) =>
//                                 handleOptionValue(e.target.value, i, j)
//                               }
//                             />
//                             <IconButton
//                               aria-label="upload image"
//                               onClick={() => uploadImage(i, j)}
//                             >
//                               <CropOriginalIcon />
//                             </IconButton>
//                             <IconButton
//                               aria-label="delete"
//                               onClick={() => removeOption(i, j)}
//                             >
//                               <CloseIcon />
//                             </IconButton>
//                           </div>
//                           <div>
//                             {isImagePresent(op.optionImage) && (
//                               <div
//                                 style={{
//                                   width: "150px",
//                                   display: "flex",
//                                   alignItems: "flex-start",
//                                   paddingLeft: "20px",
//                                 }}
//                               >
//                                 <img
//                                   src={op.optionImage}
//                                   width="90px"
//                                   height="auto"
//                                   alt="option"
//                                 />
//                                 <IconButton
//                                   style={{
//                                     marginLeft: "-15px",
//                                     marginTop: "-15px",
//                                     zIndex: 999,
//                                     backgroundColor: "lightgrey",
//                                     color: "grey",
//                                   }}
//                                   size="small"
//                                   onClick={() =>
//                                     updateImageLink("", {
//                                       question: i,
//                                       option: j,
//                                     })
//                                   }
//                                 >
//                                   <CloseIcon />
//                                 </IconButton>
//                               </div>
//                             )}
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                     {ques.options.length < 5 && (
//                       <FormControlLabel
//                         disabled
//                         control={<Radio />}
//                         label={
//                           <Button
//                             size="small"
//                             onClick={() => addOption(i)}
//                             style={{
//                               textTransform: "none",
//                               marginLeft: "-5px",
//                             }}
//                           >
//                             Add Option
//                           </Button>
//                         }
//                       />
//                     )}
//                     <br />
//                     <br />
//                     <Typography variant="body2" style={{ color: "grey" }}>
//                       You can add maximum 5 options. If you want to add more
//                       then change in settings. Multiple choice single option is
//                       available.
//                     </Typography>
//                   </div>
//                 </AccordionDetails>
//                 <Divider />
//                 <div
//                   style={{
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "space-between",
//                     padding: "0 8px",
//                   }}
//                 >
//                   <IconButton
//                     aria-label="View"
//                     onClick={() => showAsQuestion(i)}
//                   >
//                     <VisibilityIcon />
//                   </IconButton>
//                   <IconButton aria-label="Copy" onClick={() => copyQuestion(i)}>
//                     <FilterNoneIcon />
//                   </IconButton>
//                   <Divider orientation="vertical" flexItem />
//                   <IconButton
//                     aria-label="delete"
//                     onClick={() => deleteQuestion(i)}
//                   >
//                     <DeleteOutlineIcon />
//                   </IconButton>
//                   <IconButton aria-label="Image">
//                     <MoreVertIcon />
//                   </IconButton>
//                 </div>
//               </Accordion>
//             </div>
//           </div>
//         )}
//       </Draggable>
//     ));
//   };

//   return (
//     <Grid
//       container
//       direction="column"
//       alignItems="center"
//       spacing={4}
//       sx={{ mt: 2, mb: 2, pb: 4, px: 2 }}
//     >
//       {loadingFormData && <CircularProgress />}

//       {/* Form Name & Description */}
//       <Grid>
//         <Box sx={{ position: "relative", width: "100%" }}>
//           {/* Background Image */}
//           <Box
//             component="div"
//             sx={{
//               position: "absolute",
//               top: 0,
//               left: 0,
//               width: "100%",
//               height: "100%",
//               backgroundImage: `url(${titleImg})`,
//               backgroundSize: "cover",
//               backgroundPosition: "center",
//               opacity: 0.9,
//               zIndex: 1,
//               borderRadius: 2,
//             }}
//           />

//           {/* Foreground Content */}
//           <Paper
//             elevation={2}
//             sx={{
//               width: "100%",
//               borderTop: "8px solid teal",
//               borderRadius: 2,
//               overflow: "hidden",
//               position: "relative",
//               zIndex: 2,
//               p: { xs: 2, sm: 4 },
//               backgroundColor: "rgba(255, 255, 255, 0.85)",
//             }}
//           >
//             <Typography
//               variant="h4"
//               sx={{
//                 fontFamily: "Roboto, sans-serif",
//                 mb: 2,
//               }}
//             >
//               {formData?.name || "Untitled Form"}
//             </Typography>
//             <Typography variant="subtitle1">
//               {formData?.description || "No description provided."}
//             </Typography>
//           </Paper>
//         </Box>

//         {errorMessage && (
//           <Alert severity="error" sx={{ mb: 2 }}>
//             {errorMessage}
//           </Alert>
//         )}
//         {successMessage && (
//           <Alert severity="success" sx={{ mb: 2 }}>
//             {successMessage}
//           </Alert>
//         )}

//         {/* Image Upload and Questions Section */}
//         {/* <Grid item xs={12} sm={10} md={8} lg={6}> */}
//         <UploadProvider>
//           <ImageUploadModel
//             handleImagePopOpen={openUploadImagePop}
//             handleImagePopClose={() => setOpenUploadImagePop(false)}
//             updateImageLink={updateImageLink}
//             contextData={imageContextData}
//           />
//         </UploadProvider>

//         <DragDropContext onDragEnd={onDragEnd}>
//           <Droppable droppableId="droppable">
//             {(provided) => (
//               <div {...provided.droppableProps} ref={provided.innerRef}>
//                 {questionsUI()}
//                 {provided.placeholder}
//               </div>
//             )}
//           </Droppable>
//         </DragDropContext>

//         {/* Buttons Section */}
//         <Grid container spacing={2} justifyContent="center" sx={{ mt: 2 }}>
//           <Grid>
//             <Button
//               variant="contained"
//               onClick={addMoreQuestionField}
//               endIcon={<AddCircleIcon />}
//               fullWidth
//             >
//               Add Question
//             </Button>
//           </Grid>
//           <Grid>
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={saveQuestions}
//               endIcon={<SaveIcon />}
//               fullWidth
//             >
//               Save Questions
//             </Button>
//           </Grid>
//         </Grid>
//       </Grid>
//     </Grid>
//   );
// };

// export default QuestionsTab;

// new code
import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  TextField,
  IconButton,
  FormControlLabel,
  Radio,
  Button,
  CircularProgress,
  Divider,
  Box,
  Alert,
  Grid,
  Paper,
} from "@mui/material";
import CropOriginalIcon from "@mui/icons-material/CropOriginal";
import CloseIcon from "@mui/icons-material/Close";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FilterNoneIcon from "@mui/icons-material/FilterNone";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SaveIcon from "@mui/icons-material/Save";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import ImageUploadModel from "./ImageUploadModel";
import { useFormContext } from "../../context/FormContext";
import { UploadProvider } from "../../context/UploadContext";
import titleImg from "../../images/untitlteImg.avif";

// Type Definitions
export interface ImageDataType {
  public_id: string;
  url: string;
}

export interface OptionType {
  optionText: string;
  optionImage?: ImageDataType;
}

export interface QuestionType {
  questionText: string;
  questionImage?: ImageDataType;
  options: OptionType[];
  open: boolean;
}

export interface FormDataType {
  _id?: any;
  formId?: string;
  name: string;
  description?: string;
  questions?: QuestionType[];
}

interface ImageContextData {
  question: number | null;
  option: number | null;
}

interface QuestionsTabProps {
  formData: FormDataType;
}

const QuestionsTab: React.FC<QuestionsTabProps> = ({
  formData: initialFormData,
}) => {
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [openUploadImagePop, setOpenUploadImagePop] = useState<boolean>(false);
  const [imageContextData, setImageContextData] = useState<ImageContextData>({
    question: null,
    option: null,
  });
  const [formData, setFormData] = useState<FormDataType>(initialFormData);
  const [loadingFormData, setLoadingFormData] = useState<boolean>(true);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const { editForm } = useFormContext();

  useEffect(() => {
    if (initialFormData.questions) {
      if (initialFormData.questions.length === 0) {
        setQuestions([
          {
            questionText: "Question",
            options: [{ optionText: "Option 1" }],
            open: false,
          },
        ]);
      } else {
        setQuestions(initialFormData.questions);
      }
      setLoadingFormData(false);
    }
    setFormData(initialFormData);
  }, [initialFormData]);

  const saveQuestions = async () => {
    const data = {
      formId: formData._id,
      name: formData.name,
      description: formData.description,
      questions: questions,
    };

    try {
      const updatedForm = await editForm(data);
      if (updatedForm?.questions) {
        setQuestions(updatedForm.questions);
        setSuccessMessage("Questions saved successfully!");
        setTimeout(() => setSuccessMessage(null), 3000);
      }
    } catch (error: any) {
      const resMessage =
        error.response?.data?.message || error.message || error.toString();
      console.error(resMessage);
      setErrorMessage(resMessage);
      setTimeout(() => setErrorMessage(null), 3000);
    }
  };

  const isImagePresent = (img?: ImageDataType) =>
    Boolean(img && img.url.trim() !== "");

  const addMoreQuestionField = () => {
    const updated = questions.map((q) => ({ ...q, open: false }));
    setQuestions([
      ...updated,
      {
        questionText: "Question",
        options: [{ optionText: "Option 1" }],
        open: true,
      },
    ]);
  };

  const copyQuestion = (i: number) => {
    const qs = [...questions];
    const updated = qs.map((q) => ({ ...q, open: false }));
    setQuestions(updated);
    const copiedOptions = qs[i].options.map((op) => ({ ...op }));
    const newQuestion: QuestionType = {
      questionText: qs[i].questionText,
      questionImage: qs[i].questionImage
        ? {
            public_id: qs[i].questionImage?.public_id || "",
            url: qs[i].questionImage?.url || "",
          }
        : undefined,
      options: copiedOptions,
      open: true,
    };
    setQuestions((prev) => [...prev, newQuestion]);
  };

  const uploadImage = (i: number, j: number | null) => {
    setImageContextData({ question: i, option: j });
    setOpenUploadImagePop(true);
  };

  const updateImageLink = (link: string, context: ImageContextData) => {
    const updated = [...questions];
    if (context.option === null) {
      updated[context.question!].questionImage = {
        public_id: "",
        url: link,
      };
    } else {
      updated[context.question!].options[context.option].optionImage = {
        public_id: "",
        url: link,
      };
    }
    setQuestions(updated);
    setOpenUploadImagePop(false);
  };

  const deleteQuestion = (i: number) => {
    const updated = [...questions];
    if (updated.length > 1) {
      updated.splice(i, 1);
    }
    setQuestions(updated);
  };

  const handleOptionValue = (text: string, i: number, j: number) => {
    const updated = [...questions];
    updated[i].options[j].optionText = text;
    setQuestions(updated);
  };

  const handleQuestionValue = (text: string, i: number) => {
    const updated = [...questions];
    updated[i].questionText = text;
    setQuestions(updated);
  };

  const onDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const reordered = reorder(
      questions,
      result.source.index,
      result.destination.index
    );
    setQuestions(reordered);
  };

  const reorder = (
    list: QuestionType[],
    startIndex: number,
    endIndex: number
  ): QuestionType[] => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
  };

  const showAsQuestion = (i: number) => {
    const updated = [...questions];
    updated[i].open = false;
    setQuestions(updated);
  };

  const addOption = (i: number) => {
    const updated = [...questions];
    if (updated[i].options.length < 5) {
      updated[i].options.push({
        optionText: `Option ${updated[i].options.length + 1}`,
      });
    }
    setQuestions(updated);
  };

  const removeOption = (i: number, j: number) => {
    const updated = [...questions];
    if (updated[i].options.length > 1) {
      updated[i].options.splice(j, 1);
    }
    setQuestions(updated);
  };

  const handleExpand = (i: number) => {
    const updated = questions.map((q, index) => ({ ...q, open: index === i }));
    setQuestions(updated);
  };

  const handleCloseUpload = () => {
    setOpenUploadImagePop(false);
  };

  const questionsUI = () => {
    return questions.map((ques, i) => (
      <Draggable key={i} draggableId={`${i}`} index={i}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Box mb={2}>
              <Box width="100%" mb={-1}>
                <DragIndicatorIcon
                  sx={{
                    transform: "rotate(-90deg)",
                    color: "#DAE0E2",
                    fontSize: "small",
                  }}
                />
              </Box>
              <Accordion expanded={ques.open} onChange={() => handleExpand(i)}>
                <AccordionSummary id={`panel1a-header-${i}`}>
                  {!ques.open && (
                    <Box
                      display="flex"
                      flexDirection="column"
                      alignItems="flex-start"
                      ml={0.5}
                      py={2}
                    >
                      <Typography variant="subtitle1">
                        {i + 1}. {ques.questionText}
                      </Typography>
                      {isImagePresent(ques.questionImage) && (
                        <img
                          src={ques.questionImage?.url}
                          style={{ maxWidth: "100%" }}
                          alt="question"
                        />
                      )}
                      {ques.options.map((op, j) => (
                        <Box key={j}>
                          <FormControlLabel
                            disabled
                            control={<Radio />}
                            label={
                              <Typography sx={{ color: "#555555" }}>
                                {op.optionText}
                              </Typography>
                            }
                          />
                          {op.optionImage && (
                            <img
                              src={op.optionImage.url}
                              // style={{ maxWidth: "400px", height: "400px" }}
                              style={{ maxWidth: "100%" }}
                              alt="option"
                            />
                          )}
                        </Box>
                      ))}
                    </Box>
                  )}
                </AccordionSummary>
                <AccordionDetails>
                  <TextField
                    fullWidth
                    placeholder="Question Text"
                    multiline
                    variant="filled"
                    value={ques.questionText}
                    onChange={(e) => handleQuestionValue(e.target.value, i)}
                    sx={{ mb: 2 }}
                  />
                  {ques.options.map((op, j) => (
                    <Box key={j} display="flex" alignItems="center" mb={1.5}>
                      <Radio disabled />
                      <TextField
                        placeholder="Option Text"
                        variant="filled"
                        value={op.optionText}
                        onChange={(e) =>
                          handleOptionValue(e.target.value, i, j)
                        }
                        fullWidth
                      />
                      <IconButton onClick={() => uploadImage(i, j)}>
                        <CropOriginalIcon />
                      </IconButton>
                      <IconButton onClick={() => removeOption(i, j)}>
                        <CloseIcon />
                      </IconButton>
                    </Box>
                  ))}
                  <Button
                    onClick={() => addOption(i)}
                    startIcon={<AddCircleIcon />}
                    sx={{ mb: 2 }}
                  >
                    Add Option
                  </Button>
                  <Divider />
                  <Box mt={2} display="flex" justifyContent="flex-end">
                    <IconButton onClick={() => uploadImage(i, null)}>
                      <CropOriginalIcon />
                    </IconButton>
                    <IconButton onClick={() => copyQuestion(i)}>
                      <FilterNoneIcon />
                    </IconButton>
                    <IconButton onClick={() => deleteQuestion(i)}>
                      <DeleteOutlineIcon />
                    </IconButton>
                    <IconButton onClick={() => showAsQuestion(i)}>
                      <VisibilityIcon />
                    </IconButton>
                  </Box>
                </AccordionDetails>
              </Accordion>
            </Box>
          </div>
        )}
      </Draggable>
    ));
  };

  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      spacing={4}
      sx={{ mt: 2, mb: 2, pb: 4, px: { xs: 2, md: 6 } }}
    >
      {loadingFormData && <CircularProgress />}

      <Grid sx={{ width: "100%" }}>
        <Box sx={{ position: "relative", width: "100%" }}>
          <Box
            component="div"
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundImage: `url(${titleImg})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: 0.9,
              zIndex: 1,
              borderRadius: 2,
            }}
          />
          <Paper
            elevation={2}
            sx={{
              width: "100%",
              borderTop: "8px solid teal",
              borderRadius: 2,
              overflow: "hidden",
              position: "relative",
              zIndex: 2,
              p: { xs: 2, sm: 4 },
              backgroundColor: "rgba(255, 255, 255, 0.85)",
            }}
          >
            <Typography variant="h4" sx={{ mb: 2 }}>
              {formData?.name || "Untitled Form"}
            </Typography>
            <Typography variant="subtitle1">
              {formData?.description || "No description provided."}
            </Typography>
          </Paper>
        </Box>
      </Grid>
      {/*
      {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      {successMessage && <Alert severity="success">{successMessage}</Alert>} */}

      <Grid sx={{ width: "100%" }}>
        <UploadProvider>
          <ImageUploadModel
            open={openUploadImagePop}
            onClose={handleCloseUpload}
            updateImageLink={updateImageLink}
            context={imageContextData}
          />
        </UploadProvider>

        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="droppable">
            {(provided) => (
              <Box {...provided.droppableProps} ref={provided.innerRef}>
                {questionsUI()}
                {provided.placeholder}
              </Box>
            )}
          </Droppable>
        </DragDropContext>

        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
        {successMessage && <Alert severity="success">{successMessage}</Alert>}

        <Grid container spacing={2} justifyContent="center" sx={{ mt: 2 }}>
          <Grid>
            <Button
              variant="contained"
              onClick={addMoreQuestionField}
              endIcon={<AddCircleIcon />}
              fullWidth
            >
              Add Question
            </Button>
          </Grid>
          <Grid>
            <Button
              variant="contained"
              color="primary"
              onClick={saveQuestions}
              endIcon={<SaveIcon />}
              fullWidth
            >
              Save Questions
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default QuestionsTab;
