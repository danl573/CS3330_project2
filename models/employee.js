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
const bcrypt = require('bcrypt');

class Employee {
    constructor(_DBQuery, _disconnect) {
        this.DBQuery = _DBQuery;
        this.disconnect = _disconnect;
    }

    close () {
        this.disconnect();
    }

    async createNewEmployee (employee_id, password) {
        console.log('Raw password:', password);
        const salt = await bcrypt.genSalt(10);
        console.log('Password salt', salt);
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log('Hashed password', hashedPassword);

        const result = await this.DBQuery('')





        console.log('Raw password:', password);
        const salt = await bcrypt.genSalt(10);
        console.log('Password salt', salt);
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log('Hashed password', hashedPassword);
    
        const query = knex(USER_TABLE).insert({ employee_id, password: hashedPassword });
        console.log('Raw query for createNewUser:', query.toString());
        const result = await query;
    
        return result;
    }

    async fetchAllEmployees () {
        const results = await this.DBQuery('SELECT * FROM employee');
        return results;
    }

    async fetchEmployeesByID (employee_id) {
        const results = await this.DBQuery('SELECT * FROM employee WHERE employee_id = ?', [employee_id]);
        return results;
    }
}

module.exports = Employee;