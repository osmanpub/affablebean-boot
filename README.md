# Affablebean rebooted

![Shopping cart](/cart.jpg "Affablebean") 


This update is a Spring Boot version of the [Affable bean tutorial](https://github.com/osmanpub/affablebean) from 5 years ago.

It uses the Java 8 SDK and the Spring Framework, edited on an Eclipse IDE.

## Changes

* The username and password for the MySQL database can be changed in the *application.properties* file. Changing the credentials may require database permission changes (see Database setup).
* The website is now served at `localhost:8080`
* The admin console can be found at `localhost:8080/admin` Login in with username *admin* and password *letmein*.
* The language switcher from the page header has been removed. You can still access other languages by adding a query parameter to the URL, such as *?lang=es* 
E.g. `localhost:8080?lang=es`
* The sales & promotions features have been removed.

## Database setup

See the [MySQL README](./mysql/README.md) on how to create and configure the database.

## Testing the installation

Once you've set up the database:

1. Run the project from the command line using `sh server` or from Eclipse as a Spring boot app.
2. Navigate to `http://localhost:8080` in a browser to view the web application. 
 
 
![Home page](/home.jpg "Affablebean")

## RESTful API services

You can query the API from the command line, or in a browser. For most endpoints, you have GET, PATCH, PUT, POST and DELETE operations. You can query the following topics: `categories`, `customers`, `feedbacks`, `products` and `subjects`. None of these endpoints are secured - you wouldn't want customer details made public in production for example.

Let's put one endpoint through it's paces, and see what it can do. Open up a terminal, and run the server. In another terminal type the following command: 

`curl -v localhost:8080/api/categories`

`
*   Trying 127.0.0.1...
* Connected to localhost (127.0.0.1) port 8080 (#0)
> GET /api/categories HTTP/1.1
> Host: localhost:8080
> User-Agent: curl/7.47.0
> Accept: */*
> 
< HTTP/1.1 200 
< Set-Cookie: JSESSIONID=BE9D57FCD02061060FCA56F43F85E66D; Path=/; HttpOnly
< X-Content-Type-Options: nosniff
< X-XSS-Protection: 1; mode=block
< Cache-Control: no-cache, no-store, max-age=0, must-revalidate
< Pragma: no-cache
< Expires: 0
< X-Frame-Options: DENY
< Content-Type: application/json;charset=UTF-8
< Transfer-Encoding: chunked
< Date: Mon, 22 Apr 2019 10:24:11 GMT
< 
{"_embedded":{"categoryList":[{"id":3,"name":"bakery","_links":{"self":{"href":"http://localhost:8080/api/categori
es/3"},"categories":{"href":"http://localhost:8080/api/categories"}}},{"id":5,"name":"cereals","_links":{"self":{"
href":"http://localhost:8080/api/categories/5"},"categories":{"href":"http://localhost:8080/api/categories"}}},{"i
d":1,"name":"dairy","_links":{"self":{"href":"http://localhost:8080/api/categories/1"},"categories":{"href":"http:
//localhost:8080/api/categories"}}},{"id":6,"name":"drinks","_links":{"self":{"href":"http://localhost:8080/api/ca
tegories/6"},"categories":{"href":"http://localhost:8080/api/categories"}}},{"id":4,"name":"fruit & veg","_links":
{"self":{"href":"http://localhost:8080/api/categories/4"},"categories":{"href":"http://localhost:8080/api/categori
es"}}},{"id":2,"name":"meats","_links":{"self":{"href":"http://localhost:8080/api/categories/2"},"categories":{"hr
ef":"http://localhost:8080/api/categories"}}}]},"_links":{"self":{"href":"http://localhost:8080/api/categories"}* 
Connection #0 to host localhost left intact
`

Some of these end points are used by the react apps.


## React app

See the [React README](./react/README.md) on running the react app

