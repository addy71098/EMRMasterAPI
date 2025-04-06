const { Pool } = require('pg');
const { sendmail, getverifyemailmailbody } = require('../utillties/mail');
const { establishConnection, terminateConnection } = require('../connection/connect');
const { getSpecificUserColumnsByCondition } = require('../tables/usertable');
// require('dotenv').config({ path: '.env.dev' });
require('dotenv').config();
// Configure the PostgreSQL connection

// const pool = new Pool({//local host
//   user: 'postgres',         // Replace with your PostgreSQL username
//   host: 'localhost',             // Replace with your PostgreSQL host
//   database: 'EMR',     // Replace with your PostgreSQL database name
//   password: 'Admin',     // Replace with your PostgreSQL password
//   port: 5432,                    // Default PostgreSQL port
// });

//Commented by suraj on 19Feb 
// const pool = new Pool({//neontech postgresql db
//   user: 'EMR_owner',         // Replace with your PostgreSQL username
//   host: 'ep-shy-glitter-a5rie7pw.us-east-2.aws.neon.tech',             // Replace with your PostgreSQL host
//   database: 'EMR',     // Replace with your PostgreSQL database name
//   password: 'h8KeslPciI0N',     // Replace with your PostgreSQL password
//   port: 5432,                    // Default PostgreSQL port
//   ssl: { rejectUnauthorized: false },
// });

// const pool = new Pool({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   password: String(process.env.DB_PASSWORD),
//   port: process.env.DB_PORT,
//   ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false,
// });

function registerdb(data) {
  const query = `
      INSERT INTO USERTABLE (
        FIRSTNAME, MIDDLENAME, LASTNAME, DLNO, DOB, PMOBNO, CMOBNO,
        EMAIL, CADDR, PADDR, VISITTIME, TCCHK, USERNAME, PASSWORD, TWOFACTCHK
      ) VALUES (
        $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15
      )
    `;

  const values = [
    data.firstname,
    data.middlename,
    data.lastname,
    data.DLNO,
    data.DOB,
    data.PerMobileNo,
    data.ClinicMobileNo,
    data.Email,
    data.CAddr,
    data.PAddr,
    data.VisitTime,
    data.TCChk,
    data.username,
    data.password,
    data.twofactchk
  ];

  try {
    const result = pool.query(query, values);
    console.log('User inserted successfully:', result.rowCount);
    return '0';
  } catch (error) {
    console.error('Error inserting user:', error);
    return '1';
  }
}

