This is a Weather-API which allow us to get weather details in five ways

which also have two different types of search, 
i) Authorized Search:
    in this search user can check their search history.

ii) Unsuthorized Search:
    in this search users can not check their search history.

Requirement:
to setup the api you have to install :
1. "body-parser"
2. "dotenv"
3. "express"
4. "lodash"
5. "node-fetch": version < 3;

we need to install the version 2 for node-fetch as the latest version (version 3) supports ESM only so we are not able to use require.


app.js is the starting point of our api which is creating a server which is listning at port 8080 defined as PORT.

from there we passed a route towards weatherRoute.js where all the path are defind.

from every path we called the functions from controller.