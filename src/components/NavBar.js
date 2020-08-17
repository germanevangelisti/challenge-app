import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const drawerWidth = 100;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

export default function NavBar(props) {
  const classes = useStyles();
  const currentPage = (route) => route === window.location.pathname;
  const [selectedIndex, setSelectedIndex] = React.useState(
    props.routes.findIndex(currentPage)
  );
  const history = useHistory();

  const handleListItemClick = (event, index, path) => {
    setSelectedIndex(index);
    history.push(path);
  };

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
      anchor="left"
    >
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {props.pages.map((text, index) => (
          <ListItem
            button
            selected={selectedIndex === index}
            onClick={(event) =>
              handleListItemClick(event, index, props.routes[index])
            }
            key={text}
          >
            <ListItemText primary={props.pages[index]} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
