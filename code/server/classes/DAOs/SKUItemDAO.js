const sqlite = require('sqlite3');
const SKUItem = require('../SKUItem');

class SKUItemDAO{

    constructor(db){
        this.db = db;
    }

    getSKUItems(){
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM SKUITEM_TABLE";
            this.db.all(sql, [], (err, rows) => {
                if(err){
                    reject(err);
                    return;
                }
                const skuitemslist = rows.map(row => {
                    return new SKUItem(row.SKUID, row.AVAILABLE, row.DATEOFSTOCK, row.RFID);
                });
                resolve(skuitemslist);
            });
        });
    }

    getSKUItemsAvailable(SKUID, available){
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM SKUITEM_TABLE WHERE SKUID = ? AND AVAILABLE = ?";
            this.db.all(sql, [SKUID, available], (err, rows) => {
                if(err){
                    reject(err);
                    return;
                }
                if(rows.length === 0){
                    resolve(404);
                    return;
                }
                const skuitemsAvailable = rows.map(row => new SKUItem(row.SKUID, row.AVAILABLE, row.DATEOFSTOCK, row.RFID));
                resolve(skuitemsAvailable);
            });
        });
    }
    
    getSKUItemByRFID(RFID){
        return new Promise((resolve, reject) => {
            const sql = "SELECT * FROM SKUITEM_TABLE WHERE RFID = ?";
            this.db.get(sql, [RFID], (err, row) => {
                if(err){
                    reject(err);
                    return;
                }
                if(row === undefined){
                    resolve(404);
                    return;
                }
                const skuItem = new SKUItem(row.SKUID, row.AVAILABLE, row.DATEOFSTOCK, row.RFID);
                resolve(skuItem);
            });
        });
    }

    addSKUItem(skuItem){
        return new Promise((resolve, reject) => {
            const sql = "INSERT INTO SKUITEM_TABLE(RFID, AVAILABLE, SKUID, DATEOFSTOCK) VALUES(?,?,?,?)";
            this.db.run(sql, [skuItem.getSKU_RFID(), 0, skuItem.getSKUId(), skuItem.getDateOfStock()], err => {
                if(err){
                    reject(err);
                    return;
                }
                const anotherQuery = "INSERT INTO SKUITEMSKU_LIST(ID_SKU, ID_SKUITEM) VALUES(?,?)"
                this.db.run(anotherQuery, [skuItem.getSKUId(), skuItem.getSKU_RFID()], err => {
                    if(err){
                        reject(err);
                        return;
                    }
                    resolve('OK');
                });
                resolve('OK');
            });
        });
    }

    editSKUItem(newRFID, newAvailable, newDateOfStock, oldRFID){
        return new Promise((resolve, reject) => {
            const sql = "UPDATE SKUITEM_TABLE SET RFID = ?, AVAILABLE = ?, DATEOFSTOCK = ? WHERE RFID = ?";
            this.db.run(sql, [newRFID, newAvailable, newDateOfStock, oldRFID], err => {
                if(err){
                    reject(err);
                    return;
                }
                resolve('OK');
            });
        });
    }

    deleteSKUItem(RFID){
        return new Promise((resolve, reject) => {
            const sql = "DELETE FROM SKUITEM_TABLE WHERE RFID = ?";
            this.db.run(sql, [RFID], err => {
                if(err){
                    reject(err);
                    return;
                }
                resolve('OK');
            });
        });
    }

    getSKUItemByReturnOrder(returnOrderID){
        return new Promise((resolve, reject) => {
            const sql = "SELECT SIT.RFID, SIT.AVAILABLE, SIT.SKUID, SIT.DATEOFSTOCK " +
                        "FROM SKUITEMSRETURNORDER_LIST AS SIROL, SKUITEM_TABLE AS SIT " +
                        "WHERE SIROL.ID_SKUITEM = SIT.RFID AND SIROL.ID_RETURNORDER = ?";
            this.db.all(sql, [returnOrderID], (err, rows) => {
                if(err){
                    reject(err);
                    return;
                }
                const skuItemList = rows.map(row => new SKUItem(row.SKUID, row.AVAILABLE, row.DATEOFSTOCK, row.RFID));
                resolve(skuItemList);
            });
        });
    }

    getSKUItemByRestockOrder(restockOrderID){
        return new Promise((resolve, reject) => {
            const sql = "SELECT SIT.RFID, SIT.SKUID " +
                        "FROM SKUITEMSRESTOCKORDER_LIST AS SIROL, SKUITEM_TABLE AS SIT " +
                        "WHERE SIROL.ID_SKUITEM = SIT.RFID AND SIROL.ID_RESTOCKORDER = ?";
            this.db.all(sql, [restockOrderID], (err, rows) => {
                if(err){
                    reject(err);
                    return;
                }
                const skuItemList = rows.map(row => {return {SKUId : row.SKUID, rfid : row.RFID}});
                resolve(skuItemList);
            });
        });
    }
}

module.exports = SKUItemDAO;