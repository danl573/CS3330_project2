const knex = require('../database/knex')
const bcrypt = require('bcrypt');

const EMPLOYEE_TABLE = 'employee';

const createNewEmployee = async (id, password, entry_num, role, last_name) => {
    console.log('Raw password:', password);
    const salt = await bcrypt.genSalt(10);
    console.log('Password salt', salt);
    const hashedPassword = await bcrypt.hash(password, salt);
    console.log('Hashed password', hashedPassword);

    const query = knex(EMPLOYEE_TABLE).insert({ id, password: hashedPassword, entry_num, role, last_name });
    console.log('Raw query for createNewUser:', query.toString());
    const result = await query;

    return result;
};

const findUserById = async (id) => {
    const query = knex(EMPLOYEE_TABLE).where({ id });
    const result = await query;
    return result;
}

const authenticateEmployee = async (id, password) => {
    const employees = await findUserById(id);
    console.log('Results of users query', employees);
    if (employees.length === 0) {
        console.error(`No employees matched the id: ${id}`);
        return null;
    }
    const employee = employees[0];
    const validPassword = await bcrypt.compare(password, employee.password);
    if (validPassword) {
        delete employee.password
        return employee;
    }
    return null;
}


// module.exports = {
//     createNewUser,
//     findUserByEmail,
//     authenticateUser
// };

// class Employee {
//     constructor(_DBQuery, _disconnect) {
//         this.DBQuery = _DBQuery;
//         this.disconnect = _disconnect;
//     }

//     close () {
//         this.disconnect();
//     }

//     async fetchAllEmployees () {
//         const results = await this.DBQuery('SELECT * FROM employee');
//         return results;
//     }

//     async fetchEmployeesByID (employee_id) {
//         const results = await this.DBQuery('SELECT * FROM employee WHERE employee_id = ?', [employee_id]);
//         return results;
//     }
// }

// module.exports = Employee;