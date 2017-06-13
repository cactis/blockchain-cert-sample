import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CertService } from './Cert.service';
import 'rxjs/add/operator/toPromise';
@Component({
	selector: 'app-Cert',
	templateUrl: './Cert.component.html',
	styleUrls: ['./Cert.component.css'],
  providers: [CertService]
})
export class CertComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
	private errorMessage;

  
      certId = new FormControl("", Validators.required);
  
      certTemplate = new FormControl("", Validators.required);
  
      receiver = new FormControl("", Validators.required);
  
      CertStatus = new FormControl("", Validators.required);
  
      createdAt = new FormControl("", Validators.required);
  


  constructor(private serviceCert:CertService, fb: FormBuilder) {
    this.myForm = fb.group({
    
        
          certId:this.certId,
        
    
        
          certTemplate:this.certTemplate,
        
    
        
          receiver:this.receiver,
        
    
        
          CertStatus:this.CertStatus,
        
    
        
          createdAt:this.createdAt
        
    
    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceCert.getAll()
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      result.forEach(asset => {
        tempList.push(asset);
      });
      this.allAssets = tempList;
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else{
            this.errorMessage = error;
        }
    });
  }

  addAsset(form: any): Promise<any> {

    this.asset = {
      $class: "org.pccu.certnetwork.Cert",
      
        
          "certId":this.certId.value,
        
      
        
          "certTemplate":this.certTemplate.value,
        
      
        
          "receiver":this.receiver.value,
        
      
        
          "CertStatus":this.CertStatus.value,
        
      
        
          "createdAt":this.createdAt.value
        
      
    };

    this.myForm.setValue({
      
        
          "certId":null,
        
      
        
          "certTemplate":null,
        
      
        
          "receiver":null,
        
      
        
          "CertStatus":null,
        
      
        
          "createdAt":null
        
      
    });

    return this.serviceCert.addAsset(this.asset)
    .toPromise()
    .then(() => {
			this.errorMessage = null;
      this.myForm.setValue({
      
        
          "certId":null,
        
      
        
          "certTemplate":null,
        
      
        
          "receiver":null,
        
      
        
          "CertStatus":null,
        
      
        
          "createdAt":null 
        
      
      });
    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else{
            this.errorMessage = error;
        }
    });
  }


   updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: "org.pccu.certnetwork.Cert",
      
        
          
        
    
        
          
            "certTemplate":this.certTemplate.value,
          
        
    
        
          
            "receiver":this.receiver.value,
          
        
    
        
          
            "CertStatus":this.CertStatus.value,
          
        
    
        
          
            "createdAt":this.createdAt.value
          
        
    
    };

    return this.serviceCert.updateAsset(form.get("certId").value,this.asset)
		.toPromise()
		.then(() => {
			this.errorMessage = null;
		})
		.catch((error) => {
            if(error == 'Server error'){
				this.errorMessage = "Could not connect to REST server. Please check your configuration details";
			}
            else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
			}
			else{
				this.errorMessage = error;
			}
    });
  }


  deleteAsset(): Promise<any> {

    return this.serviceCert.deleteAsset(this.currentId)
		.toPromise()
		.then(() => {
			this.errorMessage = null;
		})
		.catch((error) => {
            if(error == 'Server error'){
				this.errorMessage = "Could not connect to REST server. Please check your configuration details";
			}
			else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
			}
			else{
				this.errorMessage = error;
			}
    });
  }

  setId(id: any): void{
    this.currentId = id;
  }

  getForm(id: any): Promise<any>{

    return this.serviceCert.getAsset(id)
    .toPromise()
    .then((result) => {
			this.errorMessage = null;
      let formObject = {
        
          
            "certId":null,
          
        
          
            "certTemplate":null,
          
        
          
            "receiver":null,
          
        
          
            "CertStatus":null,
          
        
          
            "createdAt":null 
          
        
      };



      
        if(result.certId){
          formObject.certId = result.certId;
        }else{
          formObject.certId = null;
        }
      
        if(result.certTemplate){
          formObject.certTemplate = result.certTemplate;
        }else{
          formObject.certTemplate = null;
        }
      
        if(result.receiver){
          formObject.receiver = result.receiver;
        }else{
          formObject.receiver = null;
        }
      
        if(result.CertStatus){
          formObject.CertStatus = result.CertStatus;
        }else{
          formObject.CertStatus = null;
        }
      
        if(result.createdAt){
          formObject.createdAt = result.createdAt;
        }else{
          formObject.createdAt = null;
        }
      

      this.myForm.setValue(formObject);

    })
    .catch((error) => {
        if(error == 'Server error'){
            this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if(error == '404 - Not Found'){
				this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else{
            this.errorMessage = error;
        }
    });

  }

  resetForm(): void{
    this.myForm.setValue({
      
        
          "certId":null,
        
      
        
          "certTemplate":null,
        
      
        
          "receiver":null,
        
      
        
          "CertStatus":null,
        
      
        
          "createdAt":null 
        
      
      });
  }

}
