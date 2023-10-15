import React, { useContext, useEffect, useState } from 'react'
import { orderLineColumns, productionColumns, purchaseOrderColumns, salesInvoiceColumn } from '../../utils/datatablesource'
import DataTable from '../../components/Datatable/Datatable'
import newRequest from '../../utils/userRequest';
// import { CurrentUserContext } from '../../Contexts/CurrentUserContext';
import Swal from 'sweetalert2';
import "./SupplierCpanel.css"
import SendIcon from '@mui/icons-material/Send';
// import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
// import { UpdateOdooErpRowData, UpdateRowData } from '../../utils/Funtions/rowUpdate';
import { SnackbarContext } from '../../Contexts/SnackbarContext';



const CpanelErpData = () => {
  const [activeTab, setActiveTab] = useState('Purchase-Order');
//   const { currentUser } = useContext(CurrentUserContext);
//   console.log(currentUser)
  const [isLoading, setIsLoading] = useState(true);
  const [poProductLoading, setPoProductLoading] = useState(true);


  // useEffect(() => {
  //   localStorage.setItem('activeTab', activeTab);
  // }, [activeTab]);
  const { openSnackbar } = useContext(SnackbarContext);
  const [purshase, setPurshase] = useState([


  ])
  const [manufacturing, setManufacturing] = useState([])
  const [salesInvoice, setsalesInvoice] = useState([])
  const [poProduct, setPoProduct] = useState([])
  const credentials = JSON.parse(localStorage.getItem("credentials"))
//   console.log(credentials)
  const vendorData = JSON.parse(sessionStorage.getItem("vendorData"))
//   console.log(vendorData?.user)
  const [poName, setPoName] = useState('')
  

  useEffect(() => {
    const fetchData = async () => {
      try {

        // /member/gln/list
        const response = await newRequest.get(`/getPOHeaderBySupplierId?supplier_id=${vendorData?.user?.id}`);
        console.log(response.data);
        setIsLoading(false)
        setPurshase(response?.data || []);
        const poHeaderId = response?.data[0]?.po_header_id; // Extract the po_header_id


        const ProductResponse = await newRequest.get(`/getPODetailsByPoHeaderId?po_header_id=${poHeaderId}`);
        setPoName(poHeaderId)
        console.log(ProductResponse.data);
        setPoProduct(ProductResponse?.data || []);
        setPoProductLoading(false)

      }
      catch (err) {
        console.log(err);
        setPoProductLoading(false)
        // show swal error exact from api

        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: err?.response?.data?.message || 'Something went wrong!',
        })


      }

    };


    fetchData(); // Calling the function within useEffect, not inside itself
  }, []); // Empty array dependency ensures this useEffect runs once on component mount


//   const [ManufacturingFetched, setManufacturingFetched] = useState(false)
//   const hanldeManufacturingData = async () => {
//     setIsLoading(true)
//     try {
//       // /member/gln/list
//       const response = await newRequest.post("/getProductionData", {
//         // id: currentUser?.user?.id
//         id: credentials?.id,
//       });
//       console.log(response.data);
//       setManufacturing(response?.data || []);
//       setIsLoading(false)
//       setManufacturingFetched(true)
//     }
//     catch (err) {
//       setIsLoading(false)
//       Swal.fire({
//         icon: 'error',
//         title: 'Oops...',
//         text: err?.response?.data?.message || 'Something went wrong!',
//       })


//       console.log(err);
//       setIsLoading(false)
//     }
//   };
  const hanldeManufacturingDataTabClick = () => {
    if (!ManufacturingFetched) {
      hanldeManufacturingData();
    }
    setActiveTab('Manufacturing');
  };


//   const [salesOrderFetched, setsalesOrderFetched] = useState(false);
//   const handleSalesOrder = async () => {
//     setIsLoading(true);
//     try {
//       // /member/gln/list
//       const response = await newRequest.post("/getSalesOrders", {
//         // id: currentUser?.user?.id
//         id: credentials?.id,
//       });
//       console.log(response.data);
//       setsalesInvoice(response?.data || []);
//       setIsLoading(false)
//       setsalesOrderFetched(true);
//     }
//     catch (err) {
//       setIsLoading(false)
//       Swal.fire({
//         icon: 'error',
//         title: 'Oops...',
//         text: err?.response?.data?.message || 'Something went wrong!',
//       })


