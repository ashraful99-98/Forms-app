// import ViewListIcon from "@mui/icons-material/ViewList";
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import "./LandingPage.css";
// import {
//   AppBar,
//   Box,
//   Button,
//   Card,
//   CardActionArea,
//   CardMedia,
//   Container,
//   CssBaseline,
//   Grid,
//   Link,
//   Paper,
//   Toolbar,
//   Typography,
// } from "@mui/material";
// import { IconButton, InputBase, Stack } from "@mui/material";
// import { Facebook, Instagram, Pinterest, Twitter } from "@mui/icons-material";
// import { useAuth } from "../context/AuthContext";

// export default function LandingPage() {
//   const navigate = useNavigate();

//   const handleLoginClick = () => {
//     navigate("/login");
//   };
//   const { user, logout } = useAuth();

//   const handleRegisterClick = () => {
//     navigate("/register");
//   };

//   return (
//     <>
//       <CssBaseline />

//       {/* AppBar */}
//       <AppBar position="relative" className="appBar">
//         <Toolbar sx={{ justifyContent: "space-between" }}>
//           <Box display="flex" alignItems="center">
//             <ViewListIcon sx={{ mr: 1 }} />
//             <Typography variant="h6" noWrap>
//               Forms App
//             </Typography>
//           </Box>
//           <Box className="ms-auto">
//             {user ? (
//               <>
//                 <span className="text-white mx-3">Hello, {user?.name}</span>
//                 <Button  onClick={logout}>
//                   Logout
//                 </Button>
//               </>
//             ) : (
//               <>
//                 <Link as={Link} to="/login">
//                   Login
//                 </Link>
//                 <Link as={Link} to="/register">
//                   Register
//                 </Link>
//               </>
//             )}
//           </Box>
//         </Toolbar>
//       </AppBar>

//       {/* Hero Section */}
//       <main>
//         <Paper
//           className="heroSection"
//           sx={{
//             position: "relative",
//             backgroundColor: "grey.800",
//             color: "#fff",
//             mb: 4,
//             backgroundSize: "cover",
//             backgroundRepeat: "no-repeat",
//             backgroundPosition: "center",
//             backgroundImage: `url(https://images.pexels.com/photos/998641/pexels-photo-998641.jpeg)`,
//             height: { xs: 400, md: 500 },
//             display: "flex",
//             alignItems: "center",
//           }}
//         >
//           {/* Overlay */}
//           <Box
//             sx={{
//               position: "absolute",
//               top: 0,
//               bottom: 0,
//               right: 0,
//               left: 0,
//               backgroundColor: "rgba(0,0,0,.5)",
//             }}
//           />

//           {/* Hero text */}
//           <Container maxWidth="sm" sx={{ position: "relative", zIndex: 1 }}>
//             <Typography
//               component="h1"
//               variant="h3"
//               color="inherit"
//               gutterBottom
//             >
//               Forms App
//             </Typography>
//             <Typography variant="h6" color="inherit" paragraph>
//               Plan your next trip, manage events, conduct quick polls, quizzes,
//               and more.
//             </Typography>
//             <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
//               <Button
//                 variant="contained"
//                 className="tealButton"
//                 onClick={handleRegisterClick}
//               >
//                 Signup Now
//               </Button>
//               <Button
//                 variant="contained"
//                 className="tealButton"
//                 onClick={handleLoginClick}
//               >
//                 Login
//               </Button>
//             </Box>
//           </Container>
//         </Paper>

//         {/* Features Section */}
//         <Container sx={{ py: 6 }}>
//           <Grid container spacing={4}>
//             {/* <Grid item xs={12} md={6}> */}
//             <Card
//               sx={{
//                 display: "flex",
//                 flexDirection: { xs: "column", md: "row" },
//               }}
//             >
//               <CardActionArea component="div" sx={{ display: "flex", flex: 1 }}>
//                 <Box sx={{ flex: 1, p: 2 }}>
//                   <Typography component="h2" variant="h5">
//                     Survey with style
//                   </Typography>
//                   <Typography
//                     variant="subtitle1"
//                     className="tealText"
//                     gutterBottom
//                   >
//                     Style
//                   </Typography>
//                   <Typography variant="subtitle1" paragraph>
//                     Use your photo or logo, and Forms will pick the best colors
//                     for a unique form.
//                   </Typography>
//                 </Box>
//                 <CardMedia
//                   component="img"
//                   sx={{
//                     width: { md: 200 },
//                     display: { xs: "none", md: "block" },
//                   }}
//                   image="https://images.pexels.com/photos/4823233/pexels-photo-4823233.jpeg"
//                   alt="Survey Style"
//                 />
//               </CardActionArea>
//             </Card>
//             {/* </Grid> */}

