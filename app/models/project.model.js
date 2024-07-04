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
  this.componente6_recepcion = project.componente6_recepcion;
  this.componente7_recepcion = project.componente7_recepcion;
  this.componente8_recepcion = project.componente8_recepcion;
  this.componente9_recepcion = project.componente9_recepcion;
  this.componente10_recepcion = project.componente10_recepcion;
  this.componente11_recepcion = project.componente11_recepcion;
  this.componente12_recepcion = project.componente12_recepcion;  
  this.componente13_recepcion = project.componente13_recepcion;
  this.componente14_recepcion = project.componente14_recepcion;
  this.componente15_recepcion = project.componente15_recepcion;
  this.componente16_recepcion = project.componente16_recepcion;
  this.componente17_recepcion = project.componente17_recepcion;
  this.componente18_recepcion = project.componente18_recepcion;
  this.componente19_recepcion = project.componente19_recepcion;
  this.componente20_recepcion = project.componente20_recepcion;
  this.componente21_recepcion = project.componente21_recepcion;
  this.componente22_recepcion = project.componente22_recepcion;
  this.observacion_recepcion = project.observacion_recepcion;
  
  this.requerimiento_recepcion = project.requerimiento_recepcion;
  this.firma_entrega = project.firma_entrega;  
  this.nombre_completo_entrega = project.nombre_completo_entrega;
  this.telefono_entrega = project.telefono_entrega;
  this.foto1 = project.foto1;
  this.foto2 = project.foto2;
  this.foto3 = project.foto3;
  this.foto4 = project.foto4;



  this.componente1_entrega = project.componente1_entrega;
  this.componente2_entrega = project.componente2_entrega;
  this.componente3_entrega = project.componente3_entrega;
  this.componente4_entrega = project.componente4_entrega;
  this.componente5_entrega = project.componente5_entrega;
  this.componente6_entrega = project.componente6_entrega;
  this.componente7_entrega = project.componente7_entrega;
  this.componente8_entrega = project.componente8_entrega;
  this.componente9_entrega = project.componente9_entrega;
  this.componente10_entrega = project.componente10_entrega;
  this.componente11_entrega = project.componente11_entrega;
  this.componente12_entrega = project.componente12_entrega;
  this.componente13_entrega = project.componente13_entrega;
  this.componente14_entrega = project.componente14_entrega;
  this.componente15_entrega = project.componente15_entrega;
  this.componente16_entrega = project.componente16_entrega;
  this.componente17_entrega = project.componente17_entrega;
  this.componente18_entrega = project.componente18_entrega;
  this.componente19_entrega = project.componente19_entrega;
  this.componente20_entrega = project.componente20_entrega;
  this.componente21_entrega = project.componente21_entrega;
  this.componente22_entrega = project.componente22_entrega;

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

