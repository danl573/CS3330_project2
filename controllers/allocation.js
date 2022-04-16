
const createNewAllocation = async(car, allocation, space, license, car_type, space_num, vin, driver_name, credit_card, employee_id, event, event_date) => {
    //create new car if car doesnt already exist
    const cars = await car.fetchCarsByLicense(license);
    if(cars.length === 0) {
        const c = await car.createNewCar(license, car_type, space_num, vin, driver_name, credit_card);
    }

    const result = await allocation.createNewAllocation(employee_id, license, car_type, space_num, event, event_date);
    const spaceUpdate = await space.updateParkingSpace(space_num, false);
    return result;


}

const updateAllocation = async(car, allocation, allocation_id, license, car_type, space_num, vin, driver_name, credit_card, employee_id, event, event_date) => {
    const cars = await car.fetchCarsByLicense(license);
    if(cars.length === 0) {
        const c = await car.createNewCar(license, car_type, space_num, vin, driver_name, credit_card);
    }

    const result = await allocation.updateAllocation(allocation_id, employee_id, license, car_type, space_num, event, event_date);
    return result;
}

const deleteAllocation = async(allocation, allocation_id) => {
    const result = await allocation.deleteAllocation(allocation_id);
    return result;
}

module.exports = {
    createNewAllocation,
    updateAllocation,
    deleteAllocation
};