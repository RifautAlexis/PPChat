import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class Tools {

  constructor() {}

  public isStringEmpty(toTest: string): boolean {
    return (typeof toTest === 'undefined') || toTest === null || toTest === ' ' || toTest === '';
  }

}
