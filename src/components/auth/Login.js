import React from "react";
import { connect } from "react-redux";
import { loginUser } from "../../actions/auth";
import { populateTeams } from "../../actions/team";
import './Login.css'

class Login extends React.Component {
  state = {
    email: "",
    password: "",
    error: false
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    this.props.loginUser({ email, password })
    .then(() => this.props.history.push('/teams/select'))
    .catch(() => this.setState({ error: true }));
  };

  render() {
    return (
      <div className='login-page'>
        <form
          onSubmit={this.handleSubmit}
          className='login-form'
        >
          <h1>Log In</h1>
          <p>{this.state.error && "Invalid email or password"}</p>
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
            <label className='block uppercase mb-2' htmlFor='password'>
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
            value='Log In'
          />
        </form>
      </div>
    );
  }
}

export default connect((state) => {
  return {
    auth: state.auth
  }
}, { loginUser, populateTeams })(Login);