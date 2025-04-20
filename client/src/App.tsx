// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
// import Login from "./pages/Login";
// import Register from "./pages/Register";
// import { Container, Navbar, Nav } from "react-bootstrap";

// const App: React.FC = () => {
//   return (
//     <Router>
//       <Navbar bg="dark" variant="dark" expand="lg">
//         <Container>
//           <Navbar.Brand href="/">FormsApp</Navbar.Brand>
//           <Nav className="me-auto">
//             <Nav.Link href="/">Home</Nav.Link>
//             <Nav.Link href="/login">Login</Nav.Link>
//             <Nav.Link href="/register">Register</Nav.Link>
//           </Nav>
//         </Container>
//       </Navbar>
//       <Container className="mt-4">
//         <Routes>
//           <Route path="/" element={<Home />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//         </Routes>
//       </Container>
//     </Router>
//   );
// };

// export default App;

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./pages/Home";
import PrivateRoute from "./Components/utils/PrivateRoute";
import EditForm from "./Components/Form/EditForm";
import UserView from "./Components/Responding/UserView";
import ErrorRadios from "./Components/Responding/RadioCheck";
import { FormProvider } from "./context/FormContext";
import Footer from "./pages/Footer";

const App: React.FC = () => {
  return (
    <AuthProvider>
      <FormProvider>
        <Router>
          {/* <Navbar /> */}
          <div className="container mt-5 pt-5">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Protected Routes */}
              {/* <Route element={<PrivateRoute />}> */}
              <Route path="/form/:formId" element={<EditForm />} />
              {/* </Route> */}

              {/* Public Form View */}
              <Route path="/s/:formId" element={<UserView />} />
              <Route path="/fuck" element={<ErrorRadios />} />
            </Routes>
          </div>
          {/* <Footer /> */}
        </Router>
      </FormProvider>
    </AuthProvider>
  );
};

export default App;
