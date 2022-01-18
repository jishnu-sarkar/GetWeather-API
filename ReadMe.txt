//GET REQUESTS 
1.http://localhost:8080/weather/city?cityName=kolkata 
==>
to get the current weather details by providing cityname;


2.http://localhost:8080/weather/city/forecast?cityName=kolkata
==>
to get the weekly weather details by providing cityname;

3.http://localhost:8080/weather/latlon?lat=22.5697&lon=88.3697
==>
to get the current weather details by providing latitude and longitude;
pass the lat value for { latitude } and lon value for{ longitude }

4.http://localhost:8080/weather/latlon/forecast?lat=22.5697&lon=88.3697
==>
to get the weekly weather details by providing latitude and longitude;
pass the lat value for { latitude } and lon value for{ longitude }


5.http://localhost:8080/weather
==>
this is the default route where by default it will fetch the ip of the user and detect the location based on the ip, after getting city it will show the weather report of that city;



to setup the api you have to install :
1. "body-parser"
2. "dotenv"
3. "express"
4. "lodash"
5. "node-fetch": version < 3;

we need to install the version 2 for node-fetch as the latest version (version 3) supports ESM only so we are not able to use require.


app.js is the starting point of our api which is creating a server which is listning at port 8080 defined as PORT.

from there we passed a route towards weatherRoute.js where all the path are defind.

from every path we called the functions from controller