const { Router } = require("express");
const { check } = require("express-validator");

const { validarJWT } = require("../middlewares/validar-jwt");
const { validarCampos } = require("../middlewares/validar-campos");
const { isDate } = require("../helpers/isDate");

const {
  getEventos,
  crearEvento,
  actualizarEvento,
  eliminarEvento
} = require("../controllers/events");

const router = Router();


// Todas tienen que pasar por la validación del JWT

router.use(validarJWT);

//  Obtener eventos
router.get("/", getEventos);

// Crear un nuevo evento

router.post("/", [
  check("title", "El título es obligatorio").not().isEmpty(),
  check("start", "La fecha de inicio es obligatoria").custom(isDate),
  check("end", "La fecha de finalización es obligatoria").custom(isDate),
  validarCampos
], crearEvento);

// Actualizar evento
router.put("/:id", [
  check("title", "El título es obligatorio").not().isEmpty(),
  check("start", "La fecha de inicio es obligatoria").custom(isDate),
  check("end", "La fecha de finalización es obligatoria").custom(isDate),
  validarCampos
],actualizarEvento);

// Borrar evento

router.delete("/:id", eliminarEvento);

module.exports = router;




