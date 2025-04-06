const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for port 465, false for other ports
    auth: {
      user: "mediiconemr@gmail.com",
      pass: "ehja ebmz dcjf nhty",
    },
  });

  function sendmail(tomail, subject, text, html) {
    // send mail with defined transport object
    return transporter.sendMail({
      from: '"DoNotReply" <mediiconemr@gmail.com>', // sender address
      to: tomail,//"bar@example.com, baz@example.com", // list of receivers
      subject: subject,//"Hello ✔", // Subject line
      text: text,//"Hello world?", // plain text body
      html: html//"<b>Hello world?</b>", // html body
    });
    
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
  }
function getverifyemailmailbody(){
  const otpEmailTemplate = `
<!DOCTYPE html>
<html>
<head>
    <title>OTP Verification</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-image: url('https://emrfrontend.vercel.app/static/media/16379.8031e796628bbd0fc63e.jpg'); /* Replace with actual image URL */
            background-size: cover;
            background-position: center;
            height: 100vh;
        }
        .container {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }
        .otp-box {
            background: rgba(255, 255, 255, 0.9);
            padding: 20px;
            border-radius: 10px;
            text-align: center;
            box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
        }
        .otp-box h2 {
            color: #333;
        }
        .otp-code {
            font-size: 24px;
            font-weight: bold;
            color: #007BFF;
            background: #f8f9fa;
            padding: 10px;
            display: inline-block;
            border-radius: 5px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="otp-box">
            <h2>Your OTP for Verification</h2>
            <p class="otp-code">{{OTP}}</p> <!-- Replace with dynamic OTP -->
            <p>Please use this OTP to complete your verification process.</p>
        </div>
    </div>
</body>
</html>
`;
return otpEmailTemplate;

}
  module.exports = {sendmail,getverifyemailmailbody};