import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import Card, { CardContent } from "material-ui/Card";
import Typography from "material-ui/Typography";
import Button from "material-ui/Button";
import TextField from "material-ui/TextField";

const SignUpForm = ({ onSubmit, onChange, errors, user }) => (
  <div className="grid-content-box">
    <Card className="container">
      <form action="/" onSubmit={onSubmit}>
        <Typography type="headline">Sign Up</Typography>

        {errors.summary && <p className="error-message">{errors.summary}</p>}
        <div>
          <TextField
            className="input-field"
            error={errors.name ? true : false}
            label="Name"
            name="name"
            helperText={errors.name}
            onChange={onChange}
            value={user.name}
          />
        </div>
        <br />

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
            Create New Account
          </Button>
        </div>

        <CardContent>
          <Typography type="subheading" color="secondary">
            Already have an account? <Link to={"/login"}>Log in</Link>
          </Typography>
        </CardContent>
      </form>
    </Card>
  </div>
);

SignUpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};

export default SignUpForm;
