# --PARTNER : DANIEL RYAN & ANDREW YU

CREATE DATABASE project_1;

USE project_1;

# --stadium_name: The name of the stadium, primary key
# --seating: The number of seats that are available in the stadium
# --address: The address of the stadium
# --lots: The number of parking lots associated with the stadium
CREATE TABLE stadium (
    stadium_name VARCHAR(50),
        PRIMARY KEY (stadium_name),
    seating INT,
    address VARCHAR(50),
    lots INT
);

INSERT INTO stadium(stadium_name, seating, address, lots) VALUES
('Cowpokes Stadium',50000, 'Austin,TX',3 ),
('the Rodeo',40000,'Houston',3);


# --stadium_name: The name of the stadium the lot is associated to, foreign key to stadium
# --lot_ID: The unique id of the parking lot, primary key
# --size: the number of spots that exist in the lot
# --lot-num: The unique if of the parking lot
CREATE TABLE parking_lot (
    stadium_name VARCHAR(50),
        FOREIGN KEY (stadium_name) REFERENCES stadium(stadium_name),
    lot_ID VARCHAR(50),
        PRIMARY KEY (lot_ID),

    size INT,
    lot_num INT
);

INSERT INTO parking_lot(stadium_name, lot_ID, size, lot_num) VALUES
('Cowpokes Stadium','A1',100,1),
('Cowpokes Stadium','B1',100,2),
('Cowpokes Stadium','C1',100,3),
('the Rodeo','A2',100,4),
('the Rodeo','B2',100,5),
('the Rodeo','C2',100,6);


# --space_num: The unique id of the parking spot, primary key
# --lot_ID: The id of the parking lot the spot is in, foreign key to parking_lot
# --availability: boolean that is true if a spot is available, false otherwise
# --parking_type: the type of spot, compact, non-compact, etc.
# --charging: boolean that is true if the spot is a charging spot, false otherwise
# --handicap: boolean that is true if the spot is a handicap, false otherwise
CREATE TABLE parking_space (
    space_num INT,
        PRIMARY KEY  (space_num),
    lot_ID VARCHAR(50),
        FOREIGN KEY (lot_ID) REFERENCES parking_lot(lot_ID),

    availability BOOl,
    parking_type VARCHAR(50),
    charging BOOL,
    handicap BOOL
);

INSERT INTO parking_space(space_num, lot_ID, availability, parking_type, charging, handicap) VALUES
(1111,'A1',true,'non-compact',true,true),
(1112,'A1',true,'non-compact',false,true),
(1113,'A1',true,'compact',false,true),
(1114,'A1',true,'compact',true,false),
(1115,'A1',true,'compact',true,false),

(2221,'B1',true,'non-compact',false,false),
(2222,'B1',true,'non-compact',false,false),
(2223,'B1',true,'compact',false,false),
(2224,'B1',true,'compact',false,false),
(2225,'B1',true,'compact',false,false),

(3331,'C1',true,'compact',false,false),
(3332,'C1',true,'compact',false,false),
(3333,'C1',true,'compact',false,false),
(3334,'C1',true,'compact',false,false),
(3335,'C1',true,'compact',false,false),

(4441,'A2',true,'non-compact',true,true),
(4442,'A2',true,'non-compact',false,true),
(4443,'A2',true,'compact',false,true),
(4444,'A2',true,'compact',true,false),
(4445,'A2',true,'compact',true,false),

(5551,'B2',true,'non-compact',false,false),
(5552,'B2',true,'non-compact',false,false),
(5553,'B2',true,'compact',false,false),
(5554,'B2',true,'compact',false,false),
(5555,'B2',true,'compact',false,false),

(6661,'C2',true,'compact',false,false),
(6662,'C2',true,'compact',false,false),
(6663,'C2',true,'compact',false,false),
(6664,'C2',true,'compact',false,false),
(6665,'C2',true,'compact',false,false);


# --lot_ID: the parking lot the entry is associated with, foreign key to parking_lot
# --entry_num: The unique id for the entry, primary key
# --location: cardinal direction the entry is facing
# --entry_height: the height of the entrance in feet
# --entry_width: the width of the entrance in feet
CREATE TABLE entry (
    lot_ID VARCHAR(50),
        FOREIGN KEY (lot_ID) REFERENCES parking_lot(lot_ID),
     entry_num INT,
        PRIMARY KEY (entry_num),

    location VARCHAR(50),
    entry_height INT,
    entry_width INT
);

