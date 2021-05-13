import React from "react";
import { connect } from "react-redux";
import { loginUser } from "../../actions/auth";
import { populateTeams } from "../../actions/team";
import './Login.css'

class Login extends React.Component {
  state = {
    email: "",
    password: "",
    error: false,
    emailFocus: false,
    passwordFocus: false
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleFocus = (e) => {
    e.target.name === 'email' ?
    this.setState({
      emailFocus: true
    })
    :
    this.setState({
      passwordFocus: true
    })
  }

  handleBlur = (e) => {
    if (e.target.name === 'email') {
      if (this.state.email === '') {
        this.setState({
          emailFocus: false
        })
      }
    } else {
      if (this.state.password === '') {
        this.setState({
          passwordFocus: false
        })
      }
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { email, password } = this.state;
    this.props.loginUser({ email, password })
    .then(() => {
      this.props.redirect('/teams/select')
    })
    .catch(() => this.setState({ error: true }));
  };

  render() {
    return (
      <div className='login-window'>
        <form
          onSubmit={this.handleSubmit}
          className='login-form'
        >
          <h1>Log In</h1>
          <p>{this.state.error && "Invalid email or password"}</p>
            <label htmlFor='email' className={this.state.emailFocus ? 'focus' : ''}>
              Email or Username
            </label>
            <input
              type='text'
              name='email'
              id='email'
              onFocus={this.handleFocus}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              value={this.state.email}
            />
            <br/>
            <br/>
            <label htmlFor='password' className={this.state.passwordFocus ? 'focus' : ''}>
              Password
            </label>
            <input
              type='password'
              name='password'
              id='password'
              onFocus={this.handleFocus}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              value={this.state.password}
            />
            <br/>
            <br/>
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