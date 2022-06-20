import * as React from "react";
import { useState, useEffect } from "react";
import { Card, Typography } from "@mui/material";
import GridLayout from "react-grid-layout";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import {client} from "../features/webApi";
import "./DragAndDropScreen.css";

const DragAndDropScreen = () => {
  const [companies, setCompanies] = useState([]);
  const user = useSelector(selectUser);
  const token = user.tokenId;
  const request = client(token);
  const fetchData = async () => {
    let data = {};

    await request
      .get("companies")
      .then((res) => {
        data = res.data.items;
      })
      .catch((err) => {
        alert("Error: ", err);
      });
    setCompanies(data);
  };
  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <GridLayout className="layout" cols={2} rowHeight={10} width={1280}>
        <div
          className="column_header_container"
          data-grid={{ x: 0, y: 0, w: 1, h: 2, static: true }}
          key="kol1"
        >
          <Typography className="drag_and_drop_columns" variant="h4">
            Column 1
          </Typography>
        </div>
        <div
          className="column_header_container"
          data-grid={{ x: 1, y: 0, w: 1, h: 2, static: true }}
          key="kol2"
        >
          <Typography className="drag_and_drop_columns" variant="h4">
            Column 2
          </Typography>
        </div>
      </GridLayout>
      <GridLayout className="layout" cols={2} rowHeight={40} width={1280}>
        {companies.map((company, index) => (
          <Card
            sx={{
              backgroundColor: "lightBlue",
              color: "black",
              textAlign: "center",
              boxShadow: 4,
            }}
            data-grid={{ x: 0, y: 0, w: 1, h: 2 }}
            key={index}
          >
            <Typography
              sx={{ mt: 3 }}
              variant="h6"
              className="drag_and_drop_text"
            >
              {company.companyName}
            </Typography>
          </Card>
        ))}
      </GridLayout>
    </div>
  );
};

export default DragAndDropScreen;
