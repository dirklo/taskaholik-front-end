import React from "react"
import { connect } from "react-redux"
import { signupUser } from "../../actions/auth"
import { populateTeams } from "../../actions/team"
import ErrorField from '../../components/ErrorField'
import './Signup.css'

class Signup extends React.Component {
  state = {
    email: "",
    username: "",
    password: "",
    passwordConfirmation: "",
    error: '',
    emailFocus: false,
    usernameFocus: false,
    passwordFocus: false,
    passwordConfirmationFocus: false
  };

  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  handleFocus = (e) => {
    this.setState({
      [e.target.dataset.focus]: true
    })
  }
  
  handleBlur = (e) => {
    if (e.target.value === '') {
      this.setState({
        [e.target.dataset.focus]: false
      })
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { email, username, password } = this.state;
    this.props.signupUser({ email, username, password })
    .then(() => {
      this.props.redirect('/teams/new')
    })
    .catch(() => this.setState({ error: true }));
  };

  render() {
    return (
      <div className='signup-window'>
        <form
          onSubmit={this.handleSubmit}
          className='signup-form'
        >
          <h1>Sign Up</h1>
          {this.props.errors ?
            <ErrorField 
              error={this.props.error}
              clearError={() => this.setState({...this.state, error: ''})}
            />
          :
            null
          }
            <label htmlFor='username' className={this.state.usernameFocus ? 'focus' : ''}>
              Username
            </label>
            <input
              type='text'
              name='username'
              id='username'
              data-focus='usernameFocus'
              onFocus={this.handleFocus}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              value={this.state.username}
            />
            <br/>
            <br/>
            <label htmlFor='email' className={this.state.emailFocus ? 'focus' : ''}>
              Email
            </label>
            <input
              type='text'
              name='email'
              id='email'
              data-focus='emailFocus'
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
              data-focus='passwordFocus'
              onFocus={this.handleFocus}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              value={this.state.password}
            />
            <br/>
            <br/>
            <label htmlFor='password-confirmation' className={this.state.passwordConfirmationFocus ? 'focus' : ''}>
              Password Confirmation
            </label>
            <input
              type='password'
              name='passwordConfirmation'
              id='password-confirmation'
              data-focus='passwordConfirmationFocus'
              onFocus={this.handleFocus}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
              value={this.state.passwordConfirmation}
            />
            <br/>
            <br/>
          <input
            type='submit'
            value='Sign Up'
          />
        </form>
        <button 
          type='button'
          onClick={this.props.showLogin}
        >
          Existing User?
        </button>
      </div>
    );
  }
}

export default connect((state) => {
  return {
    auth: state.auth
  }
}, { signupUser, populateTeams })(Signup);