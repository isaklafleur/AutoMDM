import React from "react";
import { ListItem, ListItemIcon, ListItemText } from "material-ui/List";
import { NavLink } from "react-router-dom";
import HomeIcon from "material-ui-icons/Home";
import SearchIcon from "material-ui-icons/Search";
import ViewListIcon from "material-ui-icons/ViewList";
import BugReportIcon from "material-ui-icons/BugReport";

const links = [
  { label: "Home", href: "/", icon: <HomeIcon /> },
  { label: "Search Part", href: "/search-parts", icon: <SearchIcon /> },
  { label: "Search TARIC", href: "/search-taric", icon: <SearchIcon /> },
  { label: "eClass Tree", href: "/tree-eclass", icon: <ViewListIcon /> },
  { label: "Test Component", href: "/test", icon: <BugReportIcon /> }
];

export const SideNavListItems = (
  <div>
    {links.map(link => {
      return (
        <NavLink key={link.label} exact to={link.href}>
          <ListItem button>
            <ListItemIcon>{link.icon}</ListItemIcon>
            <ListItemText primary={link.label} />
          </ListItem>
        </NavLink>
      );
    })}
  </div>
);
