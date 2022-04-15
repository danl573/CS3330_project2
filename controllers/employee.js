const jwt = require('jsonwebtoken');
const Employee = require('../models/employee');
const router = require('../routes/car');

const accessTokenSecret = 'mysupercoolsecret';


const authenticateUser = async (employee, employee_id, password) => {
    const user = await employee.authenticateEmployee(employee_id, password);
    if (user === null) {
        return user;
    }
    const employees = await employee.fetchEmployeesByID(employee_id);
    console.log('Employee', employees);
    const accessToken = jwt.sign({ ...employees[0], claims: ['employee'] }, accessTokenSecret);

    return accessToken;
    
}

const createNewUser = async (employee, employee_id, password, entry_num, role, last_name) => {
    const user = await employee.createNewEmployee(employee_id, password, entry_num, role, last_name);
    if(result.length !== 0) {
        res.status(201).json(result);
    } else {
        res.status(400).json('employee could not be tamed');
    }
    return user;
}

const getUser = async (token) => {

    let emp;

  jwt.verify(token, accessTokenSecret, (err, employee) => {
    if (err) {
      return res.sendStatus(403);
    }
    
    console.log('returning employee', employee);
    emp = employee;

  });
  return emp;
}

module.exports = {
    authenticateUser,
    getUser
};