Project.getAll = (cliente, result) => {
  let query = "SELECT * FROM project order by id desc";

  if (cliente) {
    query = ` SELECT * FROM project WHERE cliente LIKE '%${cliente}%' or chasis LIKE '%${cliente}%' `;
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
    //"UPDATE project SET estado = ?, cliente = ?, fecha_control_recepcion = ?, fecha_control_entrega = ?, tecnico_recepcion = ?, tecnico_entrega = ?, chasis = ?, componente1_recepcion = ?, componente2_recepcion = ?, componente3_recepcion = ?, componente4_recepcion = ?, componente5_recepcion = ?, componente6_recepcion = ?, componente7_recepcion = ?, componente8_recepcion = ?, componente9_recepcion = ?, componente10_recepcion = ?, componente11_recepcion = ?, componente12_recepcion = ?, componente13_recepcion = ?, componente14_recepcion = ?, componente15_recepcion = ?, componente16_recepcion = ?, componente17_recepcion = ?, componente18_recepcion = ?, componente19_recepcion = ?, componente20_recepcion = ?, componente21_recepcion = ?, componente22_recepcion = ?, componente1_entrega = ?, componente2_entrega = ?, componente3_entrega = ?, componente4_entrega = ?, componente5_entrega, componente6_entrega = ?, componente7_entrega = ?, componente8_entrega = ?, componente9_entrega = ?, componente10_entrega = ?, componente11_entrega = ?, componente12_entrega = ?, componente13_entrega = ?, componente14_entrega = ?, componente15_entrega, componente16_entrega = ?, componente17_entrega = ?, componente18_entrega = ?, componente19_entrega = ?, componente20_entrega = ?, componente21_entrega = ?, componente22_entrega = ? WHERE id = ?",
    //[project.estado, project.cliente, project.fecha_control_recepcion, project.fecha_control_entrega, project.tecnico_recepcion, project.tecnico_entrega, project.chasis, project.componente1_recepcion, project.componente2_recepcion, project.componente3_recepcion, project.componente4_recepcion, project.componente5_recepcion, project.componente6_recepcion, project.componente7_recepcion, project.componente8_recepcion, project.componente9_recepcion, project.componente10_recepcion, project.componente11_recepcion, project.componente12_recepcion, project.componente13_recepcion, project.componente14_recepcion, project.componente15_recepcion, project.componente16_recepcion, project.componente17_recepcion, project.componente18_recepcion, project.componente19_recepcion, project.componente20_recepcion, project.componente21_recepcion, project.componente22_recepcion, project.componente1_entrega, project.componente2_entrega, project.componente3_entrega, project.componente4_entrega, project.componente5_entrega, project.componente6_entrega, project.componente7_entrega, project.componente8_entrega, project.componente9_entrega, project.componente10_entrega, project.componente11_entrega, project.componente12_entrega, project.componente13_entrega, project.componente14_entrega, project.componente15_entrega, project.componente16_entrega, project.componente17_entrega, project.componente18_entrega, project.componente19_entrega, project.componente20_entrega, project.componente21_entrega, project.componente22_entrega, id],
    "UPDATE project SET estado = ?, cliente = ?, fecha_control_recepcion = ?, fecha_control_entrega = ?, tecnico_recepcion = ?, tecnico_entrega = ?, chasis = ?, componente1_recepcion = ?, componente2_recepcion = ?, componente3_recepcion = ?, componente4_recepcion = ?, componente5_recepcion = ?, componente6_recepcion = ?, componente7_recepcion = ?, componente8_recepcion = ?, componente9_recepcion = ?, componente10_recepcion = ?, componente11_recepcion = ?, componente12_recepcion = ?, componente13_recepcion = ?, componente14_recepcion = ?, componente15_recepcion = ?, componente16_recepcion = ?, componente17_recepcion = ?, componente18_recepcion = ?, componente19_recepcion = ?, componente20_recepcion = ?, componente21_recepcion = ?, componente22_recepcion = ?, componente1_entrega = ?, componente2_entrega = ?, componente3_entrega = ?, componente4_entrega = ?, componente5_entrega = ?, componente6_entrega = ?, componente7_entrega = ?, componente8_entrega = ?, componente9_entrega = ?, componente10_entrega = ?, componente11_entrega = ?, componente12_entrega = ?, componente13_entrega = ?, componente14_entrega = ?, componente15_entrega = ?, componente16_entrega = ?, componente17_entrega = ?, componente18_entrega = ?, componente19_entrega = ?, componente20_entrega = ?, componente21_entrega = ?, componente22_entrega = ? WHERE id = ?",
    [project.estado, project.cliente, project.fecha_control_recepcion, project.fecha_control_entrega, project.tecnico_recepcion, project.tecnico_entrega, project.chasis, project.componente1_recepcion, project.componente2_recepcion, project.componente3_recepcion, project.componente4_recepcion, project.componente5_recepcion, project.componente6_recepcion, project.componente7_recepcion, project.componente8_recepcion, project.componente9_recepcion, project.componente10_recepcion, project.componente11_recepcion, project.componente12_recepcion, project.componente13_recepcion, project.componente14_recepcion, project.componente15_recepcion, project.componente16_recepcion, project.componente17_recepcion, project.componente18_recepcion, project.componente19_recepcion, project.componente20_recepcion, project.componente21_recepcion, project.componente22_recepcion, project.componente1_entrega, project.componente2_entrega, project.componente3_entrega, project.componente4_entrega, project.componente5_entrega, project.componente6_entrega, project.componente7_entrega, project.componente8_entrega, project.componente9_entrega, project.componente10_entrega, project.componente11_entrega, project.componente12_entrega, project.componente13_entrega, project.componente14_entrega, project.componente15_entrega, project.componente16_entrega, project.componente17_entrega, project.componente18_entrega, project.componente19_entrega, project.componente20_entrega, project.componente21_entrega, project.componente22_entrega, id],
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
    "UPDATE project SET estado = ?, cliente = ?, fecha_control_recepcion = ?, fecha_control_entrega = ?, tecnico_recepcion = ?, tecnico_entrega = ?, chasis = ?, componente1_recepcion = ?, componente2_recepcion = ?, componente3_recepcion = ?, componente4_recepcion = ?, componente5_recepcion = ?, componente6_recepcion = ?, componente7_recepcion = ?, componente8_recepcion = ?, componente9_recepcion = ?, componente10_recepcion = ?, componente11_recepcion = ?, componente12_recepcion = ?, componente13_recepcion = ?, componente14_recepcion = ?, componente15_recepcion = ?, componente16_recepcion = ?, componente17_recepcion = ?, componente18_recepcion = ?, componente19_recepcion = ?, componente20_recepcion = ?, componente21_recepcion = ?, componente22_recepcion = ?, componente1_entrega = ?, componente2_entrega = ?, componente3_entrega = ?, componente4_entrega = ?, componente5_entrega = ?, componente6_entrega = ?, componente7_entrega = ?, componente8_entrega = ?, componente9_entrega = ?, componente10_entrega = ?, componente11_entrega = ?, componente12_entrega = ?, componente13_entrega = ?, componente14_entrega = ?, componente15_entrega = ?, componente16_entrega = ?, componente17_entrega = ?, componente18_entrega = ?, componente19_entrega = ?, componente20_entrega = ?, componente21_entrega = ?, componente22_entrega = ? WHERE id = ?",
    [project.estado, project.cliente, project.fecha_control_recepcion, project.fecha_control_entrega, project.tecnico_recepcion, project.tecnico_entrega, project.chasis, project.componente1_recepcion, project.componente2_recepcion, project.componente3_recepcion, project.componente4_recepcion, project.componente5_recepcion, project.componente6_recepcion, project.componente7_recepcion, project.componente8_recepcion, project.componente9_recepcion, project.componente10_recepcion, project.componente11_recepcion, project.componente12_recepcion, project.componente13_recepcion, project.componente14_recepcion, project.componente15_recepcion, project.componente16_recepcion, project.componente17_recepcion, project.componente18_recepcion, project.componente19_recepcion, project.componente20_recepcion, project.componente21_recepcion, project.componente22_recepcion, project.componente1_entrega, project.componente2_entrega, project.componente3_entrega, project.componente4_entrega, project.componente5_entrega, project.componente6_entrega, project.componente7_entrega, project.componente8_entrega, project.componente9_entrega, project.componente10_entrega, project.componente11_entrega, project.componente12_entrega, project.componente13_entrega, project.componente14_entrega, project.componente15_entrega, project.componente16_entrega, project.componente17_entrega, project.componente18_entrega, project.componente19_entrega, project.componente20_entrega, project.componente21_entrega, project.componente22_entrega, id],
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