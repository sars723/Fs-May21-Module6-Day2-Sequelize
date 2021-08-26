import express from "express";
import db from "./db/models/association-models.js";
/* import { syncSequelize } from "./db/connection.js"; */
import cors from "cors";
import productRoutes from "./services/products/index.js";
import categoryRoutes from "./services/categories/index.js";
import userRoutes from "./services/users/index.js"
import cartRoutes from "./services/cart/index.js"
import commentRoutes from "./services/comments/index.js"

const app = express();

const port = process.env.PORT || 5001;

app.use(cors());

app.use(express.json());
app.use("/products", productRoutes);
app.use("/categories", categoryRoutes);
app.use("/users", userRoutes);
app.use("/cart", cartRoutes);
app.use("/comments",commentRoutes)

/* app.listen(port, async () => {
  console.log(" Server is running on port ", port);
  await syncSequelize();
});

app.on("error", (error) => console.log(" Server is crashed due to ", error)); */

 db.sequelize
  .sync({ alter: true })
  .then(() => {
    app.listen(port, () => console.log(" Server is running on port ", port));

    app.on("error", (error) =>
      console.log(" Server is crashed due to ", error)
    );
  })
  .catch((e) => console.log(e)); 