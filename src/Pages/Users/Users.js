import { useState, useEffect } from 'react'
import DataTable from '../../components/Datatable/Datatable'
import { usersColumn } from '../../utils/datatablesource'
import Swal from 'sweetalert2'
import newRequest from '../../utils/userRequest'
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useNavigate } from 'react-router-dom'

const Users = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [alldata, setAlldata] = useState([])
    const [filteredData, setFilteredData] = useState([]); // for the map markers
    const vendorData = JSON.parse(sessionStorage.getItem("vendorData"))
    //   console.log(vendorData?.user)
    const navigate = useNavigate()
    

        useEffect(() => {
            const getAllCustomers = async () => {
                setIsLoading(true)
                try {
    
                    const response = await newRequest.get(`/getSupplierInternalUserByVendorId?vendor_id=${vendorData?.user?.id}`)
                    setAlldata(response?.data)
                    console.log(response?.data)
    
                }
                catch (error) {
                    console.log(error);
                    // Swal.fire({
                    //     icon: 'error',
                    //     title: 'Oops...',
                    //     text: error?.response?.data?.message || 'Something went wrong'
                    // })
    
                }
                finally {
                    setIsLoading(false)
                }
    
    
            };
            getAllCustomers();
    },[])


    const handleEdit = (row) => {
        console.log(row);
        // store the row data in session storage
        sessionStorage.setItem("userRowData", JSON.stringify(row))
        navigate("/update-user/" + row?.vendor_id)
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
                try {
                    // convert row id to number
                    const vendor_id = Number(row.vendor_id);
                    console.log(row);
                    console.log(vendor_id);
                  
                    await newRequest.delete(`/deleteSupplierInternalUser?user_id=${vendor_id}`);


                    const updatedData = filteredData.filter((item) => item?.vendor_id !== row?.vendor_id);
                    setFilteredData(updatedData);
                    Swal.fire({
                        icon: 'success',
                        title: 'Deleted!',
                        text: 'Record has been deleted.',
                        showConfirmButton: false,
                        timer: 2000,
                    });
                }
                catch (err) {
                    console.log(err);
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: err?.response?.data?.message || 'Something went wrong'
                    })
                    return
                }

                // filter out the deleted user from the data

            } else if (result.dismiss === Swal.DismissReason.cancel) {
                return
            }
        })
    }

    
    const handleRowClickInParent = (item) => {
        if (!item || item?.length === 0) {
          setFilteredData(alldata)
          return
        }
        setFilteredData(item)
      
      }
      


  return (
    <div>
      <div className="p-3 h-full sm:ml-72">
        <div className='h-auto w-full'>
          <div className='h-16 w-full shadow-xl flex justify-start items-center px-5 border-l-2 border-t-2 border-r-2 border-[#e49515]'>
            <p className='sm:text-2xl text-sm font-body'>View All Users</p>
          </div>
        </div>

        <div className='h-auto w-full shadow-xl'>
          <div className='flex justify-center sm:justify-start items-center flex-wrap gap-2 py-10 px-3'>
            <button className="rounded-full bg-[#1E3B8B] font-body px-8 py-1 text-sm mb-3 text-white transition duration-200 hover:bg-[#4b6fd2] active:bg-blue-700">
              <i className="fas fa-arrow-left mr-1"></i> Back
            </button>

            <button onClick={() => navigate('/add-user')} className="rounded-full bg-[#1E3B8B] font-body px-8 py-1 text-sm mb-3 text-white transition duration-200 hover:bg-[#4b6fd2] active:bg-blue-700">
              <i className="fas fa-plus mr-1"></i> Add Users
            </button>

          </div>
        </div>



        <div style={{ marginLeft: '-11px', marginRight: '-11px', marginTop: '-10px' }}>
            <DataTable
                data={[alldata]}
                title="USERS"
                secondaryColor="secondary"
                columnsName={usersColumn}
                backButton={true}
                // handleUsers={true}
                uniqueId="usersId"
                handleRowClickInParent={handleRowClickInParent}
                loading={isLoading}
                checkboxSelection='disabled'

                dropDownOptions={[
                    {
                      label: "Edit",
                      icon: <EditIcon fontSize="small" style={{ color: '#FF0032' }} />
                       ,
                      action: handleEdit,
                    },
                    {
                      label: "Delete",
                      icon: <DeleteIcon fontSize="small" style={{ color: '#FF0032' }} />
                      ,
                      action: handleDelete,
                    }
                    ]}

                    />
            </div>


      </div>  
    </div>
  )
}

export default Users