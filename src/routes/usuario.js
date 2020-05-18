const express = require("express");
const router = express.Router();
const sequelize = require("sequelize");
const db = require("../config/database");
const Op = sequelize.Op;
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const operador = require("../models/usuario");

// EFETIVIDAD COBRADORES

router.get("/mostrar", (req, res, next) => {
  operador
    .findAll()

    .then((usuario) => {
      res.status(200).json(usuario);
    })

    .catch((err) => {
      res.status(400).json(err);
    });
});

router.get("/usuario/:id", (req, res, next) => {
  operador
    .findOne({
      where: { usuario: req.params.id },
    })
    .then((usuario) => {
      res.status(200).json(usuario);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
});

router.post("/nuevousuario", (req, res, next) => {
  const { usuario, contrasena, apellido, nombre, perfil, estado } = req.body;

  //Validacion simple
  if (!usuario || !contrasena) {
    return res.status(400).json({ msg: "Todos los campos son obligatorios" });
  }

  // chek usuario existente
  operador
    .findOne({
      where: {
        usuario: usuario,
      },
    })
    .then((usuario) => {
      if (usuario) return res.status(400).json({ msg: "Usuario Existente" });
    });

  const newUsuario = {
    usuario,
    contrasena,
    nombre,
    apellido,
    perfil,
    estado,
  };

  //Create salt & hash

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newUsuario.contrasena, salt, (err, hash) => {
      if (err) throw err;
      newUsuario.contrasena = hash;
      operador
        .create(newUsuario)
        .then((user) => {
          jwt.sign(
            { id: user.id },
            config.get("jwtSecret"),
            { expiresIn: 3600 },
            (err, token) => {
              if (err) throw err;
              res.json({
                token,
                user: {
                  id: user.id,
                  usuario: user.usuario,
                  contrasena: user.contrasena,
                  nombre: user.nombre,
                  apellido: user.apellido,
                  perfil: user.perfil,
                  estado: user.estado,
                },
              });
            }
          );
        })
        .then((usuario) => {
          res.status(200).json(usuario);
        })
        .catch((err) => {
          res.status(400).json(err);
        });
    });
  });
});

router.put("/editarusuario/:id", (req, res, next) => {
  const { contrasena, apellido, nombre, perfil, codigo, id_usuario } = req.body;

  const UsuarioEdit = {
    id_usuario,
    contrasena,
    nombre,
    apellido,
    perfil,
    codigo,
  };

  //Create salt & hash

  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(UsuarioEdit.contrasena, salt, (err, hash) => {
      if (err) throw err;
      UsuarioEdit.contrasena = hash;
      operador
        .update(
          {
            nombre: UsuarioEdit.nombre,
            apellido: UsuarioEdit.apellido,
            perfil: UsuarioEdit.perfil,
            estado: UsuarioEdit.estado,
            contrasena: UsuarioEdit.contrasena,
          },
          { where: { id_usuario: UsuarioEdit.id_usuario } }
        )
        .then((usuario) => {
          res.status(200).json(usuario);
        })
        .catch((err) => {
          res.status(400).json(err);
        });
    });
  });
});

module.exports = router;
