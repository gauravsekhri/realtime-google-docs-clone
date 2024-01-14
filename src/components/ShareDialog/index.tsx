import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Box, Tooltip, Typography } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import { CopyToClipboard } from "react-copy-to-clipboard";
import DoneIcon from "@mui/icons-material/Done";

interface ShareDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ShareDialog({ ...props }: ShareDialogProps) {
  const { isOpen, onClose } = props;
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [shareType, setShareType] = React.useState<"view" | "edit">("edit");
  const [shareUrl, setShareUrl] = React.useState<string>("");
  const [isCopied, setIsCopied] = React.useState<boolean>(false);

  React.useEffect(() => {
    setShareUrl(window.location.href);
  }, []);

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setIsCopied(false);
    }, 400);
  };

  const accessChange = (val: any) => {
    setShareType(val);

    let newUrl =
      val == "edit"
        ? window.location.href.replace("view", "docs")
        : window.location.href.replace("docs", "view");
    setShareUrl(newUrl);
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
    >
      <DialogTitle id="responsive-dialog-title">Share document</DialogTitle>
      <DialogContent>
        <DialogContentText>
          <Box
            sx={{
              my: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              background: "#dadce0",
              px: 2,
              py: 1,
              borderRadius: 2,
              gap: 3,
            }}
          >
            <Box sx={{ width: 250 }}>
              <Typography sx={{ fontWeight: 700 }}>Manage Access</Typography>
              <Typography>Anyone with the link can {shareType}.</Typography>
            </Box>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="demo-select-small-label">Access</InputLabel>
              <Select
                labelId="demo-select-small-label"
                id="demo-select-small"
                value={shareType}
                label="Access"
                onChange={(e: any) => accessChange(e.target.value)}
              >
                <MenuItem value={"edit"}>Edit</MenuItem>
                <MenuItem value={"view"}>View</MenuItem>
              </Select>
            </FormControl>
          </Box>

          <Paper
            component="form"
            elevation={4}
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: "100%",
            }}
          >
            <InputBase
              sx={{ ml: 1, mr: 4, flex: 1, color: "gray" }}
              placeholder="Search Google Maps"
              inputProps={{ "aria-label": "search google maps" }}
              value={shareUrl}
              readOnly
            />
            <Tooltip title="Copy">
              <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
                <CopyToClipboard
                  text={shareUrl}
                  onCopy={() => setIsCopied(true)}
                >
                  {isCopied ? (
                    <DoneIcon sx={{ color: "green" }} />
                  ) : (
                    <ContentCopyIcon />
                  )}
                </CopyToClipboard>
              </IconButton>
            </Tooltip>
          </Paper>
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
