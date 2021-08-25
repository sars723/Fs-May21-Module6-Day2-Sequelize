import Product from "./Product.js";
import Category from "./Category.js";
import sequelize from "../connection.js";



Product.belongsTo(Category);
Category.hasMany(Product);

export default { Product,Category,sequelize };