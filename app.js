'use strict';

const { sequelize, models } = require('./db');

// Get references to our models.
const { Person, Movie } = models;

// Define variables for the people and movies.
// NOTE: We'll use these variables to assist with the creation
// of our related data after we've defined the relationships
// (or associations) between our models.
let bradBird;
let vinDiesel;
let eliMarienthal;
let craigTNelson;
let hollyHunter;

let theIronGiant;
let theIncredibles;
let incredibles2;

console.log('Testing the connection to the database...');

// Test the connection to the database.
sequelize
  .authenticate()
  .then(() => {
    console.log('Synchronizing the models with the database...');

    return sequelize.sync();
  })
  .then(() => {
    console.info('Adding people to the database...');

    return Promise.all([
      Person.create({
        firstName: 'Brad',
        lastName: 'Bird',
      }),
      Person.create({
        firstName: 'Vin',
        lastName: 'Diesel',
      }),
      Person.create({
        firstName: 'Eli',
        lastName: 'Marienthal',
      }),
      Person.create({
        firstName: 'Craig T.',
        lastName: 'Nelson',
      }),
      Person.create({
        firstName: 'Holly',
        lastName: 'Hunter',
      }),
    ]);
  })
  .then((data) => {
    console.log("PEOPLE");
    console.log(JSON.stringify(data, null, 2));

    // Update the global variables for the people instances.
    [bradBird, vinDiesel, eliMarienthal, craigTNelson, hollyHunter] = data;

  })
  .then(() => {
    console.log('Adding movies to the database...');

    return Promise.all([
      Movie.create({
        title: 'The Iron Giant',
        releaseYear: 1999,
        directorId: bradBird.id,
      }),
      Movie.create({
        title: 'The Incredibles',
        releaseYear: 2004,
        directorId: bradBird.id,
      }),
      Movie.create({
        title: 'Incredibles 2',
        releaseYear: 2018,
        directorId: bradBird.id,
      }),

    ]);
  })
  .then((data) => {
    console.log(JSON.stringify(data, null, 2));

    // Update the global variables for the movie instances.
    [theIronGiant, theIncredibles, incredibles2] = data;

  })
  .then(() => {
    console.log('Adding actors to movies...');
    return Promise.all([
      hollyHunter.addActedInMovies([theIncredibles, incredibles2]),
      craigTNelson.addActedInMovies([theIncredibles, incredibles2]),
      bradBird.addActedInMovies([theIncredibles, incredibles2]),
      vinDiesel.addActedInMovie(theIronGiant),
      eliMarienthal.addActedInMovies(theIronGiant)
    ]);
  })
  .then(() => {
    console.log("Retrieving movies and associated people...");

    return Movie.findAll({ 
      order: [['releaseYear', 'DESC']],
      include: [ 
        { 
          model: Person,
          as: 'director' 
        }, 
        {
          model: Person,
          as: 'actors'
        }
      ] 
    });
  
  })
  .then((data) => {
      console.log(JSON.stringify(data, null, 2));
  })
  .then(() => {
    console.log("Retrieving people and associated movies...");

    return Person.findAll({ 
      order: [["lastName", "ASC"], ["firstName", "ASC"]],
      include: [ 
        { 
          model: Movie,
          as: 'directed' 
        }, 
        {
          model: Movie,
          as: 'actedInMovies'
        }
      ] 
    });
  
  })
  .then((data) => {
    console.log(JSON.stringify(data, null, 2));

    process.exit();
  })
  .catch(err => console.error(err));
