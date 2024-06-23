const sql = require("./db.js");

// constructor
const Project = function(project) {
  this.cliente = project.cliente;
  this.fecha_control_recepcion = project.fecha_control_recepcion;
  this.fecha_control_entrega = project.fecha_control_entrega;
  this.tecnico_recepcion = project.tecnico_recepcion;
  this.tecnico_entrega = project.tecnico_entrega;
  this.chasis = project.chasis;
  this.componente1_recepcion = project.componente1_recepcion;
  this.componente2_recepcion = project.componente2_recepcion;
  this.componente3_recepcion = project.componente3_recepcion;
  this.componente4_recepcion = project.componente4_recepcion;
  this.componente5_recepcion = project.componente5_recepcion;
  this.estado = project.estado;
};

Project.create = (newProject, result) => {
  sql.query("INSERT INTO project SET ?", newProject, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created project: ", { id: res.insertId, ...newProject });
    result(null, { id: res.insertId, ...newProject });
  });
};

Project.findById = (id, result) => {
  sql.query(`SELECT * FROM project WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found project: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Tutorial with the id
    result({ kind: "not_found" }, null);
  });
};

Project.getAll = (tecnico_recepcion, result) => {
  let query = "SELECT * FROM project order by id desc";

  if (tecnico_recepcion) {
    query += ` WHERE tecnico_recepcion LIKE '%${tecnico_recepcion}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("projects: ", res);
    result(null, res);
  });
};

Project.getAllPublished = result => {
  sql.query("SELECT * FROM project WHERE activo=true", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("projects: ", res);
    result(null, res);
  });
};

Project.editById = (id, project, result) => {
  sql.query(
    "UPDATE project SET estado = ?, cliente = ?, fecha_control_recepcion = ?, fecha_control_entrega = ?, tecnico_recepcion = ?, tecnico_entrega = ?, chasis = ?, componente1_recepcion = ?, componente2_recepcion = ?, componente3_recepcion = ?, componente4_recepcion = ?, componente5_recepcion = ? WHERE id = ?",
    [project.estado, project.cliente, project.fecha_control_recepcion, project.fecha_control_entrega, project.tecnico_recepcion, project.tecnico_entrega, project.chasis, project.componente1_recepcion, project.componente2_recepcion, project.componente3_recepcion, project.componente4_recepcion, project.componente5_recepcion, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("edit project: ", { id: id, ...project });
      result(null, { id: id, ...project });
    }
  );
};

Project.updateById = (id, project, result) => {
  sql.query(
    "UPDATE project SET estado = ?, cliente = ?, fecha_control_recepcion = ?, fecha_control_entrega = ?, tecnico_recepcion = ?, tecnico_entrega = ?, chasis = ?, componente1_recepcion = ?, componente2_recepcion = ?, componente3_recepcion = ?, componente4_recepcion = ?, componente5_recepcion = ? WHERE id = ?",
    [project.estado, project.cliente, project.fecha_control_recepcion, project.fecha_control_entrega, project.tecnico_recepcion, project.tecnico_entrega, project.chasis, project.componente1_recepcion, project.componente2_recepcion, project.componente3_recepcion, project.componente4_recepcion, project.componente5_recepcion, id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found Tutorial with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated project: ", { id: id, ...project });
      result(null, { id: id, ...project });
    }
  );
};

Project.remove = (id, result) => {
  sql.query("DELETE FROM project WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found Tutorial with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted project with id: ", id);
    result(null, res);
  });
};

Project.removeAll = result => {
  sql.query("DELETE FROM project", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} project`);
    result(null, res);
  });
};

module.exports = Project;