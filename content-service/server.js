'use strict'

const axios = require('axios')
const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const auth_url = 'http://localhost:3000/home'

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors())

app.get('/meditations/', (req, res) => {
  let standardMeditations = [
    {
      id: 99991,
      meditation: '🎮',
    },
    {
      id: 99992,
      meditation: '✊',
    },
    {
      id: 99993,
      meditation: '🦑',
    },
  ]
  let premiumMeditations = [
    {
      id: 99994,
      meditation: 'Premium 🐘',
    },
    {
      id: 99995,
      meditation: 'Premium 🌔',
    },
    {
      id: 99996,
      meditation: 'Premium 🎖',
    },
  ]

  if (req.headers.authorization !== null) {
    axios
      .get(auth_url, { headers: { Authorization: req.headers.authorization } })
      .then(function(response) {
        if (response.data.premium === true) {
          console.log('Sending Premium Meditations')
          res.json(standardMeditations.concat(premiumMeditations))
        } else {
          console.log('Sending Standard Meditations')
          res.json(standardMeditations)
        }
      })
      .catch(function(error) {
        console.log('error', error)
      })
  } else {
    res.send(401, 'Not Authorized')
  }
})

app.listen(3333)
console.log('Listening on localhost:3333')