INSERT INTO entry(lot_ID, entry_num, location, entry_height, entry_width) VALUES
('A1',1,'North',10,18),
('B1',2,'West',10,18),
('C1',3,'West',10,18),
('A2',4,'East',10,18),
('B2',5,'North',10,18),
('C2',6,'East',10,18);


# --employee_id: the unique id of the employee, primary key
# --entry_num: the entry that the employee is assigned to, max 3 per entrance, foreign key to entry
# --role: the position of the employee, manager, etc.
# --last_name: The last name of the employee
CREATE TABLE employee (
    employee_id VARCHAR(50),
        PRIMARY KEY (employee_id),
    entry_num INT,
        FOREIGN KEY (entry_num) REFERENCES entry(entry_num),

    role VARCHAR(50),
    last_name VARCHAR(50)
);

INSERT INTO employee(employee_id, entry_num, role, last_name) VALUES
('A11',1,'manager','thomas'),
('A12',1,'staff','carol'),
('A13',1,'security','yu'),

('B11',2,'manager','ryan'),
('B12',2,'staff','taylor'),
('B13',2,'security','shimazu'),

('C11',3,'manager','nguyen'),
('C12',3,'staff','fontenot'),
('C13',3,'security','jan'),

('A21',4,'manager','simmons'),
('A22',4,'staff','bush'),
('A23',4,'security','kim'),

('B21',5,'manager','smith'),
('B22',5,'staff','johnson'),
('B23',5,'security','williams'),

('C21',6,'manager','brown'),
('C22',6,'staff','jones'),
('C23',6,'security','garcia');


# --event_name: The name of the event, primary key with date
# --date: the date that the event is taking place in month/day/year, primary key with event_name
# --stadium_name: the name of the stadium that the event is taking place at, foreign key to stadium
# --start_time: the time in 12 hour format that the event is starting at
# --end_time: The time in 12 hour fomat that the event is ending at
CREATE TABLE event (
    event_name VARCHAR(50),
    date VARCHAR(50),
        PRIMARY KEY (event_name, date),
    stadium_name VARCHAR(50),
        FOREIGN KEY (stadium_name) REFERENCES stadium(stadium_name),

    start_time VARCHAR(50),
    end_time VARCHAR(50)
);

INSERT INTO event(event_name, date, stadium_name, start_time, end_time) VALUES
('SMU vs. TCU','8/12/22','Cowpokes Stadium','5:00PM','10:00PM'),
('SMU vs. Navy','11/23/22','Cowpokes Stadium','4:00PM','9:00PM'),

('SMU vs. Cincinnati','7/5/22','the Rodeo','6:00PM','10:00PM'),
('SMU vs. UNC','9/19/22','the Rodeo','3:00PM','7:00PM');


# --license: The license plate number of the car, primary key with car_type
# --car_type: the type of the car, sudan, truck, etc; primary key with license
# --space_num: the parking space that the car is assigned to, foreign key with parking_space
# --Vin: the vin number of the car
# --driver_name: the first name of the driver of the car
# --credit_card: the credit card number of the driver of the car
CREATE TABLE car (
    license INT,
    car_type VARCHAR(50),
        PRIMARY KEY (license, car_type),

    space_num INT,
        FOREIGN KEY (space_num) REFERENCES parking_space(space_num),

    VIN VARCHAR(50),
    driver_name VARCHAR(50),

    credit_card INTEGER

);

DROP TABLE car;

TRUNCATE TABLE car;
INSERT INTO car(license, car_type, space_num, VIN, driver_name) VALUES
(0000000123, 'sedan',1111,'X2948S3817','carlos' ),
(0000000294, 'sedan',1112,'U81742W1843','liam' ),
(0000000348, 'sedan',1113,'Y1842J2948','noah' ),
(0000000491, 'truck',1114,'W2848V4892','oliver' ),
(0000000592, 'truck',1115,'H2847B2843','elijah' ),
(0000000624, 'van',2221,'L1842E2743','olivia' ),
(0000000719, 'van',2222,'S8274N4813','emma' ),
(0000000853, 'sedan',2223,'Q2849B7422','charlotte' ),
(0000000914, 'SUV',2224,'K4817L9175','henry' ),


