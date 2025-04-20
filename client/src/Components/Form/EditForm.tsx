import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Snackbar,
  Paper,
  Grid,
  Box,
} from "@mui/material";

import {
  ViewList as ViewListIcon,
  StarBorder as StarBorderIcon,
  Send as SendIcon,
  Palette as PaletteIcon,
  Visibility as VisibilityIcon,
  Settings as SettingsIcon,
  MoreVert as MoreIcon,
  AccountCircle as AccountCircleIcon,
  FilterNone as FilterNoneIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { SnackbarCloseReason } from "@mui/material";

import { useParams } from "react-router-dom";
import PropTypes from "prop-types";
import { makeStyles } from "@mui/styles";
import { useFormContext } from "../../context/FormContext";
import { useAuth } from "../../context/AuthContext";
import QuestionsTab, { FormDataType } from "./QuestionsTab";
import ResponseTab from "../Response/ResponseTab";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
  },
  title: {
    flexGrow: 1,
  },
  paper: {
    padding: "16px",
    marginTop: "8px",
    marginBottom: "8px",
  },
  button: {
    marginLeft: "8px",
  },
});

// interface FormType {
//   _id?: string;
//   name?: string;
//   createdBy?: string;
//   [key: string]: any;
// }
interface QuestionType {
  questionText: string;
  questionType: string;
  options: string[];
  required: boolean;
}

interface FormType {
  _id?: string;
  name?: string;
  createdBy?: string;
  description?: string;
  questions?: QuestionType[];
}
const EditForm: React.FC = () => {
  const classes = useStyles();
  const { formId } = useParams<{ formId: string }>();
  const { user } = useAuth();
  const { fetchFormById } = useFormContext();

  const [value, setValue] = useState<number>(0);
  const [open, setOpen] = useState<boolean>(false);
  const [formID, setFormID] = useState<string>("");
  const [formDetails, setFormDetails] = useState<FormType>({});
  const [openOfAlert, setOpenOfAlert] = useState<boolean>(false);

  useEffect(() => {
    if (formId) {
      setFormID(formId);
      fetchFormById(formId)
        .then((data: FormType) => setFormDetails(data))
        .catch((error: any) => {
          const resMessage =
            error.response?.data?.message || error.message || error.toString();
          console.error(resMessage);
        });
    }
  }, [formId, fetchFormById]);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleClickOfAlert = () => setOpenOfAlert(true);

  // const handleCloseOfAlert = (
  //   _event?: React.SyntheticEvent,
  //   reason?: string
  // ) => {
  //   if (reason === "clickaway") return;
  //   setOpenOfAlert(false);
  // };

  const handleCloseOfAlert = (
    _event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") return;
    setOpenOfAlert(false);
  };

  const clipToClipboard = () => {
    navigator.clipboard.writeText(
      `${window.location.origin}/s/${formDetails._id}`
    );
    handleClickOfAlert();
    handleClose();
  };

  const sendForm = () => handleClickOpen();

  return (
    <div>
      {formDetails?.createdBy === user?._id ? (
        <>
          <div className={classes.root}>
            <AppBar position="static" color="default" elevation={2}>
              <Toolbar className={classes.toolbar}>
                <IconButton edge="start" style={{ color: "#140078" }}>
                  <ViewListIcon />
                </IconButton>
                <Typography
                  variant="h6"
                  noWrap
                  style={{ marginTop: "8.5px", color: "black" }}
                >
                  {formDetails?.name}
                </Typography>
                <IconButton>
                  <StarBorderIcon />
                </IconButton>

                <Tabs
                  className={classes.title}
                  value={value}
                  onChange={handleChange}
                  indicatorColor="primary"
                  textColor="primary"
                  centered
                >
                  <Tab label="Questions" />
                  <Tab label="Responses" />
                </Tabs>

                <IconButton onClick={sendForm}>
                  <SendIcon />
                </IconButton>
                <IconButton>
                  <PaletteIcon />
                </IconButton>
                <IconButton>
                  <VisibilityIcon />
                </IconButton>
                <IconButton>
                  <SettingsIcon />
                </IconButton>
                <IconButton edge="end">
                  <MoreIcon />
                </IconButton>
                <IconButton edge="end">
                  <AccountCircleIcon />
                </IconButton>
              </Toolbar>
            </AppBar>
          </div>

          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Copy and share link.</DialogTitle>
            <DialogContent>
              <Paper className={classes.paper}>
                <Grid
                  container
                  justifyContent="space-between"
                  alignItems="center"
                >
                  <Typography variant="body1">
                    {`${window.location.origin}/s/${formDetails._id}`}
                  </Typography>
                  <IconButton
                    className={classes.button}
                    size="medium"
                    onClick={clipToClipboard}
                  >
                    <FilterNoneIcon />
                  </IconButton>
                </Grid>
              </Paper>
              <DialogContentText />
            </DialogContent>
            <DialogActions>
              <Button onClick={handleClose} color="primary">
                Cancel
              </Button>
            </DialogActions>
          </Dialog>

          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
            open={openOfAlert}
            autoHideDuration={3000}
            onClose={handleCloseOfAlert}
            message="Copied to clipboard"
            action={
              <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleCloseOfAlert}
              >
                <CloseIcon fontSize="small" />
              </IconButton>
            }
          />
          <TabPanel value={value} index={0}>
            <QuestionsTab formData={formDetails as FormDataType} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            {/* <ResponseTab formData={formDetails} formId={formID} /> */}
            <ResponseTab formData={formDetails as FormType} formId={formID} />
          </TabPanel>
        </>
      ) : (
        <p>You're not the owner of the form</p>
      )}
    </div>
  );
};

export default EditForm;

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`tabpanel-${index}`}
      aria-labelledby={`tab-${index}`}
      {...other}
    >
      {value === index && <Box p={2}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};
