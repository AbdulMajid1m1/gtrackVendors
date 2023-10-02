import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar/Sidebar";
import Login from "./components/Login/Login";
import PasswordScreen from "./components/Password/Password";
import Dashboard from "./Pages/Dashboard/Dashboard";
import UpdateVendor from "./Pages/UpdateVendor/UpdateVendor";
import ListOfCustomer from "./Pages/ListOfCustomer/ListOfCustomer";
import { SnackbarProvider } from "./Contexts/SnackbarContext";
import DataTableProvider from "./Contexts/DataTableContext";
import ShipmentCard from "./components/ShipmentCard/ShipmentCard";
import AddProducts from "./components/AddProducts/AddProducts";
import ShipmentDocUpload from "./Pages/ShipmentDocUpload/ShipmentDocUpload";

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
      <DataTableProvider>
        <SnackbarProvider>

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
                            <Route path="/customer-list" element={<ListOfCustomer />} />
                            <Route path="/new-shipment-request" element={<ShipmentCard />} />
                            <Route path="/new-shipment-request" element={<ShipmentCard />} />
                            <Route path="/add-products" element={<AddProducts />} />
                            <Route path="/shipment-docs/:productId" element={<ShipmentDocUpload />} />
                        </Routes>
                      </MainLayout>
                    }
                  />
                </Routes>
              </BrowserRouter>
            </div>
        </SnackbarProvider>
      </DataTableProvider>
    </>
  );
};

export default App;