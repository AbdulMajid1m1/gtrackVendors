import React, { useContext, useEffect, useState } from 'react'
import { InventorySuppliersDataColumn, fixedAssetsDataColumns, inventoryColumn, orderLineColumns, productionColumns, purchaseOrderColumns, salesInvoiceColumn, salesOrderColumn } from '../../utils/datatablesource'
import DataTable from '../../components/Datatable/Datatable'
import newRequest from '../../utils/userRequest';
// import { CurrentUserContext } from '../../Contexts/';
import Swal from 'sweetalert2';
import "./CpanelErpData.css"
import { Autocomplete, TextField } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import gtrackicons from "../../Images/gtrackicons.png"
import { UpdateOdooErpRowData, UpdateRowData } from '../../utils/Funtions/rowUpdate';
import { SnackbarContext } from '../../Contexts/SnackbarContext';
import jsPDF from 'jspdf';
import "jspdf-autotable"
import { DataTableContext } from '../../Contexts/DataTableContext';
const CpanelErpData = () => {
  // Load the last active tab from localStorage
  // const storedActiveTab = localStorage.getItem('activeTab');
  // const [activeTab, setActiveTab] = useState(storedActiveTab || 'Purchase-Order');
  const [activeTab, setActiveTab] = useState('Purchase-Order');
  // const { currentUser } = useContext(CurrentUserContext);
  // console.log(currentUser)

  const [isLoading, setIsLoading] = useState(true);
  const [poProductLoading, setPoProductLoading] = useState(true);


  // useEffect(() => {
  //   localStorage.setItem('activeTab', activeTab);
  // }, [activeTab]);
  const { openSnackbar } = useContext(SnackbarContext);
  const [purshase, setPurshase] = useState([


  ])
  const [manufacturing, setManufacturing] = useState([])
  const [salesOrder, setsalesOrder] = useState([])
  const [salesInvoice, setsalesInvoice] = useState([])
  const [inventory, setInventory] = useState([])
  const [InventorySuppliersData, setInventorySuppliersData] = useState([])
  const [FixedAssetsData, setFixedAssetsData] = useState([])
  const [filteredFixedAssetsData, setFilteredFixedAssetsData] = useState([])
  const [assetClassSelected, setAssetClassSelected] = useState('')
  const [poProduct, setPoProduct] = useState([])
  const credentials = JSON.parse(localStorage.getItem("credentials"))
  console.log(credentials)
  const [poName, setPoName] = useState('')
  // const autocompleteRef = useRef(); // Ref to access the Autocomplete component
  // const [autocompleteKey, setAutocompleteKey] = useState(0);
  // const resetAutocomplete = () => {
  //   autocompleteRef.current.value = ""; // Reset the value of the Autocomplete
  //   setAssetClassSelected(''); // Reset the value of the Autocomplete
  //   setAutocompleteKey(key => key + 1); // Update the key to reset the Autocomplete
  // };

  const { rowSelectionModel, setRowSelectionModel,
    tableSelectedRows, setTableSelectedRows } = useContext(DataTableContext);



  useEffect(() => {
    const fetchData = async () => {
      try {

        // /member/gln/list
        const response = await newRequest.post("/getPurchaseOrders", {
          // id: currentUser?.user?.id
          id: credentials?.id,
        });
        console.log(response.data);
        setIsLoading(false)
        setPurshase(response?.data || []);
        const ProductResponse = await newRequest.post("/getPurchaseOrderProducts", {
          // id: currentUser?.user?.id
          "id": credentials?.id,
          "purchaseOrderId": response?.data[0]?.id
        });
        setPoName(response?.data[0]?.name)
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


  const [ManufacturingFetched, setManufacturingFetched] = useState(false)
  const hanldeManufacturingData = async () => {
    setIsLoading(true)
    try {
      // /member/gln/list
      const response = await newRequest.post("/getProductionData", {
        // id: currentUser?.user?.id
        id: credentials?.id,
      });
      console.log(response.data);
      setManufacturing(response?.data || []);
      setIsLoading(false)
      setManufacturingFetched(true)
    }
    catch (err) {
      setIsLoading(false)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err?.response?.data?.message || 'Something went wrong!',
      })


      console.log(err);
      setIsLoading(false)
    }
  };
  const hanldeManufacturingDataTabClick = () => {
    if (!ManufacturingFetched) {
      hanldeManufacturingData();
    }
    setActiveTab('Manufacturing');
  };


  const [salesOrderFetched, setsalesOrderFetched] = useState(false);
  const handleSalesOrder = async () => {
    setIsLoading(true);
    try {
      // /member/gln/list
      const response = await newRequest.post("/getSalesOrders", {
        // id: currentUser?.user?.id
        id: credentials?.id,
      });
      console.log(response.data);
      setsalesInvoice(response?.data || []);
      setIsLoading(false)
      setsalesOrderFetched(true);
    }
    catch (err) {
      setIsLoading(false)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err?.response?.data?.message || 'Something went wrong!',
      })


      console.log(err);
      setIsLoading(false)
    }
  };
  const handleSalesOrderTabClick = () => {
    if (!salesOrderFetched) {
      handleSalesOrder();
    }
    setActiveTab('Sales-Order');
  };


  const [salesInvoiceFetched, setSalesInvoiceFetched] = useState(false); // State to track if API has been called
  const handlesalesInvoice = async () => {
    setIsLoading(true)
    const requestBody = {
      id: credentials?.id,
      columns: ["name", "date", "state", "campaign_id"]
    };
    try {
      // /member/gln/list
      const response = await newRequest.post("/getSalesInvoices", requestBody);
      console.log(response.data);
      setsalesOrder(response?.data || []);
      setIsLoading(false)
      setSalesInvoiceFetched(true); // Set the flag to true after the API call

    }
    catch (err) {
      console.log(err);
      setIsLoading(false)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err?.response?.data?.message || 'Something went wrong!',
      })


    }
  };
  const handleSalesInvoiceTabClick = () => {
    if (!salesInvoiceFetched) {
      handlesalesInvoice();
    }
    setActiveTab('Sales-Invoice');
  };


  const [inventoryFetched, setInventoryFetched] = useState(false)
  const handleInventory = async () => {
    setIsLoading(true)
    try {
      // /member/gln/list
      const response = await newRequest.post("/getInventory", {
        // id: currentUser?.user?.id
        id: credentials?.id,
      });
      console.log(response.data);
      setInventory(response?.data || []);
      setIsLoading(false)
      setInventoryFetched(true)
    }
    catch (err) {
      setIsLoading(false)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err?.response?.data?.message || 'Something went wrong!',
      })


      console.log(err);
      setIsLoading(false)
    }
  };
  const handleInventoryTabClick = () => {
    if (!inventoryFetched) {
      handleInventory();
    }
    setActiveTab('Inventory-Stock-Master');
  };


  const [InventorySuppliersDataFetched, setInventorySuppliersDataFetched] = useState(false);
  const handleInventorySuppliersData = async () => {
    setIsLoading(true);
    try {
      // /member/gln/list
      const response = await newRequest.post("/getVendorsSuppliersData", {
        // id: currentUser?.user?.id
        id: credentials?.id,
      });
      console.log(response.data);
      setInventorySuppliersData(response?.data || []);
      setIsLoading(false)
      setInventorySuppliersDataFetched(true);
    }
    catch (err) {
      setIsLoading(false)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err?.response?.data?.message || 'Something went wrong!',
      })


      console.log(err);
      setIsLoading(false)
    }
  };
  const handleInventorySuppliersDataTabClick = () => {
    if (!InventorySuppliersDataFetched) {
      handleInventorySuppliersData();
    }
    setActiveTab('Vendors-Suppliers-Data');
  };


  const [fixedSupploerDataFetched, setFixedSupploerDataFetched] = useState(false);
  const handleFixedSupploerData = async () => {
    setIsLoading(true);
    try {
      // /member/gln/list
      const response = await newRequest.post("/getFixedAssetsData", {
        id: credentials?.id,
      });
      console.log(response.data);

      setFixedAssetsData(response?.data || []);
      // setFilteredFixedAssetsData(response?.data || []);
      setFixedSupploerDataFetched(true);
      // setAssetClassSelected(response?.data[0]?.account_type)

    }
    catch (err) {

      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err?.response?.data?.message || 'Something went wrong!',
      })


      console.log(err);

    }
    finally {
      setIsLoading(false)
    }

  };
  const handleFixedSupploerDataTabClick = () => {
    if (!fixedSupploerDataFetched) {
      handleFixedSupploerData();
    }
    setActiveTab('Fixed-Assets-Data');
  };




  const handleRowClickInParent = async (row) => {
    console.log(row)
    setPoName(row[0]?.name)
    try {
      // if  click on same row again then dont call api again
      if (row[0]?.name === poName) {
        return
      }
      setPoProductLoading(true)
      const ProductResponse = await newRequest.post("/getPurchaseOrderProducts", {
        "id": credentials?.id,
        "purchaseOrderId": row[0]?.id
      });

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
    SALES_ORDER: 'Sales-Order',
    SALES_INVOICE: 'Sales-Invoice',
    INVENTORY_STOCK_MASTER: 'Inventory-Stock-Master',
    VENDORS_SUPPLIERS_DATA: 'Vendors-Suppliers-Data',
    FIXED_ASSETS_DATA: 'Fixed-Assets-Data'
  });

  const processRowUpdate = (newRow, oldRow) => {
    console.log(newRow, oldRow);
    switch (activeTab) {
      case ActiveTabs.PURCHASE_ORDER:
        return UpdateOdooErpRowData(newRow, oldRow, openSnackbar, "/updatePurchaseOrderData", credentials?.id);

      case ActiveTabs.MANUFACTURING:
        return UpdateOdooErpRowData(newRow, oldRow, openSnackbar, "/updateProductionData", credentials?.id);

      case ActiveTabs.SALES_ORDER:
        return UpdateOdooErpRowData(newRow, oldRow, openSnackbar, "/updateSalesOrderData", credentials?.id);

      case ActiveTabs.SALES_INVOICE:
        return UpdateOdooErpRowData(newRow, oldRow, openSnackbar, "/updateSalesInvoicesData", credentials?.id);

      case ActiveTabs.INVENTORY_STOCK_MASTER:
        return UpdateOdooErpRowData(newRow, oldRow, openSnackbar, "/updateInventoryData", credentials?.id);

      case ActiveTabs.VENDORS_SUPPLIERS_DATA:
        return UpdateOdooErpRowData(newRow, oldRow, openSnackbar, "/updateVendorsSuppliersData", credentials?.id);

      case ActiveTabs.FIXED_ASSETS_DATA:
        return UpdateOdooErpRowData(newRow, oldRow, openSnackbar, "/updateFixedAssetsData", credentials?.id);

      default:
        console.log("default");
        return;
    }


  };



  // popup code
  const [showPopup, setShowPopup] = useState(false);
  const [vendorsList, setVendorsList] = useState([]);
  const [selectedVendorId, setSelectedVendorId] = useState('');

  const handleAddUserPopup = async () => {
    setShowPopup(true);
    try {
      const res = await newRequest.get("/getVendorsByMemberId?memberId=" + currentUser?.user?.id);
      // filter it for status ""approve""
      console.log(res.data);
      const vendorsData = res?.data?.filter(item => item?.status === "approve")
      setVendorsList(vendorsData);
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error?.response?.data?.message || 'Something went wrong!',

        confirmButtonText: 'Close'
      })

    }
  };

  // const handleSendPOClick = () => {
  //   setShowPopup(true);
  // };

  const handleAddUserClose = () => {
    setShowPopup(false);
  };

  const [selectedRowData, setSelectedRowData] = useState(null);

  // Add a useEffect to watch for changes in selectedRowData
  useEffect(() => {
    if (selectedRowData) {
      handlePdfExport();
    }
  }, [selectedRowData]);

  // The handleGeneratePdf function should only set the selectedRowData
  const handleGeneratePdf = (row) => {
    setSelectedRowData(row);
  }
  
  // const handleGeneratePdf = (row) => {
  //   // console.log(row)
  //   handlePdfExport()
  //   setSelectedRowData(row);
  // }

  
  const handlePdfExport = (returnBlob = false) => {
    const doc = new jsPDF("landscape");
  
    // Calculate the font size based on the number of columns
    const maxColumns = 10;
    const minFontSize = 4;
    const maxFontSize = 10;
    const fontSize = orderLineColumns.length <= maxColumns
      ? maxFontSize
      : Math.max(minFontSize, maxFontSize - (orderLineColumns.length - maxColumns));
  
    // 1. Add the logo on the left
    const logoImage = new Image();
    logoImage.src = gtrackicons; // Replace with the actual path to your logo image
    
    // Specify the dimensions and position of the logo
    const logoWidth = 45; // Adjust the desired width
    const logoHeight = 30; // Adjust the desired height
    const logoX = 10; // Adjust the X position
    const logoY = 10; // Adjust the Y position

    doc.addImage(logoImage, "PNG", logoX, logoY, logoWidth, logoHeight);
    
    
    // 2. Add the title in the center
    doc.setFontSize(20); // Set the font size for the title
    const titleText = "Supplier Invoice"; // Adjust the title text
    const titleWidth = doc.getStringUnitWidth(titleText) * doc.internal.getFontSize();
    const titleX = (doc.internal.pageSize.width - titleWidth) / 1.3;
    doc.text(titleText, titleX, 30); // Adjust the Y position as needed
  
    // 3. Add the table for the form data
    const formData = [];
    if (selectedRowData) {
      // const { name, partner_id, date_order } = selectedRowData;
      const {
        name,
        partner_id,
        date_order,
        picking_type_id,
        product_id,
        state,
        tax_country_id,
        display_name,
        date_approve,
        date_calendar_start,
        date_planned,
        default_location_dest_id_usage,
      } = selectedRowData;
    
       // Define the data you want to add
      const additionalData = [
        ["Picking Type ID:", picking_type_id[0], "Picking Type:", picking_type_id[1]],
        ["Product ID:", product_id[0], "Product:", product_id[1]],
        ["Tax Country ID:", tax_country_id[0], "Tax Country:", tax_country_id[1]],
        ["Display Name:", display_name, "Date Approve:", date_approve],
        ["Date Calendar Start:", date_calendar_start, "Date Planned:", date_planned],
        ["State:", state, "Default Location Destination Usage:", default_location_dest_id_usage],
      ];

      // Add the additional data to formData
      formData.push(
        ...additionalData,
        ["Name:", name, "Partner:", partner_id[1]],
        ["Date:", date_order, "Partner:", partner_id[1]]
      );
      // formData.push(["Partner:", partner_id[1]);
    }
  
    doc.autoTable({
      body: formData,
      startY: 50, // Adjust the startY position to leave space for the logo and title
      tableWidth: "auto",
      styles: {
        fontSize: fontSize,
        cellWidth: "auto",
      },
      headStyles: {
        fillColor: [41, 128, 185],
        textColor: 255,
        fontStyle: "bold",
      },
    });
  
    // 4. Add the table for poProduct
  const tableData = poProduct?.map((item) => {
    const row = {};
    orderLineColumns?.forEach((column) => {
      row[column.field] = item[column.field];
    });
    return Object.values(row);
  });

  const headers = orderLineColumns.map((column) => column.headerName);

  // Add empty rows
  const emptyRows = 2; // Adjust the number of empty rows as needed
  for (let i = 0; i < emptyRows; i++) {
    const emptyRow = new Array(orderLineColumns.length).fill(""); // Create an empty row
    tableData.push(emptyRow);
  }

  // Recalculate startY for the total
  const startYTotal = doc.autoTable.previous.finalY + 10;

  // Calculate the total of the "Total Price" column
  let totalPriceSum = 0;
  tableData.forEach((row) => {
    const totalPrice = parseFloat(row[headers.indexOf("Total Price")]);
    if (!isNaN(totalPrice)) {
      totalPriceSum += totalPrice;
    }
  });

  // Add the total to the last row of the table
  tableData.push(["Total", "", "", "", totalPriceSum.toFixed(2)]);

  doc.autoTable({
    head: [headers],
    body: tableData,
    theme: "grid",
    styles: { fontSize: fontSize },
    headStyles: { fillColor: [30, 59, 139], textColor: 255, fontStyle: "bold" },
    // startY: doc.autoTable.previous.finalY + 10, // Start after the form data table
    startY: startYTotal, // Start after the empty rows
    tableWidth: "auto",
  });

  if (returnBlob) {
    const blob = doc.output("blob");
    return blob;
  } else {
    doc.save(`Request for Quotation ${poName}.pdf`);
  }
};
  

  // const handlePdfExport = (returnBlob = false) => {
  //   const doc = new jsPDF("landscape");

  //   // Calculate the font size based on the number of columns
  //   const maxColumns = 10; // Maximum number of columns before font size starts to decrease
  //   const minFontSize = 4; // Minimum font size
  //   const maxFontSize = 8; // Maximum font size
  //   const fontSize = orderLineColumns.length <= maxColumns ? maxFontSize : Math.max(minFontSize, maxFontSize - (orderLineColumns.length - maxColumns));

  //   const tableData = poProduct?.map((item) => {
  //     const row = {};
  //     orderLineColumns?.forEach((column) => {
  //       row[column.field] = item[column.field];
  //     });
  //     return Object.values(row);
  //   });

  //   const headers = orderLineColumns.map((column) => column.headerName);

  //   // Use autoTable to generate the table in the PDF
  //   doc.autoTable({
  //     head: [headers],
  //     body: tableData,
  //     theme: "grid",
  //     styles: { fontSize: fontSize },
  //     headStyles: { fillColor: [41, 128, 185], textColor: 255, fontStyle: "bold" },
  //     startY: 20,
  //     tableWidth: "auto", // Automatically adjust table width based on content
  //   });

  //   if (returnBlob) {
  //     const blob = doc.output("blob");
  //     return blob;
  //   } else {
  //     doc.save(`Request for Quatation ${poName}.pdf`);
  //   }
  // };

  const sendQuestionToVendor = async (vendorEmail, memberEmail) => {
    const pdfFile = handlePdfExport(true);
    let date = new Date().toISOString().slice(0, 10);

    const formData = new FormData();
    formData.append('to', vendorEmail);
    formData.append('from', memberEmail);
    formData.append('subject', 'Gtract Purcahse Order - ' + date); // combining given subject with date
    formData.append('poNumber', poName);
    formData.append('message', 'You Received Request for the following products.');
    formData.append('attachments', pdfFile, `${poName}.pdf`);

    try {
      const response = await newRequest.post('/sendQuestionToVendor', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response.data);
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Email sent successfully!',
        confirmButtonText: 'Close',
        timer: 3000,
        // timer progress bar color
        timerProgressBar: true,
        timerProgressBarColor: '#28a745',
      });
    } catch (error) {
      console.log(error);
      // Handle the error, show error message or additional actions here
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Failed to send email!',
        confirmButtonText: 'Close',
        timer: 3000,
        // timer progress bar color
        timerProgressBar: true,
        timerProgressBarColor: '#dc3545',

      })
    }
  };


  const handlePOFormSubmit = async (e) => {
    e.preventDefault();

    const vendor = vendorsList.find(v => v.id === parseInt(selectedVendorId));
    console.log(vendor)
    const childQuantities = poProduct?.map(line => ({
      epcClass: line.name,
      quantity: line.quantity
    }));


    const mappedData = {
      EventType: "TransactionEvent",
      EventAction: "OBSERVE",
      EventTime: new Date().toISOString(),
      EventTimeZoneOffSet: "2023-10-14T00:00:00Z",
      epcList: `${vendor.company_name_English}-${vendor.email}`,
      bizStep: "ordering",
      disposition: "in_transit",
      bizTransactionList: JSON.stringify([{ type: "po", bizTransaction: vendor.company_name_English }]),
      readPoint: `{"id":"${vendor.website}"}`,
      sourceList: `{"type":"location","source":"${currentUser?.user?.company_name_English}"}`,
      destinationList: `{"type":"location","destination":"${vendor.company_name_English}"}`,
      sensorElementList: "",
      childQuantityList: JSON.stringify(childQuantities),
      childEPCs: "",
      parentID: "",
      inputEPCList: "",
      inputQuantityList: "",
      outputEPCList: "",
      ilmd: "",
      eventID: `${vendor.id}`,
      errorDeclaration: "",
      quantityList: "1", // Assuming 1 order per purchase, adjust if necessary
      persistentDisposition: "ordering",
      creationDate: new Date().toISOString(),
      sender: currentUser?.user?.company_name_English,
      receiver: vendor.company_name_English,
      instanceIdentifer: `${vendor.id}`
    };

    console.log(mappedData);
    console.log(vendor);
    try {
      // First, insert the PO header
      const poHeaderResponse = await newRequest.post("/insertPOHeader", {
        member_id: currentUser?.user?.id,
        create_date: new Date(),
        supplier_id: vendor.id,
        purchase_order: poName,
      });
      console.log(poHeaderResponse);

      if (!poHeaderResponse.data?.insertId) {
        Swal.fire({
          title: 'Error!',
          text: 'Failed to insert PO Header',
          icon: 'error',
          confirmButtonText: 'Close'
        });
      }

      // Use the returned insertId in insertMultiplePODetails API
      console.log(poProduct);
      const poDetailsResponse = await newRequest.post("/insertMultiplePODetails", poProduct.map(line => ({
        po_header_id: poHeaderResponse.data.insertId,
        product_name: line.name,
        quantity: line.quantity,
        price: line.price,
        price_subtotal: line.price_subtotal,
        price_total: line.price_total,
        date_order: line.date_order,
        state: line.state,
        partner_name: line.partner
      })));

      console.log(poDetailsResponse);

      if (!poDetailsResponse.data?.insertIds || poDetailsResponse.data.insertIds.length !== poProduct.length) {
        Swal.fire({
          title: 'Error!',
          text: 'Failed to insert PO Details',
          icon: 'error',
          confirmButtonText: 'Close'
        });
      }



      // Finally, insert the EPCIS event
      const epcisResponse = await newRequest.post("/insertEPCISEvent", mappedData);
      console.log(epcisResponse);

      sendQuestionToVendor(vendor.email, currentUser?.user?.email, "Remarks");








      Swal.fire({
        title: 'Success!',
        text: 'All data inserted successfully.',
        icon: 'success',
        confirmButtonText: 'OK'
      });
      setShowPopup(false);
    } catch (err) {
      console.log(err);
      Swal.fire({
        title: 'Error!',
        text: err?.response?.data?.message || 'Something went wrong',
        icon: 'error',
        confirmButtonText: 'Close'
      });
    };
  };



   // manufacturing tab picklist code popup
   const [manufacturingshowPopup, setManufacturingShowPopup] = useState(false);
   const [manufacturingList, setManufacturingList] = useState([]);
   const [selectedManufacturingId, setSelectedManufacturingId] = useState({
     user_id: '',
     user_email: '',
   });
   console.log(selectedVendorId?.user_id);
 
   const handleManufacturingTabPopup = async () => {
     if (tableSelectedRows.length === 0) {
       Swal.fire({
         icon: 'error',
         title: 'Oops...',
         text: 'Please select atleast one row',
         timer: 2000,
         timerProgressBar: true,
 
       })
       return;
     }
 
     setManufacturingShowPopup(true);
     try {
       const res = await newRequest.get(`/getSupplierInternalUserByVendorId?vendor_id=${vendorData?.user?.id}`);
 
       console.log(res.data);
       setManufacturingList(res?.data || []);
 
     } catch (error) {
       console.log(error);
       setError(error?.response?.data?.message || 'Something went wrong');
     }
   };
 
 
 
   const handleSendPOClick = () => {
    setManufacturingShowPopup(true);
   };
 
   const handleManufacturingTabClose = () => {
    setManufacturingShowPopup(false);
   };
 
 
   const handleSalesPickingList = async (e) => {
     e.preventDefault();
     try {
       // Create an array with the body data for multiple rows
       const requestBody = tableSelectedRows.map((selectedRow) => ({
         po_detail_id: selectedRow.po_detail_id,
         po_header_id: selectedRow.po_header_id,
         assign_to_user_id: selectedVendorId?.user_id,
       }));
 
       const res = await newRequest.post(`/insertSalesPickingList`, requestBody);
       console.log(res.data);
       Swal.fire({
         icon: 'success',
         title: 'Success',
         text: res?.data?.message || 'Picklist send successfully',
         timer: 2000,
         timerProgressBar: true,
       });
 
       handleManufacturingTabClose();
     } catch (error) {
       console.log(error);
       setError(error?.response?.data?.message || 'Something went wrong');
     }
   }
 


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
          <li className="w-full">
            <button
              className={`inline-block w-full h-full p-4 ${activeTab === 'Sales-Order'
                ? 'bg-primary text-white'
                : 'bg-white text-primary'
                } rounded-l-lg truncate`}
              // onClick={() => setActiveTab('Sales-Order')}
              onClick={handleSalesOrderTabClick}
              aria-current={activeTab === 'Sales-Order' ? 'page' : undefined}
            >
              Sales Order
            </button>
          </li>
          <li className="w-full">
            <button
              className={`inline-block w-full h-full p-4 ${activeTab === 'Sales-Invoice'
                ? 'bg-primary text-white'
                : 'bg-white text-primary'
                } rounded-l-lg truncate`}
              // onClick={() => setActiveTab('Sales-Invoice')}
              onClick={handleSalesInvoiceTabClick}
              aria-current={activeTab === 'Sales-Invoice' ? 'page' : undefined}
            >
              Sales Invoice
            </button>
          </li>
          <li className="w-full">
            <button
              className={`inline-block w-full h-full p-4 ${activeTab === 'Inventory-Stock-Master'
                ? 'bg-primary text-white'
                : 'bg-white text-primary'
                } rounded-l-lg truncate`}
              // onClick={() => setActiveTab('Inventory-Stock-Master')}
              onClick={handleInventoryTabClick}
              aria-current={activeTab === 'Inventory-Stock-Master' ? 'page' : undefined}
            >
              Inventory (Stock Master)
            </button>
          </li>
          <li className="w-full">
            <button
              className={`inline-block w-full h-full p-4 ${activeTab === 'Vendors-Suppliers-Data'
                ? 'bg-primary text-white'
                : 'bg-white text-primary'
                } rounded-l-lg truncate`}
              // onClick={() => setActiveTab('Vendors-Suppliers-Data')}
              onClick={handleInventorySuppliersDataTabClick}
              aria-current={activeTab === 'Vendors-Suppliers-Data' ? 'page' : undefined}
            >
              Vendors/Suppliers Data
            </button>
          </li>
          <li className="w-full">
            <button
              className={`inline-block w-full h-full p-4 ${activeTab === 'Fixed-Assets-Data'
                ? 'bg-primary text-white'
                : 'bg-white text-primary'
                } rounded-r-lg truncate`}
              // onClick={() => setActiveTab('Fixed-Assets-Data')}
              onClick={handleFixedSupploerDataTabClick}
              aria-current={activeTab === 'Fixed-Assets-Data' ? 'page' : undefined}
            >
              Fixed Assets Data
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
                    backButton={false}
                    Permission={false}
                    NewUser={false}
                    secondaryColor="secondary"
                    checkboxSelection="disabled"
                    uniqueId={"purchaseOrderId"}
                    handleRowClickInParent={handleRowClickInParent}
                    dropDownOptions={[
                      {
                        label: "Send PO",
                        icon: <SendIcon fontSize="small" color="action" style={{ color: "rgb(37 99 235)" }} />
                        ,
                        action: handleAddUserPopup, // Open the popup when this button is clicked

                      },
                      {
                        label: "PO Pdf",
                        icon: <PictureAsPdfIcon fontSize="small" color="action" style={{ color: "rgb(37 99 235)" }} />
                        ,
                        action: handleGeneratePdf, // Open the popup when this button is clicked

                      }

                    ]}

                  />
                </div>

                <div className='w-full md:w-[50%]'>
                  <DataTable data={poProduct}
                    title={'Purchase Order Products for' + ' ' + poName}
                    columnsName={orderLineColumns}
                    loading={poProductLoading}
                    // processRowUpdate={processRowUpdate}
                    backButton={false}
                    Permission={false}
                    NewUser={false}
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
                backButton={false}
                Permission={false}
                NewUser={false}
                secondaryColor="secondary"
                actionColumnVisibility={false}

              />
            )}

            {activeTab === 'Manufacturing' && (
              <>
              <div className="flex justify-end gap-3 m-5">
                <button
                  className="text-white bg-primary hover:bg-blue-600 rounded-lg px-6 py-2"
                  onClick={handleManufacturingTabPopup}
                >
                  Assign PickList
                </button>
              </div>
              
              <div className='-mt-8'>
              <DataTable
                data={manufacturing}
                title={'Manufacturing'}
                columnsName={productionColumns}
                processRowUpdate={processRowUpdate}
                loading={isLoading}
                backButton={false}
                Permission={false}
                NewUser={false}
                secondaryColor="secondary"
                actionColumnVisibility={false}

              />
              </div>
              </>
            )}

            {activeTab === 'Sales-Invoice' && (
              <DataTable
                data={salesOrder}
                title={'Sales Invoice'}
                columnsName={salesOrderColumn}
                processRowUpdate={processRowUpdate}
                loading={isLoading}
                backButton={false}
                Permission={false}
                NewUser={false}
                secondaryColor="secondary"
                actionColumnVisibility={false}
              />
            )}

            {activeTab === 'Inventory-Stock-Master' && (
              <DataTable
                data={inventory}
                title={'Inventory (Stock Master)'}
                loading={isLoading}
                columnsName={inventoryColumn}
                processRowUpdate={processRowUpdate}
                backButton={false}
                Permission={false}
                NewUser={false}
                secondaryColor="secondary"
                actionColumnVisibility={false}
              />
            )}

            {activeTab === 'Vendors-Suppliers-Data' && (
              <DataTable
                data={InventorySuppliersData}
                title={'Vendors/Suppliers Data'}
                columnsName={InventorySuppliersDataColumn}
                processRowUpdate={processRowUpdate}
                loading={isLoading}
                backButton={false}
                Permission={false}
                NewUser={false}
                secondaryColor="secondary"
                actionColumnVisibility={false}
              />
            )}

            {activeTab === 'Fixed-Assets-Data' && (
              <>
                {/* <div className="p-3 h-full sm: mt-2 w-full md:w-[40%] justify-start">
                  <Autocomplete
                    ref={autocompleteRef}
                    key={autocompleteKey}
                    // give default value to autocomplete
                    value={assetClassSelected}
                    id="assetClass"
                    // options={location.filter(item => item.BinLocation)}
                    // getOptionLabel={(option) => option.BinLocation}
                    options={Array.from(new Set(FixedAssetsData.map(item => item?.account_type))).filter(Boolean)}
                    getOptionLabel={(option) => option}
                    onChange={handleAutoCompleteChange}


                    onInputChange={(event, value) => {
                      if (!value) {
                        // perform operation when input is cleared
                        console.log("Input cleared");

                      }
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        InputProps={{
                          ...params.InputProps,
                          className: "text-white",
                        }}
                        InputLabelProps={{
                          ...params.InputLabelProps,
                          style: { color: "white" },
                        }}

                        className="bg-gray-50 border border-gray-300 text-[#00006A] text-xs rounded-lg focus:ring-blue-500
                      p-1.5 md:p-2.5 placeholder:text-[#00006A]"
                        placeholder="Categories"
                        required
                      />
                    )}
                    classes={{
                      endAdornment: "text-white",
                    }}
                    sx={{
                      '& .MuiAutocomplete-endAdornment': {
                        color: 'white',
                      },
                    }}
                  />

                </div> */}
                <DataTable
                  data={FixedAssetsData}
                  title={'Fixed Assets Data'}
                  columnsName={fixedAssetsDataColumns}
                  processRowUpdate={processRowUpdate}
                  loading={isLoading}
                  backButton={false}
                  Permission={false}
                  NewUser={false}
                  secondaryColor="secondary"
                  actionColumnVisibility={false}
                />

              </>
            )}
          </div>
        </div>


        {/* popup screen */}
        {showPopup && (
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
        )}


        {/*Manufacturing tab popup screen */}
        {manufacturingshowPopup && (
          <div className="popup-container fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40">
            <div className="popup bg-white rounded-lg shadow-xl overflow-hidden max-w-md m-4">
              <div className="header bg-primary text-white font-semibold py-4 px-6">
                <h2 style={{ color: "white" }}>Assigned PickList To User</h2>
              </div>
              <form onSubmit={handleSalesPickingList} className="p-6">
                <label htmlFor="UserName" className="block mb-2 text-gray-700 text-sm">Name:</label>
                {/* <select
                  id="UserName"
                  value={selectedVendorId}
                  onChange={(e) => setSelectedVendorId(e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                >
                  <option value="">--Select Vendor--</option>
                  {vendorsList?.map((user) => (
                    <option key={user?.id} value={user?.id}>
                      {user?.user_id} - {user?.user_email}
                    </option>
                  ))}
                </select> */}
                <select
                  id="UserName"
                  value={selectedManufacturingId.user_id} // Use user_id as the value
                  onChange={(e) => setSelectedManufacturingId({
                    user_id: e.target.value,
                    user_email: e.target.options[e.target.selectedIndex].getAttribute('data-email')
                  })}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary"
                >
                  <option value="">--Select Vendor/Supplier--</option>
                  {manufacturingList?.map((user) => (
                    <option key={user?.id} value={user?.user_id} data-email={user?.user_email}>
                      {user?.vendor_id} - {user?.user_email}
                    </option>
                  ))}
                </select>


                <div className="flex justify-end gap-3 mt-6">
                  <button className="close-btn text-white bg-secondary hover:bg-red-600 rounded-lg px-6 py-2" type="button" onClick={handleManufacturingTabClose}>CANCEL</button>
                  <button className="text-white bg-primary hover:bg-blue-600 rounded-lg px-6 py-2" type="submit">SEND</button>
                </div>
              </form>
            </div>
          </div>
        )}


      </div>
    </div >
  )
}

export default CpanelErpData