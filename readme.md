# Encrypt Example


NodeJS project with a few goals:

- encrypting/decrypting text using a client provided key
- testing
- simple deploy 
- HA
- Good Dev experience

## Encryption 
It is done using an Initiation Vector so that even when encoding the same value twice, the cipher is never the same and is much much harder to reverse engineer should an attacker get a hold of the database.

## Testing 
Mocha + Chai scripts ensure things are working both during development and in staging. Run `npm test` during dev keeps running tests every time some file changes.

## Simple Deploy
App can run it locally with `npm start` (you need to have redis running unsecurely on localhost) or via docker via `sh run.sh` (docker sets up everything for you, and after that you'll be able to access the api on http://localhost:3000).

## High Availability
Node server is written in a completely stateless way, so that it can be made HA by spawning multiple process. In this example we use PM2 to fire up N processes.

Redis DB is the single point of failure right now. It could be fixed by running a master/slave or cluster redis node.

## Dev Setup

Quick Dev: `npm start` keeps the server running as you change files, and `npm test` keeps running tests against it


## Whats missing?
Lots of things :-)

- Logging, Authentication / Authorization, Solid HA

