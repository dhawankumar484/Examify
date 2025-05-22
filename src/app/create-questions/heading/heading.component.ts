import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-heading',
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.css']
})
export class HeadingComponent implements OnInit {

  headings:any[] = [{title:'', fontSize:null, align:null}]

  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  addHeading(){
    if(this.headings.length<5){
      this.headings.push({title:'', fontSize:null, align:null});
    }
    else{
    }
  }

  deleteHeading(index:any){
    this.headings.splice(index, 1)
  }

  routeToPdf(){
    localStorage.setItem("examifyHeadings", JSON.stringify(this.headings));
    this.router.navigate(["/start/heading/finalize"]);
  }

}
