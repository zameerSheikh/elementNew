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

  /* purpose: Update source
	 * created: 7th April 2019
	 * author: karnakar
	 */
  getClassificationsForScource(){
    return this.httpClient.get(AppConstants.Ehub_Rest_API + "classification/getClassifications?token="+AppConstants.Ehubui_token);
  }

  /* purpose: Update source
	 * created: 12th April 2019
	 * params: params(object)
	 * author: karnakar
	 */
  getAllSourcesData(params): any {
    return this.httpClient.post(AppConstants.Ehub_Rest_API +"sourceCredibility/getSources?recordsPerPage="+params.recordsPerPage+"&pageNumber="+params.pageNumber+"&classificationId="+params.classificationId+"&orderBy="+params.orderBy+"&orderIn="+params.orderIn+"&subSlassificationId="+params.subSlassificationId+"&visible="+params.visible+"&token="+AppConstants.Ehubui_token,[],httpOptions);
  }
 
  /* purpose: Update source
	 * created: 16th April 2019
	 * params: params(object)
	 * author: karnakar
	 */
  updateScource(params){
    return this.httpClient.post(AppConstants.Ehub_Rest_API + "sourceCredibility/updateSource?token="+AppConstants.Ehubui_token,params);
  }

  /* purpose: Add new source
	 * created: 16th April 2019
	 * params: params(object)
	 * author: karnakar
	 */
  addNewSourceAPI(data){
    return this.httpClient.post(AppConstants.Ehub_Rest_API + "sourceCredibility/saveGeneralSource?token=" + AppConstants.Ehubui_token, data);
  }
  
  /////////////////////========= Get source API's start for industry,domain,jurisdiction and media ============= /////////////////////
  
  /* purpose: get source industry list details
	 * created: 16th April 2019
	 * params: params(object)
	 * author: karnakar
	*/
  getSourceIndustryList(){
    return this.httpClient.get(AppConstants.Ehub_Rest_API + "sourceIndustry/getSourceIndustry?token="+AppConstants.Ehubui_token);
  }

  /* purpose: get source domain list details
	 * created: 16th April 2019
	 * params: params(object)
	 * author: karnakar
	*/
  getSourceDomainList(){
    return this.httpClient.get(AppConstants.Ehub_Rest_API + "sourceDomain/getSourceDomain?token="+AppConstants.Ehubui_token);
  }

  /* purpose: get source jurisdiction list details
	 * created: 16th April 2019
	 * params: params(object)
	 * author: karnakar
	*/
  getSourceJurisdictionList(){
    return this.httpClient.get(AppConstants.Ehub_Rest_API + "sourceJurisdiction/getSourceJurisdiction?token="+AppConstants.Ehubui_token);
  }

  /* purpose: get source media list details
	 * created: 16th April 2019
	 * params: params(object)
	 * author: karnakar
	*/
  getSourceMediaList(){
    return this.httpClient.get(AppConstants.Ehub_Rest_API + "sourceMedia/getSourceMedia?token="+AppConstants.Ehubui_token);
  }

  /////////////////////========= Get source API's end for industry,domain,jurisdiction and media ============= /////////////////////

  /////////////////////========= save source API's start for industry,domain,jurisdiction and media ============= /////////////////////
    
  /* purpose: save Source Industry List
  * created: 3rd jan 2019
  * params: params(object)
  * author: karnakar
  */
  saveSourceIndustryList(params){
    return this.httpClient.post(AppConstants.Ehub_Rest_API + "sourceIndustry/saveSourceIndustry?token="+AppConstants.Ehubui_token,params);
  }

  /* purpose: save Source Domain List
  * created: 3rd jan 2019
  * params: params(object)
  * author: karnakar
  */
  saveSourceDomainList(params){
    return this.httpClient.post(AppConstants.Ehub_Rest_API + "sourceIndustry/saveSourceDomain?token="+AppConstants.Ehubui_token,params);
  }

  /* purpose: save Source Industry List
  * created: 3rd jan 2019
  * params: params(object)
  * author: karnakar
  */
 saveSourceJurisdictionList(params){
    return this.httpClient.post(AppConstants.Ehub_Rest_API + "sourceIndustry/saveSourceJurisdiction?token="+AppConstants.Ehubui_token,params);
  }

  /* purpose: save Source Industry List
    * created: 3rd jan 2019
    * params: params(object)
    * author: karnakar
    */
   saveSourceMediaList(params){
    return this.httpClient.post(AppConstants.Ehub_Rest_API + "sourceIndustry/saveSourceMedia?token="+AppConstants.Ehubui_token,params);
  }

  /////////////////////========= save source API's end for industry,domain,jurisdiction and media ============= /////////////////////
}
