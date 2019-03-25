# Node js server

This server needs to be running constantly.

It is fetching data/articles from MySQL database and broadcasting them on API, about every 5 minutes (so mobile devices can read from it).

To start node js server:
forever start /nodeServer/server.js

To stop node js server:
forever stop /nodeServer/server.js

To restart node js server:
forever restart /nodeServer/server.js


