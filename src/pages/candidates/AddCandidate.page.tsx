import React, { useState, useEffect } from "react";
import {
  ICreateCandidateDto,
  IJob,
} from "../../types/global.typing";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  Card,
  CardContent,
  Container,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import httModule from "../../helpers/http.module";

const AddCandidate = () => {
  const [candidate, setCandidate] = useState<ICreateCandidateDto>({
    name: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    coverLetter: "",
    JobId: "",
  });
  const [jobs, setJobs] = useState<IJob[]>([]);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

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

  const handleClickSaveBtn = () => {
    if (
      candidate.name === "" ||
      candidate.lastName === "" ||
      candidate.email === "" ||
      candidate.phoneNumber === "" ||
      candidate.coverLetter === "" ||
      candidate.JobId === "" ||
      !pdfFile
    ) {
      toast.error("Please fill all fields");
      return;
    }

    const candidateFormData = new FormData();
    candidateFormData.append("name", candidate.name);
    candidateFormData.append("lastName", candidate.lastName);
    candidateFormData.append("email", candidate.email);
    candidateFormData.append("phoneNumber", candidate.phoneNumber);
    candidateFormData.append("coverLetter", candidate.coverLetter);
    candidateFormData.append("JobId", candidate.JobId);
    candidateFormData.append("pdfFile", pdfFile);
    httModule
      .post("Candidate/CreateCandidate", candidateFormData)
      .then((response) => {
        toast.success("Candidate has been added successfully!");
        setTimeout(() => {
          navigate("/candidates");
        }, 1000);
      })
      .catch((err) => {
        console.log(err);
        toast.error("Failed to save candidate.");
      });
  };

  const handleClickBackBtn = () => {
    navigate("/candidates");
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
      <Container maxWidth="md">
        <Card elevation={3} sx={{ mt: 5, p: 3 }}>
          <CardContent>
            <Typography variant="h4" gutterBottom align="center">
              Add New Candidate
            </Typography>
            <Box component="form" noValidate autoComplete="off">
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="First Name"
                    variant="outlined"
                    value={candidate.name}
                    onChange={(e) =>
                      setCandidate({ ...candidate, name: e.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Last Name"
                    variant="outlined"
                    value={candidate.lastName}
                    onChange={(e) =>
                      setCandidate({ ...candidate, lastName: e.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email Address"
                    variant="outlined"
                    value={candidate.email}
                    onChange={(e) =>
                      setCandidate({ ...candidate, email: e.target.value })
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Contact | Mobile"
                    variant="outlined"
                    value={candidate.phoneNumber}
                    onChange={(e) =>
                      setCandidate({
                        ...candidate,
                        phoneNumber: e.target.value,
                      })
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Cover Letter"
                    variant="outlined"
                    value={candidate.coverLetter}
                    onChange={(e) =>
                      setCandidate({
                        ...candidate,
                        coverLetter: e.target.value,
                      })
                    }
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <input
                    type="file"
                    onChange={(event) =>
                      setPdfFile(event.target.files ? event.target.files[0] : null)
                    }
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>Job</InputLabel>
                    <Select
                      value={candidate.JobId}
                      label="Job"
                      onChange={(e) =>
                        setCandidate({ ...candidate, JobId: e.target.value })
                      }
                    >
                      {jobs.map((item) => (
                        <MenuItem key={item.id} value={item.id}>
                          {item.title}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      gap: 2,
                      mt: 3,
                    }}
                  >
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
                </Grid>
              </Grid>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </div>
  );
};

export default AddCandidate;
