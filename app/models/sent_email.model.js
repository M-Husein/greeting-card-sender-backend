const sql = require("./db.js");

const SendEmail = function(data) {
  this.sender_name = data.sender_name;
  this.sender_email = data.sender_email;
  this.recipient_name = data.recipient_name;
  this.recipient_email = data.recipient_email;
  this.message = data.message;
  this.created_at = data.created_at;
  this.updated_at = data.updated_at;
};

SendEmail.create = (newData, result) => {
  sql.query("INSERT INTO sent_email SET ?", newData, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    // console.log("created sent email: ", { id: res.insertId, ...newData });
    result(null, { id: res.insertId, ...newData });
  });
};

SendEmail.getAll = (message, result) => {
  let query = "SELECT * FROM sent_email";

  if (message) {
    query += ` WHERE message LIKE '%${message}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("sent_email: ", res);
    result(null, res);
  });
};

SendEmail.remove = (id, result) => {
  sql.query("DELETE FROM sent_email WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found sent_email with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted sent_email with id: ", id);
    result(null, res);
  });
};

SendEmail.removeAll = result => {
  sql.query("DELETE FROM sent_email", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} sent_email`);
    result(null, res);
  });
};

module.exports = SendEmail;
