import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export function DemoPageContent({
  pathname,
  children,
}: {
  pathname: string;
  children: React.ReactNode;
}) {
  return (
    <Box
      sx={{
        py: 4,
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
      }}
      // textAlign: "center",
    >
      {/* <Typography>Dashboard content for {pathname}</Typography> */}
      {children}
    </Box>
  );
}
