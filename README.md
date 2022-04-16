
# Stadium Parking API
By Daniel Ryan and Andrew Yu

With a completed database schema, this project will allow an employee working at the Dallas Cowpokes Stadium to regularly interact with 
a database containing the parking, driver, employee, and other various info. Through this API, the employee will be able to regularly check for and assign new parking spots for fans coming to the stadium.

## Installation

In order to use the API in its full capacity, one has to create a database using the mysql schema provided 
in the [db/parking_schema.sql](db/parking_schema.sql). Next, the database connection information needs to be input 
into the [models/database-helper.js](models/database-helper.js) file, where you can input host, username, password, 
and other information.
```javascript
    ...
        const DBConnection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'password',
            insecureAuth: false,
            database: 'project_1'
        });
    ...
```
Finally, node needs to be installed to run the index.js javascript file.

## Usage
In order to start and use the program,cd into the project folder and run index.js using node 
```bash
$   cd project-folder-with-index.js/
$   node index.js
```

Once this has been completed, a message should pop up on the console showing the port in which the
express app is receiving at. Using this port number, you can go into your favorite API client (I recommend
Insomnia >[here](https://insomnia.rest)<). Here you can input database host, url, and HTTP verb in order to
to connect and get information fro the data base. The next section will talk about how to explore the different
functionality of the app.

## Functionality

You are an employee logs into an iPhone / Android app at the start of their shift,
and throughout your day you regularly check for / assign available spots as fans drive up. At a
high level, these are the actions in which you can do:

### Create an account
This is done using POST /account. To do this, you pick the HTTP verb and input the proper url with the host,
which was inputted in the database helper file, followed by the port and action:
```text
localhost:3000/account
```
This action requires you provide at minimum an employee id and password to be stored in the Employee table.
The password will be salted and hashed using bcrypt before being stored. This will respond with the newly created 
record.
```json
{
	"employee_id": "B11",
	"password": "password"
}

```

### Log into account
This is done using POST /session similar to creating an account. also requiring an id and password. Here you will 
recieve a token. This is needed in order to access the rest of the API. 

After recieving the token, make sure to include it as an Authorization header so that you are identifiable when running
the rest of the routes.

### Remaining Routes
The remaining routes all work in a similar manner to the previous 2. However, these require a token to be included as
an Authorization header. Other than that, all of these routes include different json inputs and paramters, so check the 
required payloads before running the routes.

●Get all spots for a stadium
- GET /spots?stadium=[stadium_id]&lot=[lot_id]&available=[boolean]
- This should respond with a list (array) of parking spots that match a given set of
query parameters. Each parameter is optional, meaning that a valid request can
include none, all, or any combination of the possible parameters.
- stadium: Providing a stadium ID should give all spots that are tied to that
stadium. If one is not provided, do not filter by stadium.
- lot: Providing a lot ID should give all spots that are tied to that lot. If one is not
provided, do not filter by lot.
- If both a stadium ID and lot ID are provided, then filter on both. If the lot
ID is correctly tied to the stadium ID, then including a stadium ID would
not change the result. If the lot ID doesn’t actually belong to the stadium,
then no spots should be returned.
- available: If available is set to true, then this route should only provide spots that
currently have no allocation.
- Status code 200 on success

●Assign a vehicle to a spot (i.e. create a parking allocation)
- POST /allocation
- This should accept vehicle information and a spot ID in the request payload.
- This should create a record in your vehicle table if a vehicle with the unique
identifier doesn’t already exist, then use that ID to create a record in the
allocation table.
- Status code 201 on success. The response should include the newly created
allocation record

●Update the vehicle in a spot (i.e. update a parking allocation)
- PUT /allocation/[allocation_id]
- This should accept new vehicle information in the request payload.
- This should create a record in your vehicle table if a vehicle with the unique
  identifier doesn’t already exist, then use that ID to update the record in the
  allocation table identified by allocation_id.
- Status code 200 on success. The response should include the fully updated
  allocation record
●Delete a vehicle from a spot (i.e. delete a parking allocation)
- DELETE /allocation/[allocation_id]
- This should delete an allocation identified by allocation_id. This should not
  delete the vehicle associated to the allocation.
- Status code 204 on success (no response body).
- 
## Structure

Any interactions with the database will reside in model files within a models/ directory. 

Each table in your database maps to one
model file (or more, if needed). Any express route definitions reside in files within a
routes/ directory. Anything in between those two things resides in a controllers/ directory. 

Middleware sets up and and disconnects to the MySQL Database. 

## Credits
This project was completed by Daniel Ryan and Andrew Yu for CS3330 database concepts taught by
Professor Ayala.