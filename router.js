const express = require("express");
const router = express.Router();
const fs = require("fs");

const json_usuarios = fs.readFileSync("usuarios.json", "utf8");
let usuarios = JSON.parse(json_usuarios);

// -----------MOSTRAR-----------------
router.get("/", (req, res) => {
  res.render("index.ejs", { usuarios });
});


// -----------INSERTAR-----------------
router.get("/create", (req, res) => {
  res.render("create");
});

router.post("/create", (req, res) => {
  const id = usuarios.length + 1;
  const { nombre, edad, telefono, correo, area } = req.body;
  let newUser = {
    id: id,
    nombre: nombre,
    edad: edad,
    telefono: telefono,
    correo: correo,
    area: area,
  };
  usuarios.push(newUser);
  console.log(newUser);
  const json_usuarios = JSON.stringify(usuarios);
  fs.writeFileSync("usuarios.json", json_usuarios, "utf-8");
  res.redirect("/");
});

// -----------UPDATE-------------------
router.get("/update/:id", async (req, res) => {
  let userId = await usuarios.find(
    (user) => user.id === parseInt(req.params.id)
  );
  res.render("update", { user: userId });
});
// -------
router.post("/update", async (req, res) => {
  userId = await usuarios.find((user) => user.id === parseInt(req.body.id));
  let indexFound = usuarios.findIndex(
    (user) => user.id === parseInt(req.body.id)
  );

  const { id, nombre, edad, telefono, correo, area } = req.body;
    let newUser = {
    id: id,
    nombre: nombre,
    edad: edad,
    telefono: telefono,
    correo: correo,
    area: area,
  };

  console.log("INDEX FOUND");
  console.log(indexFound);

  console.log("NEW USER  NUEVOS VALORES");
  console.log(newUser);

  const newData = [...usuarios];
  newData[indexFound] = newUser;

  usuarios = newData;

  console.log("NEW DATA INDEX");
  console.log(newData);

  const json_usuarios = JSON.stringify(usuarios);
  fs.writeFileSync("usuarios.json", json_usuarios, "utf-8");

  res.json({
    message:"product updated successfully"
})

});

// ----------ELIMINAR---------
router.get("/delete/:id", (req, res) => {
  usuarios = usuarios.filter((user) => user.id != req.params.id);
  const json_usuarios = JSON.stringify(usuarios);
  fs.writeFileSync("usuarios.json", json_usuarios, "utf-8");
  
  res.json({
    message:"product deleted successfully"
})
});

module.exports = router;
