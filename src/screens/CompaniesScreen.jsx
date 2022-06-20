import React, { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import "./CompaniesScreen.css";
import Loader from "../components/Loader";
import AppPagination from "../components/AppPagination";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/material/styles";
import InputBase from "@mui/material/InputBase";
import debounce from "lodash.debounce";
import {client} from "../features/webApi"
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: "#e1f5fe",
  "&:hover": {
    backgroundColor: "#e3f2fd",
  },
  marginRight: 0,
  marginLeft: 0,
  marginBottom: 10,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(5)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

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
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState();
  const [page, setPage] = useState(1);
  const [numberOfPages, setNumberOfPages] = useState();
  const [searchKey, setSearchKey] = useState("");
  const user = useSelector(selectUser);
  const token = user.tokenId;
  const fetchData = async (searchKey, page) => {
    let data = {};
    setLoading(true);
    const request = client(token);
    await request
      .get(`companies?Search=${searchKey}&PageIndex=${page}&PageSize=10`)
      .then((res) => {
        data = res.data.items;
        setNumberOfPages(res.data.pageCount);
      })
      .catch((err) => {
        setLoading(false);
        alert("Error:", err);
      });
    setCompanies(data);
    setLoading(false);
  };

  // eslint-disable-next-line
  const debouncedFetchData = useCallback(
    debounce((searchKey, page) => {
      fetchData(searchKey, page);
    }, 500),
    []
  );

  useEffect(() => {
    debouncedFetchData(searchKey, page);
    // eslint-disable-next-line
  }, [page, searchKey]);

  return (
    <div>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
      >
        <Button
          sx={{ mt: 2, mb: 2, width: "30%" }}
          variant="contained"
          onClick={() => {
            navigate("/new-company");
          }}
        >
          Create/New
        </Button>
        <Search
          onChange={(e) => {
            setPage(1);
            setSearchKey(e.target.value);
          }}
        >
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ "aria-label": "search" }}
          />
        </Search>
      </Grid>

      {loading ? (
        <Loader />
      ) : (
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={{ xs: 1, md: 2 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {companies !== 0 &&
              companies.map((company, index) => (
                <Grid item xs={2} sm={4} md={6} key={index}>
                  <Card variant="outlined" sx={{ border: 2, ml: 1, mr: 1 }}>
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
                        <Button
                          size="small"
                          onClick={() => {
                            navigate(`/edit-company/${company.companyId}`);
                          }}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="contained"
                          onClick={() => {
                            navigate(`/delete-company/${company.companyId}`);
                          }}
                        >
                          Delete
                        </Button>
                      </CardActions>
                    </React.Fragment>
                  </Card>
                </Grid>
              ))}
          </Grid>
        </Box>
      )}

      <AppPagination page={page} setPage={setPage} pageCount={numberOfPages} />
    </div>
  );
};

export default CompaniesScreen;
