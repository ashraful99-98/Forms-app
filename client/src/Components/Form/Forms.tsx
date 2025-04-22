// import React, { useEffect, useState } from "react";
// import { Box, Grid, CircularProgress, Container } from "@mui/material";
// import OneForm from "./OneForm";
// import { FormType, useFormContext } from "../../context/FormContext";

// interface FormsProps {
//   userId?: string;
//   // fetchAllForms: () => Promise<void>;
//   // fetchUserForms: () => Promise<void>;
// }

// const Forms: React.FC<FormsProps> = ({ userId }) => {
//   const { forms, fetchAllForms, fetchUserForms } = useFormContext();
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetch = async () => {
//       try {
//         if (userId) {
//           await fetchUserForms(userId);
//         } else {
//           // await fetchAllForms();
//         }
//       } catch (err) {
//         console.error("Failed to fetch forms:", err);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetch();
//   }, [userId, fetchAllForms, fetchUserForms]);

//   return (
//     <Container maxWidth="lg">
//       {loading ? (
//         <Box display="flex" justifyContent="center" mt={4}>
//           <CircularProgress />
//         </Box>
//       ) : (
//         <Box p={2}>
//           <Grid container spacing={3}>
//             {forms.map((form: FormType) => (
//               <OneForm key={form._id} form={form} />
//             ))}
//           </Grid>
//         </Box>
//       )}
//     </Container>
//   );
// };

// export default Forms;
import React, { useEffect, useState } from "react";
import { Box, Grid, CircularProgress, Container } from "@mui/material";
import OneForm from "./OneForm";
import { FormType, useFormContext } from "../../context/FormContext";
import { useAuth } from "../../context/AuthContext";

interface FormsProps {
  userId?: string;
}

const Forms: React.FC<FormsProps> = ({ userId }) => {
  const { forms, fetchAllForms, fetchUserForms } = useFormContext();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchForms = async () => {
  //     try {
  //       if (user?.role === "admin") {
  //         await fetchAllForms();
  //       } else if (user?.role === "user" && userId) {
  //         await fetchUserForms(userId);
  //       }
  //     } catch (err) {
  //       console.error("Failed to fetch forms:", err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   if (user) {
  //     fetchForms();
  //   }
  // }, [user, userId, fetchAllForms, fetchUserForms]);

  useEffect(() => {
    const fetchForms = async () => {
      if (!user) return;

      try {
        setLoading(true);

        // If forms are already fetched, don't fetch again
        if (forms.length === 0) {
          if (user.role === "admin") {
            await fetchAllForms();
          } else if (user.role === "user" && userId) {
            await fetchUserForms(userId);
          }
        }
      } catch (error) {
        console.error("Failed to fetch forms:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchForms();
  }, [
    user?._id,
    user?.role,
    userId,
    fetchAllForms,
    fetchUserForms,
    user,
    forms.length,
  ]);
  return (
    <Container maxWidth="lg">
      {loading ? (
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      ) : (
        <Box p={2}>
          <Grid container spacing={3}>
            {forms.map((form: FormType) => (
              <OneForm key={form._id} form={form} />
            ))}
          </Grid>
        </Box>
      )}
    </Container>
  );
};

export default Forms;
