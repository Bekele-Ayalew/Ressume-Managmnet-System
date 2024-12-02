import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import { IJob } from "../../types/global.typing";

const column: GridColDef[] = [
    { field: "companyName", headerName: "Comapny Name", width: 200 },
    { field: "title", headerName: "Title", width: 250 },
    { field: "level", headerName: "Comapny Level", width: 200 },
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


interface IJobsGridProps {
    data: IJob[];
  }

const JobsGrid = ({ data }: IJobsGridProps) => {
  return (
    <Box sx={{ width: "100%", height: 450 }} className="jobs-grid">
    <DataGrid
      rows={data}
      columns={column}
      getRowId={(row) => row.id}
      rowHeight={50}
    />
  </Box>
  )
}

export default JobsGrid