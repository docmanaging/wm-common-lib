const util = require('util');
var conn = require('./connection');

//connect to mysql DB
conn.connection.connect();

//function for getting NCCProfile data based on country code
async function getNCCProfile(requestParams,context){
    if(requestParams.countryCode){
        var countryCode = requestParams.countryCode;
        const readTable = "select * from WM_NCC_PROFILE where COUNRTY_CODE ='" + countryCode + "'";
        const connQueryPromisified = util.promisify(connection.query).bind(connection);
        const result = await connQueryPromisified(readTable);
        return {result};
    }
    else{
        return {"status":422,"Message":"Required Params are missing"};
    }
}

//function for updating NCCProfile data based on country code
async function updateNCCProfile(requestParams,context){
    if(requestParams.countryCode){
        var countryCode = requestParams.countryCode;
        var updateTable1 = "UPDATE WM_NCC_PROFILE SET ModificationFlag ='" + requestBody.ModificationFlag + "',NCCName ='" + requestBody.NCCName + "',BankBranchNCC ='" + requestBody.BankBranchNCC + "',BankNCCOfficeType   ='" + requestBody.BankNCCOfficeType + "',NewBankBranchNCC ='" + requestBody.NewBankBranchNCC + "',BankName ='" + requestBody.BankName + "',"
                    updateTable1 += "BankBranchShortName ='" + requestBody.BankBranchShortName + "',BankBranchFullName ='" + requestBody.BankBranchFullName + "',BankBranchAddress ='" + requestBody.BankBranchAddress + "',BankBranchPhoneCC ='" + requestBody.BankBranchPhoneCC + "',BankBranchPhoneNo ='" + requestBody.BankBranchPhoneNo + "',SWIFTBIC ='" + requestBody.SWIFTBIC + "',IsNCCDP ='" + requestParams.IsNCCDP + "'"
                    updateTable1 += "DPNCC ='" + requestBody.DPNCC + "',SEPA ='" + requestBody.SEPA + "',FieldA ='" + requestBody.FieldA + "',FieldB ='" + requestBody.FieldB + "'"
                    updateTable1 += " WHERE COUNRTY_CODE ='" + requestParams.countryCode + "'";
        const connQueryPromisified = util.promisify(connection.query).bind(connection);
        const result = await connQueryPromisified(updateTable1);
        return {result};
    }
    else{
        return {"status":422,"Message":"Required Params are missing"};
    }
}

//function for Inserting NCCProfile data 
async function insertNCCProfile(requestParams,context){
    if(requestParams.countryCode){
        var countryCode = requestParams.countryCode;
        var writeTable = "INSERT INTO WM_NCC_PROFILE(ModificationFlag,CountryCode,NCCName,BankBranchNCC,BankNCCOfficeType,NewBankBranchNCC,BankName,BankBranchShortName,BankBranchFullName,BankBranchAddress,BankBranchPhoneCC,BankBranchPhoneNo,SWIFTBIC,IsNCCDP,DPNCC,SEPA,FieldA,FieldB)"
				writeTable += "VALUES ('" + requestParams.ModificationFlag + "','" + requestBody.CountryCode + "','" + requestBody.NCCName + "','" + requestBody.BankBranchNCC + "','" + requestBody.BankNCCOfficeType + "','" + requestBody.NewBankBranchNCC + "','" + requestBody.BankName + "',"
                writeTable += "'" + requestBody.BankBranchShortName + "','" + requestBody.BankBranchFullName + "','" + requestBody.BankBranchAddress + "','" + requestBody.BankBranchPhoneCC + "','" + requestBody.BankBranchPhoneNo + "','" + requestBody.SWIFTBIC + "','" + requestBody.IsNCCDP + "','" 
                writeTable += "'" + requestBody.DPNCC + "','" + requestBody.SEPA + "','" + requestBody.FieldA + "','" + requestBody.FieldB + "')"; 

        const connQueryPromisified = util.promisify(connection.query).bind(connection);
        const result = await connQueryPromisified(writeTable);
        return {result};
    }
    else{
        return {"status":422,"Message":"Required Params are missing"};
    }
}

module.exports ={
    getNCCProfile=getNCCProfile,
    updateNCCProfile=updateNCCProfile,
    insertNCCProfile=insertNCCProfile
}