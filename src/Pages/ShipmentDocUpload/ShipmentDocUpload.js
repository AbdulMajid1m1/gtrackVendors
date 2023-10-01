import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { ShipmentDocColumns } from '../../utils/datatablesource'
import DeleteIcon from '@mui/icons-material/Delete';
import { SnackbarContext } from '../../Contexts/SnackbarContext';
import VisibilityIcon from '@mui/icons-material/Visibility';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import newRequest from '../../utils/userRequest'
import DataTable from '../../components/Datatable/Datatable';
import ShipmentDocUploadPopup from '../../components/ShipmentDocUploadPopup/ShipmentDocUploadPopup';
import Swal from 'sweetalert2';

const ShipmentDocUpload = () => {
    const [data, setData] = useState([]);
    const { openSnackbar } = useContext(SnackbarContext);
    const [isLoading, setIsLoading] = useState(true);
    const [openPopup, setOpenPopup] = useState(false);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await newRequest.get("/getAllShipmentDocuments");
                console.log(response.data);
                setData(response?.data || []);
                setIsLoading(false)
            }
            catch (err) {
                console.log(err);
                setIsLoading(false)
            }
        };

        fetchData();
    }, []);


    const handleDownload = async (row) => {
        // get url from row
        const url = row?.document_url;
        console.log(url);


    }

    const handleView = async (row) => {
        // open url in new chorme with small window
        const url = row?.document_url;
        console.log(url);

    }


    const handleDelete = async (row) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this Record!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, keep it',
            // changes the color of the confirm button to red
            confirmButtonColor: '#1E3B8B',
            cancelButtonColor: '#FF0032',
        }).then(async (result) => {
            if (result.isConfirmed) {
                const isDeleted = await deleteFunction("/deleteShipmentDocument?documentId=" + row?.id);
                if (!isDeleted) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Something went wrong'
                    })
                    return
                }
                // filter out the deleted user from the data
                const filteredData = data.filter((item) => item?.id !== row?.id);
                setData(filteredData);
            } else if (result.dismiss === Swal.DismissReason.cancel) {
                return
            }
        })
    }

    const handleAddDoc = () => {

        setOpenPopup(true)


    }


    return (
        <div>
            <div className="p-3 h-full sm:ml-72">
                <ShipmentDocUploadPopup
                    open={openPopup}


                />
                <div style={{ marginLeft: '-11px', marginRight: '-11px', marginTop: '-15px' }}>

                    <DataTable data={data} title={"Shipment Documents"} columnsName={ShipmentDocColumns} backButton={false}
                        secondaryColor="secondary"
                        loading={isLoading}
                        AddDocBtn={true}
                        handleAddDoc={handleAddDoc}
                        uniqueId="shipmentDocUploadId"
                        dropDownOptions={[

                            {
                                label: "Download",
                                icon: <FileDownloadIcon fontSize="small" style={{ color: '#FF0032' }} />
                                ,
                                action: handleDownload,
                            },
                            {
                                label: "View",
                                icon: <VisibilityIcon fontSize="small" style={{ color: "rgb(37 99 235)" }} />
                                ,
                                action: handleView,
                            },
                            {
                                label: "Delete",
                                icon: <DeleteIcon fontSize="small" style={{ color: '#FF0032' }} />
                                ,
                                action: handleDelete,
                            },

                        ]}
                    />

                </div>
            </div>
        </div>
    )
}

export default ShipmentDocUpload



