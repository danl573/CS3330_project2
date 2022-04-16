class Parking_space {
    constructor(_DBQuery, _disconnect) {
        this.DBQuery = _DBQuery;
        this.disconnect = _disconnect;
    }

    close () {
        this.disconnect();
    }

    async fetchAllParkingSpaces () {
        const results = await this.DBQuery('SELECT * FROM parking_space');
        return results;
    }

    async fetchParkingSpaceByNum (space_num) {
        const results = await this.DBQuery('SELECT * FROM parking_space WHERE space_num = ?', [space_num]);
        return results;
    }

    async fetchParkingSpaceQuery (stadium, lot, available) {
        let tempString = '';
        let tempVars = [];
        if(stadium != null) {
            tempString += 'WHERE stadium_id = ?';
            tempVars.push(stadium);
        } if(lot != null) {
            if(tempString != '')
                tempString += ' AND lot_ID = ?';
            else 
                tempString += 'WHERE lot_ID = ?';
            tempVars.push(lot);
        }
        if(available != null) {
            if(tempString != '')
                tempString += ' AND availability = ?';
            else 
                tempString += 'WHERE availability = ?';
            tempVars.push(available);
        }

        let query = 'Select * FROM parking_space ' + tempString;
        const results = await this.DBQuery(query, tempVars);
        console.log(results);
        return results;
    }

    async updateParkingSpace (space_num, availability) {
        const result = await this.DBQuery('UPDATE parking_space SET availability = ? WHERE space_num = ?', [availability, space_num]);
        return result;
    }
}

module.exports = Parking_space;