var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'prasanna6358@Gmail.com',
    pass: 'KOMARAM12345'
  }
});

var mailOptions = {
  from: 'prasanna6358@gmail.com',
  to: 'prasanna.billa@halcyontek.com',
  subject: 'Sending Email using Node.js',
  text: 'That was easy!'
};

transporter.sendMail(mailOptions, function(error, info){
  if (error) {
    console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
});