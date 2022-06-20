import React from "react";
import Pagination from "@mui/material/Pagination";
import "./AppPagination.css";

const AppPagination = ({ page, setPage, pageCount }) => {
  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <div>
      <Pagination
        className="pagination"
        onChange={handleChange}
        count={pageCount}
        page={page}
        color="primary"
      />
    </div>
  );
};

export default AppPagination;