//       console.log(err);
//       setIsLoading(false)
//     }
//   };
//   const handleSalesOrderTabClick = () => {
//     if (!salesOrderFetched) {
//       handleSalesOrder();
//     }
//     setActiveTab('Sales-Order');
//   };


  const handleRowClickInParent = async (row) => {
    console.log(row)
    try {
      // if  click on same row again then dont call api again
      if (row[0]?.po_header_id === poName) {
        return
      }
      setPoProductLoading(true)
      const ProductResponse = await newRequest.get(`/getPODetailsByPoHeaderId?po_header_id=${row[0]?.po_header_id}`);
      setPoName(row[0]?.po_header_id)
      console.log(ProductResponse.data);
      setPoProduct(ProductResponse?.data || []);
      setIsLoading(false)


    }
    catch (err) {
      console.log(err);
      setIsLoading(false)
      setPoProduct([])


    }
    finally {
      setPoProductLoading(false)
    }
  }

  // const handleAutoCompleteChange = (event, value) => {
  //   console.log(value)
  //   setAssetClassSelected(value || "");
  // }

  // useEffect(() => {
  //   if (assetClassSelected) {
  //     const filteredData = FixedAssetsData.filter(item => item?.account_type === assetClassSelected)
  //     setFilteredFixedAssetsData(filteredData)
  //   }
  //   else {
  //     setFilteredFixedAssetsData(FixedAssetsData)
  //   }
  // }, [assetClassSelected])



  // purchaseOrderColumns
  const ActiveTabs = Object.freeze({
    PURCHASE_ORDER: 'Purchase-Order',
    MANUFACTURING: 'Manufacturing',
    // SALES_ORDER: 'Sales-Order',
    // SALES_INVOICE: 'Sales-Invoice',
    // INVENTORY_STOCK_MASTER: 'Inventory-Stock-Master',
    // VENDORS_SUPPLIERS_DATA: 'Vendors-Suppliers-Data',
    // FIXED_ASSETS_DATA: 'Fixed-Assets-Data'
  });

  const processRowUpdate = (newRow, oldRow) => {
    console.log(newRow, oldRow);
    switch (activeTab) {
      case ActiveTabs.PURCHASE_ORDER:
        return UpdateOdooErpRowData(newRow, oldRow, openSnackbar, "/updatePurchaseOrderData", credentials?.id);

      case ActiveTabs.MANUFACTURING:
        return UpdateOdooErpRowData(newRow, oldRow, openSnackbar, "/updateProductionData", credentials?.id);

    //   case ActiveTabs.SALES_ORDER:
    //     return UpdateOdooErpRowData(newRow, oldRow, openSnackbar, "/updateSalesOrderData", credentials?.id);

    //   case ActiveTabs.SALES_INVOICE:
    //     return UpdateOdooErpRowData(newRow, oldRow, openSnackbar, "/updateSalesInvoicesData", credentials?.id);

    //   case ActiveTabs.INVENTORY_STOCK_MASTER:
    //     return UpdateOdooErpRowData(newRow, oldRow, openSnackbar, "/updateInventoryData", credentials?.id);

    //   case ActiveTabs.VENDORS_SUPPLIERS_DATA:
    //     return UpdateOdooErpRowData(newRow, oldRow, openSnackbar, "/updateVendorsSuppliersData", credentials?.id);

    //   case ActiveTabs.FIXED_ASSETS_DATA:
    //     return UpdateOdooErpRowData(newRow, oldRow, openSnackbar, "/updateFixedAssetsData", credentials?.id);

      default:
        console.log("default");
        return;
    }


  };



  // popup code
//   const [showPopup, setShowPopup] = useState(false);
//   const [vendorsList, setVendorsList] = useState([]);
//   const [selectedVendorId, setSelectedVendorId] = useState('');

//   const handleAddUserPopup = async () => {
//     setShowPopup(true);
//     try {
//       const res = await newRequest.get("/getVendorsByMemberId?memberId=" + currentUser?.user?.id);
//       // filter it for status ""approve""
//       console.log(res.data);
//       const vendorsData = res?.data?.filter(item => item?.status === "approve")
//       setVendorsList(vendorsData);
//     } catch (error) {
//       console.log(error);
//       setError(error?.response?.data?.message || 'Something went wrong');
//     }
//   };

