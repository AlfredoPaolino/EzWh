var express = require('express');
var router = express.Router();
const Warehouse = require('../../classes/Warehouse');
const TestResult = require('../../classes/TestResult');

router.get('/skuitems/:rfid/testResults', async (req, res) => {
    if(!req.params.hasOwnProperty('rfid')) {
        return res.status(422).end();
    }
    try{
        const testResults = await new Warehouse().getTestResultsByRFID(req.params.rfid);
        if(testResults === 404){
          return res.status(404).end();
        }
        return res.status(200).json(testResults);
      }catch(err){
        return res.status(500).end();
      }
    
});

router.get('/skuitems/:rfid/testResults/:id', async (req, res) => {
  if(!req.params.hasOwnProperty('rfid') ||
     !req.params.hasOwnProperty('id')) {
      return res.status(422).end();
  }
  try{
      const testResults = await new Warehouse().getTestResultByRFIDAndID(req.params.rfid, req.params.id);
      if(testResults === 404){
        return res.status(404).end();
      }
      return res.status(200).json(testResults);
    }catch(err){
      return res.status(500).end();
    }
  
});

router.get('/skuitems/testResult', async (req, res) => {
  if(!req.body.hasOwnProperty('rfid') ||
      req.body.hasOwnProperty('idTestDescrpitor') ||
      req.body.hasOwnProperty('Date') ||
      req.body.hasOwnProperty('Result')) {
      return res.status(422).end();
  }
  try{
      const testResult = await new Warehouse().addTestResult(req.body.rfid, req.body.idTestDescriptor, req.body.Date, req.body.Result);
      if(testResult === 404){
        return res.status(404).end();
      }
      return res.status(201).end();
    }catch(err){
      return res.status(500).end();
    }
});


module.exports = router;