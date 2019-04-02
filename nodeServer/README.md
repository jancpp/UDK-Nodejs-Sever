# nodeServer

#### before the first run:
npm install

#### to start:
forever start server.js (highly recommended)
#### to restart
forever restart server.js
#### or
nodemon server.js or node server.js  
- if EADDRINUSE error, you need to find PID and kill process  

Server login credentials are in db/config.js:
IP: 104.248.235.9  
port: 3001    

## All mobile devices are looking for ip and port! If these are changed, they must be also changed in AppStore applications and Google Play applications
