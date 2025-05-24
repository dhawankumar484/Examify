import { Injectable } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {

  constructor() { }


  drop(event: CdkDragDrop<string[]>, array:any[]) {
    moveItemInArray(array, event.previousIndex, event.currentIndex);
  }
}
