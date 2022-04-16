

const getParkingList = async (parking_spaces, stadium, lot, available) => {
    const parkingSpace = await parking_spaces.fetchParkingSpaceQuery(stadium, lot, available);
    return parkingSpace;
}

module.exports = {
    getParkingList
};