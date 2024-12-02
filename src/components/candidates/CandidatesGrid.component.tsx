import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";
import { GridColDef } from "@mui/x-data-grid";
import moment from "moment";
import { ICandidate } from "../../types/global.typing";
import { baseUrl } from "../../constants/url.constants";
import { PictureAsPdf } from "@mui/icons-material";

const columns: GridColDef[] = [
  
    { field: "name", headerName: "Candidate Name", width: 200 },
    { field: "lastName", headerName: "Last Name", width: 200 },
    { field: "email", headerName: "Email", width: 200 },
    { field: "phoneNumber", headerName: "Mob", width: 200 },
    { field: "coverLetter", headerName: "CV", width: 200 },
    { field: "resumeUrl", headerName: "Download", width: 200, 
    renderCell: (params) => {
      const resumeUrl = params.row.resumeUrl;
      return (
          resumeUrl ? (
              <a href={`${baseUrl}/Candidate/DownloadPDF/Url?url=${resumeUrl}`} download>
                  <PictureAsPdf/>
              </a>
          ) : "Not Attached File"
      );
  }
  
    },
    { field: "jobTitle", headerName: "Job Title", width: 200 },
];

interface ICandidateGridProps {
    data: ICandidate[];
}

const CandidatesGrid = ({ data }: ICandidateGridProps) => {
    return (
        <Box sx={{ width: "100%", height: 450 }} className="candidates-grid">
            <DataGrid
                rows={data}
                columns={columns}
                getRowId={(row) => row.email}
                rowHeight={50}
            />
        </Box>
    );
}

export default CandidatesGrid;
