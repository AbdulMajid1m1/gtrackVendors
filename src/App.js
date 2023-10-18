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
import DataTableProvider2 from "./Contexts/DataTableContext2";
import ShipmentCard from "./components/ShipmentCard/ShipmentCard";
import AddProducts from "./components/AddProducts/AddProducts";
import ShipmentDocUpload from "./Pages/ShipmentDocUpload/ShipmentDocUpload";
import ByPo from "./components/ByPo/ByPo";
import SupplierCpanel from "./Pages/SupplierCpanel/SupplierCpanel";
import CpanelErpData from "./Pages/CpanelErpData/CpanelErpData";
import CpanelApiConnection from "./Pages/CpanelApiConnection/CpanelApiConnection";
import Users from "./Pages/Users/Users";
import AddUser from "./Pages/Users/AddUser";
import UpdateUser from "./Pages/Users/UpdateUser";
import SalesOrder from "./Pages/SalesOrder/SalesOrder";

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
      <DataTableProvider2>
      <DataTableProvider>
        <SnackbarProvider>

            <div>
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Login />} />
                  <Route path="/password" element={<PasswordScreen />} />
                  {/* <Route path="/add-products" element={<AddProducts />} /> */}

                  <Route
                    path="/*"
                    element={
                      <MainLayout>
                        <Routes>
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/update-vendor" element={<UpdateVendor />} />
                            <Route path="/customer-list" element={<ListOfCustomer />} />
                            <Route path="/new-shipment-request" element={<ShipmentCard />} />
                            <Route path="/add-products" element={<AddProducts />} />
                            <Route path="/by-po" element={<ByPo />} />
                            <Route path="/shipment-docs/:productId" element={<ShipmentDocUpload />} />
                            <Route path="/supplier-cpanel" element={<SupplierCpanel />} />
                            <Route path="/cpanel-erp-data" element={<CpanelErpData />} />
                            <Route path="/cpanel-api-connection" element={<CpanelApiConnection />} />
                            <Route path="/users" element={<Users />} />
                            <Route path="/add-user" element={<AddUser />} />
                            <Route
                                path="update-user/:vendor_id"
                                element={<UpdateUser />}
                            />
                            <Route path="/sales-order" element={<SalesOrder />} />
                            {/* <Route path="/popup-screen" element={<PopUpScreen />} /> */}
                            
                        </Routes>
                      </MainLayout>
                    }
                  />
                </Routes>
              </BrowserRouter>
            </div>
        </SnackbarProvider>
      </DataTableProvider>
      </DataTableProvider2>
    </>
  );
};

export default App;