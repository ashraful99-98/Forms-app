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
  Grid,
  Paper,
  Button,
  CircularProgress,
  Divider,
} from "@mui/material";
import CropOriginalIcon from "@mui/icons-material/CropOriginal";
import CloseIcon from "@mui/icons-material/Close";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FilterNoneIcon from "@mui/icons-material/FilterNone";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import SaveIcon from "@mui/icons-material/Save";
import { useFormContext } from "../../context/FormContext";
import ImageUploadModel from "./ImageUploadModel";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { UploadProvider } from "../../context/UploadContext";
// Type definitions for a question, its options and the form data.
interface OptionType {
  optionText: string;
  optionImage?: string;
}

export interface QuestionType {
  questionText: string;
  questionImage?: string;
  options: OptionType[];
  open: boolean;
}

// export interface FormDataType {
//   _id: string;
//   name: string;
//   description: string;
//   questions: QuestionType[];
//   // add additional properties if needed
// }

export interface FormDataType {
  _id: string;
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

  // Grab the editForm function from the context to update the form.
  const { editForm } = useFormContext();

  // Setup initial questions from formData
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

  // Save questions using the context’s editForm function.
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
      }
    } catch (error: any) {
      const resMessage =
        error.response?.data?.message || error.message || error.toString();
      console.error(resMessage);
    }
  };

  // Helper for image checking
  const isImagePresent = (img?: string) => Boolean(img && img.trim() !== "");

  const addMoreQuestionField = () => {
    // Close any open questions
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
    // Close all before copying
    const updated = qs.map((q) => ({ ...q, open: false }));
    setQuestions(updated);
    const copiedOptions = qs[i].options.map((op) => ({
      optionText: op.optionText,
      optionImage: op.optionImage,
    }));
    const newQuestion: QuestionType = {
      questionText: qs[i].questionText,
      questionImage: qs[i].questionImage || "",
      options: copiedOptions,
      open: true,
    };
    setQuestions((prev) => [...prev, newQuestion]);
  };

  const handleImagePopupOpen = () => setOpenUploadImagePop(true);

  const uploadImage = (i: number, j: number | null) => {
    setImageContextData({ question: i, option: j });
    handleImagePopupOpen();
  };

  const updateImageLink = (link: string, context: ImageContextData) => {
    const updated = [...questions];
    if (context.option === null) {
      updated[context.question!].questionImage = link;
    } else {
      updated[context.question!].options[context.option].optionImage = link;
    }
    setQuestions(updated);
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

  const onDragEnd = (result: any) => {
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
    const newList = Array.from(list);
    const [removed] = newList.splice(startIndex, 1);
    newList.splice(endIndex, 0, removed);
    return newList;
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
    } else {
      console.log("Max 5 options allowed");
    }
    setQuestions(updated);
  };

  const removeOption = (i: number, j: number) => {
    const updated = [...questions];
    if (updated[i].options.length > 1) {
      updated[i].options.splice(j, 1);
      setQuestions(updated);
    }
  };

  const handleExpand = (i: number) => {
    const updated = questions.map((q, index) => ({
      ...q,
      open: index === i,
    }));
    setQuestions(updated);
  };

  // UI for rendering a question – wrapped inside Draggable for drag & drop.
  const questionsUI = () => {
    return questions.map((ques, i) => (
      <Draggable key={i} draggableId={`${i}-id`} index={i}>
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div style={{ marginBottom: "15px" }}>
              <div style={{ width: "100%", marginBottom: "-7px" }}>
                <DragIndicatorIcon
                  style={{ transform: "rotate(-90deg)", color: "#DAE0E2" }}
                  fontSize="small"
                />
              </div>
              <Accordion onChange={() => handleExpand(i)} expanded={ques.open}>
                <AccordionSummary id={`panel1a-header-${i}`}>
                  {!ques.open && (
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "flex-start",
                        marginLeft: "3px",
                        paddingTop: "15px",
                        paddingBottom: "15px",
                      }}
                    >
                      <Typography variant="subtitle1">
                        {i + 1}. {ques.questionText}
                      </Typography>
                      {isImagePresent(ques.questionImage) && (
                        <div>
                          <img
                            src={ques.questionImage}
                            width="400px"
                            height="auto"
                            alt="question"
                          />
                          <br />
                          <br />
                        </div>
                      )}
                      {ques.options.map((op, j) => (
                        <div key={j}>
                          <div style={{ display: "flex" }}>
                            <FormControlLabel
                              disabled
                              control={<Radio style={{ marginRight: "3px" }} />}
                              label={
                                <Typography style={{ color: "#555555" }}>
                                  {op.optionText}
                                </Typography>
                              }
                            />
                          </div>
                          <div>
                            {isImagePresent(op.optionImage) && (
                              <img
                                src={op.optionImage}
                                width="160px"
                                height="auto"
                                alt="option"
                              />
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </AccordionSummary>
                <AccordionDetails>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-start",
                      marginLeft: "15px",
                      marginTop: "-15px",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography style={{ marginTop: "20px" }}>
                        {i + 1}.
                      </Typography>
                      <TextField
                        fullWidth
                        placeholder="Question Text"
                        style={{ marginBottom: "18px" }}
                        multiline
                        variant="filled"
                        value={ques.questionText}
                        onChange={(e) => handleQuestionValue(e.target.value, i)}
                      />
                      <IconButton
                        aria-label="upload image"
                        onClick={() => uploadImage(i, null)}
                      >
                        <CropOriginalIcon />
                      </IconButton>
                    </div>
                    <div>
                      {isImagePresent(ques.questionImage) && (
                        <div
                          style={{
                            width: "150px",
                            display: "flex",
                            alignItems: "flex-start",
                            paddingLeft: "20px",
                          }}
                        >
                          <img
                            src={ques.questionImage}
                            width="150px"
                            height="auto"
                            alt="question"
                          />
                          <IconButton
                            style={{
                              marginLeft: "-15px",
                              marginTop: "-15px",
                              zIndex: 999,
                              backgroundColor: "lightgrey",
                              color: "grey",
                            }}
                            size="small"
                            onClick={() =>
                              updateImageLink("", { question: i, option: null })
                            }
                          >
                            <CloseIcon />
                          </IconButton>
                        </div>
                      )}
                    </div>
                    <div style={{ width: "100%" }}>
                      {ques.options.map((op, j) => (
                        <div key={j}>
                          <div
                            style={{
                              display: "flex",
                              flexDirection: "row",
                              marginLeft: "-12.5px",
                              justifyContent: "space-between",
                              paddingTop: "5px",
                              paddingBottom: "5px",
                            }}
                          >
                            <Radio disabled />
                            <TextField
                              fullWidth
                              placeholder="Option text"
                              style={{ marginTop: "5px" }}
                              value={op.optionText}
                              onChange={(e) =>
                                handleOptionValue(e.target.value, i, j)
                              }
                            />
                            <IconButton
                              aria-label="upload image"
                              onClick={() => uploadImage(i, j)}
                            >
                              <CropOriginalIcon />
                            </IconButton>
                            <IconButton
                              aria-label="delete"
                              onClick={() => removeOption(i, j)}
                            >
                              <CloseIcon />
                            </IconButton>
                          </div>
                          <div>
                            {isImagePresent(op.optionImage) && (
                              <div
                                style={{
                                  width: "150px",
                                  display: "flex",
                                  alignItems: "flex-start",
                                  paddingLeft: "20px",
                                }}
                              >
                                <img
                                  src={op.optionImage}
                                  width="90px"
                                  height="auto"
                                  alt="option"
                                />
                                <IconButton
                                  style={{
                                    marginLeft: "-15px",
                                    marginTop: "-15px",
                                    zIndex: 999,
                                    backgroundColor: "lightgrey",
                                    color: "grey",
                                  }}
                                  size="small"
                                  onClick={() =>
                                    updateImageLink("", {
                                      question: i,
                                      option: j,
                                    })
                                  }
                                >
                                  <CloseIcon />
                                </IconButton>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                    {ques.options.length < 5 && (
                      <FormControlLabel
                        disabled
                        control={<Radio />}
                        label={
                          <Button
                            size="small"
                            onClick={() => addOption(i)}
                            style={{
                              textTransform: "none",
                              marginLeft: "-5px",
                            }}
                          >
                            Add Option
                          </Button>
                        }
                      />
                    )}
                    <br />
                    <br />
                    <Typography variant="body2" style={{ color: "grey" }}>
                      You can add maximum 5 options. If you want to add more
                      then change in settings. Multiple choice single option is
                      available.
                    </Typography>
                  </div>
                </AccordionDetails>
                <Divider />
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0 8px",
                  }}
                >
                  <IconButton
                    aria-label="View"
                    onClick={() => showAsQuestion(i)}
                  >
                    <VisibilityIcon />
                  </IconButton>
                  <IconButton aria-label="Copy" onClick={() => copyQuestion(i)}>
                    <FilterNoneIcon />
                  </IconButton>
                  <Divider orientation="vertical" flexItem />
                  <IconButton
                    aria-label="delete"
                    onClick={() => deleteQuestion(i)}
                  >
                    <DeleteOutlineIcon />
                  </IconButton>
                  <IconButton aria-label="Image">
                    <MoreVertIcon />
                  </IconButton>
                </div>
              </Accordion>
            </div>
          </div>
        )}
      </Draggable>
    ));
  };

  return (
    <div
      style={{ marginTop: "15px", marginBottom: "7px", paddingBottom: "30px" }}
    >
      <Grid container direction="column" alignItems="center">
        {loadingFormData && <CircularProgress />}
        {/* <Grid item xs={12} sm={5} style={{ width: "100%" }}> */}
        <Grid style={{ borderTop: "10px solid teal", borderRadius: 10 }}>
          <div>
            <Paper elevation={2} style={{ width: "100%" }}>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "flex-start",
                  marginLeft: "15px",
                  paddingTop: "20px",
                  paddingBottom: "20px",
                }}
              >
                <Typography
                  variant="h4"
                  style={{
                    fontFamily: "sans-serif Roboto",
                    marginBottom: "15px",
                  }}
                >
                  {formData.name}
                </Typography>
                <Typography variant="subtitle1">
                  {formData.description}
                </Typography>
              </div>
            </Paper>
          </div>
        </Grid>
        <Grid style={{ paddingTop: "10px" }}>
          <div>
            <UploadProvider>
              <ImageUploadModel
                handleImagePopOpen={openUploadImagePop}
                handleImagePopClose={() => setOpenUploadImagePop(false)}
                updateImageLink={updateImageLink}
                contextData={imageContextData}
              />
            </UploadProvider>
            {/* <ImageUploadModel
              handleImagePopOpen={openUploadImagePop}
              handleImagePopClose={() => setOpenUploadImagePop(false)}
              updateImageLink={updateImageLink}
              contextData={imageContextData}
            /> */}
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId="droppable">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {questionsUI()}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
            <div style={{ marginTop: "10px" }}>
              <Button
                variant="contained"
                onClick={addMoreQuestionField}
                endIcon={<AddCircleIcon />}
              >
                Add Question
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={saveQuestions}
                style={{ margin: "15px" }}
                endIcon={<SaveIcon />}
              >
                Save Questions
              </Button>
            </div>
          </div>
        </Grid>
        {/* </Grid> */}
      </Grid>
    </div>
  );
};

export default QuestionsTab;
