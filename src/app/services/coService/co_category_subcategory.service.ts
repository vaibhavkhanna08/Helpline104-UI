import { Injectable } from '@angular/core';

import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { ConfigService } from '../config/config.service';
import { SecurityInterceptedHttp } from '../../http.securityinterceptor';

@Injectable()
export class CoCategoryService {

    test = [];

    // private _baseurl: string = "http://l-185000861.wipro.com:9090/helpline1097APIV1/"
    private _baseurl: String = this._config.get1097BaseURL();
    _commonURL = this._config.getCommonBaseURL();
    private _categoryurl: string = this._baseurl + 'api/helpline1097/co/get/category'
    private _subcategoryurl: string = this._commonURL + 'service/subcategory'
    private _savedetailsurl: string = this._baseurl + 'iEMR/saveBenCalServiceCatSubcatMapping'
    _servicetypesurl = this._commonURL + 'service/servicetypes';
    _categorybyidurl = this._commonURL + 'service/categoryByID';
    constructor(private _http: SecurityInterceptedHttp, private _config: ConfigService) { }
    getCategories() {
        return this._http.post(this._categoryurl,{})
            .map(this.extractData)
            .catch(this.handleError);
        //.map((response:Response)=> response.json());        
    }
    getSubCategories(id: any) {
        let data = { 'categoryID': id };
        return this._http.post(this._subcategoryurl, data)
            .map(this.extractData)
            .catch(this.handleError);
        //        .map((response:Response)=> response.json());
    }

    getDetails(subCategoryID: number, createdBy: string, beneficiaryRegID: number, serviceID1097: number,
        categoryID: number, benCallID: number) {

        let data = [{
            'beneficiaryRegID': beneficiaryRegID, 'benCallID': benCallID, 'serviceID1097': serviceID1097,
            'subCategoryID': subCategoryID, 'categoryID': categoryID, 'createdBy': createdBy
        }];
        return this._http.post(this._savedetailsurl, data)
            .map(this.extractData)
            .catch(this.handleError);
    }
    getTypes(providerServiceMapID: number) {
        let data = {};

        data['providerServiceMapID'] = providerServiceMapID;
        return this._http.post(this._servicetypesurl, data)
            .map(this.extractData)
            .catch(this.handleError);
    }
    getCategoriesByID(selectedService: any, serviceID: any) {
        let data: any = { 'subServiceID': selectedService, 'providerServiceMapID': serviceID};
        return this._http.post(this._categorybyidurl, data)
            .map(this.extractData)
            .catch(this.handleError);
    }
    extractData(response: Response) {
        if (response.json().data) {
            return response.json().data;
        } else {
            return Observable.throw(response.json());
        }
    }

    handleError(response: Response) {
        return Observable.throw(response.json());
    }
};



