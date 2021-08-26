import { Sequelize } from "sequelize";

const { PGDATABASE, PGUSERNAME, PGPASSWORD, PGHOST, PGPORT } = process.env;

const sequelize = new Sequelize(PGDATABASE, PGUSERNAME, PGPASSWORD, {
  host: PGHOST,
  port: PGPORT,
  dialect: "postgres",
});
/* const schemas = ["development", "production"]
  .map(
    (schema) => `CREATE SCHEMA  IF NOT EXISTS ${schema} AUTHORIZATION postgres`
  )
  .join(";");
console.log(schemas);

export const syncSequelize = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.query(schemas);
    await sequelize.sync({
      // alter: true,
      logging: false,
      schema: "development",
    });
    console.log("DB authenticated");
  } catch (error) {
    console.log(error);
  }
}; */

 const testConnection = async () => {
  try {
    sequelize.authenticate().then(() => {
      console.log("db is authenticated");
    });
  } catch (error) {
    console.log(error);
  }
};

testConnection(); 

export default sequelize;
