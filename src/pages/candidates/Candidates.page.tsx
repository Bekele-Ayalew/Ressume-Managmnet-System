import "./Candidates.scss";
import { useEffect, useState } from "react";
import httModule from "../../helpers/http.module";
import { ICandidate } from "../../types/global.typing";
import { error } from "console";
import { Button } from "@mui/material";
import { redirect, useNavigate } from "react-router-dom";
import { Add } from "@mui/icons-material";
import CustomLinearProgress from "../../components/custom-linear-progress/CustomLinearProgress.component";
import CandidatesGrid from "../../components/candidates/CandidatesGrid.component";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";

const Candidates = () => {
  const [candidates, setCandidates] = useState<ICandidate[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const redirect = useNavigate();

  useEffect(() => {
    setLoading(true);
    httModule
      .get<ICandidate[]>("/Candidate/GetCandidates")
      .then((response) => {
        setCandidates(response.data);
        setLoading(false);
      })
      .catch((error) => {
        alert("Error");
        console.log(error);
        setLoading(false);
      });
  }, []);
  console.log(candidates);

  return(
    <div className="candidates">
    <div className="heading">
      <h2>Candidates</h2>
     
      <Box
        sx={{ "& > :not(style)": { m: 1 } }}
        onClick={() => redirect("/candidates/add")}
      >
        <Fab color="primary" aria-label="add" size="small">
          <AddIcon />
        </Fab>
      </Box>
    </div>
    {loading ? (
      <CustomLinearProgress />
    ) : candidates.length === 0 ? (
      <h2>No Company</h2>
    ) : (
      <CandidatesGrid data={candidates} />
    )}
  </div>
  );
};

export default Candidates;