//   const handleSendPOClick = () => {
//     setShowPopup(true);
//   };

//   const handleAddUserClose = () => {
//     setShowPopup(false);
//   };

  
//   const handleGeneratePdf = () => {
    
//   }
   

//   const handlePOFormSubmit = async (e) => {
//     e.preventDefault();

//     const vendor = vendorsList.find(v => v.id === parseInt(selectedVendorId));

//     const childQuantities = poProduct?.map(line => ({
//       epcClass: line.name,
//       quantity: line.quantity
//     }));


//     const mappedData = {
//       EventType: "TransactionEvent",
//       EventAction: "OBSERVE",
//       EventTime: new Date().toISOString(),
//       EventTimeZoneOffSet: "2023-10-14T00:00:00Z",
//       epcList: `${vendor.company_name_English}-${vendor.email}`,
//       bizStep: "ordering",
//       disposition: "in_transit",
//       bizTransactionList: JSON.stringify([{ type: "po", bizTransaction: vendor.company_name_English }]),
//       readPoint: `{"id":"${vendor.website}"}`,
//       sourceList: `{"type":"location","source":"${currentUser?.user?.company_name_English}"}`,
//       destinationList: `{"type":"location","destination":"${vendor.company_name_English}"}`,
//       sensorElementList: "",
//       childQuantityList: JSON.stringify(childQuantities),
//       childEPCs: "",
//       parentID: "",
//       inputEPCList: "",
//       inputQuantityList: "",
//       outputEPCList: "",
//       ilmd: "",
//       eventID: `${vendor.id}`,
//       errorDeclaration: "",
//       quantityList: "1", // Assuming 1 order per purchase, adjust if necessary
//       persistentDisposition: "ordering",
//       creationDate: new Date().toISOString(),
//       sender: currentUser?.user?.company_name_English,
//       receiver: vendor.company_name_English,
//       instanceIdentifer: `${vendor.id}`
//     };

//     console.log(mappedData);

//     try {
//       // First, insert the PO header
//       const poHeaderResponse = await newRequest.post("/insertPOHeader", {
//         member_id: currentUser?.user?.id,
//         create_date: new Date(),
//         supplier_id: vendor.id,
//       });
//       console.log(poHeaderResponse);

//       if (!poHeaderResponse.data?.insertId) {
//         Swal.fire({
//           title: 'Error!',
//           text: 'Failed to insert PO Header',
//           icon: 'error',
//           confirmButtonText: 'Close'
//         });
//       }

//       // Use the returned insertId in insertMultiplePODetails API
//       console.log(poProduct);
//       const poDetailsResponse = await newRequest.post("/insertMultiplePODetails", poProduct.map(line => ({
//         po_header_id: poHeaderResponse.data.insertId,
//         product_name: line.name,
//         quantity: line.quantity,
//         price: line.price,
//         price_subtotal: line.price_subtotal,
//         price_total: line.price_total,
//         date_order: line.date_order,
//         state: line.state,
//         partner_name: line.partner
//       })));

//       console.log(poDetailsResponse);

//       if (!poDetailsResponse.data?.insertIds || poDetailsResponse.data.insertIds.length !== poProduct.length) {
//         Swal.fire({
//           title: 'Error!',
//           text: 'Failed to insert PO Details',
//           icon: 'error',
//           confirmButtonText: 'Close'
//         });
//       }



