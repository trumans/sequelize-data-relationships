
To Install
from terminal window: $ npm install

To Start
from terminal window: $ npm start
  which executes app.js
  1. sequelize sync which deletes and repopulates database
  2. add people to database with Person.create() method
  3. add movies to database with Movie.create() method
  4. add actors to movies with <actor>.addMovie() / .addMovie() methods
  5. find all movies, sorted by release date (descending) and include
     associated director and actor.
  6. find all people, sorted by last name & first name, and include
     associated movies as director or actor.

Project Structure
/db/models - Sequelize models for movie and person tables
app.js     - main script
movies.db  - the database