import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import TodoList from "../TodoList";

const PrivateRoute = ({ path, component }) => {

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
//   const loading = useSelector((state) => state.auth.loading);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  return <TodoList/>;
};

export default PrivateRoute;
