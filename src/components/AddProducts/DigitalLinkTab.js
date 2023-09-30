import React from 'react'
import gtrackIcon from "../../Images/gtrackicons.png"
import { useState } from 'react';

const DigitalLinkTab = () => {
    const [selectedOption, setSelectedOption] = useState("Safety-Information");
 
  //Digital Link Tab
  const handleOptionChange = (option) => {
    setSelectedOption(option);
    
    switch (option) {
      case "Safety-Information":
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

      case "Promotional-Offers":
      break;

      case "Product-Contents":
      break;

      case "Product-Location":
      break;

      case "Product-Recall":
      break;

      case "Recipe":
      break;

      case "Packaging-Composition":
      break;

      case "Electronic-Leaflets":
        break;

      // Add more cases for other options
      default:
        break;
    }
  };


  const renderDataGrid = () => {
    switch (selectedOption) {
      case "Safety-Information":
        return (
          <div className='h-auto w-full mt-3'>

            <div className='flex flex-col gap-2 p-2 border-2 border-dashed'>
                <h1 className='font-normal bg-primary text-white px-2 py-1'>Detailed Information</h1>
                <div className='flex justify-between'>
                    <div className='w-[50%]'>
                        <p className='text-[#4AA9C4]'>Safety Information</p>
                    </div>
                    <div className='flex w-[50%] overflow-x-auto gap-2'>
                      <p>:</p>
                      {/* <span className='ml-1 text-[#CD8742]'>{safetyInformation?.[0]?.SafetyDetailedInformation}</span> */}
                      <span className='ml-1 text-[#CD8742]'>Safety Information</span>
                    </div>
                </div>
                  <div className='flex justify-between'>
                      <div className='w-[50%]'>
                          <p className='text-[#4AA9C4]'>Link Type</p>
                      </div>
                      <div className='flex w-[50%] overflow-x-auto gap-2'>
                        <p>:</p>
                          {/* <span className='ml-1 text-[#CD8742]'>{safetyInformation?.[0]?.LinkType}</span> */}
                          <span className='ml-1 text-[#CD8742]'>Link Type</span>
                      </div>
                  </div>

                  <div className='flex justify-between'>
                      <div className='w-[50%]'>
                          <p className='text-[#4AA9C4]'>Target URL</p>
                      </div>
                      <div className='flex w-[50%] overflow-x-auto gap-2'>
                        <p>:</p>
                          {/* <span className='ml-1 text-[#CD8742]'>{safetyInformation?.[0]?.TargetURL}</span> */}
                          <span className='ml-1 text-[#CD8742]'>Target URL</span>
                      </div>
                  </div>

                  <div className='flex justify-between'>
                      <div className='w-[50%]'>
                          <p className='text-[#4AA9C4]'>Company Name</p>
                      </div>
                      <div className='flex w-[50%] overflow-x-auto gap-2'>
                        <p>:</p>
                          {/* <span className='ml-1 text-[#CD8742]'>{safetyInformation?.[0]?.companyName}</span> */}
                          <span className='ml-1 text-[#CD8742]'>Company Name</span>
                      </div>
                  </div>
            </div>

          </div>
        );

      case "Promotional-Offers":
        return (
          <div className='h-auto w-full mt-3'>
            <div className='flex flex-col gap-2 p-2 border-2 border-dashed'>
                <h1 className='font-normal bg-primary text-white px-2 py-1'>Detailed Information</h1>
                  <div className='flex justify-between'>
                      <div className='w-[50%]'>
                          <p className='text-[#4AA9C4]'>Promotional Offers</p>
                      </div>
                      <div className='flex w-[50%] overflow-x-auto gap-2'>
                        <p>:</p>
                          {/* <span className='ml-1 text-[#CD8742]'>{promotionalOffers?.[0]?.PromotionalOffers}</span> */}
                          <span className='ml-1 text-[#CD8742]'>Promotional Offers</span>
                      </div>
                  </div>
               
                  <div className='flex justify-between'>
                      <div className='w-[50%]'>
                          <p className='text-[#4AA9C4]'>Link Type</p>
                      </div>
                      <div className='flex w-[50%] overflow-x-auto gap-2'>
                        <p>:</p>
                        {/* < span className='ml-1 text-[#CD8742]'>{promotionalOffers?.[0]?.LinkType}</span> */}
                          <span className='ml-1 text-[#CD8742]'>Link Type</span>
                      </div>
                  </div>

                  <div className='flex justify-between'>
                      <div className='w-[50%]'>
                          <p className='text-[#4AA9C4]'>Target URL</p>
                      </div>
                      <div className='flex w-[50%] overflow-x-auto gap-2'>
                        <p>:</p>
                          {/* <span className='ml-1 text-[#CD8742]'>{promotionalOffers?.[0]?.TargetURL}</span> */}
                          <span className='ml-1 text-[#CD8742]'>Target URL</span>
                      </div>
                  </div>

                  <div className='flex justify-between'>
                      <div className='w-[50%]'>
                          <p className='text-[#4AA9C4]'>Price</p>
                      </div>
                      <div className='flex w-[50%] overflow-x-auto gap-2'>
                        <p>:</p>
                          {/* <span className='ml-1 text-[#CD8742]'>{promotionalOffers?.[0]?.price}</span> */}
                          <span className='ml-1 text-[#CD8742]'>Price</span>
                      </div>
                  </div>
            </div>

          </div>
        );

      case "Product-Contents":
        return (
          <div className='h-auto w-full mt-3'>
            <div className='flex flex-col gap-2 p-2 border-2 border-dashed'>
              <h1 className='font-normal bg-primary text-white px-2 py-1'>Detailed Information</h1>
                 <div className='flex justify-between'>
                      <div className='w-[50%]'>
                          <p className='text-[#4AA9C4]'>Product Allergen Information</p>
                      </div>
                      <div className='flex w-[50%] overflow-x-auto gap-2'>
                        <p>:</p>
                        {/* <span className='ml-1 text-[#CD8742]'>{productContent?.[0]?.ProductAllergenInformation}</span> */}
                          <span className='ml-1 text-[#CD8742]'>Product Allergen Information</span>
                      </div>
                  </div>
              
                  <div className='flex justify-between'>
                      <div className='w-[50%]'>
                          <p className='text-[#4AA9C4]'>Allergen Info</p>
                      </div>
                      <div className='flex w-[50%] overflow-x-auto gap-2'>
                        <p>:</p>
                        {/* <span className='ml-1 text-[#CD8742]'>{productContent?.[0]?.allergen_info}</span> */}
                          <span className='ml-1 text-[#CD8742]'>Allergen Info</span>
                      </div>
                  </div>

                  <div className='flex justify-between'>
                      <div className='w-[50%]'>
                          <p className='text-[#4AA9C4]'>Ingredients</p>
                      </div>
                      <div className='flex w-[50%] overflow-x-auto gap-2'>
                        <p>:</p>
                        {/* <span className='ml-1 text-[#CD8742]'>{productContent?.[0]?.ingredients}</span> */}
                          <span className='ml-1 text-[#CD8742]'>Ingredients</span>
                      </div>
                  </div>

                  <div className='flex justify-between'>
                      <div className='w-[50%]'>
                          <p className='text-[#4AA9C4]'>Manufacturing Date</p>
                      </div>
                      <div className='flex w-[50%] overflow-x-auto gap-2'>
                        <p>:</p>
                        {/* <span className='ml-1 text-[#CD8742]'>{productContent?.[0]?.ManufacturingDate}</span> */}
                          <span className='ml-1 text-[#CD8742]'>Manufacturing Date</span>
                      </div>
                  </div>

                  <div className='flex justify-between'>
                      <div className='w-[50%]'>
                          <p className='text-[#4AA9C4]'>Best Before Date</p>
                      </div>
                      <div className='flex w-[50%] overflow-x-auto gap-2'>
                        <p>:</p>
                        {/* <span className='ml-1 text-[#CD8742]'>{productContent?.[0]?.bestBeforeDate}</span> */}
                          <span className='ml-1 text-[#CD8742]'>Best Before Date</span>
                      </div>
                  </div> 
                </div>
          </div>
        );

      case "Product-Location":
        return (
          <div className='h-auto w-full mt-3'>
            <div className='flex flex-col gap-2 p-2 border-2 border-dashed'>
              <h1 className='font-normal bg-primary text-white px-2 py-1'>Detailed Information</h1>
              
              <div className='flex justify-between'>
                      <div className='w-[50%]'>
                          <p className='text-[#4AA9C4]'>Product Location Origin</p>
                      </div>
                      <div className='flex w-[50%] overflow-x-auto gap-2'>
                        <p>:</p>
                        {/* <span className='ml-1 text-[#CD8742]'>{productLocationofOrigin?.[0]?.ProductLocationOrigin}</span> */}
                          <span className='ml-1 text-[#CD8742]'>Product Location Origin</span>
                      </div>
              </div>

              <div className='flex justify-between'>
                  <div className='w-[50%]'>
                    <p className='text-[#4AA9C4]'>Link Type</p>
                  </div>
                  <div className='flex w-[50%] overflow-x-auto gap-2'>
                    <p>:</p>
                    {/* <span className='ml-1 text-[#CD8742]'>{productLocationofOrigin?.[0]?.LinkType}</span> */}
                    <span className='ml-1 text-[#CD8742]'>Link Type</span>
                  </div>
              </div>

              <div className='flex justify-between'>
                  <div className='w-[50%]'>
                    <p className='text-[#4AA9C4]'>Ingredients</p>
                  </div>
                  <div className='flex w-[50%] overflow-x-auto gap-2'>
                    <p>:</p>
                    {/* <span className='ml-1 text-[#CD8742]'>{productLocationofOrigin?.[0]?.GTIN}</span> */}
                    <span className='ml-1 text-[#CD8742]'>Ingredients</span>
                  </div>
              </div>

              <div className='flex justify-between'>
                  <div className='w-[50%]'>
                    <p className='text-[#4AA9C4]'>Manufacturing Date</p>
                  </div>
                  <div className='flex w-[50%] overflow-x-auto gap-2'>
                    <p>:</p>
                    {/* <span className='ml-1 text-[#CD8742]'>{productLocationofOrigin?.[0]?.ExpiryDate}</span> */}
                    <span className='ml-1 text-[#CD8742]'>Manufacturing Date</span>
                  </div>
              </div>
          </div>
          </div>
        );

      case "Product-Recall":
        return (
          <div className='h-auto w-full mt-3'>
            <div className='flex flex-col gap-2 p-2 border-2 border-dashed'>
                {/* <h1 className='text-center font-semibold bg-yellow-100'>Product Recall RECORD</h1> */}
                <h1 className='font-normal bg-primary text-white px-2 py-1'>Detailed Information</h1>

                <div className='flex justify-between'>
                  <div className='w-[50%]'>
                    <p className='text-[#4AA9C4]'>ProductRecall</p>
                  </div>
                  <div className='flex w-[50%] overflow-x-auto gap-2'>
                    <p>:</p>
                    {/* <span className='ml-1 text-[#CD8742]'>{productRecall?.[0]?.ProductRecall}</span> */}
                    <span className='ml-1 text-[#CD8742]'>ProductRecall</span>
                  </div>
               </div>
               
                <div className='flex justify-between'>
                  <div className='w-[50%]'>
                    <p className='text-[#4AA9C4]'>GTIN</p>
                  </div>
                  <div className='flex w-[50%] overflow-x-auto gap-2'>
                    <p>:</p>
                    {/* <span className='ml-1 text-[#CD8742]'>{productRecall?.[0]?.GTIN}</span> */}
                    <span className='ml-1 text-[#CD8742]'>GTIN</span>
                  </div>
                </div>


                <div className='flex justify-between'>
                  <div className='w-[50%]'>
                    <p className='text-[#4AA9C4]'>Link Type</p>
                  </div>
                  <div className='flex w-[50%] overflow-x-auto gap-2'>
                    <p>:</p>
                    {/* <span className='ml-1 text-[#CD8742]'>{productRecall?.[0]?.LinkType}</span> */}
                    <span className='ml-1 text-[#CD8742]'>Link Type</span>
                  </div>
                </div>


                <div className='flex justify-between'>
                  <div className='w-[50%]'>
                    <p className='text-[#4AA9C4]'>Expiry Date</p>
                  </div>
                  <div className='flex w-[50%] overflow-x-auto gap-2'>
                    <p>:</p>
                    {/* <span className='ml-1 text-[#CD8742]'>{productRecall?.[0]?.ExpiryDate}</span> */}
                    <span className='ml-1 text-[#CD8742]'>Expiry Date</span>
                  </div>
                </div>
            </div>
          </div>
        );

      case "Recipe":
        return (
          <div className='h-auto w-full mt-3'>
            <div className='flex flex-col gap-2 p-2 border-2 border-dashed'>
              <h1 className='font-normal bg-primary text-white px-2 py-1'>Detailed Information</h1>
                <div className='flex justify-between'>
                  <div className='w-[50%]'>
                    <p className='text-[#4AA9C4]'>Title</p>
                  </div>
                  <div className='flex w-[50%] overflow-x-auto gap-2'>
                    <p>:</p>
                    {/* <span className='ml-1 text-[#CD8742]'>{recipe?.[0]?.title}</span> */}
                    <span className='ml-1 text-[#CD8742]'>Title</span>
                  </div>
                </div>

                <div className='flex justify-between'>
                  <div className='w-[50%]'>
                    <p className='text-[#4AA9C4]'>Description</p>
                  </div>
                  <div className='flex w-[50%] overflow-x-auto gap-2'>
                    <p>:</p>
                    {/* <span className='ml-1 text-[#CD8742]'>{recipe?.[0]?.description}</span> */}
                    <span className='ml-1 text-[#CD8742]'>Description</span>
                  </div>
                </div>

                {/* <div>
                    <p className='text-base'>Ingredients: <span className='font-semibold ml-1'>{recipe?.[0]?.ingredients}</span></p>
                </div> */}
                <div className='flex justify-between'>
                  <div className='w-[50%]'>
                    <p className='text-[#4AA9C4]'>Ingredients</p>
                  </div>
                  <div className='flex w-[50%] overflow-x-auto gap-2'>
                    <p>:</p>
                    {/* <span className='ml-1 text-[#CD8742]'>{recipe?.[0]?.ingredients}</span> */}
                    <span className='ml-1 text-[#CD8742]'>Ingredients</span>
                  </div>
                </div>

                {/* <div>
                    <p className='text-base'>Link Type: <span className='font-semibold ml-1'>{recipe?.[0]?.LinkType}</span></p>
                </div> */}
                <div className='flex justify-between'>
                  <div className='w-[50%]'>
                    <p className='text-[#4AA9C4]'>Link Type</p>
                  </div>
                  <div className='flex w-[50%] overflow-x-auto gap-2'>
                    <p>:</p>
                    {/* <span className='ml-1 text-[#CD8742]'>{recipe?.[0]?.LinkType}</span> */}
                    <span className='ml-1 text-[#CD8742]'>Link Type</span>
                  </div>
                </div>
            </div>
          </div>
        );

      case "Packaging-Composition":
        return (
          <div className='h-auto w-full mt-3'>
            <div className='flex flex-col gap-2 p-2 border-2 border-dashed'>
                <h1 className='font-normal bg-primary text-white px-2 py-1'>Detailed Information</h1>

                <div className='flex justify-between'>
                  <div className='w-[50%]'>
                    <p className='text-[#4AA9C4]'>Packaging Composition</p>
                  </div>
                  <div className='flex w-[50%] overflow-x-auto gap-2'>
                    <p>:</p>
                    {/* <span className='ml-1 text-[#CD8742]'>{packagingComposition?.[0]?.consumerProductVariant}</span> */}
                    <span className='ml-1 text-[#CD8742]'>Packaging Composition</span>
                  </div>
                </div>
               

                <div className='flex justify-between'>
                  <div className='w-[50%]'>
                    <p className='text-[#4AA9C4]'>Link Type</p>
                  </div>
                  <div className='flex w-[50%] overflow-x-auto gap-2'>
                    <p>:</p>
                    {/* <span className='ml-1 text-[#CD8742]'>{packagingComposition?.[0]?.LinkType}</span> */}
                    <span className='ml-1 text-[#CD8742]'>Link Type</span>
                  </div>
                </div>

                <div className='flex justify-between'>
                  <div className='w-[50%]'>
                    <p className='text-[#4AA9C4]'>Recyclability</p>
                  </div>
                  <div className='flex w-[50%] overflow-x-auto gap-2'>
                    <p>:</p>
                    {/* <span className='ml-1 text-[#CD8742]'>{packagingComposition?.[0]?.recyclability}</span> */}
                    <span className='ml-1 text-[#CD8742]'>Recyclability</span>
                  </div>
                </div>

                {/* <div>
                    <p className='text-base'>Material: <span className='font-semibold ml-1'>{packagingComposition?.[0]?.material}</span></p>
                </div> */}
                <div className='flex justify-between'>
                  <div className='w-[50%]'>
                    <p className='text-[#4AA9C4]'>Material</p>
                  </div>
                  <div className='flex w-[50%] overflow-x-auto gap-2'>
                    <p>:</p>
                    {/* <span className='ml-1 text-[#CD8742]'>{packagingComposition?.[0]?.material}</span> */}
                    <span className='ml-1 text-[#CD8742]'>Material</span>
                  </div>
                </div>

              </div>
          </div>
        );

      case "Electronic-Leaflets":
        return (
          <div className='h-auto w-full mt-3'>
            <div className='flex flex-col gap-2 p-2 border-2 border-dashed'>
                <h1 className='font-normal bg-primary text-white px-2 py-1'>Detailed Information</h1>

                <div className='flex justify-between'>
                  <div className='w-[50%]'>
                    <p className='text-[#4AA9C4]'>Product Leaflet Information</p>
                  </div>
                  <div className='flex w-[50%] overflow-x-auto gap-2'>
                    <p>:</p>
                    {/* <span className='ml-1 text-[#CD8742]'>{electronicLeaflets?.[0]?.ProductLeafletInformation}</span> */}
                    <span className='ml-1 text-[#CD8742]'>Product Leaflet Information</span>
                  </div>
                </div>


                <div className='flex justify-between'>
                  <div className='w-[50%]'>
                    <p className='text-[#4AA9C4]'>Link Type</p>
                  </div>
                  <div className='flex w-[50%] overflow-x-auto gap-2'>
                    <p>:</p>
                    {/* <span className='ml-1 text-[#CD8742]'>{electronicLeaflets?.[0]?.LinkType}</span> */}
                    <span className='ml-1 text-[#CD8742]'>Link Type</span>
                  </div>
                </div>

                <div className='flex justify-between'>
                  <div className='w-[50%]'>
                    <p className='text-[#4AA9C4]'>Language</p>
                  </div>
                  <div className='flex w-[50%] overflow-x-auto gap-2'>
                    <p>:</p>
                    {/* <span className='ml-1 text-[#CD8742]'>{electronicLeaflets?.[0]?.Lang}</span> */}
                    <span className='ml-1 text-[#CD8742]'>Language</span>
                  </div>
                </div>

                <div className='flex justify-between'>
                  <div className='w-[50%]'>
                    <p className='text-[#4AA9C4]'>GTIN</p>
                  </div>
                  <div className='flex w-[50%] overflow-x-auto gap-2'>
                    <p>:</p>
                    {/* <span className='ml-1 text-[#CD8742]'>{electronicLeaflets?.[0]?.GTIN}</span> */}
                    <span className='ml-1 text-[#CD8742]'>GTIN</span>
                  </div>
                </div>
              </div>
          </div>
        );
      // Add more cases for other options
      default:
        return null;
    }
  };


  return (
    <div className='flex justify-between gap-2 w-full'>
        <div className='w-[25%] flex flex-col gap-2 mt-3'>
            <span
                className={`bg-[#3b5998] py-2 flex justify-start px-1 rounded-md text-white items-center gap-2 cursor-pointer 
                }`}
                onClick={() => handleOptionChange("Safety-Information")}
            >
            <img
                src={gtrackIcon}
                className="w-5 h-5 ml-1"
                alt=""
            />
                Safety Information
            </span>
            
            <span
                className={`bg-[#00acee] py-2 flex justify-start px-1 rounded-md text-white items-center gap-2 cursor-pointer ${selectedOption === "Promotional-Offers" ? "bg-yellow-500" : ""
                }`}
                onClick={() => handleOptionChange("Promotional-Offers")}
            >
            <img
                src={gtrackIcon}
                className="w-5 h-5 ml-1"
                alt=""
            />
                Promotional Offers
            </span>
            
            <span
                className={`bg-[#0072b1] py-2 flex justify-start px-1 rounded-md text-white items-center gap-2 cursor-pointer ${selectedOption === "Product-Contents" ? "bg-yellow-500" : ""
                }`}
                onClick={() => handleOptionChange("Product-Contents")}
            >
            <img src={gtrackIcon} className="w-5 h-5 ml-1" alt="" />
                Product Contents
            </span>
            
            <span
                className={`bg-[#E60023] py-2 flex justify-start px-1 rounded-md text-white items-center gap-2 cursor-pointer ${selectedOption === "Product-Location"
                ? "bg-yellow-500"
                : ""
                }`}
                onClick={() => handleOptionChange("Product-Location")}
                >
                <img
                    src={gtrackIcon}
                    className="w-5 h-5 ml-1"
                    alt=""
                />
                    Product Location of Origin
                </span>

            <span
                className={`bg-[#0099FF] py-2 flex justify-start px-1 rounded-md text-white items-center gap-2 cursor-pointer ${selectedOption === "Product-Recall"
                ? "bg-yellow-500"
                : ""
                }`}
                onClick={() => handleOptionChange("Product-Recall")}
                >
                <img
                    src={gtrackIcon}
                    className="w-5 h-5 ml-1"
                    alt=""
                />
                    Product Recall
            </span>

            <span
                className={`bg-[#db4a39] py-2 flex justify-start px-1 rounded-md text-white items-center gap-2 cursor-pointer ${selectedOption === "Recipe"
                ? "bg-yellow-500"
                : ""
                }`}
                onClick={() => handleOptionChange("Recipe")}
                >
                <img
                    src={gtrackIcon}
                    className="w-5 h-5 ml-1"
                    alt=""
                />
                    Recipe
            </span>

            <span
                className={`bg-[#25d366] py-2 flex justify-start px-1 rounded-md text-white items-center gap-2 cursor-pointer ${selectedOption === "Packaging-Composition"
                ? "bg-yellow-500"
                : ""
                }`}
                onClick={() => handleOptionChange("Packaging-Composition")}
                >
                <img
                    src={gtrackIcon}
                    className="w-5 h-5 ml-1"
                    alt=""
                />
                    Packaging Composition
            </span>

            <span
                className={`bg-[#CD201F] py-2 flex justify-start px-1 rounded-md text-white items-center gap-2 cursor-pointer ${selectedOption === "Electronic-Leaflets"
                ? "bg-yellow-500"
                : ""
                }`}
                onClick={() => handleOptionChange("Electronic-Leaflets")}
                >
                <img
                    src={gtrackIcon}
                    className="w-5 h-5 ml-1"
                    alt=""
                />
                    Electronic Leaflets
            </span>
        </div>

        {/* All Datagird Display on the right side */}
        <div className="sm:w-[75%] w-full">{renderDataGrid()}</div>

    </div>
  )
}

export default DigitalLinkTab