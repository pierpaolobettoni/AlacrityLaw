# Encrypt Example
Simple NodeJS project to demonstrate a few concepts around services and encryption.

## Run it
A couple of options

- To run the complete dockerized version: `sh run.sh` The first run is downloading assets and might require a bit of a wait. 
It's ready when you see the following on screen:

    `web_1    | localhost listening at 3000`

- To run on your localhost: 'npm start' (requires redis running on localhost)

## Encryption 
It is done using an Initiation Vector together with the user-provided key. 

Text is stored in encrypted version, while both ID and IV are stored in clear. User key is not stored anywhere.

## Testing 
Mocha + Chai scripts ensure things are working both during development and in staging

## High Availability
A simple HA strategy is used. The core concept is that the app is completely stateless, which gives you all sort of options on how to implement HA. Right now PM2 is used to fire up 2 processes and make sure that there are always 2 running (should one crash, PM2 would fire up another one).

Redis DB is the single point of failure right now. It could be fixed by running a master/slave or cluster redis node. (Beyond the scope of this excercize)

## Working on it
If you are working on the code, open 2 terminals and run:

-  `npm start`: runs the server and reloads it every time a file changes
-  `npm test`: runs all tests every time a file changes 


## Whats missing?
Lots of things :-)  this is just a starting point

