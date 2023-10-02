import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import newRequest from '../../utils/userRequest';
import { RiseLoader } from 'react-spinners';
import { SnackbarContext } from '../../Contexts/SnackbarContext';
import gs1logo from "../../Images/gs1.png";


const ShipmentCard = () => {
    const navigate = useNavigate();
    const { openSnackbar } = useContext(SnackbarContext);
    const [isLoading, setIsLoading] = useState(true);
    const [cardData, setCardData] = useState([]);

    // get the session data
    const parsedVendorData = JSON.parse(sessionStorage.getItem("shipmentRequest"));
    console.log(parsedVendorData)
    // how i can get the shipment id from the session data
    console.log(parsedVendorData?.insertedShipmentRequestData?.shipment_id);

    useEffect(() => {
        // newRequest.get(`/getShipmentProductByShipmentId?shipmentId=${parsedVendorData?.insertedShipmentRequestData?.shipment_id}`)
        newRequest.get(`/getShipmentProductByShipmentId?shipmentId=1`)
            .then(response => {
                console.log(response?.data);
                setCardData(response?.data ?? [])
                setIsLoading(false);
                // openSnackbar(response?.data?.message ?? "Data ", "success");    

                // save the response in session storage
                sessionStorage.setItem("shipmentProduct", JSON.stringify(response?.data[0]));


            })
            .catch(error => {
                console.error(error);
                setIsLoading(false);
                openSnackbar(error?.response?.data?.message ?? "Something went wrong", "error");

            });
    }, [])

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
                      <div className="flex justify-between w-full font-body p-6 shadow-xl rounded-md text-black bg-[#D4EDDA] text-xl mb:2 md:mb-5">
                          <div className='flex justify-start gap-2 text-xs sm:text-sm'>
                            <div>
                                <img src={gs1logo} className='h-10 w-10' alt='' />
                            </div>
                            <div>
                                <p className='font-semibold'>Complete Data</p>
                                <p>This number is registered to company: : <span className='font-semibold'>TEST</span></p>
                            </div>
                        </div>
                        {/* Next Button */}
                        <div onClick={() => navigate('/add-products')} className=''>
                            <button className='py-1 px-5 mr-5 bg-primary text-lg text-white rounded-md'>Add Product</button>
                        </div>
                      </div>
                      
                    </div>
                    
                    {/* <!-- Product List --> */}
                    <section className="py-1 bg-gray-100">
                        <div className="mx-auto grid max-w-6xl  grid-cols-1 gap-5 p-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
                            {cardData?.map((item, index) => {
                                return (
                                    <article key={index} className="rounded-xl bg-white p-3 shadow-lg hover:shadow-xl hover:transform hover:scale-105 duration-300 ">
                                        <a href="#">
                                            <div className="relative h-56 flex items-end overflow-hidden rounded-xl">
                                                <img className='' src={item?.pictures} alt="image"
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
                                                    <p className="mt-1 font-semibold text-sm text-slate-700">{item?.model}</p>
                                                    <p className="mt-1 font-semibold text-sm text-slate-700">{item?.manufacturing_date}</p>
                                                </div>
                                                <div className='flex justify-between'>
                                                    <p className="mt-1 font-semibold text-sm text-slate-700">{item?.serial_number}</p>
                                                    <p className="mt-1 font-semibold text-sm text-slate-700">{item?.item_price}</p>
                                                </div>
                                                <p className="mt-1 font-semibold text-sm text-slate-700">{item?.BrandName}</p>
                                            </div>
                                            <div className="mt-3 flex justify-between px-2">
                                                <button
                                                    onClick={() => navigate('/shipment-docs/' + item?.id)}
                                                    className='h-auto w-auto px-4 py-1 text-sm bg-primary rounded-md text-white'>View Documents</button>
                                                <p className="text-sm font-bold text-red-500">{item?.expiry_date.split('T')[0]}</p>
                                            </div>
                                        </a>
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