AffableBean Spring Boot
=======================

This update is a Spring Boot version of the Affable bean tutorial from 5 years ago:

https://github.com/osmanpub/affablebean

It uses Java 8 & the Spring Framework, edited on a Eclipse IDE.


CHANGES
-------

* The username and password for the MySQL database can be found in the application.properties file and are now 'springuser' and 'ThePassword'.
* The website is now served at localhost:8080 since Spring Boot uses an embedded Tomcat server, and not Glassfish. 
* The admin console can be found at localhost:8080/admin and you can login in with username 'admin' and password 'letmein'.
* The language switcher from the page header has been removed. You can still access other languages by adding a query parameter such as '?lang=es'.
  E.g. localhost:8080?lang=es.
* The sales & promotions features have also been removed.


DATABASE
--------

See mysql/README.txt to create and configure the database.


SERVER
------

Once you've set up the server you can either:

1. Run the project from the command line using 'sh server' or
2. Run the project from Eclipse as a Spring boot app (or another Spring capable IDE).

CLIENT
------

Navigate to http://localhost:8080 to view the web application.

 

