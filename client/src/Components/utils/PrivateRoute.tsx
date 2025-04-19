// import React from "react";
// import { Route, Navigate, RouteProps } from "react-router-dom";
// import { useAuth } from "../../context/AuthContext";

// interface PrivateRouteProps extends RouteProps {
//   component: React.ComponentType<any>;
// }

// const PrivateRoute: React.FC<PrivateRouteProps> = ({
//   component: Component,
//   ...rest
// }) => {
//   const { user } = useAuth();

//   return (
//     <Route
//       {...rest}
//       render={(props: any) =>
//         user ? (
//           <Component {...props} />
//         ) : (
//           <Navigate
//             to={{
//               pathname: "/login",
//               //   state: { from: props.location },
//             }}
//           />
//         )
//       }
//     />
//   );
// };

// export default PrivateRoute;

import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext"; // adjust path if needed

const PrivateRoute: React.FC = () => {
  const { user } = useAuth();
  const location = useLocation();

  return user ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default PrivateRoute;
