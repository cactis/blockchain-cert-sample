import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs/Observable';
import { Cert } from '../org.pccu.certnetwork';
import 'rxjs/Rx';

// Can be injected into a constructor
@Injectable()
export class CertService {

		private NAMESPACE: string = 'Cert';

    constructor(private dataService: DataService<Cert>) {
    };

    public getAll(): Observable<Cert[]> {
        return this.dataService.getAll(this.NAMESPACE);
    }

    public getAsset(id: any): Observable<Cert> {
      return this.dataService.getSingle(this.NAMESPACE, id);
    }

    public addAsset(itemToAdd: any): Observable<Cert> {
      return this.dataService.add(this.NAMESPACE, itemToAdd);
    }

    public updateAsset(id: any, itemToUpdate: any): Observable<Cert> {
      return this.dataService.update(this.NAMESPACE, id, itemToUpdate);
    }

    public deleteAsset(id: any): Observable<Cert> {
      return this.dataService.delete(this.NAMESPACE, id);
    }

}
