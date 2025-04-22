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
//   Box,
// } from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import { useAuth } from "../../context/AuthContext";
// import { useFormContext, FormType } from "../../context/FormContext";
// import { useParams } from "react-router-dom";
// import titleImg from "../../images/untitlteImg.avif";

// // --- Type Interfaces ---
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

// // --- Component ---
// const UserView: React.FC = () => {
//   const { user } = useAuth();
//   const { fetchFormById, submitResponse } = useFormContext();
//   const { formId } = useParams<{ formId: string }>(); // getting formId from URL
//   const [userId, setUserId] = useState<string>("");
//   const [formData, setFormData] = useState<FormType | null>(null);
//   const [questions, setQuestions] = useState<Question[]>([]);
//   const [responseData, setResponseData] = useState<ResponseData[]>([]);
//   const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
//   const [selectedValues, setSelectedValues] = useState<Record<string, string>>(
//     {}
//   );

//   useEffect(() => {
//     if (user) {
//       setUserId(user._id);
//     } else {
//       const anonymousUserId =
//         "anonymous" +
//         Math.random().toString(36).substring(2, 15) +
//         Math.random().toString(36).substring(2, 15);
//       setUserId(anonymousUserId);
//     }
//   }, [user]);

//   useEffect(() => {
//     if (!formId) return;

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
//   }, [formId, fetchFormById]);

//   const handleRadioChange = (selectedValue: string, questionIndex: number) => {
//     const optionIndex = parseInt(selectedValue, 10);
//     const question = questions[questionIndex];
//     if (!question) return;

//     const questionId = question._id;
//     const option = question.options[optionIndex];
//     if (!option) return;

//     const optionId = option._id;
//     const newResponse: ResponseData = { questionId, optionId };

//     setSelectedValues((prev) => ({ ...prev, [questionId]: selectedValue }));

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

//   const handleSubmit = () => {
//     if (!formData) return;

//     const submissionData = {
//       formId: formData._id,
//       userId,
//       response: responseData,
//     };

//     console.log("Submitting:", submissionData);

//     submitResponse(submissionData)
//       .then(() => {
//         setIsSubmitted(true);
//       })
//       .catch((error: any) => {
//         const resMessage =
//           error.response?.data?.message || error.message || error.toString();
//         console.error(resMessage);
//       });
//   };

//   const reloadForAnotherResponse = () => {
//     window.location.reload();
//   };

//   if (!formData) return <div>Loading...</div>;

//   return (
//     <div style={{ minHeight: "100vh", marginBottom: "20px" }}>
//       <AppBar position="static" style={{ backgroundColor: "teal" }}>
//         <Toolbar>
//           <IconButton
//             edge="start"
//             style={{ marginRight: "10px", marginBottom: "5px" }}
//             color="inherit"
//             aria-label="menu"
//           >
//             <MenuIcon />
//           </IconButton>
//           <Typography variant="h6">Velocity Forms</Typography>
//         </Toolbar>
//       </AppBar>

//       <Grid container direction="column" alignItems="center">
//         <Grid
//           sx={{
//             marginTop: "20px",
//           }}
//           // style={{
//           //   borderTop: "10px solid teal",
//           //   borderRadius: 10,
//           //   width: "100%",
//           //   maxWidth: "900px",
//           //   marginTop: "20px",
//           // }}
//         >
//           <Paper elevation={2}>
//             {/* <div style={{ padding: "20px" }}>
//               <Typography variant="h4" gutterBottom>
//                 {formData.name}
//               </Typography>
//               <Typography variant="subtitle1">
//                 {formData.description}
//               </Typography>
//             </div> */}
//             <Box sx={{ position: "relative", width: "100%" }}>
//               {/* Background Image */}
//               <Box
//                 component="div"
//                 sx={{
//                   position: "absolute",
//                   top: 0,
//                   left: 0,
//                   width: "100%",
//                   height: "100%",
//                   backgroundImage: `url(${titleImg})`,
//                   backgroundSize: "cover",
//                   backgroundPosition: "center",
//                   opacity: 0.9,
//                   zIndex: 1,
//                   borderRadius: 2,
//                 }}
//               />

