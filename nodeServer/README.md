# Node js server

This server needs to be running constantly.

It is fetching data/articles from MySQL database and broadcasting them on API, about every 5 minutes (so mobile devices can read from it).

To start node js server:
"forever start /nodeServer/server.js"

To stop node js server:
"forever stop /nodeServer/server.js"

To restart node js server:
"forever restart /nodeServer/server.js"


Also: 
EADDRINUSE error means something is running on the port you are trying to use: 
- if it is forever, use restart option above 
- if still the same error:
find PID (process id):  
"netstat -nlp | grep 3001" 
then kill the process:    
"kill -9 PID "
then start server:   
"forever start /nodeServer/server.js"  

Note:
if you ever change port number, you need to change it on all connecting mobile devices (means change it in AppStore and Google Play)



