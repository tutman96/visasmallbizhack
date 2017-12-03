import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ApiService {

	constructor(
		private http: HttpClient
	) { }

	getMeasurement(zipCode: string) {
		return this.http.get<{
			salesVolumeGrowthMoM: number,
			salesTranCntGrowthMoM: number,
			salesVolumeGrowthYoY: number,
			salesTranCntGrowthYoY: number,
			spendOutsideGeography: number,
			avgTransactionFrequencey: number
		}>("/api/visa/merchant-measurement?zip=" + zipCode)
	}

	getWalkability(lat: number, lon: number) {
		return this.http.get<{
			score: number
		}>("/api/walkscore?lat=" + lat + "&long=" + lon)
	}

	getDepositRates(balance:number, loanAmount: number, term: string, zipcode: string) {
		return this.http.get<{
			term: string,
			interestRate: number,
			accountBalanceTiers: string
		}>("/api/visa/merchant-measurement?balance=" + balance + "&loanAmount=" + loanAmount + "&term=" + term + "&zipcode=" + zipcode)
	}
}
