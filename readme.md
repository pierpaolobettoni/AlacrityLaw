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
Mocha + Chai scripts ensure things are working both during development and in staging. Run `npm test` during dev run tests for you every time some file changes.

## Simple Deploy
 - One-line docker install: `sh run.sh` Docker sets up everything for you, and after that you'll be able to access the api on http://localhost:3000.
  - Execute node directly on your localhost: run `npm start` NOTE: you need to already have redis running unsecurely on localhost 


## High Availability
Node server is written in a completely stateless way, so that it can be made HA by spawning multiple process. In this example we use PM2 to fire up N processes. Should one of the processes crash, PM2 will immediately instantiate a second one.

Redis DB is the single point of failure right now. It could be fixed by running a master/slave or cluster redis node.

## Dev Setup
Quick Dev: `npm start` keeps the server running as you change files, and `npm test` keeps running tests against it


## Whats missing?
Lots of things :-)


