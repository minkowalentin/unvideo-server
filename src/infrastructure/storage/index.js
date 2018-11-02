import Sequelize from 'sequelize';
  
const sequelize = new Sequelize(
  process.env.database,
  process.env.db_username,
  process.env.db_password,
  {
    define: {
      "createdAt": "created_at",
      "updatedAt": "updated_at"
    },
    dialect: 'postgres'
  },
);

const models = {
  User: sequelize.import('../models/user'),

  // to be implemented

  // City: sequelize.import('./city'),
  // Comment: sequelize.import('./comment'),
  // CommentRating: sequelize.import('./commentRating'),
  // Country: sequelize.import('./country'),
  // Map: sequelize.import('./map'),
  // MapRating: sequelize.import('./mapRating'),
  // UserFavourites: sequelize.import('./userFavourites'),
};
const userDbModel = sequelize.import('../models/user');

Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

export { sequelize,userDbModel };
export default models;