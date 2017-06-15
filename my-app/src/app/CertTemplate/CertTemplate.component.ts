import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { CertTemplateService } from './CertTemplate.service';
import 'rxjs/add/operator/toPromise';
@Component({
  selector: 'app-CertTemplate',
  templateUrl: './CertTemplate.component.html',
  styleUrls: ['./CertTemplate.component.css'],
  providers: [CertTemplateService]
})
export class CertTemplateComponent implements OnInit {

  myForm: FormGroup;

  private allAssets;
  private asset;
  private currentId;
  private errorMessage;

  certTemplateId = new FormControl("", Validators.required);

  issuer = new FormControl("", Validators.required);

  title = new FormControl("", Validators.required);

  constructor(private serviceCertTemplate: CertTemplateService, fb: FormBuilder) {
    this.myForm = fb.group({

      certTemplateId: this.certTemplateId,

      issuer: this.issuer,

      title: this.title

    });
  };

  ngOnInit(): void {
    this.loadAll();
  }

  loadAll(): Promise<any> {
    let tempList = [];
    return this.serviceCertTemplate.getAll()
      .toPromise()
      .then((result) => {
        this.errorMessage = null;
        result.forEach(asset => {
          tempList.push(asset);
        });
        this.allAssets = tempList;
      })
      .catch((error) => {
        if (error == 'Server error') {
          this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if (error == '404 - Not Found') {
          this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else {
          this.errorMessage = error;
        }
      });
  }

  addAsset(form: any): Promise<any> {

    this.asset = {
      $class: "org.pccu.certnetwork.CertTemplate",

      "certTemplateId": this.certTemplateId.value,

      "issuer": this.issuer.value,

      "title": this.title.value

    };

    this.myForm.setValue({

      "certTemplateId": null,

      "issuer": null,

      "title": null

    });

    return this.serviceCertTemplate.addAsset(this.asset)
      .toPromise()
      .then(() => {
        this.errorMessage = null;
        this.myForm.setValue({

          "certTemplateId": null,

          "issuer": null,

          "title": null

        });
      })
      .catch((error) => {
        if (error == 'Server error') {
          this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else {
          this.errorMessage = error;
        }
      });
  }

  updateAsset(form: any): Promise<any> {
    this.asset = {
      $class: "org.pccu.certnetwork.CertTemplate",

      "issuer": this.issuer.value,

      "title": this.title.value

    };

    return this.serviceCertTemplate.updateAsset(form.get("certTemplateId").value, this.asset)
      .toPromise()
      .then(() => {
        this.errorMessage = null;
      })
      .catch((error) => {
        if (error == 'Server error') {
          this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if (error == '404 - Not Found') {
          this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else {
          this.errorMessage = error;
        }
      });
  }

  deleteAsset(): Promise<any> {

    return this.serviceCertTemplate.deleteAsset(this.currentId)
      .toPromise()
      .then(() => {
        this.errorMessage = null;
      })
      .catch((error) => {
        if (error == 'Server error') {
          this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if (error == '404 - Not Found') {
          this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else {
          this.errorMessage = error;
        }
      });
  }

  setId(id: any): void {
    this.currentId = id;
  }

  getForm(id: any): Promise<any> {

    return this.serviceCertTemplate.getAsset(id)
      .toPromise()
      .then((result) => {
        this.errorMessage = null;
        let formObject = {

          "certTemplateId": null,

          "issuer": null,

          "title": null

        };

        if (result.certTemplateId) {
          formObject.certTemplateId = result.certTemplateId;
        } else {
          formObject.certTemplateId = null;
        }

        if (result.issuer) {
          formObject.issuer = result.issuer;
        } else {
          formObject.issuer = null;
        }

        if (result.title) {
          formObject.title = result.title;
        } else {
          formObject.title = null;
        }

        this.myForm.setValue(formObject);

      })
      .catch((error) => {
        if (error == 'Server error') {
          this.errorMessage = "Could not connect to REST server. Please check your configuration details";
        }
        else if (error == '404 - Not Found') {
          this.errorMessage = "404 - Could not find API route. Please check your available APIs."
        }
        else {
          this.errorMessage = error;
        }
      });

  }

  resetForm(): void {
    this.myForm.setValue({

      "certTemplateId": null,

      "issuer": null,

      "title": null

    });
  }

}
