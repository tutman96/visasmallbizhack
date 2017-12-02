import request = require('request');

export interface WalkScoreResponse {
	lat: number,
    lng: number,
    thumb: string,
    title: string,
    walkscore: number,
}

export function getWalkScoreByAddress(address: string) {
	address = address.replace(/\ /g, "-");
	return new Promise<WalkScoreResponse>((resolve, reject) => {
		request({//6402-jefferson-circle-south-chamblee-ga-30341
			uri: "https://www.walkscore.com/auth/_pv/overview/" + address + "?d=current",
			method: "GET"
		})
	})
}