(0000000164, 'sedan',1111,'G7894R2857','abby' ),
(0000000264, 'SUV',1112,'N2844S8174','olivia' ),
(0000000378, 'sedan',1113,'K2142J3489','emma' ),
(0000000468, 'van',1114,'U1772F3714','ava' ),
(0000000527, 'sedan',1115,'H8941C4713','amelia' ),
(0000000638, 'truck',2221,'R3841Z5849','jasper' ),


(0000001523, 'SUV',4441,'G2894R2837','william' ),
(0000002646, 'sedan',4442,'N2845S2174','lucas' ),
(0000003626, 'sedan',4443,'K8142J8489','alex' ),
(0000004732, 'van',4444,'U1742F3724','sophia' ),
(0000005215, 'truck',4445,'H8741C3713','isabelle' ),
(0000006893, 'sedan',5551,'R3841Z5849','harper' ),
(0000007432, 'SUV',5552,'G2894R2357','william' ),
(0000008354, 'sedan',5553,'N2845S7174','lucas' ),
(0000009216, 'sedan',5554,'K8142J4489','alex' ),
(0000014736, 'van',5555,'U1742F3814','sophia' ),
(0000028947, 'truck',6661,'H8744C4713','isabelle' ),
(0000037824, 'sedan',6662,'R3871Z1849','harper' ),


(0000114534, 'sedan',4441,'K8122J3489','jacob' ),
(0000725466, 'sedan',4442,'U1842F3714','jackson' ),
(0000834164, 'SUV',4443,'H8731C4713','levi' ),
(0000427462, 'van',4444,'R3871Z1849','mateo' );




# --employee_id: the unique id of the employee, foreign key to employee
# --event_name: The name of the event that is taking place
# --date: The date that the event is taking place, foreign key with event
# --space_num: The parking space that the car is being parked at, foreign key with parking_space
# --car_type: The type of car that is being allocated, foreign key with license
# --license: the license plate number of the car being allocated, foreign key with car_type
# --allocation_id: SERIAL id of the allocation, primary key
# --allocation_time: The time that the allocation was processed
# --cost: the cost of the parking, in USD
CREATE TABLE parking_allocation (
    employee_id VARCHAR(50),
        FOREIGN KEY (employee_id) REFERENCES employee(employee_id),
    event_name VARCHAR(50),
    date VARCHAR(50),
        FOREIGN KEY (event_name, date) REFERENCES event(event_name, date),
    space_num INT,
        FOREIGN KEY (space_num) REFERENCES parking_space(space_num),
    car_type VARCHAR (50),
    license INT,
        FOREIGN KEY (license, car_type) REFERENCES car(license, car_type),
    allocation_id SERIAL ,
        PRIMARY KEY (allocation_id),

    allocation_time VARCHAR(50),
    cost INT
);
TRUNCATE TABLE parking_allocation;

INSERT INTO parking_allocation(employee_id, event_name, date, space_num, car_type, license, allocation_time, cost) VALUES
# --inputs for event 1 w 9 cars
('A12','SMU vs. TCU','8/12/22', 1111,'sedan',0000000123,'4:00PM',35),
('A12','SMU vs. TCU','8/12/22', 1112,'sedan',0000000294,'4:00PM',35),
('A12','SMU vs. TCU','8/12/22', 1113,'sedan',0000000348,'4:00PM',35),
('A12','SMU vs. TCU','8/12/22', 1114,'truck',0000000491,'4:00PM',45),
('A12','SMU vs. TCU','8/12/22', 1115,'truck',0000000592,'4:00PM',45),
('B12','SMU vs. TCU','8/12/22', 2221,'van',0000000624,'4:00PM',45),
('B12','SMU vs. TCU','8/12/22', 2222,'van',0000000719,'4:00PM',45),
('B12','SMU vs. TCU','8/12/22', 2223,'sedan',0000000853,'4:00PM',35),
('B12','SMU vs. TCU','8/12/22', 2224,'SUV',0000000914,'4:00PM',45),