//               {/* Foreground Content */}
//               <Paper
//                 elevation={2}
//                 sx={{
//                   width: "100%",
//                   borderTop: "8px solid teal",
//                   borderRadius: 2,
//                   overflow: "hidden",
//                   position: "relative",
//                   zIndex: 2,
//                   p: { xs: 2, sm: 4 },
//                   backgroundColor: "rgba(255, 255, 255, 0.85)", // slight white transparency to make text stand out
//                 }}
//               >
//                 <Typography
//                   variant="h4"
//                   sx={{
//                     fontFamily: "Roboto, sans-serif",
//                     mb: 2,
//                   }}
//                 >
//                   {formData.name}
//                 </Typography>
//                 <Typography variant="subtitle1">
//                   {formData.description}
//                 </Typography>
//               </Paper>
//             </Box>
//           </Paper>

//           {!isSubmitted ? (
//             <>
//               {questions.map((ques, i) => (
//                 <Paper key={i} style={{ marginTop: "16px", padding: "15px" }}>
//                   <Typography variant="subtitle1">
//                     {i + 1}. {ques.questionText}
//                   </Typography>

//                   {ques.questionImage && (
//                     <img
//                       src={ques.questionImage}
//                       width="80%"
//                       alt="question"
//                       style={{ marginTop: "10px" }}
//                     />
//                   )}

//                   <RadioGroup
//                     aria-label={`question-${i}`}
//                     name={`question-${i}`}
//                     value={selectedValues[ques._id] || ""}
//                     onChange={(e) => handleRadioChange(e.target.value, i)}
//                   >
//                     {ques.options.map((op, j) => (
//                       <div key={j} style={{ marginLeft: "10px" }}>
//                         <FormControlLabel
//                           value={j.toString()}
//                           control={<Radio />}
//                           label={op.optionText}
//                         />
//                         {op.optionImage && (
//                           <img
//                             src={op.optionImage}
//                             width="64%"
//                             alt="option"
//                             style={{ marginLeft: "25px", marginBottom: "10px" }}
//                           />
//                         )}
//                         <Divider />
//                       </div>
//                     ))}
//                   </RadioGroup>
//                 </Paper>
//               ))}

//               <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={handleSubmit}
//                 sx={{
//                   marginTop: "10px",
//                 }}
//               >
//                 Submit
//               </Button>
//             </>
//           ) : (
//             <Paper style={{ marginTop: "20px", padding: "20px" }}>
//               <Typography variant="h6">Form submitted!</Typography>
//               <Typography variant="body2">
//                 Thanks for submitting the form.
//               </Typography>
//               <Button
//                 variant="outlined"
//                 color="secondary"
//                 onClick={reloadForAnotherResponse}
//                 style={{ marginTop: "10px" }}
//               >
//                 Submit another response
//               </Button>
//             </Paper>
//           )}
//         </Grid>
//       </Grid>
//     </div>

//     // <Grid container direction="column" alignItems="center" sx={{ px: 2 }}>
//     //   <Grid
//     //     sx={{
//     //       mt: 3,
//     //       width: "100%",
//     //       maxWidth: 900,
//     //     }}
//     //   >
//     //     <Paper
//     //       elevation={2}
//     //       sx={{
//     //         borderTop: "8px solid teal",
//     //         borderRadius: 2,
//     //         overflow: "hidden",
//     //       }}
//     //     >
//     //       <Box
//     //         sx={{
//     //           position: "relative",
//     //           width: "100%",
//     //           height: { xs: 200, md: 300 },
//     //         }}
//     //       >
//     //         {/* Background Image */}
//     //         <Box
//     //           sx={{
//     //             position: "absolute",
//     //             top: 0,
//     //             left: 0,
//     //             width: "100%",
//     //             height: "100%",
//     //             backgroundImage: `url(${titleImg})`,
//     //             backgroundSize: "cover",
//     //             backgroundPosition: "center",
//     //             opacity: 0.9,
//     //             zIndex: 1,
//     //           }}
//     //         />

//     //         {/* Foreground Content */}
//     //         <Box
//     //           sx={{
//     //             position: "relative",
//     //             zIndex: 2,
//     //             p: { xs: 2, sm: 4 },
//     //             backgroundColor: "rgba(255, 255, 255, 0.85)",
//     //             height: "100%",
//     //             display: "flex",
//     //             flexDirection: "column",
//     //             justifyContent: "center",
//     //             borderRadius: 2,
//     //           }}
//     //         >
//     //           <Typography
//     //             variant="h4"
//     //             sx={{
//     //               fontFamily: "Roboto, sans-serif",
//     //               mb: 1,
//     //               fontSize: { xs: "1.5rem", md: "2.5rem" },
//     //             }}
//     //           >
//     //             {formData.name}
//     //           </Typography>
//     //           <Typography
//     //             variant="subtitle1"
//     //             sx={{
//     //               fontSize: { xs: "0.9rem", md: "1.2rem" },
//     //             }}
//     //           >
//     //             {formData.description}
//     //           </Typography>
//     //         </Box>
//     //       </Box>
//     //     </Paper>