function checkusernamedb(data) {
  const query = `SELECT 1 FROM USERTABLE WHERE USERNAME = $1`;
  console.log(data.username);

  const values = [data.username];
  try {
    let outcode;
    return pool.query(query, values)
      .then((result) => {
        console.log(result.rows);
        console.log(result.rowCount);
        if (result.rowCount > 0) {
          outcode = '1';
          console.log('username already present in the table');

        }
        else {
          outcode = '0';
          console.log('username available');

        }
        console.log('outcode=' + outcode);
        return outcode;
      })
  } catch (error) {
    console.error('Error in checking username:', error);
    return '1';
  }
}
function checkemaildb(data) {
  const query = `SELECT 1 FROM USERTABLE WHERE EMAIL = $1`;
  console.log(data.Email);

  const values = [data.Email];
  try {
    let outcode;
    return pool.query(query, values)
      .then((result) => {
        console.log(result.rows);
        console.log(result.rowCount);
        if (result.rowCount > 0) {
          outcode = '1';
          console.log('Email already present in the table');

        }
        else {
          outcode = '0';
          // console.log('username available');

        }
        console.log('outcode=' + outcode);
        return outcode;
      })


    // return outcode;

  } catch (error) {
    console.error('Error in checking username:', error);
    return '1';
  }
}
async function authenticatelogindb(data) {
  let seq = null;
  try {
    // seq = establishConnection();
    // console.log('connection established=>' + JSON.stringify(seq));
    
    let result = await getSpecificUserColumnsByCondition(['twofactchk', 'email'], { username: data.username, password: data.password })
    if (result?.length > 0) {
      return '0';
    }
    else return '1';
  }
  catch (e) {
    console.log('Something bad happened here=>: ' + JSON.stringify(e));
    return '1';
  }
  finally {
    // terminateConnection(seq);
  }

  // const query = `SELECT twofactchk, email FROM USERTABLE WHERE USERNAME = $1 AND PASSWORD = $2`;
  // console.log('username: ' + data.username);
  // console.log('password: ' + data.password);

  // const values = [data.username, data.password];
  // try {
  //   let outcode;
  //   return pool.query(query, values)
  //     .then((result) => {
  //       console.log(result.rows);
  //       // console.log(result.rowCount);
  //       if (result.rowCount > 0) {
  //         if (result.rows[0].twofactchk == '0') {
  //           outcode = '0';
  //           console.log('Logged in successfully!');
  //         }
  //         else {
  //           outcode = '2~' + result.rows[0].email;
  //           let otp = Math.floor(100000 + Math.random() * 900000);
  //           const query1 = `INSERT INTO LOGINOTP (username, otp)
  //                           VALUES ($1, $2)`;
  //           const values1 = [
  //             data.username,
  //             otp
  //           ];
  //           const result1 = pool.query(query1, values1);
  //           console.log('otp inserted successfully:', result1.rowCount);
  //           setTimeout(function (values1, flg) {//Deleting otp entry after 5 mins.
  //             console.log('Deleteing otp entry as 5 mins have passed: ' + values1.join(', '));
  //             deleteotpentry(values1, flg)
  //           }, 1000 * 60 * 5, values1, '1')
  //           let mailstatus = sendmail(result.rows[0].email, 'OTP for login', 'Please use this ( "' + otp + '" ) for login', '');
  //           console.log("Message sent: %s", mailstatus);
  //         }

  //       }
  //       else {
  //         outcode = '1';
  //         console.log('Log in failed');

  //       }
  //       console.log('outcode=' + outcode);
  //       return outcode;
  //     })
  // } catch (error) {
  //   console.error('Error in checking username:', error);
  //   return '1';
  // }
}
function forgotpassdb(data) {
  const query = `SELECT email FROM USERTABLE WHERE USERNAME = $1`;
  console.log('username: ' + data.username);
  // console.log('password: '+data.password);

  const values = [data.username];
  try {
    let outcode;
    return pool.query(query, values)
      .then((result) => {
        console.log(result.rows);
        console.log(result.rowCount);
        if (result.rowCount > 0) {
          outcode = '0';
          console.log('username found! generating code');
          const query1 = `INSERT INTO FORGOTPASS (username, otp)
                          VALUES ($1, $2)`;
          const values1 = [
            data.username,
            Math.floor(100000 + Math.random() * 900000)
          ];
          try {
            const result1 = pool.query(query1, values1);
            console.log('otp inserted successfully:', result1.rowCount);
            setTimeout(function (values1, flg) {//Deleting otp entry after 5 mins.
              console.log('Deleteing otp entry as 5 mins have passed: ' + values1.join(', '));
              deleteotpentry(values1, flg)
            }, 1000 * 60 * 5, values1, '0')
            let mailstatus = sendmail(result.rows[0].email, 'OTP for forget password', 'Please use this("' + values1[1] + '") for forget password', '')
            console.log("Message sent: %s", mailstatus);
            //email sending function to be added here
            return '0~' + result.rows[0].email;
          } catch (error) {
            console.error('Error inserting user:', error);
            return '1';
          }
        }
        else {
          outcode = '1';
          console.log('username not found');

        }
        console.log('outcode=' + outcode);
        return outcode;
      })
  } catch (error) {
    console.error('Error in checking username:', error);
    return '1';
  }
}

