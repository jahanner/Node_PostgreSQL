const { Router } = require("express");
const pool = require("../db");

const router = Router();

router.get("/", (request, response, next) => {
  //'/monsters' is already set as default in index.js
  pool.query("SELECT * FROM monsters ORDER BY id ASC", (err, res) => {
    if (err) return next(err);

    response.json(res.rows); //give a response of the rows in the result
  });
});

router.get("/:id", (request, response, next) => {
  const { id } = request.params;
  pool.query("SELECT * FROM monsters WHERE id = $1", [id], (err, res) => {
    if (err) return next(err);

    response.json(res.rows);
  });
});

router.post("/", (request, response, next) => {
  const { name, personality } = request.body;
  pool.query(
    "INSERT INTO monsters(name, personality) VALUES($1, $2)",
    [name, personality],
    (err, res) => {
      if (err) return next(err);

      response.redirect("/monsters"); //allows redirect so you don't have to set another Get request
    }
  );
});

router.put("/:id", (request, response, next) => {
  //PUT allows updating of data; NEXT for handling errors in callback
  console.log(request.body);
  const { id } = request.params;
  const keys = ["name", "personality"];
  const fields = [];

  keys.forEach(key => {
    if (request.body[key]) fields.push(key);
  });

  fields.forEach((field, index) => {
    pool.query(
      `UPDATE monsters SET ${field}=$1 WHERE id=$2`,
      [request.body[field], id],
      (err, res) => {
        if (err) return next(err);

        if (index === fields.length - 1) response.redirect(303, "/monsters");
      }
    );
  });
});

router.delete("/:id", (request, response, next) => {
  const { id } = request.params;

  pool.query("DELETE FROM monsters WHERE id = $1", [id], (err, res) => {
    if (err) return next(err);

    response.redirect(303, "/monsters");
  });
});

module.exports = router;
