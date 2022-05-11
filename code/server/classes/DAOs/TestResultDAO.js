const sqlite = require('sqlite3');
const TestResult = require('../TestResult');

class TestResultDAO{

    constructor(db){
        this.db = db;
    }

    getTestResultsByRFID(RFID) {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM TESTRESULTSKUITEM_LIST JOIN TESTRESULT_TABLE ON (TESTRESULTSKUITEM_LIST.ID_TESTRESULT = TESTRESULT_TABLE.ID) WHERE TESTRESULTSKUITEM_LIST.ID_SKUITEM = ?";
            this.db.get(sql, [RFID], (err, row) => {
                if(err){
                    reject(err);
                    return;
                }
                if(row === undefined){
                    resolve(404);
                    return;
                }
                const testResult = new TestResult(row.ID, row.DATE_, row.RESULT, row.DESCRPITION);
                resolve(testResult);
            });
        });
    }

    getTestResultByRFIDAndID(RFID, ID) {
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM TESTRESULTSKUITEM_LIST JOIN TESTRESULT_TABLE ON (TESTRESULTSKUITEM_LIST.ID_TESTRESULT = TESTRESULT_TABLE.ID) WHERE TESTRESULTSKUITEM_LIST.ID_SKUITEM = ? AND TESTRESULTSKUITEM_LIST.ID_TESTRESULT = ?";
            this.db.get(sql, [RFID, ID], (err, row) => {
                if(err){
                    reject(err);
                    return;
                }
                if(row === undefined){
                    resolve(404);
                    return;
                }
                const testResult = new TestResult(row.ID, row.DATE_, row.RESULT, row.DESCRPITION);
                resolve(testResult);
            });
        });
    }



    addTestResultxSKUitem(rfid, idTestResult) {
        return new Promise((resolve, reject) => {
            const sql = "INSERT INTO TESTRESULTSKUITEM_LIST(ID_TESTRESULT, ID_SKUITEM) VALUES(?,?) ";
            this.db.run(sql, [idTestResult, rfid], err => {
                if(err){
                    reject(err);
                }else{
                    resolve('OK');
                }
            });
        });
    }
    
}

module.exports = TestResultDAO;