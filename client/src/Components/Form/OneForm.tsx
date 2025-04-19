// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { Grid, Paper, Typography, Box } from "@mui/material";
// import { FormType } from "../../context/FormContext";

// interface OneFormProps {
//   form: FormType;
// }

// const OneForm: React.FC<OneFormProps> = ({ form }) => {
//   const navigate = useNavigate();

//   const handleClick = () => {
//     navigate(`/forms/${form._id}`);
//   };

//   return (
//     // <Grid item xs={12} sm={6} md={4}>
//     <Grid container spacing={2}>
//       <Paper
//         elevation={4}
//         sx={{
//           p: 2,
//           cursor: "pointer",
//           borderRadius: 2,
//           transition: "0.3s",
//           "&:hover": {
//             boxShadow: 6,
//             transform: "translateY(-4px)",
//           },
//         }}
//         onClick={handleClick}
//       >
//         <Typography variant="h6" fontWeight="bold" gutterBottom noWrap>
//           {form.name}
//         </Typography>
//         <Typography variant="body2" color="text.secondary" noWrap>
//           {form.description}
//         </Typography>
//         <Box mt={1} display="flex" justifyContent="space-between">
//           <Typography variant="caption" color="text.secondary">
//             Created by: {form.createdBy}
//           </Typography>
//           <Typography variant="caption" color="text.secondary">
//             {new Date(form.createdAt || "").toLocaleDateString()}
//           </Typography>
//         </Box>
//       </Paper>
//     </Grid>
//   );
// };

// export default OneForm;

import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Typography,
  Box,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
} from "@mui/material";
import { FormType } from "../../context/FormContext";
import dayjs from "dayjs";

interface OneFormProps {
  form: FormType;
}

const OneForm: React.FC<OneFormProps> = ({ form }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/form/${form._id}`);
  };

  return (
    // <Grid item xs={12} sm={6} md={4}>
    <Grid container spacing={2}>
      <Card
        sx={{
          borderRadius: 3,
          boxShadow: 3,
          transition: "all 0.3s ease",
          "&:hover": {
            transform: "translateY(-5px)",
            boxShadow: 6,
          },
        }}
      >
        <CardActionArea onClick={handleClick}>
          <CardMedia
            component="img"
            height="140"
            image="https://static.makeuseof.com/wp-content/uploads/2019/06/AutoGradingQuizResults-GoogleForms.jpg"
            alt="Form Preview"
          />
          <CardContent>
            <Typography gutterBottom variant="h6" component="div" noWrap>
              {form.name}
            </Typography>
            <Typography variant="body2" color="text.secondary" noWrap>
              {form.description}
            </Typography>
            <Box mt={1}>
              <Typography variant="caption" color="text.secondary">
                {/* Opened: <Moment fromNow>{form.updatedAt}</Moment> */}
                Opened:{dayjs(form.updatedAt).format("MMMM D, YYYY h:mm A")}
              </Typography>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
    // </Grid>
  );
};

export default OneForm;
