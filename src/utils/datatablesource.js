import InsertDriveFileIcon from "@mui/icons-material/InsertDriveFile";
export const InventorySuppliersDataColumn = [
  {
    field: "id",
    headerName: "ID",
    width: 180,
    editable: true,
  },
  {
    field: "name",
    headerName: "NAME",
    width: 180,
    editable: true,
  },
  {
    field: "date",
    headerName: "DATE",
    width: 180,
    editable: true,
  },


  {
    field: "complete_name",
    headerName: "Complete Name",
    width: 180,
    editable: true,
  },
  {
    field: "lang",
    headerName: "Language",
    width: 180,
    editable: true,
  },
  {
    field: "tz",
    headerName: "Timezone",
    width: 180,
    editable: true,
  },
  {
    field: "email",
    headerName: "Email",
    width: 180,
    editable: true,
  },
  {
    field: "phone",
    headerName: "Phone",
    width: 180,
    editable: true,
  },
  {
    field: "mobile",
    headerName: "Mobile",
    width: 180,
    editable: true,
  },
  {
    field: "is_company",
    headerName: "Is Company",
    width: 180,
    editable: true,
  },
  {
    field: "industry_id",
    headerName: "Industry ID",
    width: 180,
    editable: true,
  },
  {
    field: "company_type",
    headerName: "Company Type",
    width: 180,
    editable: true,
  },



];




export const ListOfCustomersColumn = [
  {
    field: "id",
    headerName: "Customer Id",
    width: 120,
    editable: true,
  },
  {
    field: "user_type",
    headerName: "User Type",
    width: 180,
    editable: true,
  },
  {
    field: "slug",
    headerName: "Slug",
    width: 180,
    editable: true,
  },
  {
    field: "location_uk",
    headerName: "Location UK",
    width: 180,
    editable: true,
  },
  {
    field: "have_cr",
    headerName: "Have CR",
    width: 180,
    editable: true,
  },
  {
    field: "cr_documentID",
    headerName: "CR Document ID",
    width: 180,
    editable: true,
  },
  {
    field: "document_number",
    headerName: "Document Number",
    width: 180,
    editable: true,
  },
  {
    field: "fname",
    headerName: "First Name",
    width: 180,
    editable: true,
  },
  {
    field: "lname",
    headerName: "Last Name",
    width: 180,
    editable: true,
  },
  {
    field: "email",
    headerName: "Email",
    width: 180,
    editable: true,
  },
  {
    field: "mobile",
    headerName: "Mobile",
    width: 180,
    editable: true,
  },
  {
    field: "image",
    headerName: "Image",
    width: 180,
    editable: true,
  },
  {
    field: "address",
    headerName: "Address",
    width: 180,
    editable: true,
  },
  {
    field: "address1",
    headerName: "Address 1",
    width: 180,
    editable: true,
  },
  {
    field: "address2",
    headerName: "Address 2",
    width: 180,
    editable: true,
  },
  {
    field: "po_box",
    headerName: "PO Box",
    width: 180,
    editable: true,
  },
  {
    field: "mbl_extension",
    headerName: "Mobile Extension",
    width: 180,
    editable: true,
  },
  {
    field: "website",
    headerName: "Website",
    width: 180,
    editable: true,
  },
  {
    field: "no_of_staff",
    headerName: "Number of Staff",
    width: 180,
    editable: true,
  },
  {
    field: "companyID",
    headerName: "Company ID",
    width: 180,
    editable: true,
  },
  {
    field: "district",
    headerName: "District",
    width: 180,
    editable: true,
  },
  {
    field: "building_no",
    headerName: "Building Number",
    width: 180,
    editable: true,
  },
  {
    field: "additional_number",
    headerName: "Additional Number",
    width: 180,
    editable: true,
  },
  {
    field: "other_landline",
    headerName: "Other Landline",
    width: 180,
    editable: true,
  },
  {
    field: "unit_number",
    headerName: "Unit Number",
    width: 180,
    editable: true,
  },
  {
    field: "qr_corde",
    headerName: "QR Code",
    width: 180,
    editable: true,
  },
  {
    field: "email_verified_at",
    headerName: "Email Verified At",
    width: 180,
    editable: true,
  },
  {
    field: "code",
    headerName: "Code",
    width: 180,
    editable: true,
  },
  {
    field: "verification_code",
    headerName: "Verification Code",
    width: 180,
    editable: true,
  },
  {
    field: "cr_number",
    headerName: "CR Number",
    width: 180,
    editable: true,
  },
  {
    field: "cr_activity",
    headerName: "CR Activity",
    width: 180,
    editable: true,
  },
  {
    field: "company_name_eng",
    headerName: "Company Name (English)",
    width: 180,
    editable: true,
  },
  {
    field: "company_name_arabic",
    headerName: "Company Name (Arabic)",
    width: 180,
    editable: true,
  },
  // Add more fields as needed
];



export const ShipmentRequestColumns = [
  {
    field: "shipment_id",
    headerName: "Shipment Id",
    width: 120,
  },
  {
    field: "vendor_id",
    headerName: "Vendor Id",
    width: 120,

  },
  {
    field: "customer_id",
    headerName: "Customer Id",
    width: 120,
  },
];



export const ShipmentDocColumns = [
  {
    field: "document_id",
    headerName: "Document Id",
    width: 180,
  },
  {
    field: "shipment_id",
    headerName: "Shipment Id",
    width: 180,

  },
  {
    field: "document_type",
    headerName: "Document type",
    width: 180,
  },


  {
    field: "document_url",
    headerName: "Document",
    width: 180,
    renderCell: (params) => {
      console.log("params");
      console.log(params);

      return (
        <InsertDriveFileIcon
          style={{
            color: "primary",
            width: "40px",
            height: "40px",
            cursor: "pointer",
          }}
        />
      );
    },


  },
]



