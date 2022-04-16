class Car {
    constructor(_DBQuery, _disconnect) {
        this.DBQuery = _DBQuery;
        this.disconnect = _disconnect;
    }

    close () {
        this.disconnect();
    }



    async createNewCar (license, car_type, space_num, vin, driver_name, credit_card) {
        const result = await this.DBQuery('INSERT INTO car(license, car_type, space_num, vin, driver_name, credit_card) VALUES (?,?,?,?,?,?)',[license, car_type, space_num, vin, driver_name, credit_card]);
        console.log('Raw query for createNewCar:', result.toString());
        return result;
    }

    async fetchAllCar () {
        const results = await this.DBQuery('SELECT * FROM car');
        return results;
    }

    async fetchCarsByLicense (license) {
        const results = await this.DBQuery('SELECT * FROM car WHERE license = ?', [license]);
        return results;
    }
}

module.exports = Car;