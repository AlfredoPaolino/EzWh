const sqlite = require('sqlite3');
const Item = require('../Item');

class ItemDAO {
	constructor(db) {
		this.db = db;
	}

	addItem(item) {
		return new Promise((resolve, reject) => {
			const sql =
				'INSERT INTO ITEM_TABLE(ID, DESCRIPTION, PRICE, USERID, SKUID) VALUES(?,?,?,?,?)';
			this.db.run(
				sql,
				[
					item.getItemId(),
					item.getDescription(),
					item.getPrice(),
					item.getSupplierId(),
					item.getSKUId(),
				],
				function (err) {
					if (err) {
						reject(err);
					} else {
						resolve(this.lastID);
					}
				}
			);
		});
	}

	getItemById(id, supplierId) {
		return new Promise((resolve, reject) => {
			const sql = 'SELECT * FROM ITEM_TABLE WHERE ID = ? AND USERID = ?';
			this.db.get(sql, [id, supplierId], (err, row) => {
				if (err) {
					reject(err);
				} else {
					if (row === undefined) {
						resolve(undefined);
					} else {
						resolve(
							new Item(
								row.DESCRIPTION,
								row.PRICE,
								row.USERID,
								row.SKUID,
								row.ID
							)
						);
					}
				}
			});
		});
	}

	getItemBySupplierIdAndSKUId(supplierId, SKUId) {
		return new Promise((resolve, reject) => {
			const sql = 'SELECT * FROM ITEM_TABLE WHERE USERID = ? AND SKUID = ?';
			this.db.get(sql, [supplierId, SKUId], (err, row) => {
				if (err) {
					reject(err);
				} else {
					if (row === undefined) {
						resolve(undefined);
					} else {
						resolve(
							new Item(
								row.DESCRIPTION,
								row.PRICE,
								row.USERID,
								row.SKUID,
								row.ID
							)
						);
					}
				}
			});
		});
	}

	getItemIDByProperties(description, price, userID, SKUID) {
		return new Promise((resolve, reject) => {
			const sql =
				'SELECT ID FROM ITEM_TABLE ' +
				'WHERE DESCRIPTION = ? AND PRICE = ? AND USERID = ? AND SKUID = ?';
			this.db.get(sql, [description, price, userID, SKUID], (err, row) => {
				if (err) {
					reject(err);
				} else {
					if (row === undefined) {
						resolve(undefined);
					} else {
						resolve(row.ID);
					}
				}
			});
		});
	}

	getAllItems() {
		return new Promise((resolve, reject) => {
			const sql = 'SELECT * FROM ITEM_TABLE';
			this.db.all(sql, [], (err, rows) => {
				if (err) {
					reject(500);
				} else {
					const items = rows.map((row) => {
						return new Item(
							row.DESCRIPTION,
							row.PRICE,
							row.USERID,
							row.SKUID,
							row.ID
						);
					});
					resolve(items);
				}
			});
		});
	}

	editItem(id, supplierId, newDescription, newPrice) {
		return new Promise((resolve, reject) => {
			const sql =
				'UPDATE ITEM_TABLE SET DESCRIPTION = ?, PRICE = ? WHERE ID = ? AND USERID = ?';
			this.db.run(sql, [newDescription, newPrice, id, supplierId], (err) => {
				if (err) {
					reject(err);
				} else {
					resolve('ok');
				}
			});
		});
	}

	deleteItem(id, supplierId) {
		return new Promise((resolve, reject) => {
			const sql = 'DELETE FROM ITEM_TABLE WHERE ID = ? AND USERID = ?';
			this.db.run(sql, [id, supplierId], (err) => {
				if (err) {
					reject(err);
				} else {
					resolve('ok');
				}
			});
		});
	}
}

module.exports = ItemDAO;
