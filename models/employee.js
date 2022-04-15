const bcrypt = require('bcrypt');

class Employee {
    constructor(_DBQuery, _disconnect) {
        this.DBQuery = _DBQuery;
        this.disconnect = _disconnect;
    }

    close () {
        this.disconnect();
    }

    async createNewEmployee (employee_id, password, entry_num, role, last_name) {
        console.log('Raw password:', password);
        const salt = await bcrypt.genSalt(10);
        console.log('Password salt', salt);
        const hashedPassword = await bcrypt.hash(password, salt);
        console.log('Hashed password', hashedPassword);

        const result = await this.DBQuery('INSERT INTO employee(employee_id, password, entry_num, role, last_name) VALUES (?,?,?,?,?)', [employee_id, hashedPassword, entry_num, role, last_name]);
        console.log('Raw query for createNewUser:', result.toString());
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

    async authenticateEmployee(employee_id, password) {
        console.log('id = ', employee_id);
        const employees = await this.fetchEmployeesByID(employee_id);
        console.log('Results of employees query', employees);
        if(employees.length === 0) {
            console.error(`No users matched the id: ${employee_id}`);
            return null;
        }
        const employee = employees[0];
        const validPassword = await bcrypt.compare(password, employee.password);
        if(validPassword) {
            delete employee.password
            return employee;
        }
        return null;
    }


}

module.exports = Employee;