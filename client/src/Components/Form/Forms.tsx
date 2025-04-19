import React, { useEffect, useState } from "react";
import { Box, Grid, CircularProgress, Container } from "@mui/material";
import OneForm from "./OneForm";
import { FormType, useFormContext } from "../../context/FormContext";

interface FormsProps {
  userId?: string;
  fetchAllForms: () => Promise<void>;
}

const Forms: React.FC<FormsProps> = ({ userId }) => {
  const { forms, fetchAllForms, fetchUserForms } = useFormContext();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      try {
        if (userId) {
          await fetchUserForms(userId);
        } else {
          await fetchAllForms();
        }
      } catch (err) {
        console.error("Failed to fetch forms:", err);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [userId, fetchAllForms, fetchUserForms]);

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
