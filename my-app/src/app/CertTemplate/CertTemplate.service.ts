import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { CertTemplate } from '../org.pccu.certnetwork';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class CertTemplateService {

	
		private NAMESPACE: string = 'CertTemplate';
	



    constructor(private dataService: DataService<CertTemplate>) {
    };

    public getAll(): Observable<CertTemplate[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getAsset(id: any): Observable<CertTemplate> {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addAsset(itemToAdd: any): Observable<CertTemplate> {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public updateAsset(id: any, itemToUpdate: any): Observable<CertTemplate> {
      return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }

    public deleteAsset(id: any): Observable<CertTemplate> {
      return this.dataService.delete(this.NAMESPACE, id);
    }

}
