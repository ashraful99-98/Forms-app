// import React, { useState, useEffect } from "react";
// import {
//   AppBar,
//   Toolbar,
//   IconButton,
//   Typography,
//   Grid,
//   Paper,
//   Divider,
//   RadioGroup,
//   FormControlLabel,
//   Radio,
//   Button,
// } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import { makeStyles } from "@mui/styles";
// import { useAuth } from "../../context/AuthContext";
// import { useFormContext } from "../../context/FormContext";
// import { FormType } from "../../context/FormContext";
// import { useParams } from "react-router-dom";

// // --- Type Interfaces ---
// interface UserViewProps {
//   // Assuming you're using react-router's match.params for obtaining formId.
//   match: {
//     params: {
//       formId: string;
//     };
//   };
// }

// // Local interfaces for questions and options.
// interface Option {
//   _id: string;
//   optionText: string;
//   optionImage?: string;
// }

// interface Question {
//   _id: string;
//   questionText: string;
//   questionImage?: string;
//   options: Option[];
// }

// interface ResponseData {
//   questionId: string;
//   optionId: string;
// }

// // --- Styles ---
// const useStyles = makeStyles({
//   button: {
//     margin: "8px",
//   },
//   // You can add more styles as needed
// });

// // --- Component ---
// const UserView: React.FC = () => {
//   const classes = useStyles();
//   const { user } = useAuth();
//   const { fetchFormById, submitResponse: submitFormResponse } = useFormContext();

//   const { formId } = useParams<{ formId: string }>();

//   const [userId, setUserId] = useState<string>("");
//   const [formData, setFormData] = useState<FormType | null>(null);
//   const [questions, setQuestions] = useState<Question[]>([]);
//   const [responseData, setResponseData] = useState<ResponseData[]>([]);
//   const [value, setValue] = useState<string>("");
//   const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

//   // Set or generate a user ID based on authentication.
//   useEffect(() => {
//     if (user) {
//       setUserId(user.id);
//     } else {
//       const anonymousUserId =
//         "anonymous" +
//         Math.random().toString(36).substring(2, 15) +
//         Math.random().toString(36).substring(2, 15);
//       setUserId(anonymousUserId);
//     }
//   }, [user]);

//   // Fetch form details using the formId from props.
//   useEffect(() => {
//     const formId = match.params.formId;
//     fetchFormById(formId)
//       .then((data: FormType) => {
//         setFormData(data);
//         setQuestions(data.questions as Question[]);
//       })
//       .catch((error: any) => {
//         const resMessage =
//           error.response?.data?.message || error.message || error.toString();
//         console.error(resMessage);
//       });
//   }, [match.params.formId, fetchFormById]);

//   // Handle radio selection for each question.
//   const handleRadioChange = (selectedValue: string, questionIndex: number) => {
//     // Convert the selected value (which is passed as a string) into a number.
//     const optionIndex = parseInt(selectedValue, 10);
//     const question = questions[questionIndex];
//     if (!question) return;
//     const questionId = question._id;
//     const option = question.options[optionIndex];
//     if (!option) return;
//     const optionId = option._id;
//     const newResponse: ResponseData = { questionId, optionId };

//     setValue(selectedValue);

//     setResponseData((prevResponses) => {
//       const index = prevResponses.findIndex((r) => r.questionId === questionId);
//       if (index === -1) {
//         return [...prevResponses, newResponse];
//       } else {
//         const responsesCopy = [...prevResponses];
//         responsesCopy[index] = newResponse;
//         return responsesCopy;
//       }
//     });
//   };

//   const submitResponse = () => {
//     if (!formData) return;

//     const payload = {
//       formId: formData._id,
//       userId,
//       response: responseData,
//     };

//     submitFormResponse(payload)
//       .then(() => {
//         setIsSubmitted(true);
//       })
//       .catch((error: any) => {
//         const resMessage =
//           error.response?.data?.message || error.message || error.toString();
//         console.error("Submit error:", resMessage);
//       });
//   };

//   const reloadForAnotherResponse = () => {
//     window.location.reload();
//   };

