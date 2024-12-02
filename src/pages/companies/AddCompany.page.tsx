import React, { useState } from "react";
import { ICreateCompanyDto } from "../../types/global.typing";
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

const AddCompany = () => {
  const [company, setCompany] = useState<ICreateCompanyDto>({
    name: "",
    size: "",
  });
  const navigate = useNavigate();

  const handleClickSaveBtn = () => {
    if (company.name === "" || company.size === "") {
      toast.error("Please fill all fields");
      return;
    }
    httModule.post("Company/CreateCompany", company)
      .then(response => {
        toast.success("Company saved successfully!");
        setTimeout(() => {
          navigate("/companies");
        }, 1000); 
      })
      .catch(err => {
        console.log(err);
        toast.error("Failed to save company.");
      });
  };

  const handleClickBackBtn = () => {
    navigate("/companies");
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
            Add New Company
          </Typography>
          <Box
            component="form"
            noValidate
            autoComplete="off"
          >
            <TextField
              fullWidth
              label="Company Name"
              variant="outlined"
              value={company.name}
              onChange={(e) => setCompany({ ...company, name: e.target.value })}
              sx={{ mb: 3 }}
            />
            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Company Size</InputLabel>
              <Select
                value={company.size}
                label="Company Size"
                onChange={(e) => setCompany({ ...company, size: e.target.value })}
              >
                <MenuItem value="Small">Small</MenuItem>
                <MenuItem value="Medium">Medium</MenuItem>
                <MenuItem value="Large">Large</MenuItem>
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

export default AddCompany;
