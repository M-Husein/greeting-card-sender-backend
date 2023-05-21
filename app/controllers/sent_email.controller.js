const nodemailer = require('nodemailer');
const SentEmail = require("../models/sent_email.model.js");

const nowTimestamp = () => {
  const d = new Date();
  return d.toISOString().split('T')[0] + ' ' + d.toTimeString().split(' ')[0];
}

// Create and Save a new SentEmail
exports.create = async (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  try {
    const created_at = nowTimestamp();
    const { sender_name, sender_email, recipient_name, recipient_email, message, html } = req.body;

    // Create a SentEmail
    const sentEmail = new SentEmail({
      sender_name,
      sender_email,
      recipient_name,
      recipient_email,
      message,
      created_at,
      updated_at: created_at,
    });

    // Generate test SMTP service account from ethereal.email
    // Only needed if you don't have a real mail account for testing
    // const testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST, // 'smtp.ethereal.email',
      port: process.env.MAIL_PORT, // 587,
      // secure: false,
      auth: {
        // user: testAccount.user, // generated ethereal user
        // pass: testAccount.pass, // generated ethereal password
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
      },
    });

    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: sender_email, // `"${sender_name}" <${sender_email}>`, // '"Fred Foo 👻" <foo@example.com>', // sender address
      to: recipient_email, // "bar@example.com, baz@example.com", // list of receivers
      subject: "Greeting from " + sender_name, // Subject line
      // text: "Hello world?", // plain text body
      html, // html body
    });

    console.log('info: ', info);

    if(!info){
      res.status(500).send({
        message: err.message || "Some error occurred while creating the SentEmail."
      });
      return;
    }

    // Save SentEmail in the database
    SentEmail.create(sentEmail, (err, data) => {
      if (err){
        res.status(500).send({
          message: err.message || "Some error occurred while creating the SentEmail."
        });
      }
      else res.send(data);
    });
  } catch(err){
    res.status(500).send({
      message: err.message || "Some error occurred while creating the SentEmail."
    });
  }
};

// Retrieve all SentEmails from the database (with condition).
exports.findAll = (req, res) => {
  const message = req.query.message;

  SentEmail.getAll(message, (err, data) => {
    if (err){
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving SentEmails."
      });
    }
    else res.send(data);
  });
};

// Delete a SentEmail with the specified id in the request
exports.delete = (req, res) => {
  SentEmail.remove(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found SentEmail with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete SentEmail with id " + req.params.id
        });
      }
    } else res.send({ message: `SentEmail was deleted successfully!` });
  });
};

// Delete all SentEmails from the database.
exports.deleteAll = (req, res) => {
  SentEmail.removeAll((err, data) => {
    if (err){
      res.status(500).send({
        message: err.message || "Some error occurred while removing all SentEmails."
      });
    }
    else res.send({ message: `All SentEmails were deleted successfully!` });
  });
};
