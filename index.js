var util = require('util')
var ibmdb = require('ibm_db');
// access sample DB2 database
var connStr = "DATABASE=SAMPLE;HOSTNAME=10.3.66.91;UID=db2inst1;PWD=db2;PORT=50000;PROTOCOL=TCPIP";
TestM()
async function TestM() {
  let res = await Test()
  if(res.err) {
    console.error('Error found: ' + res.error.error)
    console.error('sqlcode: ' + res.error.sqlcode)
    console.error('message: ' +res.error.message)
    //console.error(util.inspect(res,{depth:null,compact:true, color: true}))
  } else {
    if (res.data.length > 0) {
      for (const key in res.data) {
        console.log(res.data[key])
      }
    } else {
      console.log('No rows found')
    }
  }
  //console.log(res)
}
async function Test() {
  console.log('in test')
  let cotest
  try {
    cotest = await ibmdb.open(connStr)
  } catch(e) {
    //console.error(e)
    return { err: 1, error: e }
  }
  try {
    let data = await cotest.query(`select EMPNO,FIRSTNME,LASTNAME,BIRTHDATE from db2inst1.employee FETCH FIRST 5 ROWS ONLY`)
    /*
    if (data.length > 0) {
      for (const key in data) {
        console.log(data[key])
      }
      cotest.closeSync();
      return { err: 0, data: data}
    }
    */
    cotest.closeSync();
    return { err: 0, data: data}
  } catch(e) {
    //console.error(e)
    cotest.closeSync();
    return { err: 1, error: e }
  }
}
