import React from "react";
import './Signup.css'
import { connect } from "react-redux";
import { signupUser } from "../../actions/auth";

class Signup extends React.Component {
  state = {
    username: "",
    email: "",
    password: "",
    errors: {status: {message: ""}}
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { username, email, password } = this.state;
    this.props
      .dispatchSignupUser({ username, email, password })
      .then(() => this.props.history.push("/"))
      .catch((errors) => this.setState({ errors }));
  };

  render() {
    return (
      <div className="signup-page">
        <form
          className="signup-form"
          onSubmit={this.handleSubmit}
        >
          <h1>Sign Up</h1>
          <p>{this.state.errors.status.message}</p>
          <fieldset>
            <label htmlFor='username'>
              Username:
            </label>
            <input
              type='text'
              name='username'
              id='username'
              onChange={this.handleChange}
              value={this.state.username}
            />
          </fieldset>
          <fieldset>
            <label htmlFor='email'>
              Email:
            </label>
            <input
              type='text'
              name='email'
              id='email'
              onChange={this.handleChange}
              value={this.state.email}
            />
          </fieldset>
          <fieldset>
            <label htmlFor='password'>
              Password:
            </label>
            <input
              type='password'
              name='password'
              id='password'
              onChange={this.handleChange}
              value={this.state.password}
            />
          </fieldset>
          <input
            type='submit'
            value='Sign Up'
          />
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatchSignupUser: (credentials) => dispatch(signupUser(credentials))
  };
};

export default connect(null, mapDispatchToProps)(Signup);