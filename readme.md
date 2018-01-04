# Database server tech test

https://github.com/makersacademy/course/blob/master/individual_challenges/database_server.md

"Before your interview, write a program that runs a server that is accessible on http://localhost:4000/. When your server receives a request on http://localhost:4000/set?somekey=somevalue it should store the passed key and value in memory. When it receives a request on http://localhost:4000/get?key=somekey it should return the value stored at somekey. Store the data in memory, not in a database, but bear in mind that you will later need to add a database to this code."

### Implementation

In its current form, this Node.js app expands upon the original brief, and now uses Express and Sequelize to store and return a values from a PostgreSQL database. The app initially used Express sessions to hold keys and values.

Upon loading http://localhost:4000/, the user is greeted with a welcome message and the Sequelize sync() function ensures the databases tables are correct.

If the user visits http://localhost:4000/set?somekey=somevalue a get request is used to obtain the value  from the url, and a new 'item' is created holding the key and value, along with automatically assigned ID and date and time created fields. The saved value is then rendered to the screen.

If the user then visits http://localhost:4000/get?key=somekey&id=0 the stored value will be selected from the database and rendered to the screen. The 'id' parameter was not part of the original specification but provides a work around for an issue I had accessing specific items from the database using Sequelize. Given more time I'd prefer to find a more discrete solution to this.

### To run

git clone: https://github.com/joecowton/database-express

npm install

createdb mydb

(configure Sequelize settings in app.js)

node app/app.js

### To test

npm test (while server is running)
