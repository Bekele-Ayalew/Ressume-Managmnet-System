import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import { ICompany } from "../../types/global.typing";

const column: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "name", headerName: "Comapny Name", width: 200 },
  { field: "size", headerName: "Size", width: 150 },
  { field: "isActive", headerName: "ISActive", width: 150 },

  {
    field: "createdAt",
    headerName: "Creation Date",
    width: 200,
    renderCell: (params) => moment(params.row.createdAt).format("YYYY-MMM-DD"),
  },
  {
    field: "modifiedAt",
    headerName: "Modification Date",
    width: 200,
    renderCell: (params) => moment(params.row.modifiedAt).format("YYYY-MMM-DD"),
  },
];

interface ICompaniesGridProps {
  data: ICompany[];
}

const CompaniesGrid = ({ data }: ICompaniesGridProps) => {
  return (
    <Box sx={{ width: "100%", height: 450 }} className="companies-grid">
      <DataGrid
        rows={data}
        columns={column}
        getRowId={(row) => row.id}
        rowHeight={50}
      />
    </Box>
  );
};

export default CompaniesGrid;
