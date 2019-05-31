'use strict';

module.exports = (sequelize, DataTypes) => {
  const Movie = sequelize.define('Movie', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    releaseYear: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  Movie.associate = (models) => {
    // movie has one director
    Movie.belongsTo(models.Person, {
      as: 'director',
      foreignKey: {
        fieldName: 'directorId', 
        allowNull: false
      }
    });
    
    // movie has many-to-many relationship with multiple actors
    Movie.belongsToMany(models.Person, {
      as: 'actors',
      foreignKey: 'movieId',
      through: 'Actors_Movies'
    });

  };

  return Movie;
};
