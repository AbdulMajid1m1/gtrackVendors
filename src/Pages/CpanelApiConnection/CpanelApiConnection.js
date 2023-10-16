import React, { useContext, useEffect, useState } from 'react'
import "./CpanelApiConnection.css"
import sap from "../../Images/sap.png"
import D365 from "../../Images/D365.jpg"
import oracle from "../../Images/oracle.jpg"
import amazon from "../../Images/amazon.png"
import sage from "../../Images/sage.png"
import tally from "../../Images/tally.png"
import erp from "../../Images/erp.png"
import epicor from "../../Images/epicor.png"
import odoo from "../../Images/odoo.png"
import restapi from "../../Images/restapi.png"
import { useNavigate } from 'react-router-dom'
import backarrow from "../../Images/backarrow1.png"
import Swal from 'sweetalert2';
import newRequest from '../../utils/userRequest'
import { SnackbarContext } from '../../Contexts/SnackbarContext'
import { RiseLoader } from 'react-spinners';

const CpanelApiConnection = () => {

  const navigate = useNavigate();
  const { openSnackbar } = useContext(SnackbarContext);
  const [isLoading, setIsLoading] = useState(false);
  const [clickedIconName, setClickedIconName] = useState("");
  const vendorData = JSON.parse(sessionStorage.getItem("vendorData"))
  console.log(vendorData?.user)

  const handleIconClick = (erptype, iconName) => {
    // setClickedIconName(erptype);
    setSelectedIconName(iconName);



    Swal.fire({
      title: `${erptype} Credentials`,
      html:
        '<input id="url" required class="swal2-input swal2-input-full-width" placeholder="URL">' +
        '<input id="database" required class="swal2-input swal2-input-full-width" placeholder="Database">' +
        '<input id="username" required class="swal2-input swal2-input-full-width" placeholder="Username">' +
        '<input id="password" required  type="password" class="swal2-input swal2-input-full-width" placeholder="Password">',
      // for testing 
      showCancelButton: true,
      confirmButtonText: 'Connect',
      preConfirm: () => {
        const popup = Swal.getPopup();
        const url = popup.querySelector('#url');
        const database = popup.querySelector('#database');
        const username = popup.querySelector('#username');
        const password = popup.querySelector('#password');

        // Clear validation message when any input field is changed
        [url, database, username, password].forEach(input => {
          input.addEventListener('input', () => {
            Swal.resetValidationMessage();
          });
        });

        // Check if any of the fields are empty
        if (!url.value || !database.value || !username.value || !password.value) {
          Swal.showValidationMessage('All fields are required.'); // Show error message
          return false; // Return false to prevent the dialog from closing
        }
        return { url: url.value, database: database.value, username: username.value, password: password.value };
      }
    }).then((result) => {
      if (result.isConfirmed) {
        const { url, database, username, password } = result.value;

        // Create the API request body
        const apiRequestBody = {
          member_id: vendorData?.user?.id,
          erp_type: erptype,
          credential_data: {
            url: url,
            db: database,
            username: username,
            password: password
          }
        };

        newRequest.post('/saveOrUpdateERPCredentials', apiRequestBody)
          .then(response => {
            console.log(response);
            Swal.fire({
              icon: 'success',
              title: 'Success',
              text: 'Connection Successful',
              timer: 2000,
              // change confirm button color
              confirmButtonColor: '#6439ff',
            })
          })
          .catch(error => {
            console.log(error);
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: error?.response?.data?.message || 'Something went wrong!',
            });
          });
      }
    });
  }





  const handleSubmit = async (erptype) => {
    setIsLoading(true)
    try {
      const res = await newRequest.get(`/getERPCredentials?member_id=${vendorData?.user?.id}&erp_type=${erptype}`)
      // const res = await newRequest.get(`/getERPCredentials?member_id=4&erp_type=${erptype}`)
      console.log(res.data)
      localStorage.setItem("credentials", JSON.stringify(res?.data?.credentials))
      // show auto close popup
      Swal.fire({
        icon: 'success',
        title: 'Success',
        text: 'Connection Successful',
        timer: 2000,
        // change confirm button color
        confirmButtonColor: '#6439ff',
      })
    }
    catch (error) {
      console.log(error?.response?.message)
      // if status code is 404 then show the popup
      if (error?.response?.status === 404) {
        handleIconClick(erptype);
      }

      else {
        // show sweet autoclose popup
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error?.response?.message || 'Something went wrong!',

        })
      }

    }
    finally {
      setIsLoading(false)
    }

  }


  const [showContextMenu, setShowContextMenu] = useState(false);
  const [contextMenuPosition, setContextMenuPosition] = useState({ x: 0, y: 0 });
  const [selectedIconName, setSelectedIconName] = useState('');
  const [defaultIconName, setDefaultIconName] = useState('');

  useEffect(() => {
    const storedIconName = localStorage.getItem('selectedIconName');
    if (storedIconName) {
      setDefaultIconName(storedIconName);
    }
  }, []);


  const handleContextMenu = (event, iconName) => {
    event.preventDefault();
    const clickX = event.clientX;
    const clickY = event.clientY;
    setContextMenuPosition({ x: clickX, y: clickY });
    setSelectedIconName(iconName);
    setShowContextMenu(true);
  };


  const handleContextMenuOptionClick = (option, iconName) => {
    if (option === 'setDefault') {
      localStorage.setItem('selectedIconName', iconName);
      setDefaultIconName(iconName);
    }
    if (option === 'updateCredentials') {
      handleIconClick(iconName);
    }

    setShowContextMenu(false);
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
      <div className="p-3 h-full sm:ml-72">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg">

          {/* Receving   */}
          <div className='h-10 w-full bg-[#F28C28] rounded-sm mb-3 flex justify-between items-center'>
            <p
              className='sm:text-2xl sm:font-bold font-body text-white text-lg font-semibold px-3'>
              API CONNECTION
            </p>

            <p className='sm:text-2xl sm:font-bold font-body text-white text-lg font-semibold px-3'>{defaultIconName}</p>

            <span onClick={() => navigate(-1)} className='cursor-pointer'>
              <img src={backarrow}
                className='h-8 w-8 text-white mr-3'
                style={{ filter: 'brightness(0) invert(1)' }}
                alt=''
              />
            </span>
          </div>

          <div className="grid sm:grid-cols-4 lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-4 mb-6 ">
            {/* First Row */}
            <div className="flex flex-col gap-2 items-center justify-center h-24 cursor-pointer rounded shadow-lg bg-white"
              onClick={() => handleIconClick('ERP API’s')}
              onContextMenu={(event) => handleContextMenu(event, 'ERP API’s')}
            >
              <img src={erp} className="h-16 w-auto rounded-md " alt="ERP API" />
              <p className="sm:text-base text-sm font-medium sm:font-normal">ERP API’s</p>
            </div>

            <div className="flex flex-col gap-2 items-center justify-center h-24 rounded shadow-lg bg-white cursor-pointer"
              onClick={() => handleIconClick('SAP')}
              onContextMenu={(event) => handleContextMenu(event, 'SAP')}

            >
              <img src={sap} className="h-16 w-auto rounded-md " alt='' />
              <p className="sm:text-base text-[12px] font-bold sm:font-normal">SAP</p>
            </div>

            <div className="flex flex-col gap-2 items-center justify-center h-24 rounded shadow-lg bg-white cursor-pointer"
              // onClick={() => handleIconClick('Dynamics 365')}
              onClick={() => handleIconClick('Dynamics 365')}
              onContextMenu={(event) => handleContextMenu(event, 'Dynamics 365')}

            >
              <img src={D365} className="h-16 w-auto rounded-md " alt='' />
              <p className="sm:text-base text-sm font-medium sm:font-normal">D365</p>
            </div>

            <div className="flex flex-col gap-2 items-center justify-center h-24 rounded shadow-lg bg-white cursor-pointer"
              // onClick={() => handleIconClick('ORACLE')}
              onClick={() => handleIconClick('ORACLE')}
              onContextMenu={(event) => handleContextMenu(event, 'ORACLE')}
            >
              <img src={oracle} className="h-16 w-auto rounded-md " alt='' />
              <p className="sm:text-base text-sm font-medium sm:font-normal">ORACLE</p>
            </div>

            <div className="flex flex-col gap-2 items-center justify-center h-24 rounded shadow-lg bg-white cursor-pointer"
              // onClick={() => handleIconClick('ODOO')} 
              onClick={() => handleSubmit("ODOO")}
              onContextMenu={(event) => handleContextMenu(event, 'ODOO')}

            >
              <img src={odoo} className="h-16 w-auto rounded-md " alt='' />
              <p className="sm:text-base text-sm font-medium sm:font-normal">ODOO</p>
            </div>

            <div className="flex flex-col gap-2 items-center justify-center h-24 rounded shadow-lg bg-white cursor-pointer"
              // onClick={() => handleIconClick('EPICOR')}
              onClick={() => handleIconClick('EPICOR')}
              onContextMenu={(event) => handleContextMenu(event, 'EPICOR')}
            >
              <img src={epicor} className="h-16 w-auto rounded-md " alt='' />
              <p className="sm:text-base text-sm font-medium sm:font-normal">EPICOR</p>
            </div>

            <div className="flex flex-col gap-2 items-center justify-center h-24 rounded shadow-lg bg-white cursor-pointer"
              // onClick={() => handleIconClick('AMAZON')}
              onClick={() => handleIconClick('AMAZON')}
              onContextMenu={(event) => handleContextMenu(event, 'AMAZON')}
            >
              <img src={amazon} className="h-16 w-auto rounded-md " alt='' />
              <p className="sm:text-base text-sm font-medium sm:font-normal">AMAZON</p>
            </div>

            <div className="flex flex-col gap-2 items-center justify-center h-24 rounded shadow-lg bg-white cursor-pointer"
              // onClick={() => handleIconClick('SAGE')}
              onClick={() => handleIconClick('SAGE')}
              onContextMenu={(event) => handleContextMenu(event, 'SAGE')}
            >
              <img src={sage} className="h-16 w-auto rounded-md " alt='' />
              <p className="sm:text-base text-sm font-medium sm:font-normal">SAGE</p>
            </div>

            <div className="flex flex-col gap-2 items-center justify-center h-24 rounded shadow-lg bg-white cursor-pointer"
              // onClick={() => handleIconClick('TALLY')}
              onClick={() => handleIconClick('TALLY')}
              onContextMenu={(event) => handleContextMenu(event, 'TALLY')}
            >
              <img src={tally} className="h-16 w-auto rounded-md " alt='' />
              <p className="sm:text-base text-sm font-medium sm:font-normal">TALLY</p>
            </div>

            <div className="flex flex-col gap-2 items-center justify-center h-24 rounded shadow-lg bg-white cursor-pointer"
              // onClick={() => handleIconClick('REST APIS')}
              onClick={() => handleIconClick('REST APIS')}
              onContextMenu={(event) => handleContextMenu(event, 'REST APIS')}
            >
              <img src={restapi} className="h-16 w-auto rounded-md " alt='' />
              <p className="sm:text-base text-sm font-medium sm:font-normal">REST APIS</p>
            </div>


          </div>
        </div>
      </div>


      {/* Context Menu */}
      {showContextMenu && (
        <div
          className='context-menu'
          style={{ top: contextMenuPosition.y, left: contextMenuPosition.x }}
        >
          <div
            className='context-menu-option'
            // onClick={() => handleContextMenuOptionClick('setDefault')}
            onClick={() => handleContextMenuOptionClick('setDefault', selectedIconName)}

          >
            Set Default
          </div>
          <div
            className='context-menu-option'
            // onClick={() => handleContextMenuOptionClick('setDefault')}
            onClick={() => handleContextMenuOptionClick('updateCredentials', selectedIconName)}

          >
            Update Credentials
          </div>
          <div
            className='context-menu-option'
            onClick={() => setShowContextMenu(false)}
          >
            Close
          </div>
        </div>
      )}

      <p>Default Icon Name: {defaultIconName}</p>

    </div>
  )
}

export default CpanelApiConnection