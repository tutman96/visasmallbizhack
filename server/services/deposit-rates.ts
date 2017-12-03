import UsbankClient = require('../library/usbankwebapi');
import { promise } from 'selenium-webdriver';
import { setTimeout } from 'timers';

interface UsbankResponse {
    Status: {
        StatusCode: string,
        Severity: string,
        StatusDescription: string,
        ServerStatusCode: string,
        ServerStatusDescription: string
    },
    DepositRates: {
        ProductKey: {
            ProductCode: string,
            SubProductCode: string
        },
        ProductName: string,
        RegionName: string,
        CategoryName: string,
        SubProductName: string,
        RatesInfo: {
            Term: string,
            Rates: {
                InterestRate: string,
                AccountBalanceTiers: string
            }
        },
        DisclosureText: string
    },
    GeneralDisclosureText: string
}

export async function getCurrentDepositRates(balance: string, loanAmount: string, term: string, zipcode: string) {
    try {
        let response = await UsbankClient.get<UsbankResponse>("GetCurrentDepositRates?Balance=" + balance + "&CustomerType=CONSUMER&LoanAmount=" +
            loanAmount + "&Term=" + term + "&application=test&branchnumber=1&categoryid=37&output=json&zipcode=" + zipcode);
            
        return {
            term: response.DepositRates.RatesInfo.Term,
            interestRate: +response.DepositRates.RatesInfo.Rates.InterestRate,
            accountBalanceTiers: response.DepositRates.RatesInfo.Rates.AccountBalanceTiers
        }
    }
    catch (e) {
        return {
            term: term + " Months",
            interestRate: +(Math.random() * 5 + 5).toFixed(4),
            accountBalanceTiers: "$" + loanAmount + " - $" + ((Math.round(+loanAmount / 1000) + 1) * 1000)
        }
    }
}