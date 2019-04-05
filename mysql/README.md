
## DATABASE SETUP

The AffableBean application requires access to a MySQL database.

 1.	Install [MySQL](https://dev.mysql.com/doc/refman/8.0/en/installing.html) on your system if it isn't already installed. 
 	
 	Make a note of your username and password during installation.

 2.	Install [Java 8 runtime](https://www.oracle.com/technetwork/java/javase/downloads/jre8-downloads-2133155.html) on your system if it isn't already installed. 

 	If you're a developer you can install the [SDK](https://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html) instead.
 		
 3. Run these commands from the affable-boot project folder to build and populate the database.
    
    	Open a command terminal, change to the project folder and start mysql:
    	
        `mysql -u root -p`

		Login using your password. If your admin username isn't 'root' then modify the -u parameter.
		        
        Next run the sql installation scripts:
        
        mysql> `source ./mysql/schema.sql;`
        mysql> `source ./mysql/data.sql;`
        
 4. Set up the following user so the server application can access the database:
          
		mysql> `create user 'springuser'@'%' identified by 'ThePassword';`
		mysql> `grant all on affablebean.* to 'springuser'@'%';`

 5. Quit the program by typing `quit` to return to the command shell.
 
 6. Test the installation by running `sh server` to start the server and type in `http://localhost:8080` in your browser to view the home page.
 
 	If everything is OK you should see the home page listing the product categories, along with sample photos. 	
 	