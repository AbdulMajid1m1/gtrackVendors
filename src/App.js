import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Login from "./components/Login/Login";
import PasswordScreen from "./components/Password/Password";
import Dashboard from "./Pages/Dashboard/Dashboard";
import UpdateVendor from "./Pages/UpdateVendor/UpdateVendor";

const App = () => {
  const MainLayout = ({ children }) => {
    return (
      <div className="main-layout-container">
        <Sidebar />
        <span className="right-layout">{children}</span>
      </div>
    );
  };
  return (
    <>
            <div>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Login />} />
                  <Route path="/password" element={<PasswordScreen />} />
                  
                  <Route
                    path="/*"
                    element={
                      <MainLayout>
                        <Routes>
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/update-vendor" element={<UpdateVendor />} />
                        </Routes>
                      </MainLayout>
                    }
                  />
                </Routes>
              </BrowserRouter>
            </div>
     </>
  );
};

export default App;