const util = require('util');
var conn = require('./connection');

//connect to mysql DB
conn.connection.connect();

//function for getting Timezone data based on Day
async function getTimezoneProfile(requestParams,context){
    if(requestParams.Day){
        var Day = requestParams.Day;
        const readTable = "select * from WM_TIMEZONE_PROFILE where DAY ='" +  Day + "'";
        const connQueryPromisified = util.promisify(connection.query).bind(connection);
        const result = await connQueryPromisified(readTable);
        return {result};
    }
    else{
        return {"status":422,"Message":"Required Params are missing"};
    }
}

//function for updating Timezone data based on Day
async function updateTimezoneProfile(requestParams,context){
    if(requestParams.Day){
        var Day = requestParams.Day;
        var updateTable1 = "UPDATE WM_TIMEZONE_PROFILE SET LOCAL_TIME ='" + requestBody.CurrentLocalTime  + "',IN_24-HOUR_NOTATION  ='" + requestBody.In24-HourNotation  + "',"
                    updateTable1 += " WHERE DAY ='" + requestParams.Day + "'";
        const connQueryPromisified = util.promisify(connection.query).bind(connection);
        const result = await connQueryPromisified(updateTable1);
        return {result};
    }
    else{
        return {"status":422,"Message":"Required Params are missing"};
    }
}

//function for Inserting Timezone data 
async function insertTimezoneProfile(requestParams,context){
    if(requestParams.Day){
        var Day = requestParams.Day;
        var writeTable = "INSERT INTO WM_TIMEZONE_PROFILE(DAY, LOCAL_TIME, In_24-HOUR_NOTATION)"
				writeTable += "VALUES ('" + requestParams.Day + "','" + requestBody.CurrentLocalTime + "','" + requestBody.In24-HourNotation + "')";

        const connQueryPromisified = util.promisify(connection.query).bind(connection);
        const result = await connQueryPromisified(writeTable);
        return {result};
    }
    else{
        return {"status":422,"Message":"Required Params are missing"};
    }
}

module.exports ={
    getTimezoneProfile=getTimezoneProfile,
    updateTimezoneProfile=updateTimezoneProfile,
    insertTimezoneProfile=insertTimezoneProfile
}