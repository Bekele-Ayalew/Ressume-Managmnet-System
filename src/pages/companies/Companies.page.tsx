import "./Companies.scss";
import { useEffect, useState } from "react";
import httModule from "../../helpers/http.module";
import { ICompany } from "../../types/global.typing";
import { error } from "console";
import { Button } from "@mui/material";
import { redirect, useNavigate } from "react-router-dom";
import { Add } from "@mui/icons-material";
import CustomLinearProgress from "../../components/custom-linear-progress/CustomLinearProgress.component";
import CompaniesGrid from "../../components/companies/CompaniesGrid.componet";
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';

const Companies = () => {
  const [companies, setCompanies] = useState<ICompany[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const redirect = useNavigate();

  useEffect(() => {
    setLoading(true);
    httModule
      .get<ICompany[]>("/Company/GetCompanies")
      .then((response) => {
        setCompanies(response.data);
        setLoading(false);
      })
      .catch((error) => {
        alert("Error");
        console.log(error);
        setLoading(false);
      });
  }, []);
  console.log(companies);

  return (
    <div className="companies">
      <div className="heading">
        <h2>Companies</h2>
        {/* <Button variant="outlined" onClick={() => redirect("/companies/add")}>
          <Add />
        </Button> */}
        <Box sx={{ '& > :not(style)': { m: 1 } }} onClick={() => redirect("/companies/add")}>
      <Fab color="primary" aria-label="add" size="small" >
        <AddIcon />
      </Fab>
      </Box>
      </div>
      {loading ? (
        <CustomLinearProgress />
      ) : companies.length === 0 ? (
        <h2>No Company</h2>
      ) : (
        <CompaniesGrid data={companies} />
      )}
    </div>
  );
};

export default Companies;
