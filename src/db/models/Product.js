import sequelize from "../connection.js";
import s from "sequelize";
const { DataTypes } = s;

const Product = sequelize.define("product", {
  id: {
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },


/*   categoryId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }, */
  image: {
    type: DataTypes.TEXT,
    allowNull: false,
   /*  validate: {
      isUrl: true,
      msg: "Invalid url",
    }, */
  },
});

export default Product;

