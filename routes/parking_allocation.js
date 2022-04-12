// const knex = require('../database/knex');

// const STADIUM_TABLE = 'stadium';

// const createStadium = async (stadium_name, seating, address, lots) => {
//     const query = knex(ANIMAL_TABLE).insert({ stadium_name, seating, address, lots });
//     const result = await query;
//     return result;
// };

// const findAnimalByName = async (stadium_name) => {
//     return await knex(STADIUM_TABLE).where({ stadium_name });
// };

// const getStadium = async () => {
//     return await knex(STADIUM_TABLE);
// }


// module.exports = {
//     createStadium,
//     findStadiumByName,
//     getStadium
// };

class Parking_allocation {
    constructor(_DBQuery, _disconnect) {
        this.DBQuery = _DBQuery;
        this.disconnect = _disconnect;
    }

    close () {
        this.disconnect();
    }

    async fetchAllParkingAllocations () {
        const results = await this.DBQuery('SELECT * FROM parking_allocation');
        return results;
    }

    async fetchParkingAllocationsById (allocation_id) {
        const results = await this.DBQuery('SELECT * FROM parking_allocation WHERE allocation_id = ?', [allocation_id]);
        return results;
    }
}

module.exports = Parking_allocation;