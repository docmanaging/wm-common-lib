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

//function for getting Currency data based on Currency code
async function getCurrencyProfile(requestParams,context){
    if(requestParams.currencyCode){
        var currencyCode = requestParams.currencyCode;
        const readTable = "select * from WM_Currency_PROFILE where CURRENCY_CODE ='" +  currencyCode + "'";
        const connQueryPromisified = util.promisify(connection.query).bind(connection);
        const result = await connQueryPromisified(readTable);
        return {result};
    }
    else{
        return {"status":422,"Message":"Required Params are missing"};
    }
}

//function for updating Currency data based on Currency code
async function updateCurrencyProfile(requestParams,context){
    if(requestParams.currencyCode){
        var currencyCode = requestParams.currencyCode;
        var updateTable1 = "UPDATE WM_Currency_PROFILE SET Currency_CODE_NUM ='" + requestBody.currencyCodeNum + "',CURRENCY_NAME ='" + requestBody.currencyName + "',NO_OF_DECIMAL_DIGITS   ='" + requestBody.noOf_DecimalDigits + "',CALENDAR_NAME ='" + requestBody.calendarName + "',IS_IN_EUR_TRANSITION ='" + requestBody.isInEurTransition + "',"
                    updateTable1 += "IS_OUT_EUR_TRANSITION ='" + requestBody.isOutEurTransition + "',IS_PRE_EUR_TRANSITION ='" + requestBody.isPreEurTransition + "',CONVERSION_LIMIT ='" + requestBody.conversionLimit + "',REFER_TO_DEALER ='" + requestBody.referToDealer + "',SOONEST_VALUE_DATE ='" + requestBody.soonestValueDate + "'"
                    updateTable1 += " WHERE CURRENCY_CODE ='" + requestParams.currencyCode + "'";
        const connQueryPromisified = util.promisify(connection.query).bind(connection);
        const result = await connQueryPromisified(readTable);
        return {result};
    }
    else{
        return {"status":422,"Message":"Required Params are missing"};
    }
}

//function for Inserting Currency data 
async function insertCurrencyProfile(requestParams,context){
    if(requestParams.currencyCode){
        var currencyCode = requestParams.currencyCode;
        var writeTable = "INSERT INTO WM_Currency_PROFILE(CURRENCY_CODE, CURRENCY_CODE_NUM, CURRENCY_NAME, NO_OF_DECIMAL_DIGITS,CALENDAR_NAME,IS_IN_EUR_TRANSITION,IS_OUT_EUR_TRANSITION,IS_PRE_EUR_TRANSITION,CONVERSION_LIMIT,REFER_TO_DEALER,SOONEST_VALUE_DATE)"
				writeTable += "VALUES ('" + requestParams.currencyCode + "','" + requestBody.currencyCodeNum + "','" + requestBody.currencyName + "','" + requestBody.noOf_DecimalDigits + "','" + requestBody.calendarName + "','" + requestBody.isInEurTransition + "','" + requestBody.isOutEurTransition + "',"
                writeTable += "'" + requestBody.isPreEurTransition + "','" + requestBody.conversionLimit + "','" + requestBody.referToDealer + "','" + requestBody.soonestValueDate + "','" 

        const connQueryPromisified = util.promisify(connection.query).bind(connection);
        const result = await connQueryPromisified(writeTable);
        return {result};
    }
    else{
        return {"status":422,"Message":"Required Params are missing"};
    }
}

module.exports ={
    getCurrencyProfile=getCurrencyProfile,
    updateCurrencyProfile=updateCurrencyProfile,
    insertCurrencyProfile=insertCurrencyProfile
}