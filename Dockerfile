FROM node:carbon

WORKDIR /app
COPY package.json /app
RUN npm install
COPY . /app

# setup config for the docker environment
RUN rm -f /app/process.env
run mv -v /app/process.docker.env /app/process.env
RUN npm install pm2 -g

# starting 2 processes inside one docker image 
CMD pm2-runtime start process.yml
# make localhost:3000 available on host machine
EXPOSE 3000

