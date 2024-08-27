import { Preloader } from "@ui";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useAppSelector } from "../../services/hooks/appHooks";
import React from "react";
import { getIsAuthChecked, getUser } from "../../services/slices/user/UserSlice";

type ProtectedRouteProps = {
    onlyUnAuth?: boolean;
    component: React.JSX.Element
  };
  
const ProtectedRoute = ({
    onlyUnAuth = false, component}: ProtectedRouteProps): React.JSX.Element => {
    const user = useAppSelector(getUser)
    const location = useLocation();

    if (!onlyUnAuth && !user) {
        return <Navigate replace to='/login' state={{ from: location }}/>;
    }

    if (onlyUnAuth && user) {
        const from = location.state?.from || { pathname: '/' };
        return <Navigate to={from} replace />;
    }

    return component;
  };

export const OnlyAuth = ProtectedRoute;
export const OnlyUnAuth = ({ component }: ProtectedRouteProps) => <ProtectedRoute onlyUnAuth component={component} />
