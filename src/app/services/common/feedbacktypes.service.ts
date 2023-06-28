import { Injectable } from '@angular/core';

import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { ConfigService } from "../config/config.service";
import { SecurityInterceptedHttp } from '../../http.securityinterceptor';

@Injectable()
export class FeedbackTypes {
    
    // _commonBaseURL = "http://localhost:9090/helpline1097APIV1/";
    _helpline1097BaseURL = this._config.get1097BaseURL();
     _commonBaseURL = this._config.getCommonBaseURL();
     _helpline104BaseURL = this._config.get104BaseURL();
    _getFeedbackTypesURL = this._helpline104BaseURL + "beneficiary/get/natureOfComplaintTypes";
    _getFeedbackSeverityURL = this._commonBaseURL + "feedback/getSeverity/";

	getFeedbackIDTypes_url = this._commonBaseURL + "feedback/getFeedbackType";
	getFeedbackLogsUrl = this._commonBaseURL + 'feedback/getFeedbackLogs';
    headers = new Headers({ 'Content-Type': 'application/json' });
    options = new RequestOptions({ headers: this.headers });
    constructor(private _http: SecurityInterceptedHttp,private _config: ConfigService) { }
    getFeedbackTypesData(data:any) {
      
        return this._http.post(this._getFeedbackTypesURL, data)
            .map(this.extractData)
            .catch(this.handleError);
    }

    getFeedbackSeverityData(providerServiceMapID) {
       // let data = {};
        return this._http.post(this._getFeedbackSeverityURL, { "providerServiceMapID": providerServiceMapID })
            .map(this.extractData)
            .catch(this.handleError);
    }

    getFeedbackTypeID(providerServiceMapID)
    {
		return this._http.post(this.getFeedbackIDTypes_url, { "providerServiceMapID": providerServiceMapID })
			.map(this.extractData)
			.catch(this.handleError);
    }
	showFeedbackLog(feedbackID) {
		return this._http.post(this.getFeedbackLogsUrl, feedbackID)
		.map(this.extractData)
		.catch(this.handleError);
	}
    private extractData ( response: Response )
	{
		if ( response.json().data )
		{
			return response.json().data;
		} else
		{
			return Observable.throw(response.json());
		}
	}
	private handleError(error: Response | any) {
		// In a real world app, you might use a remote logging infrastructure
		// let errMsg: string;
		// if (error instanceof Response) {
		// 	const body = error.json() || '';
		// 	const err = body.error || JSON.stringify(body);
		// 	errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
		// } else {
		// 	errMsg = error.message ? error.message : error.toString();
		// }
		// console.error(errMsg);
		return Observable.throw(error.json());
	};
};