import React, { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { RiseLoader } from 'react-spinners';
import newRequest from '../../utils/userRequest';
import Swal from 'sweetalert2';


const UpdateVendor = () => {
    const navigate = useNavigate()

    const [vendorId, setVendorId] = React.useState('')
    const [memberId, setMemberId] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [locationEnglish, setLocationEnglish] = React.useState('')
    const [locationArabic, setLocationArabic] = React.useState('')
    const [contactPerson, setContactPerson] = React.useState('')
    const [landLine, setLandLine] = React.useState('')
    const [mobileNumber, setMobileNumber] = React.useState('')
    const [extension, setExtension] = React.useState('')
    const [zipCode, setZipCode] = React.useState('')
    const [website, setWebsite] = React.useState('')
    const [status, setStatus] = React.useState('')
    const [isLoading, setIsLoading] = useState(false);


    function setInitialData() {
      const vendorData = JSON.parse(sessionStorage.getItem('vendorData'));
     
      console.log(vendorData)
      setVendorId(vendorData?.user?.id || vendorData?.id);
      setMemberId(vendorData?.user?.member_id || vendorData?.member_id);
      setEmail(vendorData?.user?.email || vendorData?.email);
      setLocationEnglish(vendorData?.user?.company_name_English || vendorData?.company_name_English);
      setLocationArabic(vendorData?.user?.company_name_Arabic || vendorData?.company_name_Arabic);
      setContactPerson(vendorData?.user?.contact_person || vendorData?.contact_person);
      setLandLine(vendorData?.user?.company_landline || vendorData?.company_landline);
      setMobileNumber(vendorData?.user?.mobile_no || vendorData?.mobile_no);
      setExtension(vendorData?.user?.extension || vendorData?.extension);
      setZipCode(vendorData?.user?.zip_code || vendorData?.zip_code);
      setWebsite(vendorData?.user?.website || vendorData?.website);
      setStatus(vendorData?.user?.status || vendorData?.status);

    }

      // Set initial data
      useEffect(() => {
        setInitialData();
      }, []);
      
  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true)

    newRequest.put('/updateVendorData', {
        id: vendorId,
        member_id: memberId,
        email: email,
        company_name_English: locationEnglish,
        company_name_Arabic: locationArabic,
        contact_person: contactPerson,
        company_landline: landLine,
        mobile_no: mobileNumber,
        extension: extension,
        zip_code: zipCode,
        website: website,
        status: status,
        })
        .then((response) => {
            console.log(response)
            setIsLoading(false)
            Swal.fire({
                icon: 'success',
                title: 'Success',
                text: response?.data?.message || 'Vendor Updated Successfully!',
            })
 
            // Check if the response contains updated data
            const updatedData = response?.data?.updatedVendorData;
            sessionStorage.setItem('vendorData', JSON.stringify(updatedData));
            navigate(-1)
        }
        )
        .catch((err) => {
            console.log(err)
            setIsLoading(false)
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: err?.response?.data || 'Something went wrong!',
            })
        })
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

        <div className="p-3 h-full sm:ml-72">
            <div className='h-auto w-full p-1'>
                <div className='h-16 w-full shadow-xl flex justify-start items-center px-10 border-l-2 border-[#e49515]'>
                    <p className='sm:text-2xl text-sm font-body'>Update Vendors</p>
                </div>
            </div>

            <div className='h-auto w-full px-0 pt-2 shadow-xl'>
                <div className='h-auto w-full p-6 shadow-xl'>
                    <button onClick={() => navigate(-1)} className="rounded-full bg-[#1E3B8B] font-body px-8 py-1 text-sm mb-3 text-white transition duration-200 hover:bg-[#4b6fd2] active:bg-blue-700">
                        <i className="fas fa-arrow-left mr-1"></i> Back
                    </button>
                  
                    <form onSubmit={handleSubmit}>
                        
                        <div className='flex flex-col gap-3 sm:flex-row sm:justify-between'>
                            <div className='w-full font-body sm:text-base text-sm flex flex-col gap-2'>
                                <label htmlFor='email'>Email<span className='text-red-600'>*</span></label>
                                <input 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                id='email' 
                                placeholder='Enter Valid Email'
                                type='text' className='border-2 border-[#e4e4e4] w-full rounded-lg p-2 mb-3' />                      
                            </div>
                        </div>
                        
                        <div className='flex flex-col gap-3 sm:flex-row sm:justify-between'>
                            <div className='w-full font-body sm:text-base text-sm flex flex-col gap-2'>
                                <label htmlFor='locationEnglish'>Location Name [English]<span className='text-red-600'>*</span></label>
                                <input 
                                value={locationEnglish}
                                onChange={(e) => setLocationEnglish(e.target.value)}
                                id='locationEnglish' 
                                placeholder='Location Name English'
                                type='text' className='border-2 border-[#e4e4e4] w-full rounded-lg p-2 mb-3' />                      
                            </div>


                            <div className='w-full font-body sm:text-base text-sm flex flex-col gap-2'>
                                <label htmlFor='locationArabic'>Location Name [Arabic]<span className='text-red-600'>*</span></label>
                                <input
                                value={locationArabic}
                                onChange={(e) => setLocationArabic(e.target.value)} 
                                id='locationArabic' 
                                placeholder='Location Name Arabic'
                                type='text' className='border-2 border-[#e4e4e4] w-full rounded-lg p-2 mb-3' />                      
                            </div>
                        </div>


                        <div className='flex flex-col gap-3 sm:flex-row sm:justify-between'>
                            <div className='w-full font-body sm:text-base text-sm flex flex-col gap-2'>
                                <label htmlFor='contactperson'>Contact Person<span className='text-red-600'>*</span></label>
                                <input
                                value={contactPerson}
                                onChange={(e) => setContactPerson(e.target.value)} 
                                id='contactperson' 
                                placeholder='Contact Person'
                                type='text' className='border-2 border-[#e4e4e4] w-full rounded-lg p-2 mb-3' />                      
                            </div>

                            <div className='w-full font-body sm:text-base text-sm flex flex-col gap-2'>
                                <label htmlFor='landline'>Company Landline<span className='text-red-600'>*</span></label>
                                <input
                                value={landLine}
                                onChange={(e) => setLandLine(e.target.value)} 
                                id='landline' 
                                placeholder='Company Landline'
                                type='text' className='border-2 border-[#e4e4e4] w-full rounded-lg p-2 mb-3' />                      
                            </div>
                        </div>

                        <div className='flex flex-col gap-3 sm:flex-row sm:justify-between'>
                            <div className='w-full font-body sm:text-base text-sm flex flex-col gap-2'>
                                <label htmlFor='mobile'>Mobile Number<span className='text-red-600'>*</span></label>
                                <input
                                value={mobileNumber}
                                onChange={(e) => setMobileNumber(e.target.value)} 
                                id='mobile' 
                                placeholder='Mobile Number'
                                type='text' className='border-2 border-[#e4e4e4] w-full rounded-lg p-2 mb-3' />                      
                            </div>

                            <div className='w-full font-body sm:text-base text-sm flex flex-col gap-2'>
                                <label htmlFor='extension'>Extension<span className='text-red-600'>*</span></label>
                                <input
                                value={extension}
                                onChange={(e) => setExtension(e.target.value)} 
                                id='extension' 
                                placeholder='Extension'
                                type='text' className='border-2 border-[#e4e4e4] w-full rounded-lg p-2 mb-3' />                      
                            </div>
                        </div>


                        <div className='flex flex-col gap-3 sm:flex-row sm:justify-between'>
                            <div className='w-full font-body sm:text-base text-sm flex flex-col gap-2'>
                                <label htmlFor='zipcode'>Zip Code<span className='text-red-600'>*</span></label>
                                <input
                                value={zipCode}
                                id='zipcode'
                                onChange={(e) => setZipCode(e.target.value)}
                                placeholder='Zip Code' 
                                type='number' className='border-2 border-[#e4e4e4] w-full rounded-lg p-2 mb-3' />                      
                            </div>
                        </div>


                        <div className='flex flex-col gap-3 sm:flex-row sm:justify-between'>
                            <div className='w-full font-body sm:text-base text-sm flex flex-col gap-2'>
                                <label htmlFor='website'>Website<span className='text-red-600'>*</span></label>
                                <input
                                id='website' 
                                value={website}
                                onChange={(e) => setWebsite(e.target.value)}
                                placeholder='Website'
                                type='text' className='border-2 border-[#e4e4e4] w-full rounded-lg p-2 mb-3' />                      
                            </div>
                        </div>

                        <button type='submit' className="rounded-full bg-[#1E3B8B] font-body px-8 py-3 text-sm mb-0 mt-6 text-white transition duration-200 hover:bg-[#4b6fd2] active:bg-blue-700">
                            <i className="fas fa-check-circle mr-1"></i> Update
                        </button>
                    </form>
                </div>
            </div>
      </div>
    </div>
  )
}

export default UpdateVendor