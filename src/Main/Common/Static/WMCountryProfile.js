const util = require('util');
var conn = require('./connection');

//connect to mysql DB
conn.connection.connect();

//function for getting Country data based on country code
async function getCountryProfile(requestParams,context){
    if(requestParams.countryCode){
        var countryCode = requestParams.countryCode;
        const readTable = "select * from WM_COUNTRY_PROFILE where COUNRTY_CODE ='" + countryCode + "'";
        const connQueryPromisified = util.promisify(connection.query).bind(connection);
        const result = await connQueryPromisified(readTable);
        return {result};
    }
    else{
        return {"status":422,"Message":"Required Params are missing"};
    }
}

//function for updating Country data based on country code
async function updateCountryProfile(requestParams,context){
    if(requestParams.countryCode){
        var countryCode = requestParams.countryCode;
        var updateTable1 = "UPDATE WM_COUNTRY_PROFILE SET COUNTRY_NAME ='" + requestBody.countryName + "',COUNTRY_CODE_NUM ='" + requestBody.countryCodeNum + "',CURRENCY_CODE ='" + requestBody.currencyCode + "',CALENDAR_NAME   ='" + requestBody.calendarName + "',CHECK_DIGIT_TYPE ='" + requestBody.checkDigitType + "',IS_EEA_COUNTRY ='" + requestBody.isEeaCountry + "',"
                    updateTable1 += "IS_EU_COUNTRY ='" + requestBody.isEuCountry + "',IS_SEPA_COUNTRY ='" + requestBody.isSepaCountry + "',IS_FATF_COMPLIANT_COUNTRY ='" + requestBody.isFatfCompliantCountry + "',IS_IBAN_MANDATORY ='" + requestBody.isIbanMandatory + "',IBAN_LENGTH ='" + requestBody.iBanLength + "',IBAN_CHK_DIGIT_POST ='" + requestBody.ibanChkDigitPos + "',IBAN_CHK_DIGIT_LEN ='" + requestParams.ibanChkDigitLen + "'"
                    updateTable1 += "IBAN_BANK_ID_POS ='" + requestBody.ibanBankIdPos + "',IBAN_BANK_ID_LEN ='" + requestBody.ibanBankIdLen + "',IBAN_BRANCH_ID_POS ='" + requestBody.ibanBranchIdPos + "',IBAN_BRANCH_ID_LEN ='" + requestBody.ibanBranchIdLen + "',IBAN_ACCNT_NO_POS  ='" + requestBody.ibanAccntNoPos + "',IBAN_ACCNT_NO_LEN ='" + requestBody.ibanAccntNoLen + "',BBAN_CHK_DIGIT_POS ='" + requestParams.bbanChkDigitPos + "'"
                    updateTable1 += "BBAN_CHK_DIGIT_LEN ='" + requestBody.bbanChkDigitLen + "',NATIONAL_ID_POS ='" + requestBody.nationalIdPos + "',NATIONAL_ID_LEN ='" + requestBody.nationalIdLen + "',STATUS ='" + requestBody.status + "',IS_PHONE_OTP_ALLOWED ='" + requestBody.isPhoneOtpAllowed + "',BENE_BANK_NAME_FOR_BIC ='" + requestBody.beneBankNameForBic + "',BBAN_CHK_DBENE_BANK_NCC_FOR_BIC ='" + requestParams.beneBankNccForBic + "',BENE_BANK_NAME_NCC_FOR_BIC ='"+requestParams.beneBankNameNccForBic+"',IS_PAYMENT_REASON_REQ ='"+requestParams.isPaymentReasonReq+"' "
                    updateTable1 += " WHERE COUNRTY_CODE ='" + requestParams.countryCode + "'";
        const connQueryPromisified = util.promisify(connection.query).bind(connection);
        const result = await connQueryPromisified(readTable);
        return {result};
    }
    else{
        return {"status":422,"Message":"Required Params are missing"};
    }
}

//function for Inserting Country data 
async function insertCountryProfile(requestParams,context){
    if(requestParams.countryCode){
        var countryCode = requestParams.countryCode;
        var writeTable = "INSERT INTO WM_COUNTRY_PROFILE(COUNRTY_CODE,COUNTRY_NAME,COUNTRY_CODE_NUM,CURRENCY_CODE,CALENDAR_NAME,CHECK_DIGIT_TYPE,IS_EEA_COUNTRY,IS_EU_COUNTRY,IS_SEPA_COUNTRY,IS_FATF_COMPLIANT_COUNTRY,IS_IBAN_MANDATORY,IBAN_LENGTH,IBAN_CHK_DIGIT_POS,IBAN_CHK_DIGIT_LEN,IBAN_BANK_ID_POS,IBAN_BANK_ID_LEN,"
				writeTable += "IBAN_BRANCH_ID_POS,IBAN_BRANCH_ID_LEN,IBAN_ACCNT_NO_POS,IBAN_ACCNT_NO_LEN,BBAN_CHK_DIGIT_POS,BBAN_CHK_DIGIT_LEN	,NATIONAL_ID_POS,NATIONAL_ID_LEN,STATUS	,IS_PHONE_OTP_ALLOWED,BENE_BANK_NAME_FOR_BIC,BENE_BANK_NCC_FOR_BIC,BENE_BANK_NAME_NCC_FOR_BIC,IS_PAYMENT_REASON_REQ)"
				writeTable += "VALUES ('" + requestParams.countryCode + "','" + requestBody.countryName + "','" + requestBody.countryCodeNum + "','" + requestBody.currencyCode + "','" + requestBody.calendarName + "','" + requestBody.checkDigitType + "','" + requestBody.isEeaCountry + "',"
                writeTable += "'" + requestBody.isEuCountry + "','" + requestBody.isSepaCountry + "','" + requestBody.isFatfCompliantCountry + "','" + requestBody.isIbanMandatory + "','" + requestBody.iBanLength + "','" + requestBody.ibanChkDigitPos + "','" + requestBody.ibanChkDigitLen + "','" 
                writeTable += "'" + requestBody.ibanBankIdPos + "','" + requestBody.ibanBankIdLen + "','" + requestBody.ibanBranchIdPos + "','" + requestBody.ibanBranchIdLen + "','" + requestBody.ibanAccntNoPos + "','" + requestBody.ibanAccntNoLen + "','" + requestBody.bbanChkDigitPos + "','" 
                writeTable += "'" + requestBody.bbanChkDigitLen + "','" + requestBody.nationalIdPos + "','" + requestBody.nationalIdLen + "','" + requestBody.status + "','" + requestBody.isPhoneOtpAllowed + "','" + requestBody.beneBankNameForBic + "','" + requestBody.beneBankNccForBic + "','" 
                writeTable += "'" + requestBody.beneBankNameNccForBic + "','" + requestBody.isPaymentReasonReq + "')";

        const connQueryPromisified = util.promisify(connection.query).bind(connection);
        const result = await connQueryPromisified(writeTable);
        return {result};
    }
    else{
        return {"status":422,"Message":"Required Params are missing"};
    }
}

module.exports ={
    getCountryProfile=getCountryProfile,
    updateCountryProfile=updateCountryProfile,
    insertCountryProfile=insertCountryProfile
}