//   if (!formData) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <div style={{ minHeight: "100vh" }}>
//       <div>
//         <AppBar position="static" style={{ backgroundColor: "teal" }}>
//           <Toolbar>
//             <IconButton
//               edge="start"
//               style={{ marginRight: "10px", marginBottom: "5px" }}
//               color="inherit"
//               aria-label="menu"
//             >
//               <MenuIcon />
//             </IconButton>
//             <Typography variant="h6">Velocity Forms</Typography>
//           </Toolbar>
//         </AppBar>
//         <br />
//         <Grid
//           container
//           direction="column"
//           justifyContent="center"
//           alignItems="center"
//         >
//           {/* <Grid item xs={12} sm={5} style={{ width: "100%" }}> */}
//           <Grid style={{ borderTop: "10px solid teal", borderRadius: 10 }}>
//             <div>
//               <Paper elevation={2} style={{ width: "100%" }}>
//                 <div
//                   style={{
//                     display: "flex",
//                     flexDirection: "column",
//                     alignItems: "flex-start",
//                     marginLeft: "15px",
//                     paddingTop: "20px",
//                     paddingBottom: "20px",
//                   }}
//                 >
//                   <Typography
//                     variant="h4"
//                     style={{
//                       fontFamily: "sans-serif Roboto",
//                       marginBottom: "15px",
//                     }}
//                   >
//                     {formData.name}
//                   </Typography>
//                   <Typography variant="subtitle1">
//                     {formData.description}
//                   </Typography>
//                 </div>
//               </Paper>
//             </div>
//             {/* </Grid> */}

//             {!isSubmitted ? (
//               <div>
//                 <Grid>
//                   {questions.map((ques, i) => (
//                     <div key={i}>
//                       <br />
//                       <Paper>
//                         <div
//                           style={{
//                             display: "flex",
//                             flexDirection: "column",
//                             alignItems: "flex-start",
//                             marginLeft: "6px",
//                             paddingTop: "15px",
//                             paddingBottom: "15px",
//                           }}
//                         >
//                           <Typography
//                             variant="subtitle1"
//                             style={{ marginLeft: "10px" }}
//                           >
//                             {i + 1}. {ques.questionText}
//                           </Typography>
//                           {ques.questionImage && ques.questionImage !== "" && (
//                             <div>
//                               <img
//                                 src={ques.questionImage}
//                                 width="80%"
//                                 height="auto"
//                                 alt="question"
//                               />
//                               <br />
//                               <br />
//                             </div>
//                           )}
//                           <div>
//                             <RadioGroup
//                               aria-label="quiz"
//                               name="quiz"
//                               value={value}
//                               onChange={(e) =>
//                                 handleRadioChange(e.target.value, i)
//                               }
//                             >
//                               {ques.options.map((op, j) => (
//                                 <div key={j}>
//                                   <div
//                                     style={{
//                                       display: "flex",
//                                       marginLeft: "7px",
//                                     }}
//                                   >
//                                     <FormControlLabel
//                                       value={j.toString()}
//                                       control={<Radio />}
//                                       label={op.optionText}
//                                     />
//                                   </div>
//                                   <div
//                                     style={{
//                                       display: "flex",
//                                       marginLeft: "10px",
//                                     }}
//                                   >
//                                     {op.optionImage &&
//                                       op.optionImage !== "" && (
//                                         <img
//                                           src={op.optionImage}
//                                           width="64%"
//                                           height="auto"
//                                           alt="option"
//                                         />
//                                       )}
//                                     <Divider />
//                                   </div>
//                                 </div>
//                               ))}
//                             </RadioGroup>
//                           </div>
//                         </div>
//                       </Paper>
//                     </div>
//                   ))}
//                 </Grid>
//                 <Grid>
//                   <br />
//                   <div style={{ display: "flex" }}>
//                     <Button
//                       variant="contained"
//                       color="primary"
//                       onClick={submitResponse}
//                       className={classes.button}
//                     >
//                       Submit
//                     </Button>
//                   </div>
//                   <br />
//                   <br />
//                 </Grid>
//               </div>
//             ) : (
//               <div>
//                 <Typography variant="body1">Form submitted</Typography>
//                 <Typography variant="body2">
//                   Thanks for submitting the form.
//                 </Typography>
//                 <Button onClick={reloadForAnotherResponse}>
//                   Submit another response
//                 </Button>
//               </div>
//             )}
//           </Grid>
//         </Grid>
//         {/* TODO: Add a footer here */}
//       </div>
//     </div>
//   );
// };

// export default UserView;

