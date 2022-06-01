import React from 'react';
import Pagination from '@mui/material/Pagination';



const AppPagination = ({setPage, pageCount}) => {

    const handleChange = (event, value) => {
        setPage(value);
    }

  return (
    <div>
        <Pagination 
        onChange={handleChange}
        count={pageCount} 
        
        style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "10px",
            marginBottom: "10px"
        }}
        
        />
    </div>
  )
}

export default AppPagination