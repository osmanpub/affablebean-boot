# Affablebean rebooted

This update is a Spring Boot version of the [Affable bean tutorial](https://github.com/osmanpub/affablebean) from 5 years ago.

It uses the Java 8 SDK and the Spring Framework, edited on an Eclipse IDE.

## Changes

* The username and password for the MySQL database can be changed in the application.properties file. Changing the credentials may require database permission changes (see Database setup).
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
