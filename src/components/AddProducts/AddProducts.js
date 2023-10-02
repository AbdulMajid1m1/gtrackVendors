import { useContext, useState } from 'react';
import { useNavigate } from 'react-router';
import gs1logo from "../../Images/gs1.png";
import gtrackIcon from "../../Images/gtrackicons.png"
import DigitalLinkTab from './DigitalLinkTab';
import newRequest from '../../utils/userRequest';
import { SnackbarContext } from '../../Contexts/SnackbarContext';
import { RiseLoader } from 'react-spinners';
import CodificationTab from './CodificationTab';


const AddProducts = () => {
    const [activeTab, setActiveTab] = useState('product-Infomation');
    const [data, setData] = useState(null);
    const [gtinData, setGtinData] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const { openSnackbar } = useContext(SnackbarContext);

    // const getVendorData = sessionStorage.getItem("vendorData");
    // const parsedVendorData = JSON.parse(getVendorData);
    // console.log(parsedVendorData?.user);
    
    // get the shipment request data from session storage
    const getShipmentRequestData = sessionStorage.getItem("shipmentProduct");
    const parsedShipmentRequestData = JSON.parse(getShipmentRequestData);
    console.log(parsedShipmentRequestData);


  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };


  const handleGtinSearch = () => {
      newRequest.get(`/getGs1ProdProductsbyBarcode?barcode=${gtinData}`)
        .then((response) => {
          console.log(response.data[0]);
          setData(response.data[0]);
      
          // store that response in sesstion stroage
          sessionStorage.setItem('productData', JSON.stringify(gtinData));

        })    
        .catch((error) => {
          console.log(error);
          setData(null);
          openSnackbar(
            error?.response?.data?.message ?? "something went wrong!",
            "error"
          );
        })

  };

 //Firts tab Table data 
 const products = [
    { name: "GTIN", value: data?.barcode },
    { name: "Brand name", value: data?.BrandName },
    { name: "Product description", value: data?.HsDescription },
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
   const handleSubmit = () => {
    setIsLoading(true);
    const apiBodyData = {
        shipment_id: parsedShipmentRequestData?.shipment_id,
        productnameenglish: data?.productnameenglish,
        productnamearabic: data?.productnamearabic,
        BrandName: data?.BrandName,
        BrandNameAr: data?.BrandNameAr,
        model: parsedShipmentRequestData?.model,
        manufacturing_date: parsedShipmentRequestData?.manufacturing_date,
        expiry_date: parsedShipmentRequestData?.expiry_date,
        serial_number: parsedShipmentRequestData?.serial_number,
        pictures: parsedShipmentRequestData?.pictures,
        item_price: parsedShipmentRequestData?.item_price,
        unit: data?.unit,
        member_id: data?.id,
        barcode: data?.barcode
      
    }

    newRequest.post("/insertShipmentProduct", apiBodyData)
      .then(response => {
        console.log(response?.data);
        openSnackbar(response?.data?.message ?? "Something went wrong", "success");
        setIsLoading(false);
      
      })
      .catch(error => {
        console.error(error);
        openSnackbar(error?.response?.data?.message ?? "Something went wrong", "error");
        setIsLoading(false);
      });


   }



  const [selectedOption, setSelectedOption] = useState("GS1-GPC");
 
  //Second Tab
  const handleOptionChange = (option) => {
    setSelectedOption(option);
    
    switch (option) {
      case "GS1-GPC":
        // newRequest
        //   .get(`/getSafetyInformationByGtin/${gtinData?.gtin}`)
        //   .then((response) => {
        //     console.log(response.data);
        //     setSafetyInformation(response.data);
        //   })
        //   .catch((err) => {
        //     console.log(err);
        //     openSnackbar(
        //       err?.response?.data?.message ?? "something went wrong!",
        //       "error"
        //     );
        //     setSafetyInformation([]);
        //   });
        break;

      case "HS-CODES":
      break;

      case "UNSPSC":
      break;

      case "OTHER":
      break;

      // Add more cases for other options
      default:
        break;
    }
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

        <div className="p-3 h-full sm:ml-72 shadow">
            {/* new design */}
            <div className="popup-header -mt-3">
              <div className="w-full font-body p-6 shadow-xl rounded-md text-black bg-[#D4EDDA] text-xl mb:2 md:mb-5">
                <div className='flex justify-start gap-2 text-xs sm:text-sm'>
                  <div>
                    <img src={gs1logo} className='h-10 w-10' alt='' />
                  </div>
                  <div>
                    <p className='font-semibold'>Complete Data</p>
                    <p>This number is registered to company: : <span className='font-semibold'>TEST</span></p>
                  </div>
                </div>
              </div>
            </div>

            <div className='w-full mb-3 mt-2'>
              <input 
                type='text' 
                className='h-10 w-full rounded-md border border-gray-500 px-4' 
                placeholder='Barcode'
                name='barcode'
                onChange={(e) => setGtinData(e.target.value)}
                onBlur={handleGtinSearch}
                />
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
                    <img src={data?.front_image} alt="Product" className="w-1/2" />

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

              <div className='flex justify-end px-5'>
                <button
                  className="bg-primary text-white px-4 py-2 rounded-md shadow-md"
                  onClick={handleSubmit}
                >
                  Add Product
                </button>
              </div>
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
                  <div className='flex justify-between gap-2 w-full'>
                    <div className='w-[20%] flex flex-col gap-2 mt-2'>
                        <span
                        className={`bg-[#3b5998] py-2 flex justify-start px-1 rounded-md text-white items-center gap-2 cursor-pointer 
                            }`}
                        onClick={() => handleOptionChange("GS1-GPC")}
                        >
                        <img
                            src={gtrackIcon}
                            className="w-5 h-5 ml-1"
                            alt=""
                        />
                            GS1 GPC
                        </span>
                        <span
                        className={`bg-[#00acee] py-2 flex justify-start px-1 rounded-md text-white items-center gap-2 cursor-pointer ${selectedOption === "HS-CODES" ? "bg-yellow-500" : ""
                            }`}
                        onClick={() => handleOptionChange("HS-CODES")}
                        >
                        <img
                            src={gtrackIcon}
                            className="w-5 h-5 ml-1"
                            alt=""
                        />
                            HS CODES
                        </span>
                        <span
                        className={`bg-[#0072b1] py-2 flex justify-start px-1 rounded-md text-white items-center gap-2 cursor-pointer ${selectedOption === "UNSPSC" ? "bg-yellow-500" : ""
                            }`}
                        onClick={() => handleOptionChange("UNSPSC")}
                        >
                        <img src={gtrackIcon} className="w-5 h-5 ml-1" alt="" />
                            UNSPSC
                        </span>
                        <span
                        className={`bg-[#E60023] py-2 flex justify-start px-1 rounded-md text-white items-center gap-2 cursor-pointer ${selectedOption === "OTHER"
                            ? "bg-yellow-500"
                            : ""
                            }`}
                        onClick={() => handleOptionChange("OTHER")}
                        >
                        <img
                            src={gtrackIcon}
                            className="w-5 h-5 ml-1"
                            alt=""
                        />
                            OTHER
                        </span>
                    </div>

                    
                    <div className='w-[80%] mt-2 border border-gray-300'>
                        <CodificationTab />
                    </div>
                  </div>
                </div>
              )}
        </div>
    </div>
  )
}

export default AddProducts