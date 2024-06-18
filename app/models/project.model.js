const sql = require("./db.js");

// constructor
const Project = function(project) {
  this.tecnico = project.tecnico;
  this.chasis = project.chasis;
  this.activo = project.activo;
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

Project.getAll = (tecnico, result) => {
  let query = "SELECT * FROM project";

  if (tecnico) {
    query += ` WHERE tecnico LIKE '%${tecnico}%'`;
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

Project.updateById = (id, tutorial, result) => {
  sql.query(
    "UPDATE project SET tecnico = ?, chasis = ?, activo = ? WHERE id = ?",
    [project.tecnico, project.chasis, project.activo, id],
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

      console.log("updated project: ", { id: id, ...tutorial });
      result(null, { id: id, ...tutorial });
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