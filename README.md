# Encrypt Example


Simple project to showcase a few things:

- encrypting/decrypting text using a client provided key
- testing
- simple deploy 
- HA
- Dev Setup


## Encryption 
It is done using an Initiation Vector so that even when encoding the same value twice, the cipher is never the same and is much much harder to reverse engineer should an attacker get a hold of the database.

## Testing 
Mocha + Chai scripts ensure things are working both during development and in staging

## Simple Deploy
App can run locally (has a redis dependency) or via docker.

## High Availability
Node server is written in a completely stateless way, so that it can be made HA by spawning multiple process. In this example we use PM2 to fire up N processes.

Redis DB is the single point of failure right now. It could be fixed by running a master/slave or cluster redis node.

## Dev Setup

Quick Dev: `npm start` and `npm test` commands keep the server running as you change it, and keep running tests against it


## Whats missing?
Lots of things :-)

- Logging, Authentication / Authorization, Solid HA