//       // Finally, insert the EPCIS event
//       const epcisResponse = await newRequest.post("/insertEPCISEvent", mappedData);
//       console.log(epcisResponse);
//       Swal.fire({
//         title: 'Success!',
//         text: 'All data inserted successfully.',
//         icon: 'success',
//         confirmButtonText: 'OK'
//       });
//       setShowPopup(false);
//     } catch (err) {
//       console.log(err);
//       Swal.fire({
//         title: 'Error!',
//         text: err?.response?.data?.message || 'Something went wrong',
//         icon: 'error',
//         confirmButtonText: 'Close'
//       });
//     };
//   };




  return (
    <div>
      <div className="p-3 h-full sm:ml-72">
        <ul className="text-sm font-medium text-center rounded-lg shadow sm:flex dark:text-gray-400 custom-tabs">
          <li className="w-full">
            <button
              className={`inline-block w-full h-full p-4 ${activeTab === 'Purchase-Order'
                ? 'bg-primary text-white'
                : 'bg-white text-primary'
                } rounded-l-lg truncate`}
              onClick={() => setActiveTab('Purchase-Order')}
              aria-current={activeTab === 'Purchase-Order' ? 'page' : undefined}
            >
              Purchase Order
            </button>
          </li>
          <li className="w-full">
            <button
              className={`inline-block w-full h-full p-4 ${activeTab === 'Manufacturing'
                ? 'bg-primary text-white'
                : 'bg-white text-primary'
                } rounded-l-lg truncate`}
              // onClick={() => setActiveTab('Sales-Order')}
              onClick={hanldeManufacturingDataTabClick}
              aria-current={activeTab === 'Manufacturing' ? 'page' : undefined}
            >
              Manufacturing
            </button>
          </li>
        </ul>



        <div>
          <div style={{ marginLeft: '-11px', marginRight: '-11px', }}>
            {activeTab === 'Purchase-Order' && (


              <div style={{ display: 'flex', flexWrap: 'wrap' }}>

                <div className='w-full md:w-[50%]'>
                  <DataTable
                    data={purshase}
                    title={'Purchase Order'}
                    columnsName={purchaseOrderColumns}
                    processRowUpdate={processRowUpdate}
                    // loading={isLoading}
                    secondaryColor="secondary"
                    checkboxSelection="disabled"
                    uniqueId={"purchaseOrderId"}
                    handleRowClickInParent={handleRowClickInParent}
                    actionColumnVisibility={false}
                    dropDownOptions={[
                      {
                        label: "Send PO",
                        icon: <SendIcon fontSize="small" color="action" style={{ color: "rgb(37 99 235)" }} />
                        ,
                        // action: handleAddUserPopup, // Open the popup when this button is clicked

                      },

                    ]}

                  />
                </div>

                <div className='w-full md:w-[50%]'>
                  <DataTable data={poProduct}
                    title={'Purchase Order Products'}
                    columnsName={orderLineColumns}
                    loading={poProductLoading}
                    processRowUpdate={processRowUpdate}
                    checkboxSelection="disabled"
                    secondaryColor="secondary"
                    actionColumnVisibility={false}
                    uniqueId={"purchaseOrderProductId"}


                  />
                </div>

              </div>
            )}

            {activeTab === 'Sales-Order' && (
              <DataTable
                data={salesInvoice}
                title={'Sales Order'}
                columnsName={salesInvoiceColumn}
                processRowUpdate={processRowUpdate}
                loading={isLoading}
                secondaryColor="secondary"
                actionColumnVisibility={false}

              />
            )}

            {activeTab === 'Manufacturing' && (
              <DataTable
                data={manufacturing}
                title={'Manufacturing'}
                columnsName={productionColumns}
                processRowUpdate={processRowUpdate}
                loading={isLoading}
                secondaryColor="secondary"
                actionColumnVisibility={false}

              />
            )}

          </div>
        </div>


        {/* popup screen */}
        {/* {showPopup && (
          <div className="popup-container fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
            <div className="popup bg-white rounded-lg shadow-xl overflow-hidden max-w-md m-4">
              <div className="header bg-primary text-white font-bold py-4 px-6">
                <h2 style={{ color: "white" }}>SEND PO</h2>
              </div>
              <form onSubmit={handlePOFormSubmit} className="p-6">
                <label htmlFor="UserName" className="block mb-2 text-gray-700 text-sm">Name:</label>
                <select
                  id="UserName"
                  value={selectedVendorId}
                  onChange={(e) => setSelectedVendorId(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                >
                  <option value="">--Select Vendor--</option>
                  {vendorsList?.map((user) => (
                    <option key={user?.id} value={user?.id}>
                      {user?.company_name_English} - {user?.email}
                    </option>
                  ))}
                </select>

                <div className="flex justify-end gap-3 mt-6">
                  <button className="close-btn text-white bg-secondary hover:bg-red-600 rounded-lg px-6 py-2" type="button" onClick={handleAddUserClose}>CANCEL</button>
                  <button className="text-white bg-primary hover:bg-blue-600 rounded-lg px-6 py-2" type="submit">SEND</button>
                </div>
              </form>
            </div>
          </div>
        )} */}

      </div>
    </div >
  )
}

export default CpanelErpData