//             {/* <Grid item xs={12} md={6}> */}
//             <Card
//               sx={{
//                 display: "flex",
//                 flexDirection: { xs: "column", md: "row" },
//               }}
//             >
//               <CardActionArea component="div" sx={{ display: "flex", flex: 1 }}>
//                 <Box sx={{ flex: 1, p: 2 }}>
//                   <Typography component="h2" variant="h5">
//                     Organized & analyzed
//                   </Typography>
//                   <Typography
//                     variant="subtitle1"
//                     className="tealText"
//                     gutterBottom
//                   >
//                     Organize
//                   </Typography>
//                   <Typography variant="subtitle1" paragraph>
//                     Collect responses in real time with charts and export as
//                     CSV, JSON, or Sheets.
//                   </Typography>
//                 </Box>
//                 <CardMedia
//                   component="img"
//                   sx={{
//                     width: { md: 200 },
//                     display: { xs: "none", md: "block" },
//                   }}
//                   image="https://images.pexels.com/photos/4823233/pexels-photo-4823233.jpeg"
//                   alt="Organized"
//                 />
//               </CardActionArea>
//             </Card>
//           </Grid>
//           {/* </Grid> */}
//         </Container>
//       </main>

//       {/* Footer */}
//       <footer
//         className="footer"
//         style={{
//           padding: "2rem 0",
//           backgroundColor: "#f5f5f5",
//           marginTop: "auto",
//         }}
//       >
//         {/* <Container> */}
//         <Box sx={{ bgcolor: "#fafafa", mt: 8, pt: 6, pb: 2 }}>
//           <Container maxWidth="lg">
//             {/* Top Section */}
//             <Grid container spacing={4} alignItems="center">
//               {/* Email Input */}
//               {/* <Grid item xs={12} md={4}> */}
//               <Box
//                 sx={{
//                   display: "flex",
//                   border: "1px solid #ccc",
//                   borderRadius: 2,
//                   overflow: "hidden",
//                   width: "100%",
//                 }}
//               >
//                 <InputBase
//                   sx={{ pl: 2, flex: 1 }}
//                   placeholder="Enter your email"
//                   inputProps={{ "aria-label": "Enter your email" }}
//                 />
//                 <Button
//                   variant="contained"
//                   sx={{
//                     borderRadius: 0,
//                     bgcolor: "#ccc",
//                     color: "#000",
//                     "&:hover": { bgcolor: "#bbb" },
//                   }}
//                 >
//                   →
//                 </Button>
//               </Box>
//             </Grid>

//             {/* Menu Links */}
//             {/* <Grid item xs={12} md={4}> */}
//             <Stack
//               direction="row"
//               spacing={3}
//               justifyContent="center"
//               flexWrap="wrap"
//             >
//               <Typography variant="body2" sx={{ cursor: "pointer" }}>
//                 Features
//               </Typography>
//               <Typography variant="body2" sx={{ cursor: "pointer" }}>
//                 Blog
//               </Typography>
//               <Typography variant="body2" sx={{ cursor: "pointer" }}>
//                 Pricing
//               </Typography>
//               <Typography variant="body2" sx={{ cursor: "pointer" }}>
//                 Services
//               </Typography>
//             </Stack>
//             {/* </Grid> */}

//             {/* Social Icons */}
//             {/* <Grid item xs={12} md={4}> */}
//             <Stack
//               direction="row"
//               spacing={2}
//               justifyContent={{ xs: "center", md: "flex-end" }}
//             >
//               <IconButton>
//                 <Twitter />
//               </IconButton>
//               <IconButton>
//                 <Instagram />
//               </IconButton>
//               <IconButton>
//                 <Facebook />
//               </IconButton>
//               <IconButton>
//                 <Pinterest />
//               </IconButton>
//             </Stack>
//             {/* </Grid> */}
//             {/* </Grid> */}

//             {/* Divider */}
//             <Box sx={{ borderBottom: "1px solid #ddd", my: 4 }} />

//             {/* Bottom Section */}
//             <Grid container spacing={4} alignItems="center">
//               {/* Left Links */}
//               {/* <Grid item xs={12} md={4}> */}
//               <Stack
//                 direction="row"
//                 spacing={3}
//                 justifyContent={{ xs: "center", md: "flex-start" }}
//                 flexWrap="wrap"
//               >
//                 <Typography variant="body2" sx={{ cursor: "pointer" }}>
//                   Terms
//                 </Typography>
//                 <Typography variant="body2" sx={{ cursor: "pointer" }}>
//                   About
//                 </Typography>
//                 <Typography variant="body2" sx={{ cursor: "pointer" }}>
//                   Privacy
//                 </Typography>
//                 <Typography variant="body2" sx={{ cursor: "pointer" }}>
//                   Contact
//                 </Typography>
//               </Stack>
//               {/* </Grid> */}

