import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class MerchantMeasurementService {

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
}
