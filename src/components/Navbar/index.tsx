import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Text from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import ShareDialog from "../ShareDialog";
import SaveIcon from "@mui/icons-material/Save";

const drawerWidth = 240;
const navItems = ["Home", "About", "Contact"];

export default function Navbar({ ...props }: any) {
  const { isSaving, isLoadingDoc } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [showShareDialog, setShowShareDialog] = React.useState<boolean>(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        MUI
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container = document.body;

  return (
    <>
      <AppBar component="nav" position="static">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            Docs App
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {isLoadingDoc == true && (
              <Button sx={{ color: "#fff", mr: 3 }} disableTouchRipple>
                {isLoadingDoc ? "Loading Document..." : "Loaded"}
              </Button>
            )}
            <Button
              sx={{ color: "#fff", mr: 5 }}
              disableTouchRipple
              disableFocusRipple
              disableElevation
              disableRipple
              startIcon={<SaveIcon />}
            >
              {isSaving ? "Saving..." : "Saved"}
            </Button>
            <Button
              sx={{ color: "#fff", fontWeight: "bold" }}
              onClick={() => setShowShareDialog(true)}
            >
              Share
            </Button>
          </Box>
        </Toolbar>
      </AppBar>

      <ShareDialog
        isOpen={showShareDialog}
        onClose={() => setShowShareDialog(false)}
      />
    </>
  );
}
