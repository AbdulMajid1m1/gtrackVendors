import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import gs1logo from "../../Images/gs1.png";
import gtrackIcon from "../../Images/gtrackicons.png"
import DigitalLinkTab from './DigitalLinkTab';
import newRequest from '../../utils/userRequest';
import { SnackbarContext } from '../../Contexts/SnackbarContext';
import { RiseLoader } from 'react-spinners';
import CodificationTab from './CodificationTab';
import Swal from 'sweetalert2';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import { phpImagesBaseUrl } from '../../utils/config';


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

const AddProducts = ({ title, handleOpen, handleClose, open, handleRefetch }) => {
  const [activeTab, setActiveTab] = useState('product-Infomation');
  const [data, setData] = useState(null);
  const [gtinData, setGtinData] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { openSnackbar } = useContext(SnackbarContext);

  // // this is the popup code
  // const [open, setOpen] = useState(false);
  // const handleOpen = () => {
  //   setOpen(true);
  // };

  // const handleClose = () => {
  //   setOpen(false);
  // };

  // I get the selected Row data in the session storage
  const getRowData = sessionStorage.getItem("customerRowData");
  const parsedRowData = JSON.parse(getRowData);
  // console.log(parsedRowData);


  const shipmentRequestData = JSON.parse(sessionStorage.getItem('shipmentRequest'));
  console.log(shipmentRequestData);
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };


  const handleGtinSearch = () => {
    if (!gtinData) return;
    newRequest.get(`/getGs1ProdProductsbyBarcode?barcode=${gtinData}`)
      .then((response) => {
        console.log(response.data);
        setData(response.data[0]);
        // store that response in sesstion stroage
        sessionStorage.setItem('gs1ProductData', JSON.stringify(response.data[0]));
  
        // store that response in sesstion stroage
        sessionStorage.setItem('productData', JSON.stringify(gtinData));

        // empty the input field
        setGtinData('');

      })
      .catch((error) => {
        console.log(error);
        setData(null);
        // Swal.fire({
        //   icon: 'error',
        //   title: 'Oops...',
        //   text: error?.response?.data?.message ?? "something went wrong!",
        // })
        openSnackbar(error?.response?.data?.message ?? "something went wrong!", "error");
      })

  };

  //Firts tab Table data 
  const products = [
    { name: "GTIN", value: data?.barcode },
    { name: "Brand name", value: data?.BrandName },
    { name: "Product description", value: data?.productnameenglish },
    { name: "Product image URL", value: data?.front_image },
    { name: "Global product category", value: data?.gpc },
    // check if data has unitcode then show value
    { name: "Net content", value: data?.unit && data?.unit && `${data?.unit} ${data?.unit}` },
    { name: "Country of sale", value: data?.countrySale },

  ];

  // Second Tab table Data
  const productInformation = [
    { name: "Company Name", value: data?.productnameenglish },
    { name: "Licence Key", value: data?.barcode },
    { name: "Licence Type", value: "null" },
    { name: "Product image URL", value: data?.front_image },
    { name: "Licensing GS1 Member Organisation", value: data?.countrySale },
  ];


  // Insert Api 
  const handleSubmit = async () => {
    setIsLoading(true);



    const apiBodyData = {
      shipment_id: parseInt(shipmentRequestData?.shipment_id),
      productnameenglish: data?.productnameenglish,
      productnamearabic: data?.productnamearabic,
      BrandName: data?.BrandName,
      BrandNameAr: data?.BrandNameAr,
      unit: data?.unit,
      member_id: shipmentRequestData?.customer_id,
      barcode: data?.barcode,
      front_image: data?.front_image,
      back_image: data?.back_image,

    }

    console.log(apiBodyData);
    try {
      const response = await newRequest.post("/insertShipmentProduct", apiBodyData)

      console.log(response?.data);
      // Swal.fire({
      //   icon: 'success',
      //   title: 'Product Added Successfully',
      //   showConfirmButton: false,
      //   timer: 1500
      // })
      openSnackbar("Product Added Successfully", "success");
      handleRefetch();
      setData(null);
      setGtinData('');

      setTimeout(() => {
        handleClose();
      }, 1500)

      // navigate(-1)


    }
    catch (error) {

      // Swal.fire({
      //   icon: 'error',
      //   title: 'Oops...',
      //   text: error?.response?.data?.message ?? "something went wrong!",
      // })
      openSnackbar(error?.response?.data?.message ?? "something went wrong!", "error");

    }
    finally {
      setIsLoading(false);
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
      <div
        style={{
          display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px'
        }}
      >

        {/* <Button style={{ backgroundColor: '#1E3B8B', color: 'white' }} onClick={handleOpen}>{title}</Button> */}
      </div>
      <Modal
        open={open}
        // onClose={handleClose}
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


          <div className="p-3 h-full shadow" style={{ maxHeight: '550px', overflowY: 'auto' }}>
            {/* new design */}
            <div className="popup-header -mt-3">
              <div className="w-full font-body p-6 shadow-xl rounded-md text-black bg-[#D4EDDA] text-xl mb:2 md:mb-5">
                <div className='flex justify-start items-center gap-2 text-xs sm:text-sm'>
                  <div>
                    <img src={gs1logo} className='h-10 w-10' alt='' />
                  </div>
                  <div>
                    <p className='font-semibold'>{parsedRowData?.email}</p>
                    <p>This number is registered to company: : <span className='font-semibold'>{parsedRowData?.company_name_eng}</span></p>
                    <p>Member ID: : <span className='font-semibold'>{parsedRowData?.id}</span></p>
                  </div>
                </div>
              </div>
            </div>

            <div className='flex w-full mb-3 mt-2'>
              <input
                type='text'
                className='h-10 w-[80%] rounded-md border border-gray-500 px-4'
                placeholder='Barcode'
                name='barcode'
                onChange={(e) => setGtinData(e.target.value)}
                onBlur={handleGtinSearch}
              />

              <div className='w-[20%] flex justify-end px-5'>
                <button
                  className="bg-primary text-white px-4 py-2 rounded-md shadow-md"
                  onClick={handleSubmit}
                >
                  Add Product
                </button>
              </div>
            </div>

            {/* Tabs Button */}
            <div className="grid 2xl:grid-cols-4 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-4 grid-cols-2 gap-5">
              <button
                className={`p-4 rounded ${activeTab === 'product-Infomation' ? 'bg-primary text-white' : 'bg-white text-primary'
                  } shadow-md flex items-center justify-center`}
                onClick={() => handleTabClick('product-Infomation')}
              >
                Product Infomation
              </button>

              <button
                className={`p-4 rounded ${activeTab === 'company-information' ? 'bg-primary text-white' : 'bg-white text-primary'
                  } shadow-md flex items-center justify-center`}
                onClick={() => handleTabClick('company-information')}
              >
                Company Information
              </button>

              <button
                className={`p-4 rounded ${activeTab === 'digital-link' ? 'bg-primary text-white' : 'bg-white text-primary'
                  } shadow-md flex items-center justify-center`}
                onClick={() => handleTabClick('digital-link')}
              >
                Digital Link
              </button>

              <button
                className={`p-4 rounded ${activeTab === 'Codification' ? 'bg-primary text-white' : 'bg-white text-primary'
                  } shadow-md flex items-center justify-center`}
                onClick={() => handleTabClick('Codification')}
              >
                Codification
              </button>
            </div>

            {/* Tabs Content */}
            {activeTab === 'product-Infomation' && (
              <div className="block shadow-lg">
                <div className="flex flex-col md:flex-row">
                  <div className="w-full md:w-1/3 flex justify-center items-center p-4">
                    {/* Add your image element here */}
                    {data?.front_image && (
                      <img src={`${phpImagesBaseUrl}/${data.front_image}`} alt="Product" className="w-1/2" />
                    )}
                  </div>

                  <div className="w-full md:w-2/3">
                    <div className="container mx-auto mt-6 p-4">
                      <div className="overflow-x-auto">
                        <table className="table-auto min-w-max w-full">
                          <tbody>
                            {products.map((product, index) => (
                              <tr key={index}>
                                <td className="border px-4 py-2 sm:text-sm md:text-base font-semibold text-xs">{product.name}</td>
                                <td className="border font-body px-4 py-2 sm:text-sm font-bold text-black md:text-base text-xs">{product.value}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>

                {/* <div className='flex justify-end px-5'>
                <button
                  className="bg-primary text-white px-4 py-2 rounded-md shadow-md"
                  onClick={handleSubmit}
                >
                  Add Product
                </button>
              </div> */}
              </div>
            )}

            {/* Second Tab */}
            {activeTab === 'company-information' && (
              <div className="block shadow-lg">
                <div className="flex flex-col md:flex-row">
                  <div className="w-full md:w-2/3">
                    <div className="container mx-auto mt-6 p-4">
                      <div className="overflow-x-auto">
                        <table className="table-auto min-w-max w-full">
                          <tbody>
                            {productInformation.map((product, index) => (
                              <tr key={index}>
                                <td className="border px-4 py-2 sm:text-sm md:text-base font-semibold text-xs">{product.name}</td>
                                <td className="border font-body px-4 py-2 sm:text-sm font-bold text-black md:text-base text-xs">{product.value}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}


            {/* third Tab */}
            {activeTab === 'digital-link' && (
              <div className="block shadow-lg">
                <DigitalLinkTab />
              </div>
            )}


            {/* Fourth Tab */}
            {activeTab === 'Codification' && (
              <div className="block shadow-lg">
                <div className='mt-2 border border-gray-300'>
                  <CodificationTab />
                </div>
              </div>
            )}

            {/* <div className='flex justify-end px-5 mt-2'>
          <button
            className="bg-primary text-white px-4 py-2 rounded-md shadow-md"
            onClick={handleSubmit}
          >
            Add Product
          </button>
        </div> */}
          </div>
        </Box>
      </Modal>
    </div>
  )
}

export default AddProducts