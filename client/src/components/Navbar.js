import React, { Component } from "react";
import { Link } from "react-router-dom";
import AppBar from "material-ui/AppBar";
import Button from "material-ui/Button";
import IconButton from "material-ui/IconButton";
import MenuIcon from "material-ui-icons/Menu";
import Toolbar from "material-ui/Toolbar";
import Typography from "material-ui/Typography";
import MoreVertIcon from "material-ui-icons/MoreVert";
import Drawer from "material-ui/Drawer";
import Menu, { MenuItem } from "material-ui/Menu";
import List from "material-ui/List";
import Auth from "../modules/Auth";
import Divider from "material-ui/Divider";
import { SideNavListItems } from "./tileData";

class Guest extends Component {
  render() {
    return (
      <div>
        <Button color="accent" style={{ marginRight: 10 }}>
          <Link to="/login">Login</Link>
        </Button>

        <Button color="accent" style={{ marginRight: 10 }}>
          <Link to="/signup">Sign Up</Link>
        </Button>
      </div>
    );
  }
}
class Authenticated extends Component {
  constructor(props) {
    super(props);
    this.state = { openAuthMenu: false, anchorEl: undefined };
  }

  handleClick = event => {
    this.setState({ openAuthMenu: true, anchorEl: event.currentTarget });
  };

  handleRequestClose = () => {
    this.setState({ openAuthMenu: false });
  };
  render() {
    return (
      <div>
        <IconButton
          aria-owns={this.state.openAuthMenu ? "auth-menu" : null}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="auth-menu"
          anchorEl={this.state.anchorEl}
          open={this.state.openAuthMenu}
          onRequestClose={this.handleRequestClose}
        >
          <MenuItem onClick={this.handleRequestClose}>
            <Link to="/dashboard">Dashboard</Link>
          </MenuItem>
          <MenuItem onClick={this.handleRequestClose}>
            <Link to="/test">Test</Link>
          </MenuItem>
          <MenuItem onClick={this.handleRequestClose}>
            <Link to="/logout">Log out</Link>
          </MenuItem>
        </Menu>
      </div>
    );
  }
}

class Navbar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDrawer: false
    };
    this.handleToggle = this.handleToggle.bind(this);
    this.handleClose = this.handleClose.bind(this);
  }

  handleToggle = () => this.setState({ openDrawer: !this.state.openDrawer });
  handleClose = () => this.setState({ openDrawer: false });

  render() {
    const sideList = (
      <div>
        <List className="navbar-left-list">{SideNavListItems}</List>
        <Divider />
      </div>
    );
    return (
      <div className="navbar">
        <AppBar style={{ backgroundColor: "#2196F3" }} position="static">
          <Toolbar disableGutters style={{ marginTop: "0" }}>
            <IconButton
              onClick={this.handleToggle}
              color="contrast"
              aria-label="Menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography type="title" color="inherit" className="navbar-title">
              autoMDM
            </Typography>
            {Auth.isUserAuthenticated() ? <Authenticated /> : <Guest />}
          </Toolbar>
        </AppBar>
        <Drawer
          open={this.state.openDrawer}
          onRequestClose={this.handleClose}
          onClick={this.handleClose}
        >
          {sideList}
        </Drawer>
      </div>
    );
  }
}

export default Navbar;
/* 
<AppBar
title="autoMDM"
onLeftIconButtonTouchTap={this.handleToggle}
iconElementRight={
  Auth.isUserAuthenticated() ? <Authenticated /> : <Guest />
}
/> */
