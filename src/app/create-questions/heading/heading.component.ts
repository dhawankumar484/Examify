import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-heading',
  templateUrl: './heading.component.html',
  styleUrls: ['./heading.component.css']
})
export class HeadingComponent implements OnInit {

  headings:any[] = [{title:'', fontSize:18, align:'center'}]

  constructor(private router : Router) { }

  ngOnInit(): void {
  }

  addHeading(){
    if(this.headings.length<5){
      this.headings.push({title:'', fontSize:18, align:'center'});
    }
    else{
    }
  }

  deleteHeading(index:any){
    this.headings.splice(index, 1)
  }

  createLoader:boolean = false;
  routeToPdf(){
    this.createLoader = true;
    setTimeout(() => {
      localStorage.setItem("examifyHeadings", JSON.stringify(this.headings));
      this.createLoader = false;
      this.router.navigate(["/start/heading/finalize"]);
    },500)
  }

}
