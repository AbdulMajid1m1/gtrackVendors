import React, { useEffect, useState } from 'react'
import { ListOfCustomersColumn, ShipmentRequestColumns } from '../../utils/datatablesource'
import DataTable from '../../components/Datatable/Datatable';
import newRequest from '../../utils/userRequest';
import CustomSnakebar from '../../utils/CustomSnackbar';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import VisibilityIcon from "@mui/icons-material/Visibility";
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

    const handleViewShipmentRequestView = () => {
        console.log(item);

    }

    return (



        <div>

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
                                action: () => {
                                    navigate("/new-shipment-request")
                                }

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