import React from 'react'

import { DataGrid } from "@mui/x-data-grid";
import CustomToolbar from "./InventoryCustomToolbar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useState } from "react";
import './customizeDataGrid.scss'

const customTheme = createTheme({
    palette: {
      primary: {
        main: "#9980FA"
      }
    }
});

function CustomDataGrid({data, columns, searchBar, report}) {

  const getRowId = (row) => {
    return row._id; // Return a unique identifier for each row
  }

  return (
    <ThemeProvider theme={customTheme}>
        <DataGrid
            className="InventorycustomizeDataGrid"
            rows={data}
            columns={columns}
            getRowId={getRowId}
            pageSize={10}
            checkboxSelection
            components={{
                Toolbar: (props) => (
                    <CustomToolbar {...props} searchBar={searchBar} report={report} />)
            }}
            getRowClassName={() => "Inventorydatagrid-cell"}
        />
    </ThemeProvider>
  )
}

export default CustomDataGrid

