'use strict';

module.exports = (sequelize, DataTypes) => {
  const Person = sequelize.define('Person', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  
  Person.associate = (models) => {
    // director has one-to-many relationship with movies
    Person.hasMany(models.Movie, {
      as: 'director', 
      foreignKey: {
        name: 'directorId', 
        allowNull: false
      }
    });

    // actor have many-to-many relationship with movies
    Person.belongsToMany(models.Movie, {
      as: 'actor',
      foreignKey: 'actorId', 
      through: 'Actors_Movies'
    });
  
  };


  return Person;
};
