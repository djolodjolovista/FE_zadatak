import React, {useState, useEffect} from 'react';
import { useParams ,useNavigate} from 'react-router-dom';
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import axios from 'axios';
import {useSelector} from 'react-redux';
import { selectUser } from '../features/userSlice';
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";

const bull = (
    <Box
      component="span"
      sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
    >
      •
    </Box>
  );

const DeleteScreen = () => {
    const { companyId } = useParams();
    const [company, setCompany] = useState({});
    const user = useSelector(selectUser);
    const tokenId = user.tokenId;
    const navigate = useNavigate();
    const [alert, setAlert] = useState(false);
    const fetchData = async() => {

  
        let data = {};
        await axios.get(`https://srg-budget-tracker-api.herokuapp.com/companies/${companyId}`, {
          headers: {
            "Authorization": `Bearer ${tokenId}`,
          },
        }).then((res)=>{
          data = res.data;
              console.log("Companies => ", data);
        }).catch((err)=>{
          console.log(err);
          
        });
      
        setCompany(data);
        
    }

      useEffect(() => {
        fetchData();
        // eslint-disable-next-line
      }, [])

      const deleteCompany = async () => {
        
          try {
            await axios.delete(
              `https://srg-budget-tracker-api.herokuapp.com/companies/${companyId}`,
              
              {
                headers: {
                  Authorization: `Bearer ${tokenId}`,
                },
              }
            );
            console.log("Success!");
            
          } catch (error) {
            console.log(error);
            setAlert(false);
          }
          setAlert(true);
          
        }
        
       
      
      
  return (
    <div>
        <Grid
  container
  spacing={0}
  direction="column"
  alignItems="center"
  justifyContent="center"
  
>
       <Card variant="outlined" sx={{width:"50%", mt:2}}>
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
                    <Typography>
                      Company Id: {company.companyId}
                    </Typography>
                   
                  </CardContent>
                  <CardActions>
                  
                    
                  </CardActions>
                </React.Fragment>
              </Card>
              <Typography variant="h4">Are you sure you want to delete this company?</Typography>
              {alert ? (
          <Grid
          container
          spacing={0}
          direction="column"
          alignItems="center"
          justifyContent="center"
          ><Alert sx={{  mt: 2 }} severity="success">
            Success!
          </Alert>
          <Button
          sx={{ mt: 2, width: "10%" }}
          variant="contained"
          onClick={()=>{navigate("/companies");}}
        >
          Go back
        </Button></Grid>
        ): (<div>
              <Button
          sx={{ mt: 2, width: "10%"}}
          variant="contained"
          onClick={deleteCompany}
        >
          Yes
        </Button>
        <Button
          sx={{ml:2, mt: 2, width: "10%" }}
          variant="contained"
          onClick={()=>{navigate("/companies");}}
        >
          No
        </Button></div>)}
              </Grid>
    </div>
  )
}

export default DeleteScreen