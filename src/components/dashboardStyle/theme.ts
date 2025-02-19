import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width: "344px",
          padding: "24px",
          minWidth: "343px",
          height: "148px",
          background: "#FFFFFF",
          boxShadow:
            "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
          borderRadius: "16px",
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width: "1080px",
          height: "76px",
          background: "#FFFFFF",
          borderBottom: "1px dashed rgba(145, 158, 171, 0.2)",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          width: "255px",
          height: "76px",
        },
      },
    },
  },
});

export default theme;