#  --inputs for event 2
('A12','SMU vs. Navy','11/23/22', 1111,'sedan',0000000164,'3:00PM',35),
('A12','SMU vs. Navy','11/23/22', 1112,'SUV',0000000264,'3:00PM',45),
('A12','SMU vs. Navy','11/23/22', 1113,'sedan',0000000378,'3:00PM',35),
('A12','SMU vs. Navy','11/23/22', 1114,'van',0000000468,'3:00PM',45),
('A12','SMU vs. Navy','11/23/22', 1115,'sedan',0000000527,'3:00PM',35),
('B12','SMU vs. Navy','11/23/22', 2221,'truck',0000000638,'3:00PM',45),

# --inputs for event 3
('A22','SMU vs. Cincinnati','7/5/22',4441,'SUV',0000001523,'5:00PM',25),
('A22','SMU vs. Cincinnati','7/5/22',4442,'sedan',0000002646,'5:00PM',25),
('A22','SMU vs. Cincinnati','7/5/22',4443,'sedan',0000003626,'5:00PM',25),
('A22','SMU vs. Cincinnati','7/5/22',4444,'van',0000004732,'5:00PM',25),
('A22','SMU vs. Cincinnati','7/5/22',4445,'truck',0000005215,'5:00PM',25),
('B22','SMU vs. Cincinnati','7/5/22',5551,'sedan',0000006893,'5:00PM',25),
('B22','SMU vs. Cincinnati','7/5/22',5552,'SUV',0000007432,'5:00PM',25),
('B22','SMU vs. Cincinnati','7/5/22',5553,'sedan',0000008354,'5:00PM',25),
('B22','SMU vs. Cincinnati','7/5/22',5554,'sedan',0000009216,'5:00PM',25),
('B22','SMU vs. Cincinnati','7/5/22',5554,'van',0000014736,'5:00PM',25),
('C22','SMU vs. Cincinnati','7/5/22',6661,'truck',0000028947,'5:00PM',25),
('C22','SMU vs. Cincinnati','7/5/22',6662,'sedan',0000037824,'5:00PM',25),


# --inputs for event 4
('A22','SMU vs. UNC','9/19/22',4441,'sedan',0000114534,'2:00PM',25),
('A22','SMU vs. UNC','9/19/22',4442,'sedan',0000725466,'2:00PM',25),
('A22','SMU vs. UNC','9/19/22',4443,'SUV',0000834164,'2:00PM',25),
('A22','SMU vs. UNC','9/19/22',4444,'van',0000427462,'2:00PM',25);




# --Update statements for parking space availability
UPDATE parking_space
SET availability = false
FROM parking_space JOIN parking_allocation pa on parking_space.space_num = pa.space_num;

UPDATE parking_space SET availability = false WHERE space_num = 1111;
UPDATE parking_space SET availability = false WHERE space_num = 1112;
UPDATE parking_space SET availability = false WHERE space_num = 1113;
UPDATE parking_space SET availability = false WHERE space_num = 1114;
UPDATE parking_space SET availability = false WHERE space_num = 1115;
UPDATE parking_space SET availability = false WHERE space_num = 2221;
UPDATE parking_space SET availability = false WHERE space_num = 2222;
UPDATE parking_space SET availability = false WHERE space_num = 2223;
UPDATE parking_space SET availability = false WHERE space_num = 2224;

UPDATE parking_space SET availability = false WHERE space_num = 4441;
UPDATE parking_space SET availability = false WHERE space_num = 4442;
UPDATE parking_space SET availability = false WHERE space_num = 4443;
UPDATE parking_space SET availability = false WHERE space_num = 4444;
UPDATE parking_space SET availability = false WHERE space_num = 4445;
UPDATE parking_space SET availability = false WHERE space_num = 5551;
UPDATE parking_space SET availability = false WHERE space_num = 5552;
UPDATE parking_space SET availability = false WHERE space_num = 5553;
UPDATE parking_space SET availability = false WHERE space_num = 5554;
UPDATE parking_space SET availability = false WHERE space_num = 5554;
UPDATE parking_space SET availability = false WHERE space_num = 6661;
UPDATE parking_space SET availability = false WHERE space_num = 6662;


