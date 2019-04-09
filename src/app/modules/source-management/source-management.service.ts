import { Injectable } from '@angular/core';
import { HttpClientModule,HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConstants } from '../../app.constant';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class SourceManagementService {
  constructor(private httpClient:HttpClient){}
  
  getTableData(params): any {
    return this.httpClient.post(AppConstants.Ehub_Rest_API +"sourceCredibility/getSources?recordsPerPage="+params.recordsPerPage+"&pageNumber="+params.pageNumber+"&classificationId="+params.classificationId+"&orderBy="+params.orderBy+"&orderIn="+params.orderIn+"&subSlassificationId="+params.subSlassificationId+"&visible="+params.visible+"&token=10d46ce2-9627-4121-8f14-45e62f0c6956",[],httpOptions);
    // .subscribe((data: any)  => {
    //   console.log("POST Request is successful ", data);
    // },
    // (error: any)  => {console.log("Error", error);});
  }
}
