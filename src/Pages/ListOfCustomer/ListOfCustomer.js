import React, { useEffect, useState } from 'react'
import { InventorySuppliersDataColumn, ListOfCustomersColumn } from '../../utils/datatablesource'
import DataTable from '../../components/Datatable/Datatable';
import newRequest from '../../utils/userRequest';
import CustomSnakebar from '../../utils/CustomSnackbar';

const ListOfCustomer = () => {
    const [alldata, setAllData] = useState([]);
    const [secondGridData, setSecondGridData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);

    const getVendorData = sessionStorage.getItem("vendorData");
    const parsedVendorData = JSON.parse(getVendorData);
    console.log(parsedVendorData);

    const resetSnakeBarMessages = () => {
        setError(null);
        setMessage(null);

    };


    useEffect(() => {
        const getAllAssetsList = async () => {
            try {

                const response = await newRequest.get(`/getApprovedVendorMembers?email=${parsedVendorData?.user?.email}`)

                console.log(response?.data);

                setAllData(response?.data ?? [])
                setIsLoading(false)

            }
            catch (error) {
                console.log(error);
                setIsLoading(false)
                setError(error?.response?.data?.message ?? "Something went wrong")
            }
        };
        getAllAssetsList();

        const getMappedBarcodeDeleted = async () => {
            try {

                newRequest.get("/getAllTblMappedBarcodesDeleted")
                    .then(response => {
                        console.log(response?.data);

                        setSecondGridData(response?.data ?? [])
                        setFilteredData(response?.data ?? [])

                    })
                    .catch(error => {
                        console.error(error);
                        // setError(error?.response?.data?.message ?? "Something went wrong")

                    });

            }
            catch (error) {
                console.log(error);
            }
        };
        getMappedBarcodeDeleted();


    }, []);

    const handleRowClickInParent = (item) => {
        console.log(item);
        // filter data for second grid using item.ITEMID and JOURNALMOVEMENTCLID
        const filteredData = secondGridData.filter((data) => {
            return data?.Remarks === item?.PICKINGROUTEID
        })
        console.log(filteredData);
        setFilteredData(filteredData)
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
                        uniqueId="PICKINGROUTEID"
                        handleRowClickInParent={handleRowClickInParent}
                        loading={isLoading}

                    />
                </div>

                <div style={{ marginLeft: '-11px', marginRight: '-11px' }}>
                    <DataTable data={filteredData} title="LIST OF CUSTOMERS SHIPMENT REQUEST"
                        secondaryColor="secondary"
                        columnsName={InventorySuppliersDataColumn}
                        backButton={true}
                        actionColumnVisibility={false}
                        uniqueId={"barcodeDeletedId"}
                        loading={isLoading}

                    />
                </div>

            </div>
        </div >
    )
}

export default ListOfCustomer