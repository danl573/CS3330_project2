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
}

module.exports = Parking_space;