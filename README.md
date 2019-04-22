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

See the [README-REST](./README-REST.md) on how these services are implemented.

Some of these services are used by the react apps.


## React apps

See the [React README](./react/README.md) on running the JS app

See the [React README](./react-ts/README.md) on running the Typescript app

## Exercises

Since it's a shopping cart app, you can look no further than [Amazon](https://amazon.com) for inspiration!
Here's what I've come up with:

1. Use the checkout page as a template for customer login, since many of the fields are already there. Allow them to sign up or [login](http://localhost:8080/login) and then redirect them back to the previous page.

2. Use the [admin](http://localhost:8080/admin) page as a template for the customer's order page. Instead of displaying every customer and order, you would just fitler for the logged in user.

3. Using these sample apps as starters, build me a site like Amazon for $1000, like [this guy](https://www.reddit.com/r/web_design/comments/18icho/i_want_to_build_a_website_like_amazon_but_better/).
