import * as React from "react";
import { useState, useEffect } from "react";
import { Card, Typography } from "@mui/material";
import GridLayout from "react-grid-layout";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import axios from "axios";
import "./DragAndDrop.css";

const DragAndDropScreen = () => {
  const user = useSelector(selectUser);
  const tokenId = user.tokenId;
  const [companies, setCompanies] = useState([]);
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

        console.log("Name=> ", data[1].companyName);
      })
      .catch((err) => {
        console.log("Error => ", err);
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
          style={{
            backgroundColor: "transparent",
            color: "black",
            textAlign: "center",
          }}
          data-grid={{ x: 0, y: 0, w: 1, h: 2, static: true }}
          key="kol1"
        >
          <Typography className="drag_and_drop_columns" variant="h4">
            Column 1
          </Typography>
        </div>
        <div
          style={{
            backgroundColor: "transparent",
            color: "black",
            textAlign: "center",
          }}
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
            style={{
              backgroundColor: "lightBlue",
              color: "black",
              textAlign: "center",
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