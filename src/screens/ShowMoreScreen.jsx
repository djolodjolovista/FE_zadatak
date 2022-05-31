import React, { useState } from "react";
import "./ShowMoreScreen.css";
import Box from "@mui/material/Box";

const ShowMoreScreen = () => {
  const [showMore, setshowMore] = useState("none");

  const show = () => {
    if (showMore === "") {
      setshowMore("none");
    } else {
      setshowMore("");
    }
  };

  return (
    <div className="container">
      <h1>Show more and show less option</h1>
      <div className="text_container">
        <Box sx={{ display: "" }}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
          consectetur tellus mi, ac euismod nisi suscipit vitae. Duis vehicula
          nibh quis felis tempor vulputate. Nunc non fringilla nisl, et
          malesuada elit. Etiam vel purus justo. Suspendisse imperdiet ultricies
          odio, porttitor iaculis ante iaculis ut. Aenean in sapien metus.
          Integer et arcu sodales, rhoncus neque eget, imperdiet mauris. Duis
          rhoncus ex ex, vitae fringilla sem tempor ut. In sed ante varius
          mauris auctor congue id at orci. Sed nibh diam, bibendum non pretium
          a, ornare ut velit. Phasellus egestas ac elit sed dictum. Proin
          pulvinar, dui ut tincidunt ultricies, erat lectus feugiat tellus, at
          sagittis ex tortor id felis. Donec in neque vitae arcu hendrerit
          dignissim vel et turpis.
        </Box>
        <Box sx={{ display: `${showMore}` }}>
          Nunc rhoncus, ex in maximus commodo, dui quam aliquet elit, non
          egestas quam tortor sit amet quam. Duis scelerisque tellus vitae
          sollicitudin scelerisque. Morbi enim magna, fringilla vitae
          pellentesque quis, semper sit amet risus. Aliquam erat volutpat.
          Quisque aliquam tincidunt ipsum, eu vestibulum urna porta at. Quisque
          et ipsum elementum, gravida metus a, elementum tellus. Cras porttitor
          nec tellus vitae aliquet. Aliquam at mi ut tortor ultricies maximus.
          Pellentesque ut enim vitae neque molestie lacinia ac eget mauris.
          Aliquam lacinia, dui id efficitur consequat, dolor ante fringilla
          massa, vitae aliquam nisi neque non ante. Mauris arcu dui, bibendum id
          egestas nec, vulputate nec diam. Cras nec laoreet lacus.
        </Box>{" "}
        <span className="showmore_text" onClick={show}>
          {showMore ? "Show more" : "Show less"}
        </span>
      </div>
    </div>
  );
};

export default ShowMoreScreen;