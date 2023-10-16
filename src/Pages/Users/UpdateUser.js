import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'
import { RiseLoader } from 'react-spinners';
import { SnackbarContext } from '../../Contexts/SnackbarContext';
import { useEffect } from 'react';
import newRequest from '../../utils/userRequest';
import Swal from 'sweetalert2';

const UpdateUser = () => {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false);
    const [vendorId, setVendorId] = useState('');
    const [userName, setUserName] = useState('');
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const [userRole, setUserRole] = useState('');

    // get the row data from session storage
    const rowData = JSON.parse(sessionStorage.getItem("userRowData"))
    console.log(rowData)

    // Set the state with the pre-filled data when rowData changes
    useEffect(() => {
      if (rowData) {
        // setVendorId(rowData.vendor_id);
        setUserName(rowData.user_name);
        setUserEmail(rowData.user_email);
        setUserPassword(rowData.user_password);
        setUserRole(rowData.user_role);
      }
    }, []);

    const { openSnackbar } = useContext(SnackbarContext);

  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
  
    try {
        const response = await newRequest.put(`/updateSupplierInternalUser`, {
            user_id: rowData?.user_id,
            user_name: userName,
            user_email: userEmail,
            user_password: userPassword,
            user_role: userRole
        })
        console.log(response?.data)
        Swal.fire({
          icon: 'success',
          title: 'Data Updated Successfully',
          text: response?.data?.message || 'Something went wrong',
          timer: 2000,
          timerProgressBar: true,
          
        })
        navigate(-1)
    
    
    
    }
    catch (error) {
        console.log(error);
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error?.response?.data?.message || 'Something went wrong',
          timer: 2000,
          timerProgressBar: true,
          
        })
  
  
    }
    finally {
        setIsLoading(false)
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


        {/* <SideBar /> */}

        <div className="p-3 h-full sm:ml-72">

        <div className='h-auto w-full p-1'>
            <div className='h-16 w-full shadow-xl flex justify-start items-center px-10 border-l-2 border-[#e49515]'>
                <p className='sm:text-2xl text-sm font-body'>Update User</p>
            </div>
        </div>

        <div className='h-auto w-full px-0 pt-2 shadow-xl'>
            <div className='h-auto w-full p-6 shadow-xl'>
                <button onClick={() => navigate(-1)} className="rounded-full bg-[#1E3B8B] font-body px-8 py-1 text-sm mb-3 text-white transition duration-200 hover:bg-[#4b6fd2] active:bg-blue-700">
                    <i className="fas fa-arrow-left mr-1"></i> Back
                </button>


                <form onSubmit={handleSubmit}>
                    <div className='flex flex-col gap-3 sm:flex-row sm:justify-between'>
                        {/* <div className='w-full font-body sm:text-base text-sm flex flex-col gap-2'>
                            <label htmlFor='vendor'>Vendor ID<span className='text-red-600'>*</span></label>
                            <input 
                            id='vendor' 
                            value={vendorId}
                            onChange={(e) => setVendorId(e.target.value)}
                            type='text' 
                            className='border-2 border-[#e4e4e4] bg-gray-200 w-full rounded-lg p-2 mb-3'
                            readOnly
                            />                      
                        </div> */}


                        <div className='w-full font-body sm:text-base text-sm flex flex-col gap-2'>
                            <label htmlFor='name'>User Name<span className='text-red-600'>*</span></label>
                            <input
                            id='name' 
                            value={userName}
                            onChange={(e) => setUserName(e.target.value)}
                            type='text' className='border-2 border-[#e4e4e4] w-full rounded-lg p-2 mb-3' />                      
                        </div>
                    </div>


                    <div className='flex flex-col gap-3 sm:flex-row sm:justify-between'>
                        <div className='w-full font-body sm:text-base text-sm flex flex-col gap-2'>
                            <label htmlFor='email'>User Email<span className='text-red-600'>*</span></label>
                            <input
                            id='email' 
                            value={userEmail}
                            onChange={(e) => setUserEmail(e.target.value)}
                            type='email' className='border-2 border-[#e4e4e4] w-full rounded-lg p-2 mb-3' />                      
                        </div>

                        <div className='w-full font-body sm:text-base text-sm flex flex-col gap-2'>
                            <label htmlFor='password'>User Password<span className='text-red-600'>*</span></label>
                            <input
                            id='password' 
                            value={userPassword}
                            onChange={(e) => setUserPassword(e.target.value)}
                            type='text' className='border-2 border-[#e4e4e4] w-full rounded-lg p-2 mb-3' />                      
                        </div>
                    </div>

                    <div className='flex flex-col gap-3 sm:flex-row sm:justify-between'>
                        <div className='w-full font-body sm:text-base text-sm flex flex-col gap-2'>
                            <label htmlFor='role'>User Role<span className='text-red-600'>*</span></label>
                            <input
                            id='role' 
                            value={userRole}
                            onChange={(e) => setUserRole(e.target.value)}
                            type='text' className='border-2 border-[#e4e4e4] w-full rounded-lg p-2 mb-3' />                      
                        </div>
                    </div>

                    <button type='submit' className="rounded-full bg-[#1E3B8B] font-body px-8 py-3 text-sm mb-0 mt-6 text-white transition duration-200 hover:bg-[#4b6fd2] active:bg-blue-700">
                        <i className="fas fa-check-circle mr-1"></i> Submit
                    </button>

                </form>

           </div>
        </div>

      </div>
    </div>
  )
}

export default UpdateUser