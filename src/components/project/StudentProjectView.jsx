import React from "react";
import { Typography } from "@material-ui/core";

function StudentProjectView({ project }) {
  return (
    <>
      <Typography variant="h3" component="h1" align="center">
        {project.title}
      </Typography>
      <Typography variant="h5" align="center">
        {project.subject}
      </Typography>
      <Typography variant="body1" align="center">
        {project.description}
      </Typography>
      <Typography variant="body1" align="center">
        {project.status}
      </Typography>
      <Typography variant="body1" align="center">
        {project.registerDate}
      </Typography>
      <Typography variant="body1" align="center">
        {project.keywords}
      </Typography>
    </>
  );
}

export default StudentProjectView;
