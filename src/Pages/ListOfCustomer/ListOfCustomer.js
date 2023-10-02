import React, { useContext,useEffect, useState } from 'react'
import { ListOfCustomersColumn, ShipmentRequestColumns } from '../../utils/datatablesource'
import DataTable from '../../components/Datatable/Datatable';
import newRequest from '../../utils/userRequest';
import CustomSnakebar from '../../utils/CustomSnackbar';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import VisibilityIcon from "@mui/icons-material/Visibility";
import { SnackbarContext } from '../../Contexts/SnackbarContext';
import { RiseLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';
const ListOfCustomer = () => {
    const [alldata, setAllData] = useState([]);
    const [secondGridData, setSecondGridData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isShipmentDataLoading, setIsShipmentDataLoading] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const navigate = useNavigate();
    const { openSnackbar } = useContext(SnackbarContext);

    const getVendorData = sessionStorage.getItem("vendorData");
    const parsedVendorData = JSON.parse(getVendorData);
    console.log(parsedVendorData);


    const resetSnakeBarMessages = () => {
        setError(null);
        setMessage(null);

    };


    useEffect(() => {
        const getAllCustomers = async () => {
            setIsLoading(true)
            try {

                const response = await newRequest.get(`/getApprovedVendorMembers?email=${parsedVendorData?.user?.email}`)

                console.log(response?.data);

                setAllData(response?.data ?? [])

            }
            catch (error) {
                console.log(error);

                setError(error?.response?.data?.message ?? "Something went wrong")
            }
            finally {
                setIsLoading(false)
            }

        };
        getAllCustomers();

        const getAllShipments = async () => {
            setIsShipmentDataLoading(true)
            try {

                const response = await newRequest.get("/getAllShipmentRequests")

                console.log(response?.data);

                setSecondGridData(response?.data ?? [])
                setFilteredData(response?.data ?? [])
            }
            catch (error) {
                console.log(error);
                setError(error?.response?.data?.message ?? "Something went wrong")

            }
            finally {
                setIsShipmentDataLoading(false)
            }
        };
        getAllShipments();


    }, []);

    const handleRowClickInParent = (item) => {
        console.log(item);

        if (item.length === 0) {
            setFilteredData(secondGridData)
            return
        }
        const filteredData = secondGridData.filter((data) => {
            return data?.customer_id === item?.id
        })
        console.log(filteredData);
        setFilteredData(filteredData)
    }


    const handleShipmentRequest = async (row) => {
        setIsLoading(true);
        console.log(row?.id);
        try {
           const response = await newRequest.post("/insertShipmentRequest", {
                vendor_id: parsedVendorData?.user?.id,
                customer_id: row?.id,
           })
                .then(response => {
                    console.log(response?.data);
                    openSnackbar(response?.data?.message ?? "Shipment Request Created Successfully", "success");
                    
                    navigate("/new-shipment-request")
                    setIsLoading(false);

                    // save the api response in session storage
                    sessionStorage.setItem("shipmentRequest", JSON.stringify(response?.data));

                })
                .catch(error => {
                    console.error(error);
                    // setError(error?.response?.data?.message ?? "Something went wrong")
                    openSnackbar(error?.response?.data?.message ?? "Something went wrong", "error");
                    setIsLoading(false);

                });

        }
        catch (error) {
            console.log(error);
        }
    }

    return (



        <div>

            {isLoading &&

            <div className='loading-spinner-background'
            style={{
                zIndex: 9999, position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(255, 255, 255, 0.5)',
                display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'fixed'


            }}
            >
            <RiseLoader
                size={18}
                color={"#6439ff"}
                // height={4}
                loading={isLoading}
            />
            </div>
            }


            {message && <CustomSnakebar message={message} severity="success" onClose={resetSnakeBarMessages} />}
            {error && <CustomSnakebar message={error} severity="error" onClose={resetSnakeBarMessages} />}

            <div className="p-3 h-full sm:ml-72">
                <div style={{ marginLeft: '-11px', marginRight: '-11px', marginTop: '-25px' }}>
                    <DataTable
                        data={alldata}
                        title="LIST OF CUSTOMERS"
                        secondaryColor="secondary"
                        columnsName={ListOfCustomersColumn}
                        backButton={true}
                        uniqueId="customerListId"
                        handleRowClickInParent={handleRowClickInParent}
                        loading={isLoading}
                        checkboxSelection='disabled'

                        dropDownOptions={[
                            {
                                label: "New Shipment Request",
                                icon: <LocalShippingIcon fontSize="small" color="action" style={{ color: "rgb(37 99 235)" }} />
                                ,
                                action: handleShipmentRequest,
                            },
                            // {
                            //   label: "Delete",
                            //   icon: <DeleteIcon fontSize="small" style={{ color: '#FF0032' }} />
                            //   ,
                            //   action: handleDelete,
                            // }

                        ]}

                    />
                </div>

                <div style={{ marginLeft: '-11px', marginRight: '-11px' }}>
                    <DataTable data={filteredData} title="LIST OF CUSTOMERS SHIPMENT REQUEST"
                        secondaryColor="secondary"
                        columnsName={ShipmentRequestColumns}
                        backButton={true}
                        checkboxSelection="disabled"
                        dropDownOptions={[
                            {
                                label: "View",
                                icon: (
                                    <VisibilityIcon
                                        fontSize="small"
                                        color="action"
                                        style={{ color: "rgb(37 99 235)" }}
                                    />
                                ),
                                action: handleViewShipmentRequestView,
                            },
                        ]}
                        uniqueId={"shipmentRequestId"}
                        loading={isShipmentDataLoading}

                    />
                </div>

            </div>
        </div >
    )
}

export default ListOfCustomer