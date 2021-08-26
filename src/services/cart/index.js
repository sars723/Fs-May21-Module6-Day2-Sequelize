import { Router } from "express";
import  Cart  from "../../db/models/association-models.js";
import Product from "../../db/models/association-models.js";
import sequelize from "sequelize";
const router = Router();

router.route("/").post(async (req, res, next) => {
  try {
    const data = await Cart.create(req.body);
    res.send(data);
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.route("/:userId").get(async (req, res, next) => {
  try {
    const data = await Cart.findAll({
      where: { userId: req.params.userId },
    });

    /*
    select up."productId", count(*) as unitary_qty from public."Carts" as up where up."userId"=1
    group by up."productId";
    */

    const groupBy = await Cart.findAll({
      attributes: ["productId", [sequelize.fn("COUNT", "id"), "unitary_qty"]],
      where: {
        userId: req.params.userId,
      },
      group: "productId",
    });

    /*
    select up."productId", p.id, p.name,  p.price, p.category_id, count(*) as unitary_qty from public."Carts" as up left join products as p
    on up."productId"= p.id
    where up."userId"=1
    group by up."productId", p.id
    
    */

    /*
    select up."productId", p.name, p.price,  sum(p.price) as unitary_price  from public."Carts" as up left join products as p
    on up."productId"= p.id
    where up."userId"=1
    group by up."productId", p.id
    */

    const groupAndIcludeProduct = await Cart.findAll({
      attributes: [
        "productId",
        [sequelize.fn("COUNT", "id"), "unitary_qty"],
        [sequelize.fn("SUM", sequelize.col("product.price")), "unitary_price"],
      ],
      where: {
        userId: req.params.userId,
      },
      include: { model: Product, attributes: ["name", "price"] },
      group: ["productId", "product.id"],
    });

    //select count(*) from public."Carts" as up where up."userId"=1;
    const countAll = await Cart.count({
      where: { userId: req.params.userId },
    });

    /*
    select sum(p.price) from public."Carts" as up
    left join products as p
    on up."productId"= p.id
    where up."userId"=1;
    */

    const sumAll = await Cart.sum("product.price", {
      include: { model: Product, attributes: [] },
      where: { userId: req.params.userId },
    });

    res.send({
      products: groupAndIcludeProduct,
      total: countAll,
      totalPrice: sumAll,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

router.route("/:userId/:productId").delete(async (req, res, next) => {
  try {
    const { productId, userId } = req.params;

    const rowCount = await Cart.destroy({
      where: { productId, userId },
      limit: !req.query.all && 1,
    });
    if (rowCount > 1) {
      res.send("product removed from cart");
    } else if (rowCount === 1) {
      res.send("qty decreased");
    } else {
      res.status(404).send("not found");
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
});

export default router;
