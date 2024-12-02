import { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Grid, Paper, Typography } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import WorkIcon from '@mui/icons-material/Work';
import BusinessIcon from '@mui/icons-material/Business';
import "./home.scss";

const Home = () => {
  const [counts, setCounts] = useState({
    candidates: 0,
    jobs: 0,
    companies: 0,
  });

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const [candidatesResponse, jobsResponse, companiesResponse] = await Promise.all([
          axios.get("http://localhost:5182/api/Candidate/GetCandidatesCount"),
          axios.get("http://localhost:5182/api/Job/GetJobsCount"),
          axios.get("http://localhost:5182/api/Company/GetCompaniesCount"),
        ]);

        setCounts({
          candidates: candidatesResponse.data,
          jobs: jobsResponse.data,
          companies: companiesResponse.data,
        });
      } catch (error) {
        console.error("Error fetching counts:", error);
      }
    };

    fetchCounts();
  }, []);

  return (
    <div className="content home">
      <Box
        component="h3"
        sx={{
          textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
          textAlign: 'center',
          marginBottom: '20px',
        }}
      >
        Berhan Job Portal System
      </Box>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ padding: '20px', textAlign: 'center', backgroundColor: '#e0f7fa' }}>
            <PersonIcon fontSize="large" sx={{ color: '#00796b' }} />
            <Typography variant="h6" gutterBottom>
              Candidates
            </Typography>
            <Typography variant="h4">
              {counts.candidates}
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ padding: '20px', textAlign: 'center', backgroundColor: '#fce4ec' }}>
            <WorkIcon fontSize="large" sx={{ color: '#c2185b' }} />
            <Typography variant="h6" gutterBottom>
              Jobs
            </Typography>
            <Typography variant="h4">
              {counts.jobs}
            </Typography>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ padding: '20px', textAlign: 'center', backgroundColor: '#f3e5f5' }}>
            <BusinessIcon fontSize="large" sx={{ color: '#6a1b9a' }} />
            <Typography variant="h6" gutterBottom>
              Companies
            </Typography>
            <Typography variant="h4">
              {counts.companies}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      
      <Box
        component="div"
        sx={{
          marginTop: '40px',
          textAlign: 'justify',
        }}
      >
        <span>
          <b>
            Berhan International Bank Job Vacancy 2024 [Experienced Only]: A total
            of 01 “Branch Manager” vacancies for Experienced only Candidates.
            Applicants must apply before April 19, 2024. The Berhan International
            Bank is currently located at Addis Ababa. How to Apply. Qualified
            applicants are invited to submit their application letter, curriculum
            vitae and copy of non-returnable supporting documents within 10(Ten)
            consecutive days to Berhan Bank S.C, Talent Management Department P.O.
          </b>
        </span>
      </Box>
    </div>
  );
};

export default Home;
