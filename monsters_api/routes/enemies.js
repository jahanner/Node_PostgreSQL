const { Router } = require("express");
const pool = require("../db");

const router = Router();

router.get("/", (request, response, next) => {
  pool.query("SELECT * FROM enemies ORDER BY id ASC", (err, res) => {
    if (err) return next(err);

    response.json(res.rows);
  });
});

router.post("/", (request, response, next) => {
  const { enemyOf, name } = request.body;
  pool.query(
    "INSERT INTO enemies(enemyOf, name) VALUES ($1, $2)",
    [enemyOf, name],
    (err, res) => {
      if (err) return next(err);

      response.redirect("/enemies");
    }
  );
});

router.delete("/:id", (request, response, next) => {
  const { id } = request.params;

  pool.query("DELETE FROM enemies WHERE id = $1", [id], (err, res) => {
    if (err) return next(err);

    response.redirect(303, "/enemies");
  });
});

module.exports = router;
