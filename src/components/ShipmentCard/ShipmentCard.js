import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import newRequest from '../../utils/userRequest';
import { RiseLoader } from 'react-spinners';
import { SnackbarContext } from '../../Contexts/SnackbarContext';
import gs1logo from "../../Images/gs1.png";
import Swal from 'sweetalert2';
import { phpImagesBaseUrl } from '../../utils/config';
import AddProducts from '../AddProducts/AddProducts';
import ByPo from '../ByPo/ByPo';


const ShipmentCard = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(true);
    const [cardData, setCardData] = useState([]);

    // // this is the popup code
    // const [open, setOpen] = useState(false);
    // const handleOpen = () => {
    //     setOpen(true);
    // };

    // const handleClose = () => {
    //     setOpen(false);
    // };
    const [addProductsOpen, setAddProductsOpen] = useState(false);
    const [byPoOpen, setByPoOpen] = useState(false);
    const [selectedValue, setSelectedValue] = useState("");

    const handleOpenAddProducts = () => {
        setAddProductsOpen(true);
    };

    const handleCloseAddProducts = () => {
        setSelectedValue("");
        setAddProductsOpen(false);
    };

    const handleOpenByPo = () => {
        setByPoOpen(true);
    };

    const handleCloseByPo = () => {
        setSelectedValue("");
        setByPoOpen(false);
    };

    const handleDropdownChange = (selectedOption) => {
        setSelectedValue(selectedOption);
        if (selectedOption === 'By GTIN') {
            handleOpenAddProducts();
        } else if (selectedOption === 'By PO') {
            handleOpenByPo();
        }
    };



    // I get the selected Row data in the session storage
    const getRowData = sessionStorage.getItem("customerRowData");
    const parsedRowData = JSON.parse(getRowData);
    console.log(parsedRowData);


    // get the session data
    const parsedVendorData = JSON.parse(sessionStorage.getItem("shipmentRequest"));
    console.log(parsedVendorData)
    // how i can get the shipment id from the session data

    let shipmentId = parsedVendorData?.shipment_id


    useEffect(() => {
        const fetcShipmentProducts = async () => {
            try {
                const response = await newRequest.get(`/getShipmentProductByShipmentId?shipmentId=${shipmentId}`)

                console.log(response?.data);
                setCardData(response?.data ?? [])
                setIsLoading(false);
            } catch (error) {
                console.log(error);
                setIsLoading(false);

                setCardData([]);

            }
        }
        fetcShipmentProducts();
    }, [])

    const handleRefetch = async () => {
        setIsLoading(true);
        try {
            const response = await newRequest.get(`/getShipmentProductByShipmentId?shipmentId=${shipmentId}`)

            console.log(response?.data);
            setCardData(response?.data ?? [])
            setIsLoading(false);
        } catch (error) {
            console.log(error);
            setIsLoading(false);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: error?.response?.data?.message ?? 'Something went wrong!',
            })
            setCardData([]);

        }
    }


    // Function to handle saving card data to session storage
    const saveCardDataToSessionStorage = (item) => {
        sessionStorage.setItem("selectedCardData", JSON.stringify(item));
    };

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

            <div className="p-1 h-full sm:ml-72 -mt-6">
                <div className="bg-white">

                    {/* Header I add */}
                    <div className="popup-header">
                    <div className="flex flex-col md:flex-row justify-between w-full font-body p-6 shadow-xl rounded-md text-black bg-[#D4EDDA] text-xl mb:2 md:mb-5">
                        {/* <div className="flex justify-between w-full font-body p-6 shadow-xl rounded-md text-black bg-[#D4EDDA] text-xl mb:2 md:mb-5"> */}
                            {/* <div className='flex justify-start w-[40%] bg-red-400 items-center gap-2 text-xs sm:text-sm'> */}
                            <div className="md:w-[40%] flex items-center gap-2 text-xs sm:text-sm">
                                <div>
                                    <img src={gs1logo} className='h-10 w-12' alt='' />
                                </div>
                                <div className='flex flex-col w-full gap-2'>
                                    <div className='flex justify-between -mt-1'>
                                        <div className='w-[50%]'>
                                            <p className='font-semibold'>Shipment Id</p>
                                        </div>
                                        <div className='flex w-[50%] gap-2'>
                                            <p>:</p>
                                            <p className='font-semibold'>{parsedVendorData?.shipment_id}</p>
                                        </div>
                                    </div>
                                    <div className='flex justify-between -mt-1'>
                                        <div className='w-[50%]'>
                                            <p className='font-semibold'>Customer Name</p>
                                        </div>
                                        <div className='flex w-[50%] gap-2'>
                                            <p>:</p>
                                            <p className='font-semibold'>{parsedRowData?.company_name_eng}</p>
                                        </div>
                                    </div> 
                                    <div className='flex justify-between -mt-1'>
                                        <div className='w-[50%]'>
                                            <p className='font-semibold'>Email ID</p>
                                        </div>
                                        <div className='flex w-[50%] gap-2'>
                                            <p>:</p>
                                            <p className='font-semibold overflow-x-auto md:overflow-visible'>{parsedRowData?.email}</p>
                                        </div>
                                    </div>
                                    <div className='flex justify-between -mt-1'>
                                        <div className='w-[50%]'>
                                            <p className='font-semibold'>Customer No</p>
                                        </div>
                                        <div className='flex w-[50%] gap-2'>
                                            <p>:</p>
                                            <p className='font-semibold'>{parsedRowData?.no}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='flex gap-3 justify-end'>
                                {/* <AddProducts title={"BY GTIN"}
                                    handleClose={handleClose}
                                    handleOpen={handleOpen}
                                    open={open}
                                    handleRefetch={handleRefetch}
                                />

                                <ByPo 
                                    title={"BY PO"}
                                    handleClose={handleClose}
                                    handleOpen={handleOpen}
                                    open={open}
                                /> */}
                                 <select 
                                    className='h-10 w-40 bg-primary text-white border border-white text-center rounded-md px-2 text-sm'
                                       onChange={(e) => handleDropdownChange(e.target.value)}
                                       value={selectedValue}       
                                >
                                        <option value="" selected>ADD PRODUCTS</option>
                                        <option value="By GTIN">BY GTIN</option>
                                        <option value="By PO">BY PO</option>
                                </select>
                                <AddProducts
                                    // title={"BY GTIN"}
                                    handleClose={handleCloseAddProducts}
                                    handleOpen={handleOpenAddProducts}
                                    open={addProductsOpen}
                                    handleRefetch={handleRefetch}
                                />

                                <ByPo
                                    // title={"BY PO"}
                                    handleClose={handleCloseByPo}
                                    handleOpen={handleOpenByPo}
                                    open={byPoOpen}
                                />
                            </div>
                        </div>
                    </div>

                    {/* <!-- Product List --> */}
                    <section className="py-1 bg-gray-100">
                        <div className="mx-auto grid max-w-6xl  grid-cols-1 gap-5 p-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                            {cardData?.map((item, index) => {
                                return (
                                    <article key={index} className="rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 ">
                                        {/* <a href="#"> */}
                                        <div className="relative h-56 flex items-end overflow-hidden rounded-xl">
                                            <img className='' src={phpImagesBaseUrl + "/" + item?.front_image} alt="image"
                                                style={{
                                                    objectFit: 'contain',
                                                    height: '100%', margin: 'auto'
                                                }}

                                            />
                                        </div>

                                        <div className="mt-1 p-2 flex flex-col gap-1">
                                            <div className='flex justify-between items-center'>
                                                <p className="text-sm font-semibold text-slate-700">{item?.productnameenglish}</p>
                                                <p className="mt-1 font-semibold text-sm text-slate-700">{item?.productnamearabic}</p>
                                            </div>
                                            <div className='flex justify-between'>
                                                {/* <p className="mt-1 font-semibold text-sm text-slate-700">{item?.model}</p> */}
                                                {/* <p className="mt-1 font-semibold text-sm text-slate-700">{item?.manufacturing_date}</p> */}
                                            </div>
                                            <div className='flex justify-between'>
                                                <p className="mt-1 font-semibold text-sm text-slate-700">{item?.barcode}</p>
                                                <p className="mt-1 font-semibold text-sm text-slate-700">{item?.unit}</p>
                                            </div>
                                            <p className="mt-1 font-semibold text-sm text-slate-700">{item?.BrandName}</p>
                                        </div>
                                        <div className="mt-3 flex justify-between px-2">
                                            <button
                                                onClick={() => {
                                                    saveCardDataToSessionStorage(item);
                                                    navigate('/shipment-docs/' + item?.id);
                                                }}
                                                // onClick={() => navigate('/shipment-docs/' + item?.id)}
                                                className='h-auto w-auto px-4 py-1 text-sm bg-primary rounded-md text-white'>View Documents</button>
                                            {/* <p className="text-sm font-bold text-red-500">{item?.expiry_date.split('T')[0]}</p> */}
                                            <p className="text-sm font-bold text-red-500">{item?.BrandNameAr}</p>
                                        </div>
                                        {/* </a> */}
                                    </article>
                                )
                            })
                            }
                            {/* <article className="rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 ">
                    <a href="#">
                        <div className="relative h-56 flex items-end overflow-hidden rounded-xl">
                            <img className='' src="https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" alt="Hotel Photo" />
                        </div>

                        <div className="mt-1 p-2 flex flex-col gap-1">
                            <div className='flex justify-between items-center'>
                                <p className="text-sm font-semibold text-slate-700">Description English</p>
                                <p className="mt-1 font-semibold text-sm text-slate-700">Description Arabic</p>
                            </div>
                            <div className='flex justify-between'>
                                <p className="mt-1 font-semibold text-sm text-slate-700">Model</p>
                                <p className="mt-1 font-semibold text-sm text-slate-700">Manufecturing Date</p>
                            </div>
                            <div className='flex justify-between'>
                                <p className="mt-1 font-semibold text-sm text-slate-700">Serial Number</p>
                                <p className="mt-1 font-semibold text-sm text-slate-700">Item Price</p>
                            </div>
                            <p className="mt-1 font-semibold text-sm text-slate-700">Item Code</p>
                        </div>
                        <div className="mt-3 flex justify-end mr-5">
                            <p className="text-sm font-bold text-red-500">Expiry Date</p>
                        </div>
                    </a>
                </article> */}

                        </div>
                    </section>

                    {/* <div onClick={() => navigate('/add-products')} className='h-16 w-full bg-gray-100 flex justify-end items-center'>
                        <button className='py-2 px-10 mr-5 bg-primary text-white font-semibold rounded-md'>Next</button>
                    </div> */}
                </div>

            </div>
        </div>
    )
}

export default ShipmentCard