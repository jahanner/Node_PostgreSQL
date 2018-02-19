const { Router } = require("express");
const pool = require("../db");

const router = Router();

router.get("/", (request, response, next) => {
  pool.query("SELECT * FROM  habitats ORDER BY id ASC", (err, res) => {
    if (err) return next(err);

    response.json(res.rows);
  });
});

router.post("/", (request, response, next) => {
  const { name, climate, temperature } = request.body;

  pool.query(
    "INSERT INTO habitats(name, climate, temperature) VALUES($1, $2, $3)",
    [name, climate, temperature],
    (err, res) => {
      if (err) return next(err);

      response.redirect("/habitats");
    }
  );
});

router.get("/:id", (request, response, next) => {
  const { id } = request.params;
  pool.query("SELECT * FROM habitats WHERE id = $1", [id], (err, res) => {
    if (err) return next(err);

    response.json(res.rows);
  });
});

router.delete("/:id", (request, response, next) => {
  const { id } = request.params;
  pool.query("DELETE FROM habitats WHERE id = $1", [id], (err, res) => {
    if (err) return next(err);
    response.redirect(303, "/habitats");
  });
});

module.exports = router;
