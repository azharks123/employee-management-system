import React, { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import ProtectedRoute from "./components/layout/ProtectedRoute";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import Navbar from "./components/common/Navbar";
import EmployeeList from "./pages/employees/EmployeeList";
import EmployeeCreate from "./pages/employees/EmployeeCreate";

const Login = lazy(() => import("./pages/auth/Login"));
const Register = lazy(() => import("./pages/auth/Register"));
const FormList = lazy(() => import("./pages/forms/FormList"));
const FormEdit = lazy(() => import("./pages/forms/FormEdit"));
const FormCreate = lazy(() => import("./pages/forms/FormCreate"));

const theme = createTheme({
  palette: {
    mode: "light",
  },
});

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path={"/register"} element={<Register />} />
            <Route
              path="/forms"
              element={
                <ProtectedRoute>
                  <FormList />
                </ProtectedRoute>
              }
            />

            <Route
              path="/forms/create"
              element={
                <ProtectedRoute>
                  <FormCreate />
                </ProtectedRoute>
              }
            />

            <Route
              path="/forms/:id/edit"
              element={
                <ProtectedRoute>
                  <FormEdit />
                </ProtectedRoute>
              }
            />

            <Route
              path="/employees/create"
              element={
                <ProtectedRoute>
                  <EmployeeCreate />
                </ProtectedRoute>
              }
            />

            <Route
              path="/employees"
              element={
                <ProtectedRoute>
                  <EmployeeList />
                </ProtectedRoute>
              }
            />

            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </Suspense>
      </Router>
    </ThemeProvider>
  );
};

export default App;
