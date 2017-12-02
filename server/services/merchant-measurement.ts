import VisaClient = require('../library/visawebapi');

interface VisaResponse<T> {
	responseHeader: { [headerName: string]: any },
	responseStatus: {
		statusDescription: string,
		status: string
	},
	requestData: any,
	responseData: T
}

export interface MeasurementResponseStandard {
	groupName: "standard"
	fraudChbktoSalesGrowthYoY: string
	nonfraudChbktoSalesGrowthYoY: string
	salesVolumeGrowthMoM: string
	salesTranCntGrowthMoM: string
	salesVolumeGrowthYoY: string
	salesTranCntGrowthYoY: string
	fraudChbktoSalesRatio: string
	nonfraudChbktoSalesRatio: string
}

export interface MeasurementResponseCardHolder {
	groupName: "cardholder",
	cardSpendPostalCode1: string
	cardSpendPostalCode1TotalSpendPct: string
	cardSpendPostalCode2: string
	cardSpendPostalCode2TotalSpendPct: string
	cardSpendPostalCode3: string
	cardSpendPostalCode3TotalSpendPct: string
	cardSpendPostalCode4: string
	cardSpendPostalCode4TotalSpendPct: string
	cardSpendPostalCode5: string
	cardSpendPostalCode5TotalSpendPct: string
	outMSATotalSpendPct: string
	outCountryTotalSpendPct: string
	avgCardTranFreq: string
}

export interface MeasurementResponseCBReasonCode {
	groupName: "cbReasonCode"
	reasonCode30CBRate: string
	reasonCode41CBRate: string
	reasonCode53CBRate: string
	reasonCode57CBRate: string
	reasonCode62CBRate: string
	reasonCode71CBRate: string
	reasonCode72CBRate: string
	reasonCode73CBRate: string
	reasonCode74CBRate: string
	reasonCode75CBRate: string
	reasonCode76CBRate: string
	reasonCode77CBRate: string
	reasonCode78CBRate: string
	reasonCode80CBRate: string
	reasonCode81CBRate: string
	reasonCode82CBRate: string
	reasonCode83CBRate: string
	reasonCode85CBRate: string
	reasonCode86CBRate: string
	reasonCode90CBRate: string
	reasonCode93CBRate: string
	reasonCode96CBRate: string
	reasonCodexxCBRate: string
}

export async function getMeasurementByZipcode(zipCode: string) {
	let response = await VisaClient.post<VisaResponse<Array<MeasurementResponseStandard | MeasurementResponseCardHolder | MeasurementResponseCBReasonCode>>>(
		"merchantmeasurement/v1/merchantbenchmark", {
			requestData: {
				naicsCodes: [],
				countrySubdivisionList: [],
				msaList: [],
				merchantCategoryGroupsCodes: [],
				merchantCategoryCodes: [
					"Fast Food Restaurants"
				],
				merchantCountry: "840",
				postalCodeList: [
					zipCode
				],
				monthList: [
					"201706"
				],
				cardPresentIndicator: "CARDPRESENT",
				accountFundingSource: ["All"],
				eciIndicator: ["All"],
				platformID: ["All"],
				posEntryMode: ["All"],
				groupList: ["standard", "cardholder", "cbreasoncode"]
			}
		})
		
	let standard: MeasurementResponseStandard;
	let cardHolder: MeasurementResponseCardHolder;
	let cbReasonCode: MeasurementResponseCBReasonCode;
	
	if (response.responseStatus.status != "CDI000") {
		throw new Error("Visa API Exception: " + response.responseStatus.statusDescription);
	}
	
	response.responseData.forEach((d) => {
		if (d.groupName == "standard") standard = d;
		else if (d.groupName == "cardholder") cardHolder = d;
		else if (d.groupName == "cbReasonCode") cbReasonCode = d;
	})
	
	return {
		standard,
		cardHolder,
		cbReasonCode
	}	
}