# --SELECT * FROM parking_space
# --JOIN parking_allocation pa on parking_space.space_num = pa.space_num;



# --EXTRA two statements:

# --Each car is given a ticket, which shows the available parking lots that
# --the car can park in.
#
# --Each ticket has a transaction associated with it, which keeps track of
# --the event, date, and customer credit card
#
# --car_type: the type of car that is associated with the ticket, foreign key to car with license
# --license: The license plate number of the car that is on the ticket, foreign key to the car with car_type
# --ticket_id: the unique id for the ticket, Primary key
# --fan_name: the name of the customer that bought the ticket
# --num_fans: the number of people the ticket is for
CREATE TABLE ticket (
    car_type VARCHAR (50),
    license INT,
        FOREIGN KEY (car_type, license) REFERENCES car(car_type, license),

    ticket_id INTEGER, PRIMARY KEY(ticket_id),

    fan_name VARCHAR(50),
    num_fans INTEGER
);


INSERT INTO ticket(car_type, license, ticket_id, fan_name, num_fans) VALUES
('sedan', 0000000123, 1, 'carlos', 5),
('truck', 0000000491, 2, 'oliver', 1),
('van', 0000000624, 3, 'olivia', 4),

('sedan', 0000000164, 4, 'abby', 2),
('SUV', 0000000264, 5, 'olivia', 6),

('SUV', 0000001523, 6, 'william', 2),
('sedan', 0000002646, 7, 'lucas', 7),

('sedan', 0000114534, 8, 'jacob', 7),
('sedan', 0000725466, 9, 'jackson', 7);


# --JOIN table for tickets and parking lot
# --ticket_id: id of the ticket that is connected to the parking lot, foreign key to ticket
# --lot_id: the id of the parking lot that is connected to the ticket, foreign key to parking_lot
CREATE TABLE ticket_parking (
    ticket_id INTEGER,
    Foreign Key (ticket_id) REFERENCES ticket(ticket_id),

    lot_ID VARCHAR(50),
    FOREIGN KEY (lot_ID) REFERENCES parking_lot(lot_ID)

);

INSERT INTO ticket_parking(ticket_id, lot_ID) VALUES
(1, 'A1'),
(2, 'A1'),
(3, 'B1'),

(4, 'A2'),
(5, 'A1'),

(6, 'A2'),
(7, 'A2'),

(8, 'A2'),
(9, 'A2');

# --ticket_id: the id of the ticket associated with the ticket, foreign key to ticket
# --event_name: the name of the event for the transaction, foreign key to event with date
# --date: the date of the event for the transaction, foreign key to the event with event_name
# --credit_card: The credit card number associated with the payment
# --transaction_number: the unique id of the transaction, primary
CREATE TABLE transaction(
    ticket_id INTEGER,
    FOREIGN KEY (ticket_id) REFERENCES ticket(ticket_id),

    event_name VARCHAR(50),
    date VARCHAR(50),
    FOREIGN KEY (event_name, date) REFERENCES event(event_name, date),

    credit_card INT,
    transaction_number INT,
    PRIMARY KEY (transaction_number)
);


INSERT INTO transaction(ticket_id, event_name, date, credit_card, transaction_number) VALUES
(1, 'SMU vs. TCU', '8/12/22', 32743, 1),
(2, 'SMU vs. TCU', '8/12/22', 23422, 2),
(3, 'SMU vs. TCU', '8/12/22', 37774, 3),

(4,'SMU vs. Navy','11/23/22', 24324, 4),
(5,'SMU vs. Navy','11/23/22', 25432, 5),

(6, 'SMU vs. Cincinnati', '7/5/22', 65436, 6),
(7, 'SMU vs. Cincinnati', '7/5/22', 35465, 7),

(8, 'SMU vs. UNC', '9/19/22', 76547, 8),
(9, 'SMU vs. UNC', '9/19/22', 76545, 9);

DROP TABLE car,employee,entry,event,parking_allocation,parking_lot,parking_space,stadium,ticket,ticket_parking,transaction;
DROP TABLE transaction;