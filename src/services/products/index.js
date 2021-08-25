import express from "express";
import db from "../../db/models/association-models.js";
const Product = db.Product;
const Category = db.Category;
import s from "sequelize";
const { Op } = s;

const router = express.Router();

router
  .route("/")
  .get(async (req, res, next) => {
    try {
      const { name } = req.query;
      const filter = req.query.name
        ? {
            where: {
                name: {
                [Op.iLike]: `%${name}%`,
              },
            },
          }
        : {};
      const data = await Product.findAll({
        ...filter,
        include: Category,
      });
      res.send(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .post(async (req, res, next) => {
    try {
      const data = await Product.create(req.body);
      res.send(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

router
  .route("/:id")
  .get(async (req, res, next) => {
    try {
      const data = await Product.findByPk(req.params.id);
      res.send(data);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .put(async (req, res, next) => {
    try {
      const data = await Product.update(req.body, {
        where: { id: req.params.id },
        returning: true,
      });
      res.send(data[1][0]);
    } catch (error) {
      console.log(error);
      next(error);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const rows = await Product.destroy({
        where: {
          id: req.params.id,
        },
      });
      if (rows > 0) {
        res.send("ok");
      } else {
        res.status(404).send("not found");
      }
    } catch (error) {
      console.log(error);
      next(error);
    }
  });

export default router;