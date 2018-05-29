This is a very simple Rails Auth backend.

## You know the drill for install/launch...

```bash
// Assuming ruby 2.4.2
$ bundle install
$ rake db:migrate
$ rake db:seed
$ rails s
```

## Other notes

For the purposes of this code sample, I opted to ignore signups and confirmations
and the myriad of other user lifecycle use cases.

The seed file creates 2 users: `standard@example.com` and `premium@example.com`.

Both users have the password of `password`

There are two endpoints:

`/auth_user` takes a username and password in `POST`, and returns a token. This
is meant to be used as an endpoint for clients initial login.

`/` is a simple endpoint that returns a key of `:premium` assuming an auth
header with a viable token is present. This could be used either for a front-end
client to verify an existing token, or (as is the case for this demo) utilized
to verify user requests sent to other microservices directly.
