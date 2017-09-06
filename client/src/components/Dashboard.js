import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Card, { CardContent } from "material-ui/Card";
import Typography from "material-ui/Typography";

const Dashboard = ({ secretData }) => (
  <div className="grid-content-box">
    <Card className="container">
      <CardContent>
        <Typography type="headline">Dashboard</Typography>
        <Typography type="subheading" color="secondary">
          You should get access to this page only after authentication.
        </Typography>
        {secretData && (
          <Typography type="subheading" color="secondary">
            {secretData}
          </Typography>
        )}
        <br />
        <Link to="/logout">Log out</Link>
      </CardContent>
    </Card>
  </div>
);
Dashboard.propTypes = {
  secretData: PropTypes.string.isRequired
};

export default Dashboard;