//               {/* Center Brand */}
//               {/* <Grid item xs={12} md={4}> */}
//               <Typography
//                 variant="h6"
//                 align="center"
//                 sx={{ fontWeight: "bold", color: "#3f51b5" }}
//               >
//                 Colorlib
//               </Typography>
//               {/* </Grid> */}

//               {/* Right CopyRight */}
//               {/* <Grid item xs={12} md={4}> */}
//               <Typography
//                 variant="body2"
//                 // align={{ xs: "center", md: "right" }}
//                 color="text.secondary"
//               >
//                 © 2019. All Rights Reserved.
//               </Typography>
//               {/* </Grid> */}
//             </Grid>
//           </Container>
//         </Box>
//         {/* </Container> */}
//       </footer>
//     </>
//   );
// }

// updalted landing page
import { Link as RouterLink } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Grid,
  TextField,
  Link,
  IconButton,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useAuth } from "../context/AuthContext";
// import feature1 from "../images/Feature11.png";
// import feature2 from "../images/Feature2.jpeg";
// import feature3 from "../images/Feature3.jpg";

const LandingPage = () => {
  const { user, logout } = useAuth();

  const features = [
    {
      title: "Feature 1",
      description: "Short description of Feature 1.",
      backgroundImage: "/images/Feature11.png",
    },
    {
      title: "Feature 2",
      description: "Short description of Feature 2.",
      backgroundImage: "/images/Feature2.jpeg",
    },
    {
      title: "Feature 3",
      description: "Short description of Feature 3.",
      backgroundImage: "/images/Feature3.jpg",
    },
  ];

  return (
    <>
      {/* Header */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Form App
          </Typography>
          {user ? (
            <Button color="inherit" onClick={logout}>
              Logout
            </Button>
          ) : (
            <>
              <Link
                component={RouterLink}
                to="/login"
                color="inherit"
                underline="none"
                sx={{ mx: 1 }}
              >
                Login
              </Link>
              <Link
                component={RouterLink}
                to="/register"
                color="inherit"
                underline="none"
                sx={{ mx: 1 }}
              >
                Register
              </Link>
            </>
          )}
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Box
        sx={{
          backgroundColor: "primary.main",
          color: "white",
          py: 8,
          textAlign: "center",
        }}
      >
        <Container>
          <Typography variant="h2" gutterBottom>
            Welcome to Form App
          </Typography>
          <Typography variant="h5">
            This is a short description of what your app does.
          </Typography>
        </Container>
      </Box>

      {/* Features Section */}
      <Container sx={{ py: 8 }}>
        <Grid
          container
          spacing={4}
          sx={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {features.map((feature, index) => (
            // <Grid item xs={12} sm={6} md={4} key={index}>
            <Box
              sx={{
                position: "relative",
                backgroundImage: `url(${feature.backgroundImage})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
                border: 1,
                borderColor: "grey.300",
                borderRadius: 2,
                overflow: "hidden",
                height: 300,
                transition: "0.3s",
                "&:hover": {
                  boxShadow: 3,
                  transform: "translateY(-5px)",
                },
              }}
            >
              {/* Dark overlay */}
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  zIndex: 1,
                }}
              />
              {/* Text content */}
              <Box
                sx={{
                  position: "relative",
                  zIndex: 2, // make sure text is above overlay
                  color: "white",
                  p: 4,
                  textAlign: "center",
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "end",
                }}
              >
                <Typography variant="h6" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography>{feature.description}</Typography>
              </Box>
            </Box>
            // </Grid>
          ))}
        </Grid>
      </Container>

      {/* Footer Section */}
      <Box sx={{ backgroundColor: "#f5f5f5", py: 6, mt: 8 }}>
        <Container>
          <Grid container spacing={4}>
            {/* About Section */}
            <Grid
            //   item xs={12} md={6}
            >
              <Typography variant="h6" gutterBottom>
                About
              </Typography>
              <Typography>
                Some information about your app. Maybe your mission or vision
                statement.
              </Typography>
            </Grid>

            {/* Stay Updated Section */}
            <Grid
            //   item xs={12} md={6}
            >
              <Typography variant="h6" gutterBottom>
                Stay Updated
              </Typography>
              <Box component="form" sx={{ display: "flex", mt: 2 }}>
                <TextField
                  variant="outlined"
                  placeholder="Login Your email"
                  size="small"
                  fullWidth
                  sx={{ mr: 1 }}
                />
                <IconButton
                  type="submit"
                  sx={{
                    backgroundColor: "primary.main",
                    color: "white",
                    "&:hover": { backgroundColor: "primary.dark" },
                  }}
                  href="/login"
                >
                  <ArrowForwardIcon />
                </IconButton>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
};

export default LandingPage;
