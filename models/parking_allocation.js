class Parking_allocation {
    constructor(_DBQuery, _disconnect) {
        this.DBQuery = _DBQuery;
        this.disconnect = _disconnect;
    }

    close () {
        this.disconnect();
    }

    async createNewAllocation (employee_id, license, car_type, space_num, event, event_date) {
        const t = new Date();

        const result = await this.DBQuery('INSERT INTO parking_allocation(employee_id, event_name, date, space_num, car_type, license, allocation_time, cost) VALUES (?,?,?,?,?,?,?,?)',[employee_id, event, event_date, space_num, car_type, license, t.getTime(), 45]);
        console.log('Raw query for createNewCar:', result.toString());
        return result;
    }

    async fetchAllParkingAllocations () {
        const results = await this.DBQuery('SELECT * FROM parking_allocation');
        return results;
    }

    async fetchParkingAllocationsById (allocation_id) {
        const results = await this.DBQuery('SELECT * FROM parking_allocation WHERE allocation_id = ?', [allocation_id]);
        return results;
    }

    async updateAllocation(allocation_id, employee_id, license, car_type, space_num, event, event_date) {
        const t = new Date();

        const result = await this.DBQuery('UPDATE parking_allocation SET employee_id = ?, event_name = ?, date = ?, space_num = ?, car_type = ?, license = ?, allocation_time = ?, cost = ? WHERE allocation_id = ?',
            [employee_id, event, event_date, space_num, car_type, license, t.getTime(), 45, allocation_id]);

        return result;
    }

    async deleteAllocation(allocation_id) {
        const results = await this.DBQuery('DELETE FROM parking_allocation WHERE allocation_id = ?', [allocation_id]);
        return results;
    }
}

module.exports = Parking_allocation;