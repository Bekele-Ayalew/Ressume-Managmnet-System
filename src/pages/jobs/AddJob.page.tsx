import React, { useState, useEffect } from "react";
import { ICreateJobDto, ICompany } from "../../types/global.typing";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Box,
  Grid,
  Typography,
  Paper,
  Container,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import httModule from "../../helpers/http.module";

const AddJob = () => {
  const [job, setJob] = useState<ICreateJobDto>({
    title: "",
    level: "",
    companyId: "",
  });
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch companies when component mounts
    httModule.get("Company/GetCompanies")
      .then(response => setCompanies(response.data))
      .catch(err => {
        console.log(err);
        toast.error("Failed to fetch companies.");
      });
  }, []);

  const handleClickSaveBtn = () => {
    if (job.title === "" || job.level === "" || job.companyId === "") {
      toast.error("Please fill all fields");
      return;
    }
    httModule.post("Job/Create_Job", job)
      .then(response => {
        toast.success("Job has been added successfully!");
        setTimeout(() => {
          navigate("/jobs");
        }, 1000);
      })
      .catch(err => {
        console.log(err);
        toast.error("Failed to save job.");
      });
  };

  const handleClickBackBtn = () => {
    navigate("/jobs");
  };

  return (
    <div className="content">
      <ToastContainer 
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4, mt: 5 }}>
          <Typography variant="h4" gutterBottom align="center">
            Add New Job
          </Typography>
          <Box
            component="form"
            noValidate
            autoComplete="off"
          >
            <TextField
              fullWidth
              label="Job Name"
              variant="outlined"
              value={job.title}
              onChange={(e) => setJob({ ...job, title: e.target.value })}
              sx={{ mb: 3 }}
            />
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Job Level</InputLabel>
              <Select
                value={job.level}
                label="Job Level"
                onChange={(e) => setJob({ ...job, level: e.target.value })}
              >
                <MenuItem value="Intern">Intern</MenuItem>
                <MenuItem value="Junior">Junior</MenuItem>
                <MenuItem value="MidLevel">Mid Level</MenuItem>
                <MenuItem value="Senior">Senior</MenuItem>
                <MenuItem value="TeamLead">Team Lead</MenuItem>
                <MenuItem value="Architect">Architect</MenuItem>
                <MenuItem value="Programmer_I">Programmer I</MenuItem>
                <MenuItem value="Programmer_II">Programmer II</MenuItem>
              </Select>
            </FormControl>
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Company</InputLabel>
              <Select
                value={job.companyId}
                label="Company"
                onChange={(e) => setJob({ ...job, companyId: e.target.value })}
              >
                {companies.map((company) => (
                  <MenuItem key={company.id} value={company.id}>
                    {company.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 3 }}>
              <Button
                variant="contained"
                color="primary"
                onClick={handleClickSaveBtn}
                sx={{
                  transition: "background-color 0.3s",
                  "&:hover": {
                    backgroundColor: "#1565c0",
                  },
                }}
              >
                Save
              </Button>
              <Button
                variant="contained"
                color="secondary"
                onClick={handleClickBackBtn}
                sx={{
                  transition: "background-color 0.3s",
                  "&:hover": {
                    backgroundColor: "#d32f2f",
                  },
                }}
              >
                Back
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

export default AddJob;