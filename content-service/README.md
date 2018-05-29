## Ultra tiny content microservice

Run with `npm start`

This is a _very_ simple express microservice that serves
a `json` dictionary based on a token auth. That token
is sent to a rails backend for verification, and, based on
response from the auth service, either returns a list of
"standard" or "standard + premium" meditations.