//     //     {!isSubmitted ? (
//     //       <>
//     //         {questions.map((ques, i) => (
//     //           <Paper
//     //             key={i}
//     //             sx={{
//     //               mt: 2,
//     //               p: { xs: 2, md: 3 },
//     //               borderRadius: 2,
//     //               width: "100%",
//     //             }}
//     //           >
//     //             <Typography
//     //               variant="subtitle1"
//     //               sx={{
//     //                 fontWeight: 600,
//     //                 fontSize: { xs: "1rem", md: "1.25rem" },
//     //               }}
//     //             >
//     //               {i + 1}. {ques.questionText}
//     //             </Typography>

//     //             {ques.questionImage && (
//     //               <Box
//     //                 component="img"
//     //                 src={ques.questionImage}
//     //                 alt="question"
//     //                 sx={{
//     //                   width: "100%",
//     //                   maxHeight: 300,
//     //                   objectFit: "contain",
//     //                   mt: 2,
//     //                   borderRadius: 1,
//     //                 }}
//     //               />
//     //             )}

//     //             <RadioGroup
//     //               aria-label={`question-${i}`}
//     //               name={`question-${i}`}
//     //               value={selectedValues[ques._id] || ""}
//     //               onChange={(e) => handleRadioChange(e.target.value, i)}
//     //               sx={{ mt: 1 }}
//     //             >
//     //               {ques.options.map((op, j) => (
//     //                 <Box key={j} sx={{ ml: 1, mb: 2 }}>
//     //                   <FormControlLabel
//     //                     value={j.toString()}
//     //                     control={<Radio />}
//     //                     label={op.optionText}
//     //                   />
//     //                   {op.optionImage && (
//     //                     <Box
//     //                       component="img"
//     //                       src={op.optionImage}
//     //                       alt="option"
//     //                       sx={{
//     //                         width: "80%",
//     //                         mt: 1,
//     //                         ml: 3,
//     //                         borderRadius: 1,
//     //                       }}
//     //                     />
//     //                   )}
//     //                   <Divider sx={{ my: 1 }} />
//     //                 </Box>
//     //               ))}
//     //             </RadioGroup>
//     //           </Paper>
//     //         ))}

//     //         <Button
//     //           variant="contained"
//     //           color="primary"
//     //           onClick={handleSubmit}
//     //           sx={{
//     //             mt: 3,
//     //             width: { xs: "100%", sm: "auto" },
//     //           }}
//     //         >
//     //           Submit
//     //         </Button>
//     //       </>
//     //     ) : (
//     //       <Paper
//     //         sx={{
//     //           mt: 4,
//     //           p: { xs: 2, md: 3 },
//     //           borderRadius: 2,
//     //           textAlign: "center",
//     //           width: "100%",
//     //         }}
//     //       >
//     //         <Typography variant="h6" sx={{ mb: 1 }}>
//     //           Form submitted!
//     //         </Typography>
//     //         <Typography variant="body2">
//     //           Thanks for submitting the form.
//     //         </Typography>
//     //         <Button
//     //           variant="outlined"
//     //           color="secondary"
//     //           onClick={reloadForAnotherResponse}
//     //           sx={{ mt: 2 }}
//     //         >
//     //           Submit another response
//     //         </Button>
//     //       </Paper>
//     //     )}
//     //   </Grid>
//     // </Grid>
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
import { useAuth } from "../../context/AuthContext";
import { useFormContext, FormType } from "../../context/FormContext";
import { useParams } from "react-router-dom";
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

const UserView: React.FC = () => {
  const { user } = useAuth();
  const { fetchFormById, submitResponse } = useFormContext();
  const { formId } = useParams<{ formId: string }>();
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
    if (!formId) return;

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
  }, [formId, fetchFormById]);

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
          <Typography variant="h6">Forms App</Typography>
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
                sx={{
                  marginTop: "10px",
                }}
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
