import React from "react";
import { ListItem, ListItemIcon, ListItemText } from "material-ui/List";
import { NavLink } from "react-router-dom";
import HomeIcon from "material-ui-icons/Home";
import SearchIcon from "material-ui-icons/Search";
import ViewListIcon from "material-ui-icons/ViewList";
import BugReportIcon from "material-ui-icons/BugReport";

export const SideNavListItems = (
  <div>
    <NavLink exact to="/">
      <ListItem button>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>
    </NavLink>
    <NavLink to="/search-parts">
      <ListItem button>
        <ListItemIcon>
          <SearchIcon />
        </ListItemIcon>
        <ListItemText primary="Search Part" />
      </ListItem>
    </NavLink>
    <NavLink to="/eclasstree">
      <ListItem button>
        <ListItemIcon>
          <ViewListIcon />
        </ListItemIcon>
        <ListItemText primary="eClass Tree" />
      </ListItem>
    </NavLink>
    <NavLink to="/test">
      <ListItem button>
        <ListItemIcon>
          <BugReportIcon />
        </ListItemIcon>
        <ListItemText primary="Test Comp." />
      </ListItem>
    </NavLink>
  </div>
);
