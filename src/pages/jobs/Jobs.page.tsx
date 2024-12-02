import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import httModule from "../../helpers/http.module";
import { ICompany, IJob } from "../../types/global.typing";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import CustomLinearProgress from "../../components/custom-linear-progress/CustomLinearProgress.component";
import JobsGrid from "../../components/companies/JobsGrid.componet";

const Jobs = () => {
  const [jobs, setJobs] = useState<IJob[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const redirect = useNavigate();

  useEffect(() => {
    setLoading(true);
    httModule
      .get<IJob[]>("/Job/GetJobs")
      .then((response) => {
        setJobs(response.data);
        setLoading(false);
      })
      .catch((error) => {
        alert("Error");
        console.log(error);
        setLoading(false);
      });
  }, []);
  console.log(jobs);

  return (
    <div className="jobs">
      <div className="heading">
        <h2>Jobs</h2>
        <Box
          sx={{ "& > :not(style)": { m: 1 } }}
          onClick={() => redirect("/jobs/add")}
        >
          <Fab color="primary" aria-label="add" size="small">
            <AddIcon />
          </Fab>
        </Box>
      </div>
      {loading ? (
        <CustomLinearProgress />
      ) : jobs.length === 0 ? (
        <h2>No Job</h2>
      ) : (
        <JobsGrid data={jobs} />
      )}
    </div>
  );
};

export default Jobs;
