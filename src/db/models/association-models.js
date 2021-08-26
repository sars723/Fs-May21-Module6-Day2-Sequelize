import Product from "./Product.js";
import Category from "./Category.js";
import sequelize from "../connection.js";
import Comment from "./Comment.js"
import User from "./User.js"
import Cart from "./Cart.js"



Product.belongsTo(Category);
Category.hasMany(Product);

Product.belongsTo(User);
User.hasMany(Product);


Product.belongsToMany(User, { through: { model: Cart, unique: false } });
User.belongsToMany(Product, { through: { model: Cart, unique: false } });

User.hasMany(Cart);
Cart.belongsTo(User);

Product.hasMany(Cart);
Cart.belongsTo(Product);



Comment.belongsTo(User);
User.hasMany(Comment);

Comment.belongsTo(Product);
Product.hasMany(Comment);




export default { Product,Category,Comment,User,Cart,sequelize };