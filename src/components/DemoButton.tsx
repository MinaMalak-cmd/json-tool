import { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
} from "@mui/material";
import PlayCircleRoundedIcon from "@mui/icons-material/PlayCircleRounded";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

/** Resolve a public asset path that respects the Vite base (GitHub Pages). */
const DEMO_SRC = `${import.meta.env.BASE_URL}demo.mp4`;

/**
 * A "Watch demo" button that opens a dialog playing the product demo video.
 * The video element is only mounted while the dialog is open, so playback
 * stops automatically on close.
 */
export default function DemoButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        size="small"
        variant="outlined"
        color="inherit"
        startIcon={<PlayCircleRoundedIcon />}
        onClick={() => setOpen(true)}
      >
        Watch demo
      </Button>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="lg"
        fullWidth
        aria-labelledby="demo-dialog-title"
      >
        <DialogTitle
          id="demo-dialog-title"
          sx={{ display: "flex", alignItems: "center", pr: 6 }}
        >
          Product demo
          <IconButton
            aria-label="Close demo"
            onClick={() => setOpen(false)}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseRoundedIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ p: { xs: 1, sm: 2 } }}>
          <Box
            component="video"
            data-testid="demo-video"
            src={DEMO_SRC}
            controls
            autoPlay
            playsInline
            aria-label="JSON Studio product demo video"
            sx={{
              width: "100%",
              height: "auto",
              borderRadius: 1,
              display: "block",
              backgroundColor: "#000",
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
