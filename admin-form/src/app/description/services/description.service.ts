import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UDescription, Description } from '../models/description';
import { max } from 'rxjs/operators';
import { LOCAL_STORAGE, StorageService } from 'ngx-webstorage-service';

@Injectable({
  providedIn: 'root'
})


export class DescriptionService {

  private descriptions: Array<Description> = [
    // empty array

  ];

  constructor() { }

  getAllDescription(): Observable<UDescription[]> {

    this.descriptions = JSON.parse(localStorage.getItem('descriptions'));

    return of(this.descriptions)
  }


  getDescriptionById(id: number): Observable<UDescription> {
    this.descriptions = this.descriptions ? this.descriptions  : [];
    var description = this.descriptions.find(item => item.id === id);
    return of(description);
  }

  addNewDescription(description: UDescription): void {
    let descriptions =[];
    descriptions = JSON.parse(localStorage.getItem('descriptions'));
      if(descriptions == undefined){

      descriptions =[];
    }
    descriptions.push(description);
    
    localStorage.setItem('descriptions', JSON.stringify(descriptions));


    //   this.descriptions.sort(item => item.id)
    //   description.id = this.descriptions.length + 1;
    //   this.descriptions.push(description);


  }

  deleteDescription(description: UDescription): void {

    this.descriptions = JSON.parse(localStorage.getItem('descriptions'));
    const index = this.descriptions.findIndex(item => item.id === description.id);
    
       this.descriptions.splice(index, 1);

    localStorage.setItem('descriptions', JSON.stringify(this.descriptions));

    // const index = this.descriptions.findIndex(item => item.id === description.id);
    // const deletedItem = this.descriptions.splice(index,1);
    // return deletedItem;
  }

  updateDescription(description: UDescription): void {

    this.descriptions = JSON.parse(localStorage.getItem('descriptions'));

    const index = this.descriptions.findIndex(item => item.id === description.id);
    if(index > -1)
    this.descriptions[index] = description;

    localStorage.setItem('descriptions', JSON.stringify(this.descriptions));

    //   const index = this.descriptions.findIndex(item => item.id === description.id);
    //   this.descriptions[index] = description;

  }
}