function authenticateotpdb(data) {
  let query = `SELECT 1 FROM ${data.flg == '0' ? 'FORGOTPASS' : 'LOGINOTP'} WHERE USERNAME = $1 AND OTP = $2`;

  const values = [data.username, data.otp];
  console.log('Checking data: ' + values.join(', ') + ', and flag=' + data.flg);

  try {
    let outcode;
    return pool.query(query, values)
      .then((result) => {
        if (result.rowCount > 0) {
          console.log('Otp entry found!');
          query = `DELETE FROM ${data.flg == '0' ? 'FORGOTPASS' : 'LOGINOTP'} WHERE USERNAME=$1 AND OTP=$2`;
          return pool.query(query, values)
            .then((result) => {
              return '0';
            })
            .catch((err) => {
              console.log(err);
              return '1';
            })
        }
        else {
          outcode = '1';
          console.log('Invalid otp');

        }
        console.log('outcode=' + outcode);
        return outcode;
      })


    // return outcode;

  } catch (error) {
    console.error('Error in checking username:', error);
    return '1';
  }
}

function deleteotpentry(values, flg) {
  const query = 'DELETE FROM ' + (flg == '0' ? 'FORGOTPASS' : 'LOGINOTP') + ' WHERE USERNAME=$1 AND OTP=$2';
  return pool.query(query, values)
    .then((result) => {
      return '0';
    })
    .catch((err) => {
      console.log(err);
      return '1';
    })
}

function resetpassdb(data) {
  const query = `
      UPDATE USERTABLE 
      SET PASSWORD=$2
      WHERE USERNAME=$1
    `;

  const values = [
    data.username,
    data.password
  ];

  try {
    return pool.query(query, values)
      .then((result) => {
        console.log('password updated successfully!');
        return '0';
      })
      .catch((err) => {
        console.error('Error updating password:', error);
        return '1';
      })

  } catch (error) {
    console.error('Error:', error);
    return '1';
  }
}

function verifyemaildb(data) {
  const query = `INSERT INTO tblemailotp(entrycode, otp, email) VALUES ($2, $3, $1);`;

  const values = [
    data.email,
    Math.floor(100000 + Math.random() * 900000),
    Math.floor(100000 + Math.random() * 900000)
  ];
  try {
    let outcode;
    return pool.query(query, values)
      .then((result) => {
        if (result.rowCount > 0) {
          console.log(values);
          const htmlString = getverifyemailmailbody();
          let mailstatus = sendmail(data.email, 'OTP for email verification', '', htmlString.replace("{{OTP}}", values[1]));
          outcode = '0~' + values[2];
          setTimeout((values) => {//Delete otp entry after 5 mins
            const query1 = `DELETE FROM tblemailotp WHERE  entrycode = $1 AND otp = $2`;
            pool.query(query1, values);
          }, 1000 * 60 * 5, values);
        }
        else {
          outcode = '1';
        }
        return outcode;
      })
  } catch (error) {
    console.error('Error: ', error);
    return '1';
  }
}

function verifyemailotpdb(data) {
  const query = `SELECT 1 FROM tblemailotp WHERE entrycode = $1 AND otp = $2`;

  const values = [data.entrycode, data.otp];
  try {
    let outcode;
    return pool.query(query, values)
      .then((result) => {
        if (result.rowCount > 0) {
          outcode = '0';
          const query1 = `DELETE FROM tblemailotp WHERE  entrycode = $1 AND otp = $2`;
          pool.query(query1, values);
        }
        else {
          outcode = '1';
        }
        return outcode;
      })
  } catch (error) {
    console.error('Error: ', error);
    return '1';
  }
}
module.exports = { registerdb, checkusernamedb, checkemaildb, authenticatelogindb, forgotpassdb, authenticateotpdb, resetpassdb, verifyemaildb, verifyemailotpdb, getverifyemailmailbody };
