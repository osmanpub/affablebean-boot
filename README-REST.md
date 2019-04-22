## RESTful API services

![RESTful](/rest.png "RESTful") 

You can query the API from the command line, or in a browser. For most endpoints, you have GET, PATCH, PUT, POST and DELETE operations. You can query the following topics: `categories`, `customers`, `feedbacks`, `products` and `subjects`. None of these endpoints are secured - you wouldn't want customer details made public in production for example.

Let's put one endpoint through it's paces, and see what happens. Open up a terminal, navigate to the *affable-boot* directory and run the server `sh server`. In another terminal type the following command: 

`curl -v localhost:8080/api/categories` (or `http://localhost:8080/api/categories` in a browser)

`
{"_embedded":{"categoryList":[{"id":3,"name":"bakery","_links":{"self":{"href":"http://localhost:8080/api/categori
es/3"},"categories":{"href":"http://localhost:8080/api/categories"}}},{"id":5,"name":"cereals","_links":{"self":{"
href":"http://localhost:8080/api/categories/5"},"categories":{"href":"http://localhost:8080/api/categories"}}},{"i
d":1,"name":"dairy","_links":{"self":{"href":"http://localhost:8080/api/categories/1"},"categories":{"href":"http:
//localhost:8080/api/categories"}}},{"id":6,"name":"drinks","_links":{"self":{"href":"http://localhost:8080/api/ca
tegories/6"},"categories":{"href":"http://localhost:8080/api/categories"}}},{"id":4,"name":"fruit & veg","_links":
{"self":{"href":"http://localhost:8080/api/categories/4"},"categories":{"href":"http://localhost:8080/api/categori
es"}}},{"id":2,"name":"meats","_links":{"self":{"href":"http://localhost:8080/api/categories/2"},"categories":{"hr
ef":"http://localhost:8080/api/categories"}}}]},"_links":{"self":{"href":"http://localhost:8080/api/categories"}* 
`

(Header information omitted). 

As well as the categories list, we can see relevant navigational links that make the response more RESTful.
We could view a single category as follows: 

`curl -v localhost:8080/api/categories/1`

`
{"id":1,"name":"dairy","_links":{"self":{"href":"http://localhost:8080/api/categories/1"},"categories":{"href":"http://localhost:8080/api/categories"}}}
`

Here it's much easier to see the self and all links. Now let's add a category called "frozen foods":

`curl -X POST localhost:8080/api/categories -H 'Content-type:application/json' -d '{"name": "Frozen foods"}'`

And you should get back: 

`
{"id":7,"name":"Frozen foods","_links":{"self":{"href":"http://localhost:8080/api/categories/7"},"categories":{"hr
ef":"http://localhost:8080/api/categories"}}}
`

Check the [schema definition script](./mysql/schema.sql) for the category definition.
Since it has an id of 7, we can query it by:

`curl -v localhost:8080/api/categories/7`

`
{"id":7,"name":"Frozen foods","_links":{"self":{"href":"http://localhost:8080/api/categories/7"},"categories":{"href":"http://localhost:8080/api/categories"}}}
`

Finally let's delete the new category.

`curl -X DELETE localhost:8080/api/categories/7`

And check it's gone:

`curl -v localhost:8080/api/categories/7`

`
Could not find category 7
`