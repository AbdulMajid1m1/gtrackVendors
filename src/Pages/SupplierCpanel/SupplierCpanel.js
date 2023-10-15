import React from 'react'
import erpdata from "../../Images/erpdata.jpeg"
import restapiicon from "../../Images/restapiicon.png"
import { useNavigate } from 'react-router-dom'
import backarrow from "../../Images/backarrow1.png"

const SupplierCpanel = () => {

    const navigate = useNavigate();
  return (
    <div>
        <div className="p-3 h-full sm:ml-72">
            <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg">
            
          {/* Receving   */}
          <div className='h-10 w-full bg-[#F28C28] rounded-sm mb-3 flex justify-between items-center'>
              <p 
              className='sm:text-2xl sm:font-bold font-body text-white text-lg font-semibold px-3'>
                  CONTROL PANEL 
              </p>

              <span onClick={() => navigate(-1)} className='cursor-pointer'>
                  <img src={backarrow} 
                        className='h-8 w-8 text-white mr-3'
                        style={{ filter: 'brightness(0) invert(1)' }}
                        alt='' 
                   />
              </span>
          </div>

          <div className="grid sm:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 grid-cols-2 gap-4 mb-6 ">
              {/* First Row */}
              <div onClick={() => navigate('/cpanel-api-connection')} className="flex flex-col gap-2 items-center justify-center h-24 rounded shadow-lg bg-white cursor-pointer">
                  <img src={restapiicon} className="h-16 w-auto rounded-md " alt='' />
                  <p className="sm:text-base text-[12px] font-bold sm:font-normal">Api Connection</p>
              </div> 
              <div onClick={() => navigate('/cpanel-erp-data')} className="flex flex-col gap-2 items-center justify-center h-24 rounded shadow-lg bg-white cursor-pointer">
                  <img src={erpdata} className="h-16 w-auto rounded-md " alt='' />
                  <p className="sm:text-base text-sm font-medium sm:font-normal">Erp Data</p>
              </div>

          </div>  
        </div>
      </div>
    </div>
  )
}

export default SupplierCpanel