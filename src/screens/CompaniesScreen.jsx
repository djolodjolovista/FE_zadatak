import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { selectUser } from "../features/userSlice";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import axios from "axios";
import './Companies.css';

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

const CompaniesScreen = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser);
  const [companies, setCompanies] = useState([]);

  const tokenId = user.tokenId;

  const fetchData = async () => {
    let data = {};

    await axios
      .get("https://srg-budget-tracker-api.herokuapp.com/companies", {
        headers: {
          Authorization: `Bearer ${tokenId}`,
        },
      })
      .then((res) => {
        data = res.data.items;
        console.log("Companies => ", data);

        console.log("Imena=> ", data[1].companyId);
      })
      .catch((err) => {
        console.log("Error => ", err);
      });
    setCompanies(data);

  };

  useEffect(() => {
    if (!user) {
      navigate("/");
    } else {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <Grid
  container
  spacing={0}
  direction="column"
  alignItems="center"
  justifyContent="center"
  
>
<Button sx={{mt:2, mb:2, width:"30%"}} variant="contained" onClick={()=>{navigate("/new-company")}}>Create/New</Button>
  </Grid >

          
        
      <Box sx={{ flexGrow: 1 }}>
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          {companies.map((company, index) => (
            <Grid item xs={2} sm={4} md={4} key={index}>
              <Card variant="outlined">
                <React.Fragment>
                  <CardContent>
                    <Typography
                      sx={{ fontSize: 14 }}
                      color="text.secondary"
                      gutterBottom
                    >
                      Company name:
                    </Typography>
                    <Typography variant="h5" component="div">
                      {bull}
                      {company.companyName}
                    </Typography>
                   
                  </CardContent>
                  <CardActions>
                    <Button size="small" onClick={()=>{navigate(`/edit-company/${company.companyId}`)}}>Edit</Button>
                    <Button variant="contained">Delete</Button>
                  </CardActions>
                </React.Fragment>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

export default CompaniesScreen;