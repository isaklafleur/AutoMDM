import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Card, { CardContent } from "material-ui/Card";
import Typography from "material-ui/Typography";
import Button from "material-ui/Button";
import TextField from "material-ui/TextField";

const LoginForm = ({ onSubmit, onChange, errors, successMessage, user }) => (
  <div className="grid-content-box">
    <Card className="container">
      <form action="/" onSubmit={onSubmit}>
        <Typography type="headline">Login</Typography>
        {successMessage && <p className="success-message">{successMessage}</p>}
        {errors.summary && <p className="error-message">{errors.summary}</p>}

        <div>
          <TextField
            className="input-field"
            error={errors.email ? true : false}
            label="Email"
            name="email"
            helperText={errors.email}
            onChange={onChange}
            value={user.email}
          />
        </div>
        <br />
        <div>
          <TextField
            className="input-field"
            error={errors.password ? true : false}
            label="Password"
            type="password"
            name="password"
            onChange={onChange}
            helperText={errors.password}
            value={user.password}
          />
        </div>
        <br />
        <div>
          <Button type="submit" raised color="primary">
            Log in
          </Button>
        </div>

        <CardContent>
          <Typography type="subheading" color="secondary">
            Don't have an account? <Link to={"/signup"}>Create one</Link>.
          </Typography>
        </CardContent>
      </form>
    </Card>
  </div>
);

LoginForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  successMessage: PropTypes.string.isRequired,
  user: PropTypes.object.isRequired
};

export default LoginForm;
