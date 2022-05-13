class Position {
	constructor(aisle, row, col, maxWeight, maxVolume, occupiedWeight = 0, occupiedVolume = 0) {
		this.positionID = parseInt(aisle.toString() + row.toString() + col.toString());
		this.aisle = aisle;
		this.row = row;
		this.col = col;
		this.maxWeight = maxWeight;
		this.maxVolume = maxVolume;
		this.occupiedWeight = occupiedWeight;
		this.occupiedVolume = occupiedVolume;
	}

	setMaxWeight(maxWeight) {
		this.maxWeight = maxWeight;
	}

	setMaxVolume(maxVolume) {
		this.maxVolume = maxVolume;
	}

	setAisle(aisle) {
		//TODO check if the format is correct
		this.aisle = aisle;
		this.positionID = parseInt(aisle.toString() + row.toString() + col.toString());
		//check duplicates
	}

	setRow(row) {
		//TODO check if the format is correct
		this.row = row;
		this.positionID = parseInt(aisle.toString() + row.toString() + col.toString());
		//check duplicates
	}

	setCol(col) {
		//TODO check if the format is correct
		this.col = col;
		this.positionID = parseInt(aisle.toString() + row.toString() + col.toString());
		//check duplicates
	}

	setPositionID(positionID) {
		//TODO check if the format is correct
		this.positionID = positionID;
		this.aisle = parseInt(positionID.substring(0, 4));
		this.row = parseInt(positionID.substring(4, 8));
		this.col = parseInt(positionID.substring(8, 12));
		//check duplicates
	}

	increaseOccupiedWeight(weight) {
		if (this.occupiedWeight + weight < this.maxWeight && this.occupiedWeight + weight > 0) {
			this.occupiedWeight = this.occupiedWeight + weight;
			return true;
		}
		return false;
	}

	increaseOccupiedVolume(volume) {
		if (this.occupiedVolume + volume < this.maxVolume && this.occupiedVolume + volume > 0) {
			this.occupiedVolume = this.occupiedVolume + volume;
			return true;
		}
		return false;
	}

	getMaxWeight(){
		return this.maxWeight;
	}

	getMaxVolume(){
		return this.maxVolume;
	}

	getPositionID(){
		return this.positionID;
	}

	getAisle(){
		return this.aisle;
	}

	getRow(){
		return this.row;
	}

	getCol(){
		return this.col;
	}

	getOccupiedWeight(){
		return this.occupiedWeight;
	}

	getOccupiedVolume(){
		return this.occupiedVolume;
	}

}

module.exports = Position;
