# SBT Code Sample.

## Quick Start

```
// Start the auth server in the `auth_server` directory
$ bundle install
$ rake db:migrate
$ rake db:speed
$ rails s

// Start the content server in the `content-service` directory
$ npm install && npm start

// Start the client server in the `simple-client` directory
$ npm install && npm start
```

## Overview

The subfolders in this repo represent a codeflow for authenticating users
and returning content based on their subscription status. The basic request
response flow is as follows:

```
                    +---------------+          3
                    |               +--------------------+
        1           | Simple Client |                    |
+-------------------+               | <--------+         |
|                   +---------------+          |         |
|        +----------^                         6|         |
|       2|                                     |         v
v        |                                     |
+--+--------+-----+           5            +------+-----------+
|                 +--------------------->  |                  |
|  Auth Backend   |           4            |  Content Server  |
|                 | <----------------------+                  |
+-----------------+                        +------------------+
```

1.  User signs in on the client, which sends a `POST` request to the auth backend
2.  Auth backend responds with an auth token if credentials match
3.  Client sends `GET` request to content server with auth token in header
4.  Content server sends token to auth backend to verify it's validity
5.  Auth backend verifies token, and responds with whether that user is
    "premium or not"
6.  Content server returns dictionary of meditation data based on premium status

Additional details on the individual pieces can be found in their respective
`README`s.

This is by no means meant to mirror a fleshed out real world solution, but
illustrate the standard communication path.

Obvious low hanging fruit to make this more "real world" ready:

* Security hardening: Relying on a token that never rotates is bad. Not having
  any other verification vectors (email? uuid?) also could make this much more
  secure.

* Testing: Of any kind... at all 😬

* Using service discovery or env variables instead of hardcoded localhost

* A script to manage launching/installing of the individual pieces
