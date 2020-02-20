const util = require('util');
var conn = require('./connection');

//connect to mysql DB
conn.connection.connect();

//function for getting BIC data based on BIC
async function getBICProfile(requestParams,context){
    if(requestParams.BIC){
        var BIC = requestParams.BIC;
        const readTable = "select * from WM_BIC_PROFILE where BIC ='" + BIC + "'";
        const connQueryPromisified = util.promisify(connection.query).bind(connection);
        const result = await connQueryPromisified(readTable);
        return {result};
    }
    else{
        return {"status":422,"Message":"Required Params are missing"};
    }
}

//function for updating BIC data based on BIC
async function updateBICProfile(requestParams,context){
    if(requestParams.BIC){
        var BIC = requestParams.BIC;
        var updateTable1 = "UPDATE WM_BIC_PROFILE SET FullName ='" + requestBody.FullName + "',AddressLine1 ='" + requestBody.AddressLine1 + "',AddressLine2 ='" + requestBody.AddressLine2 + "',AddressLine3   ='" + requestBody.AddressLine3 + "',AddressLine4 ='" + requestBody.AddressLine4 + "',Calendarname ='" + requestBody.Calendarname + "',"
                    updateTable1 += "GPIMember ='" + requestBody.GPIMember + "',UnpublishedBIC ='" + requestBody.UnpublishedBIC + "',Membership-FED ='" + requestBody.Membership-FED + "',Membership-CHIPS ='" + requestBody.Membership-CHIPS + "',Membership-EBA ='" + requestBody.Membership-EBA + "',Membership-SEPA ='" + requestBody.Membership-SEPA + "',Membership-CLS ='" + requestParams.Membership-CLS + "'"
                    updateTable1 += " WHERE BIC ='" + requestParams.BIC + "'";
        const connQueryPromisified = util.promisify(connection.query).bind(connection);
        const result = await connQueryPromisified(updateTable1);
        return {result};
    }
    else{
        return {"status":422,"Message":"Required Params are missing"};
    }
}

//function for Inserting BIC data 
async function insertBICProfile(requestParams,context){
    if(requestParams.BIC){
        var BIC = requestParams.BIC;
        var writeTable = "INSERT INTO WM_BIC_PROFILE(FullName,BIC,AddressLine1,AddressLine2,AddressLine3,AddressLine4,Calendarname,GPIMember,UnpublishedBIC,Membership-FED,Membership-CHIPS,Membership-EBA,Membership-SEPA,Membership-CLS)"
				writeTable += "VALUES ('" + requestParams.FullName + "','" + requestBody.BIC + "','" + requestBody.AddressLine1 + "','" + requestBody.AddressLine2 + "','" + requestBody.AddressLine3 + "','" + requestBody.AddressLine4 + "','" + requestBody.Calendarname + "',"
                writeTable += "'" + requestBody.GPIMember + "','" + requestBody.UnpublishedBIC + "','" + requestBody.Membership-FED + "','" + requestBody.Membership-CHIPS + "','" + requestBody.Membership-EBA + "','" + requestBody.Membership-SEPA + "','" + requestBody.Membership-CLS + "')"; 

        const connQueryPromisified = util.promisify(connection.query).bind(connection);
        const result = await connQueryPromisified(writeTable);
        return {result};
    }
    else{
        return {"status":422,"Message":"Required Params are missing"};
    }
}

module.exports ={
    getBICProfile=getBICProfile,
    updateBICProfile=updateBICProfile,
    insertBICProfile=insertBICProfile
}