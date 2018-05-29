import React, { Component } from 'react'

class Login extends Component {
  render() {
    return (
      <form onSubmit={this.props.handleLoginSubmit}>
        <label>Email</label>
        <input
          type="text"
          name="email"
          value={this.props.email}
          onChange={this.props.handleLoginChange}
        />
        <br />
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={this.props.password}
          onChange={this.props.handleLoginChange}
        />
        <br />
        <input type="submit" value="Submit" />
      </form>
    )
  }
}
export default Login