import React, { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Grid,
  Paper,
  Divider,
  RadioGroup,
  FormControlLabel,
  Radio,
  Button,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { makeStyles } from "@mui/styles";
import { useAuth } from "../../context/AuthContext";
import { useFormContext, FormType } from "../../context/FormContext";

// --- Type Interfaces ---
interface UserViewProps {
  match: {
    params: {
      formId: string;
    };
  };
}

interface Option {
  _id: string;
  optionText: string;
  optionImage?: string;
}

interface Question {
  _id: string;
  questionText: string;
  questionImage?: string;
  options: Option[];
}

interface ResponseData {
  questionId: string;
  optionId: string;
}

// --- Styles ---
const useStyles = makeStyles({
  button: {
    margin: "8px",
  },
});

// --- Component ---
const UserView: React.FC<UserViewProps> = ({ match }) => {
  const classes = useStyles();
  const { user } = useAuth();
  const { fetchFormById, submitResponse } = useFormContext();

  const [userId, setUserId] = useState<string>("");
  const [formData, setFormData] = useState<FormType | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [responseData, setResponseData] = useState<ResponseData[]>([]);
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [selectedValues, setSelectedValues] = useState<Record<string, string>>(
    {}
  );

  useEffect(() => {
    if (user) {
      setUserId(user._id);
    } else {
      const anonymousUserId =
        "anonymous" +
        Math.random().toString(36).substring(2, 15) +
        Math.random().toString(36).substring(2, 15);
      setUserId(anonymousUserId);
    }
  }, [user]);

  useEffect(() => {
    const formId = match.params.formId;
    fetchFormById(formId)
      .then((data: FormType) => {
        setFormData(data);
        setQuestions(data.questions as Question[]);
      })
      .catch((error: any) => {
        const resMessage =
          error.response?.data?.message || error.message || error.toString();
        console.error(resMessage);
      });
  }, [match.params.formId, fetchFormById]);
  const handleRadioChange = (selectedValue: string, questionIndex: number) => {
    const optionIndex = parseInt(selectedValue, 10);
    const question = questions[questionIndex];
    if (!question) return;

    const questionId = question._id;
    const option = question.options[optionIndex];
    if (!option) return;

    const optionId = option._id;
    const newResponse: ResponseData = { questionId, optionId };

    setSelectedValues((prev) => ({ ...prev, [questionId]: selectedValue }));

    setResponseData((prevResponses) => {
      const index = prevResponses.findIndex((r) => r.questionId === questionId);
      if (index === -1) {
        return [...prevResponses, newResponse];
      } else {
        const responsesCopy = [...prevResponses];
        responsesCopy[index] = newResponse;
        return responsesCopy;
      }
    });
  };

  const handleSubmit = () => {
    if (!formData) return;

    const submissionData = {
      formId: formData._id,
      userId,
      response: responseData,
    };

    console.log("Submitting:", submissionData);

    submitResponse(submissionData)
      .then(() => {
        setIsSubmitted(true);
      })
      .catch((error: any) => {
        const resMessage =
          error.response?.data?.message || error.message || error.toString();
        console.error(resMessage);
      });
  };

  const reloadForAnotherResponse = () => {
    window.location.reload();
  };

  if (!formData) return <div>Loading...</div>;

  return (
    <div style={{ minHeight: "100vh" }}>
      <AppBar position="static" style={{ backgroundColor: "teal" }}>
        <Toolbar>
          <IconButton
            edge="start"
            style={{ marginRight: "10px", marginBottom: "5px" }}
            color="inherit"
            aria-label="menu"
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">Velocity Forms</Typography>
        </Toolbar>
      </AppBar>

      <Grid container direction="column" alignItems="center">
        <Grid
          style={{
            borderTop: "10px solid teal",
            borderRadius: 10,
            width: "100%",
            maxWidth: "900px",
            marginTop: "20px",
          }}
        >
          <Paper elevation={2}>
            <div style={{ padding: "20px" }}>
              <Typography variant="h4" gutterBottom>
                {formData.name}
              </Typography>
              <Typography variant="subtitle1">
                {formData.description}
              </Typography>
            </div>
          </Paper>

          {!isSubmitted ? (
            <>
              {questions.map((ques, i) => (
                <Paper key={i} style={{ marginTop: "16px", padding: "15px" }}>
                  <Typography variant="subtitle1">
                    {i + 1}. {ques.questionText}
                  </Typography>

                  {ques.questionImage && (
                    <img
                      src={ques.questionImage}
                      width="80%"
                      alt="question"
                      style={{ marginTop: "10px" }}
                    />
                  )}

                  <RadioGroup
                    aria-label={`question-${i}`}
                    name={`question-${i}`}
                    value={selectedValues[ques._id] || ""}
                    onChange={(e) => handleRadioChange(e.target.value, i)}
                  >
                    {ques.options.map((op, j) => (
                      <div key={j} style={{ marginLeft: "10px" }}>
                        <FormControlLabel
                          value={j.toString()}
                          control={<Radio />}
                          label={op.optionText}
                        />
                        {op.optionImage && (
                          <img
                            src={op.optionImage}
                            width="64%"
                            alt="option"
                            style={{ marginLeft: "25px", marginBottom: "10px" }}
                          />
                        )}
                        <Divider />
                      </div>
                    ))}
                  </RadioGroup>
                </Paper>
              ))}

              <Button
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                className={classes.button}
              >
                Submit
              </Button>
            </>
          ) : (
            <Paper style={{ marginTop: "20px", padding: "20px" }}>
              <Typography variant="h6">Form submitted!</Typography>
              <Typography variant="body2">
                Thanks for submitting the form.
              </Typography>
              <Button
                variant="outlined"
                color="secondary"
                onClick={reloadForAnotherResponse}
                style={{ marginTop: "10px" }}
              >
                Submit another response
              </Button>
            </Paper>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default UserView;
