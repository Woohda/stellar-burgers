// import { Preloader } from "@ui";
// import { useLocation, Navigate, Outlet } from "react-router-dom";
// import { useAppSelector } from "../../services/hooks/appHooks";

// type ProtectedRouteProps = {
//     onlyUnAuth?: boolean;
//   };
  
//   export const ProtectedRoute = ({
//     onlyUnAuth
//   }: ProtectedRouteProps) => {
//     const location = useLocation();
  
//     // const data = useAppSelector();
//     // const isAuthChecked = useAppSelector(getUserState).isAuthChecked;
//     // const isAuthenticated = useAppSelector(getUserState).isAuthenticated;
  
//     // if (!onlyUnAuth && !isAuthenticated) {
//     //   return <Navigate replace to='/login' state={{ from: location }}/>;
//     // }
  
//     // if (onlyUnAuth && isAuthenticated) {
//     //   const from = location.state?.from || { pathname: '/' };
//     //   return <Navigate to={from} replace  />;
//     // }
  
//     // if (isAuthChecked) {
//     //   return <Preloader />;
//     // }
  
//     return <Outlet />;
//   };