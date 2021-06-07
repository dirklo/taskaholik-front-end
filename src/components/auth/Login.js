import React from "react";
import { connect } from "react-redux";
import './Login.css'
import { loginUser } from "../../actions/auth";
import { populateTeams, setCurrentTeam } from "../../actions/team";
import ErrorField from '../ErrorField'

class Login extends React.Component {
  state = {
    email: "",
    password: "",
    error: '',
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
      if (this.props.auth.currentUser.selected_team) {
        this.props.redirect('/dashboard')
      } else {
        this.props.redirect('/teams/select')
      }
    })
    .catch((error) => this.setState({ error: error }));
  };

  render() {
    return (
      <>
        {this.props.mobileLogin || this.props.width > 1300 ? 
        <div className='login-window'>
          {this.state.error ? 
            <ErrorField 
              error={this.state.error}
              clearError={() => this.setState({error: ''})}
            />
            : null
          }
          <form
            onSubmit={this.handleSubmit}
            className='login-form'
          >
            <h1>Log In</h1>
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
            <input
              type='submit'
              value='Log In'
            />
          </form>
          <p>Test Account:<br/>
          email: test@email.com<br/>
          password: test123 
          </p>
          <button 
            type='button'
            onClick={this.props.showSignup}
          >
            New User?
          </button>
        </div>
        : null
        }
      </>
    );
  }
}

export default connect((state) => {
  return {
    auth: state.auth
  }
}, { loginUser, populateTeams, setCurrentTeam })(Login);