const Project = require("../models/project.model.js");

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Tutorial
  const project = new Project({
    cliente: req.body.cliente,
    fecha_control_recepcion: req.body.fecha_control_recepcion,
    tecnico_recepcion: req.body.tecnico_recepcion,
    chasis: req.body.chasis,
    componente1_recepcion: req.body.componente1_recepcion,
    componente2_recepcion: req.body.componente2_recepcion,
    componente3_recepcion: req.body.componente3_recepcion,
    componente4_recepcion: req.body.componente4_recepcion,
    componente5_recepcion: req.body.componente5_recepcion,
    componente6_recepcion: req.body.componente6_recepcion,
    componente7_recepcion: req.body.componente7_recepcion,
    componente8_recepcion: req.body.componente8_recepcion,
    componente9_recepcion: req.body.componente9_recepcion,
    componente10_recepcion: req.body.componente10_recepcion,
    componente11_recepcion: req.body.componente11_recepcion,
    componente12_recepcion: req.body.componente12_recepcion,  
    componente13_recepcion: req.body.componente13_recepcion,
    componente14_recepcion: req.body.componente14_recepcion,
    componente15_recepcion: req.body.componente15_recepcion,
    componente16_recepcion: req.body.componente16_recepcion,
    componente17_recepcion: req.body.componente17_recepcion,
    componente18_recepcion: req.body.componente18_recepcion,
    componente19_recepcion: req.body.componente19_recepcion,
    componente20_recepcion: req.body.componente20_recepcion,
    componente21_recepcion: req.body.componente21_recepcion,
    componente22_recepcion: req.body.componente22_recepcion,
    observacion_recepcion: req.body.observacion_recepcion,

    requerimiento_recepcion: req.body.requerimiento_recepcion,
    firma_entrega: req.body.firma_entrega, 
    nombre_completo_entrega: req.body.nombre_completo_entrega,
    telefono_entrega: req.body.telefono_entrega,
    foto1 : req.body.foto1,
    foto2 : req.body.foto2,
    foto3 : req.body.foto3,
    foto4 : req.body.foto4,

    //activo: req.body.activo || false
    estado: req.body.estado
  });

  // Save Tutorial in the database
  Project.create(project, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Project."
      });
    else res.send(data);
  });
};

// Retrieve all Tutorials from the database (with condition).
exports.findAll = (req, res) => {
  const tecnico_recepcion = req.query.tecnico_recepcion;

  Project.getAll(tecnico_recepcion, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    else res.send(data);
  });
};

// Find a single Tutorial by Id
exports.findOne = (req, res) => {
  Project.findById(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Project with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Project with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// find all published Tutorials
exports.findAllPublished = (req, res) => {
  Project.getAllPublished((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    else res.send(data);
  });
};

// Update a Tutorial identified by the id in the request
exports.edit = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Project.editById(
    req.params.id,
    new Project(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Project with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Project with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Update a Tutorial identified by the id in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  Project.updateById(
    req.params.id,
    new Project(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Project with id ${req.params.id}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Project with id " + req.params.id
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Tutorial with the specified id in the request
exports.delete = (req, res) => {
  Project.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Project with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Project with id " + req.params.id
        });
      }
    } else res.send({ message: `Tutorial was deleted successfully!` });
  });
};

// Delete all Tutorials from the database.
exports.deleteAll = (req, res) => {
  Project.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all projects."
      });
    else res.send({ message: `All Project were deleted successfully!` });
  });
};
