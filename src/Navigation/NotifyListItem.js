import React from "react";
import {
  ListItem,
  ListItemText,
  Typography
} from "@material-ui/core";
import formatDistance from "date-fns/formatDistance";

export default function NotifyListItem(props) {


  return (
    <ListItem divider="true" alignItems="flex-start">
      <ListItemText
        primary={props.item.Title}
        secondary={`${formatDistance(props.item.Date * 1000, new Date())} ago`}
      />
      <Typography>{props.item.Data.slice(0, 10)+'...'}</Typography>
    </ListItem>
  );
}


