"use client";
import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Link,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import AdbIcon from "@mui/icons-material/Adb";
import MenuIcon from "@mui/icons-material/Menu";
import NextLink from "next/link";

const pages = [
  { title: "Home", href: "/" },
  { title: "Jobs", href: "/jobs" },
  { title: "Search", href: "/search" },
];

const HomeButton = () => {
  return (
    <>
      <AdbIcon sx={{ display: { xs: "none", md: "flex" }, mr: 1 }} />
      <Typography
        variant="h6"
        noWrap
        component="a"
        href="/"
        sx={{
          mr: 2,
          display: { xs: "none", md: "flex" },
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        JOBS
      </Typography>
    </>
  );
};

const SmallScreenHomeButton = () => {
  return (
    <>
      <AdbIcon sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
      <Typography
        variant="h5"
        noWrap
        component="a"
        href="/"
        sx={{
          mr: 2,
          display: { xs: "flex", md: "none" },
          flexGrow: 1,
          fontFamily: "monospace",
          fontWeight: 700,
          letterSpacing: ".3rem",
          color: "inherit",
          textDecoration: "none",
        }}
      >
        JOBS
      </Typography>
    </>
  );
};

const SmallScreenNav = () => {
  // @TODO: boilerplate from docs, probably don't need it
  const anchorEl = null;
  const anchorElNav = null;
  const handleOpenNavMenu = () => {
    console.log("nav opened");
  };
  const handleCloseNavMenu = () => {
    console.log("nav closed");
  };
  return (
    <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleOpenNavMenu}
        color="inherit"
      >
        <MenuIcon />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorElNav}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        open={Boolean(anchorElNav)}
        onClose={handleCloseNavMenu}
        sx={{ display: { xs: "block", md: "none" } }}
      >
        {/* @TODO: Next Links */}
        {pages.map((page) => (
          <MenuItem key={page.title} onClick={handleCloseNavMenu}>
            <Typography sx={{ textAlign: "center" }}>{page.title}</Typography>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};

const Pages = () => {
  const handleCloseNavMenu = () => {
    console.log("nav closed");
  };
  return (
    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
      {pages.map((page) => (
        <Button
          key={page.title}
          sx={{ my: 2, color: "white", display: "block" }}
          component={NextLink}
          href={page.href}
        >
          {page.title}
        </Button>
      ))}
    </Box>
  );
};

// @TODO: Getting hydration errors
export default function Header() {
  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <HomeButton />
            <SmallScreenNav />
            <SmallScreenHomeButton />
            <Pages />
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
}
