import React, { Component } from 'react'
import Login from './Login'
import axios from 'axios'

const BASE_URL = 'http://localhost:3333'

class Meditations extends Component {
  constructor() {
    super()
    this.state = {
      meditations: [],
      email: '',
      password: '',
      loggedIn: false,
    }
  }

  handleLoginSubmit = evt => {
    evt.preventDefault()
    var apiBaseUrl = 'http://localhost:3000/'
    var payload = {
      email: this.state.email,
      password: this.state.password,
    }

    axios
      .post(apiBaseUrl + 'auth_user', payload)
      .then(response => {
        if (response.status === 200) {
          localStorage.setItem('jwt', response.data.auth_token)
        } else if (response.status === 204) {
          alert('Bad Credentials')
        }
      })
      .then(() => {
        this.setState({ loggedIn: true })
        this.getMeditations()
      })
      .catch(function(error) {
        console.log("Coudln't log in. 🤷", error)
      })
  }

  handleLoginChange = evt => {
    this.setState({ [evt.target.name]: evt.target.value })
  }

  getMeditations = () => {
    this.getMeditationsData().then(meditations => {
      this.setState({ meditations })
    })
  }

  handleLogout = () => {
    localStorage.removeItem('jwt')
    this.setState({ loggedIn: false, meditations: [], email: '', password: '' })
  }

  getMeditationsData = () => {
    const AuthString =
      localStorage.getItem('jwt') !== null
        ? 'Bearer ' + localStorage.getItem('jwt')
        : null
    const url = `${BASE_URL}/meditations/`
    return axios
      .get(url, { headers: { Authorization: AuthString } })
      .then(response => {
        return response.data
      })
  }

  componentDidMount = () => {
    if (localStorage.getItem('jwt') !== null) {
      this.getMeditations()
      this.setState({ loggedIn: true })
    }
  }

  render() {
    return (
      <div>
        <div>
          <h3>My Meditations</h3>
          <hr />
          {this.state.loggedIn === false ? (
            <Login
              handleLoginSubmit={this.handleLoginSubmit}
              handleLoginChange={this.handleLoginChange}
              email={this.state.email}
              password={this.state.password}
            />
          ) : (
            ''
          )}
          {this.state.meditations.map((meditation, index) => {
            return (
              <div key={index}>
                <h3>
                  #{meditation.id} {meditation.meditation}
                </h3>
              </div>
            )
          })}
          {this.state.loggedIn === true ? (
            <button onClick={this.handleLogout}> Logout </button>
          ) : (
            ''
          )}
        </div>
      </div>
    )
  }
}

export default Meditations
