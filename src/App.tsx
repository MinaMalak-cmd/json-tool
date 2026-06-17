import { Box } from "@mui/material";
import AppHeader from "./components/AppHeader";
import AppFooter from "./components/AppFooter";
import JsonProcessor from "./features/jsonProcessor/JsonProcessor";

/** Application shell: header, the processing workspace, and footer. */
export default function App() {
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "background.default",
      }}
    >
      <AppHeader />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minHeight: 0,
          px: { xs: 2, md: 4 },
          py: { xs: 2, md: 3 },
        }}
      >
        <JsonProcessor />
      </Box>
      <AppFooter />
    </Box>
  );
}
