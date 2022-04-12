
--How many total parking spaces do I have?
SELECT COUNT(*) FROM parking_space;

--How many parking lots are there at Cowpokes Stadium?
SELECT COUNT(*) FROM parking_lot
WHERE stadium_name = 'Cowpokes Stadium';

--How many parking spaces are there at Cowpokes Stadium?
SELECT COUNT(*) FROM parking_space
WHERE lot_ID = 'A1' OR lot_ID = 'B1' OR lot_ID = 'C1';

-- What parking spaces are currently available for use?
SELECT * FROM parking_space
WHERE availability = true;

--What parking spaces ended up being used for Event 1?
SELECT space_num FROM parking_allocation
WHERE event_name = 'SMU vs. TCU';

--What parking spaces ended up being used for Event 2?
SELECT space_num FROM parking_allocation
WHERE event_name = 'SMU vs. Navy';

--What employees occupy lot 2 at Rodeo Stadium?
SELECT * FROM project_1.public.employee
WHERE entry_num = 2;

--How many Trucks have parked at any of my venues?
SELECT COUNT(*) FROM project_1.public.car
WHERE car_type = 'truck';


--How many of each vehicle type have parked at any of my venues?
SELECT car_type, COUNT(*) FROM project_1.public.car
GROUP BY car_type;

--On average, how many vehicles come to an event?
Select AVG(car_count)
FROM    (
        SELECT event_name, COUNT(*) AS car_count FROM parking_allocation
        GROUP BY event_name
        ) as avg_car_count;


--EXTRA
--How many tickets of each vehicle type have parked?
SELECT car_type, COUNT(*) FROM ticket
GROUP BY car_type;

--How many transactions of each event type are there?
SELECT event_name, COUNT(*) FROM transaction
GROUP BY event_name;

--On average, how many transactions happen at an event?
Select AVG(trans_count)
FROM    (
        SELECT event_name, COUNT(*) AS trans_count FROM transaction
        GROUP BY event_name
        ) as avg_trans_count;