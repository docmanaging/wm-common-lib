// NCC Structure maintenance
const mysql = require('mysql');
const util = require('util');
//create connection to mysql DB
const connection = mysql.createConnection({
  host     : process.env.RDS_HOSTNAME,
  user     : process.env.RDS_USERNAME,
  password : process.env.RDS_PASSWORD,
  port     : process.env.RDS_PORT,
  database : process.env.RDS_DATABASE
});
//connect to mysql DB
connection.connect();

//function for getting NCCStructure data based on NCCCountrycode
async function getNCCStructure(requestParams,context){
    if(requestParams.NCCCountrycode){
        var NCCCountrycode = requestParams.NCCCountrycode;
        const readTable = "select * from WM_NCC_STRUCTURE where NCCCountrycode ='" + NCCCountrycode + "'";
        const connQueryPromisified = util.promisify(connection.query).bind(connection);
        const result = await connQueryPromisified(readTable);
        return {result};
    }
    else{
        return {"status":422,"Message":"Required Params are missing"};
    }
}

//function for updating NCCStructure data based on NCCCountrycode
async function updateNCCStructure(requestParams,context){
    if(requestParams.NCCCountrycode){
        var NCCCountrycode = requestParams.NCCCountrycode;
        var updateTable1 = "UPDATE WM_NCC_STRUCTURE SET TAG ='"+ requestBody.tag + "', MODIFICATIONFLAG ='" + requestBody.MODIFICATIONFLAG + "',NCCName ='" + requestBody.NCCName + "',NCCLength ='" + requestBody.NCCLength + "',BankIdentifierposition   ='" + requestBody.BankIdentifierposition + "',BankIdentifierlength ='" + requestBody.BankIdentifierlength + "',Branchidentifierposition ='" + requestBody.Branchidentifierposition + "',"
                    updateTable1 += "Branchidentifierlength ='" + requestBody.Branchidentifierlength + "',NCCCheckdigitsposition ='" + requestBody.NCCCheckdigitsposition + "',NCCCheckdigitslength ='" + requestBody.NCCCheckdigitslength + "',SEPA ='" + requestBody.SEPA + "',SWIFTNCC ='" + requestBody.SWIFTNCC + "'"
                    updateTable1 += " WHERE NCCCountrycode ='" + requestParams.NCCCountrycode + "'";
        const connQueryPromisified = util.promisify(connection.query).bind(connection);
        const result = await connQueryPromisified(updateTable1);
        return {result};
    }
    else{
        return {"status":422,"Message":"Required Params are missing"};
    }
}

//function for Inserting NCCStructure data 
async function insertNCCStructure(requestParams,context){
    if(requestParams.countryCode){
        var countryCode = requestParams.countryCode;
        var writeTable = "INSERT INTO WM_NCC_STRUCTURE(TAG,MODIFICATIONFLAG,NCCCountrycode,NCCName,NCCLength,BankIdentifierposition,BankIdentifierlength,Branchidentifierposition,Branchidentifierlength,NCCCheckdigitsposition,NCCCheckdigitsposition,SEPA,SWIFTNCC)"
				writeTable += "VALUES ('" + requestParams.TAG + "','" + requestBody.MODIFICATIONFLAG + "','" + requestBody.NCCCountrycode + "','" + requestBody.NCCName + "','" + requestBody.NCCLength + "','" + requestBody.BankIdentifierposition + "','" + requestBody.BankIdentifierlength + "',"
                writeTable += "'" + requestBody.Branchidentifierposition + "','" + requestBody.Branchidentifierlength + "','" + requestBody.NCCCheckdigitsposition + "','" + requestBody.NCCCheckdigitsposition + "','" + requestBody.SEPA + "','" + requestBody.SWIFTNCC + "')"; 

        const connQueryPromisified = util.promisify(connection.query).bind(connection);
        const result = await connQueryPromisified(writeTable);
        return {result};
    }
    else{
        return {"status":422,"Message":"Required Params are missing"};
    }
}

module.exports ={
    getNCCStructure=getNCCStructure,
    updateNCCStructure=updateNCCStructure,
    insertNCCStructure=insertNCCStructure
}