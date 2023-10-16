import React, { useContext, useEffect, useState } from 'react'
import { ListOfCustomersColumn, orderLineColumns } from '../../utils/datatablesource'
import DataTable from '../../components/Datatable/Datatable';
import newRequest from '../../utils/userRequest';
import CustomSnakebar from '../../utils/CustomSnackbar';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import { SnackbarContext } from '../../Contexts/SnackbarContext';
import { RiseLoader } from 'react-spinners';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import Swal from 'sweetalert2';
import { DataTableContext } from '../../Contexts/DataTableContext';


// MUI Style 
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 1000,
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const ByPo = ({ title, handleOpen, handleClose, open, }) => {
    const [alldata, setAllData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [shipmentRequestLoader, setShipmentRequestLoader] = useState(false);
    const [error, setError] = useState(null);
    const [message, setMessage] = useState(null);
    const { openSnackbar } = useContext(SnackbarContext);
    const vendorData = JSON.parse(sessionStorage.getItem('vendorData'));
    console.log(vendorData)
    const resetSnakeBarMessages = () => {
        setError(null);
        setMessage(null);

    };

    const { rowSelectionModel, setRowSelectionModel, tableSelectedRows, setTableSelectedRows } = useContext(DataTableContext);



    useEffect(() => {
        const getAllCustomers = async () => {
            setIsLoading(true)
            try {

                const response = await newRequest.get('/getPOHeaderBySupplierId?supplier_id=' + vendorData?.user?.id, {

                })
                setAllData(response?.data ?? [])
                console.log(response?.data ?? [])

            }
            catch (error) {
                console.log(error);
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error?.response?.data?.message || 'Something went wrong'
                })

            }
            finally {
                setIsLoading(false)
            }


        };
        getAllCustomers();

    }, [])

    const handleRowClickInParent = async (item) => {

    }
//  TODO: validate PO products
    const handleProductValidation = async () => {
        if (tableSelectedRows.length === 0) {
            openSnackbar('Please select atleast one row', 'error');
            return;
        }
        setShipmentRequestLoader(true)
        try {
            const response = await newRequest.post('/validatePO', {
                po_header_id: tableSelectedRows[0]?.po_header_id,
                supplier_id: vendorData?.user?.id
            })
            console.log(response)
            openSnackbar(response?.data?.message, 'success');
            setAllData(response?.data?.data ?? [])
            setTableSelectedRows([])
            setRowSelectionModel([])
        }
        catch (error) {
            console.log(error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error?.response?.data?.message || 'Something went wrong'
            })

        }
        finally {
            setShipmentRequestLoader(false)
        }
    }


    return (

        <div>

            {shipmentRequestLoader &&

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
                        loading={shipmentRequestLoader}
                    />
                </div>
            }


            {message && <CustomSnakebar message={message} severity="success" onClose={resetSnakeBarMessages} />}
            {error && <CustomSnakebar message={error} severity="error" onClose={resetSnakeBarMessages} />}

            <div>
                <div
                    style={{
                        display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px'
                    }}
                >

                    {/* <Button style={{ backgroundColor: '#1E3B8B', color: 'white' }} onClick={handleOpen}>{title}</Button> */}
                </div>
                <Modal
                    open={open}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        {/* Close button */}
                        <IconButton
                            edge="end"
                            color="inherit"
                            onClick={handleClose} // Close the Modal when the button is clicked
                            aria-label="close"
                            sx={{
                                position: 'absolute',
                                top: '6px',
                                right: '18px',
                            }}
                        >
                            <ClearIcon />
                        </IconButton>

                        {/* Search and button */}
                        <div className='flex w-full mb-3 mt-2'>
                            <input
                                type='text'
                                className='h-10 w-full rounded-md border border-gray-500 px-4'
                                placeholder='Enter PO'
                                name='po'
                            // onChange={(e) => setGtinData(e.target.value)}
                            />

                            <div className='flex justify-end px-5'>
                                <button
                                    className="w-full bg-primary text-white px-4 py-2 rounded-md shadow-md"
                                // onClick={handleSubmit}
                                >
                                    Search
                                </button>
                            </div>
                        </div>


                        <div style={{ marginLeft: '-11px', marginRight: '-11px', marginTop: '-10px' }}>
                            <DataTable
                                data={alldata}
                                title="BY PO"
                                secondaryColor="secondary"
                                columnsName={orderLineColumns}
                                uniqueId="byPoId"
                                handleRowClickInParent={handleRowClickInParent}
                                loading={isLoading}
                                actionColumnVisibility={false}

                                dropDownOptions={[
                                    {
                                        label: "Approve",
                                        icon: <LocalShippingIcon fontSize="small" color="action" style={{ color: "rgb(37 99 235)" }} />
                                        ,
                                        // action: handleShipmentRequest,
                                    },

                                ]}

                            />
                        </div>

                        <div className='flex justify-end px-5 mt-2'>
                            <button
                                className="bg-primary text-white px-4 py-2 rounded-md shadow-md"
                                onClick={handleProductValidation}
                            >
                                Validate
                            </button>
                        </div>
                    </Box>
                </Modal>
            </div>
        </div >
    )
}

export default ByPo