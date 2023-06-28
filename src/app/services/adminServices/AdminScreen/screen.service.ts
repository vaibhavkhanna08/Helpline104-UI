import { Injectable } from '@angular/core';
import {Http, Response,Headers,RequestOptions} from '@angular/http';
import 'rxjs/add/operator/map';
import { SecurityInterceptedHttp } from '../../../http.securityinterceptor';

@Injectable()
export class ScreenService {

  test=[];
     headers = new Headers(
     {'Content-Type': 'application/json'}
    //  ,{'Access-Control-Allow-Headers': 'X-Requested-With, content-type'}
    //   ,{'Access-Control-Allow-Origin': 'localhost:4200'}
    //  ,{'Access-Control-Allow-Methods': 'POST, GET, PUT, DELETE, OPTIONS'}
    //  ,{'Access-Control-Allow-Methods': '*'}
    );
     options = new RequestOptions({ headers: this.headers });
     private _geturl:string="http://localhost:8080//iEMR/UserScreen/getScreenData"
     private _saveurl:string="http://localhost:8080//iEMR/UserScreen/saveUserScreen"
    
    constructor(private _http:SecurityInterceptedHttp){}
    getScreen(){
        
        return this._http.post(this._geturl,this.options)
        .map((response:Response)=> response.json());
        
    }
    saveScreen(data:any){

        //console.log(data);
        return this._http.post(this._saveurl,data ,this.options)
        
        .map((response:Response)=> response.json());
        
    }
}
