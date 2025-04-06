const express = require('express');
const router = express.Router();
const { registerdb, checkusernamedb, checkemaildb, authenticatelogindb, forgotpassdb, authenticateotpdb, resetpassdb, verifyemaildb, verifyemailotpdb } = require('../dbconnect/logindb');
const app = express();
const route = '/accounts';
router.post(route + '/register', function (req, res) {
  let data = {
    firstname: req.body.firstname,
    middlename: req.body.middlename,
    lastname: req.body.lastname,
    DLNO: req.body.DLNO,
    DOB: req.body.DOB,
    PerMobileNo: req.body.PerMobileNo,
    ClinicMobileNo: req.body.ClinicMobileNo,
    Email: req.body.Email,
    CAddr: req.body.CAddr,
    PAddr: req.body.PAddr,
    VisitTime: req.body.VisitTime,
    TCChk: req.body.TCChk,
    username: req.body.username,
    password: req.body.password
  };
  checkemaildb(data)
    .then((result) => {
      console.log('Check result:', result);
      if (result == "1") {
        const outdata = {
          Flag: result, // '1' or '0'
          Msg: 'Email already associated with another account!'
        };
        res.end(JSON.stringify(outdata));
      }
      else {
        checkusernamedb(data)
          .then((result) => {
            console.log('Check result:', result);
            if (result == "1") {
              const outdata = {
                Flag: result, // '1' or '0'
                Msg: 'Username taken!'
              };
              res.end(JSON.stringify(outdata));
            }
            else {
              let outcode = registerdb(data);
              let outdata = {
                Flag: outcode,
                Msg: outcode == "1" ? "Error registering user" : "User registered successfully!"
              }
              res.end(JSON.stringify(outdata));
            }
          })
          .catch((error) => {
            console.error('Error in execution:', error);
            const outdata = {
              Flag: '1', // Default to '1' on error
              Msg: 'Error in execution',
            };
            res.end(JSON.stringify(outdata));
          });
      }
    })
    .catch((error) => {
      console.error('Error in execution:', error);

      const outdata = {
        Flag: '1', // Default to '1' on error
        Msg: 'Error in execution',
      };
      res.end(JSON.stringify(outdata));
    });
})
router.post(route + '/checkusername', function (req, res) {//kept just in case this api is needed in future
  const data = {
    username: req.body.username,
  };

  checkusernamedb(data)
    .then((result) => {
      console.log('Check result:', result);

      const outdata = {
        Flag: result, // '1' or '0'
        Msg: result === '1' ? 'Username taken!' : 'Username available',
      };

      res.end(JSON.stringify(outdata));
    })
    .catch((error) => {
      console.error('Error in execution:', error);

      const outdata = {
        Flag: '1', // Default to '1' on error
        Msg: 'Error in execution',
      };

      res.end(JSON.stringify(outdata));
    });
});
router.post(route + '/authenticatelogin', function (req, res) {//to verify login creds
  const data = {
    username: req.body.username,
    password: req.body.password
  };

  authenticatelogindb(data)
    .then((result) => {
      console.log('Check result:', result);
      let msg = "";
      if (result.split('~')[0] == '0') {
        msg = 'Logged in successfully!';
      }
      else if (result.split('~')[0] == '1') {
        msg = 'Username or password is incorrect'
      }
      else if (result.split('~')[0] == '2') {
        msg = 'Please enter the otp sent to your registered emailid :' + result.split('~')[1]
      }
      const outdata = {
        Flag: result.split('~')[0], // '1' or '0'
        Msg: msg,
      };

      res.end(JSON.stringify(outdata));
    })
    .catch((error) => {
      console.error('Error in execution:', error);

      const outdata = {
        Flag: '1', // Default to '1' on error
        Msg: 'Error in execution: ' + error,
      };

      res.end(JSON.stringify(outdata));
    });
});
router.post(route + '/forgotpass', function (req, res) {//kept just in case this api is needed in future
  const data = {
    username: req.body.username,
  };

  forgotpassdb(data)
    .then((result) => {
      console.log('Check result:', result);

      const outdata = {
        Flag: result.split('~')[0], // '1' or '0'
        Msg: result.split('~')[0] === '1' ? 'Username not found!' : '',
        Email: result.split('~')[0] === '0' ? result.split('~')[1] : ''
      };

      res.end(JSON.stringify(outdata));
    })
    .catch((error) => {
      console.error('Error in execution:', error);

      const outdata = {
        Flag: '1', // Default to '1' on error
        Msg: 'Error in execution',
      };

      res.end(JSON.stringify(outdata));
    });
});

router.post(route + '/authenticateotp', function (req, res) {//kept just in case this api is needed in future
  if (req.body.flg == null || req.body.flg == '') {
    return {
      Flag: '1',
      Msg: 'Error'
    };
  }
  const data = {
    username: req.body.username,
    otp: req.body.otp,
    flg: req.body.flg
  };

  authenticateotpdb(data)
    .then((result) => {
      console.log('Check result:', result);

      const outdata = {
        Flag: result, // '1' or '0'
        Msg: result === '1' ? 'Invalid OTP! Please try again' : 'OTP verified!',
      };

      res.end(JSON.stringify(outdata));
    })
    .catch((error) => {
      console.error('Error in execution:', error);

      const outdata = {
        Flag: '1', // Default to '1' on error
        Msg: 'Error in execution',
      };

      res.end(JSON.stringify(outdata));
    });
});

router.post(route + '/resetpass', function (req, res) {//reset password
  const data = {
    username: req.body.username,
    password: req.body.password,
  };

  resetpassdb(data)
    .then((result) => {
      console.log('Check result:', result);

      const outdata = {
        Flag: result, // '1' or '0'
        Msg: result === '1' ? 'Password updation failed!' : 'Password updated successfully!',
      };

      res.end(JSON.stringify(outdata));
    })
    .catch((error) => {
      console.error('Error in execution:', error);

      const outdata = {
        Flag: '1', // Default to '1' on error
        Msg: 'Error in execution',
      };

      res.end(JSON.stringify(outdata));
    });
});

router.post(route + '/verifyemail', function (req, res) {//emailverificationapi
  const data = {
    email: req.body.email
  };

  verifyemaildb(data)
    .then((result) => {
      console.log('Check result:', result);

      const outdata = {
        Flag: result.split('~')[0], // '1' or '0'
        Msg: result.split('~')[0] == '1' ? 'Error in Email verification' : '',
        Entrycode: result.split('~')[0]=='0'?result.split('~')[1]:''
      };

      res.end(JSON.stringify(outdata));
    })
    .catch((error) => {
      console.error('Error in execution:', error);

      const outdata = {
        Flag: '1', // Default to '1' on error
        Msg: 'Error in execution',
      };

      res.end(JSON.stringify(outdata));
    });
});

router.post(route + '/verifyemailotp', function (req, res) {//emailverificationapi
  const data = {
    email: req.body.email,
    otp:req.body.otp,
    entrycode: req.body.entrycode
  };

  verifyemailotpdb(data)
    .then((result) => {
      console.log('Check result:', result);

      const outdata = {
        Flag: result, // '1' or '0'
        Msg: result == '1' ? 'Invalid OTP entered!' : 'Email Verified!',
      };

      res.end(JSON.stringify(outdata));
    })
    .catch((error) => {
      console.error('Error in execution:', error);

      const outdata = {
        Flag: '1', // Default to '1' on error
        Msg: 'Error in execution',
      };

      res.end(JSON.stringify(outdata));
    });
});
module.exports = router;