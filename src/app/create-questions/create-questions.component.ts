import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators, FormControl, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-create-questions',
  templateUrl: './create-questions.component.html',
  styleUrls: ['./create-questions.component.css']
})
export class CreateQuestionsComponent implements OnInit {

  questionForm!: FormGroup;
  toBeDeleted:any;

  constructor(
    private formBuilder: FormBuilder,
    public router: Router,
    private route: ActivatedRoute,
    public globalService: GlobalService,
  ) { }

  ngOnInit(): void {

    this.questionForm = this.formBuilder.group({
      questions: this.formBuilder.array([this.createQuestionsGroup()]),
    })
    
  }

  get questions(): FormArray {
    return this.questionForm.get('questions') as FormArray;
  }

  createQuestionsGroup(): FormGroup {
      return this.formBuilder.group({
        question: ['', [Validators.required]],
        type: ['', [Validators.required]],
      });
  }

  addQuestion(): void{
    this.questions.push(this.createQuestionsGroup());
  }

  deleteQuestions(index: number): void {
    this.questions.removeAt(index);
  }

  get f(): { [key: string]: any } {
    return this.questions.controls;
  }

  get formArray(){
    return this.questions.controls;
  }

  addLineInput(index:any){
    Object.keys(this.questions?.controls[index]?.value).forEach(controlName => {
        if (controlName?.startsWith('option') || controlName?.startsWith('numberOfOption')) {
          (this.questions?.controls[index] as FormGroup).removeControl(controlName);
        }
    });
    this.numberOfOptions[index] = 0;
    (this.questions?.controls[index] as FormGroup)?.addControl('numberOfLine', new FormControl(null, [Validators.required, Validators.max(10), Validators.min(2)]));
  }

  addNumberOfOption(index:any){
    Object.keys(this.questions?.controls[index]?.value).forEach(controlName => {
        if (controlName?.startsWith('numberOfLine')) {
          (this.questions?.controls[index] as FormGroup).removeControl(controlName);
        }
    });
    this.numberOfOptions[index] = 0;
    (this.questions?.controls[index] as FormGroup)?.addControl('numberOfOption', new FormControl(null, [Validators.required, Validators.max(10), Validators.min(2)]));
  }

  selectOther(index:any){
    Object.keys(this.questions?.controls[index]?.value).forEach(controlName => {
        if (controlName?.startsWith('option') || controlName?.startsWith('numberOfOption') || controlName?.startsWith('numberOfLine')) {
          (this.questions?.controls[index] as FormGroup).removeControl(controlName);
        }
    });
    this.numberOfOptions[index] = 0;
    
  }

  numberOfOptions:any = [];
  addOptionFields(event:any, index:any){
    Object.keys(this.questions?.controls[index]?.value).forEach(controlName => {
        if (controlName?.startsWith('option')) {
          (this.questions?.controls[index] as FormGroup).removeControl(controlName);
        }
    });
    if(!isNaN(Number(event.target.value)) && (this.questions?.controls[index] as FormGroup).controls['numberOfOption'].valid){
      for(let i=0; i<Number(event.target.value); i++){
        (this.questions?.controls[index] as FormGroup)?.addControl('option'+(i+1), new FormControl('', [Validators.required]));
      }
      this.numberOfOptions[index] = event.target.value;
    }
    else{
      this.numberOfOptions[index] = 0;
    }
  }

  getOptionArray(number:any){
    let options:any = [];
    let num = Number(number)
    if(num>0){
      return Array.from({ length: num }, (_, i) => i);
    }
    return options;
   }

   submitLoader:boolean = false;
   submit(){
    console.log("submit form", this.questionForm);
    if(this.questionForm.valid){
      this.submitLoader = true;
      setTimeout(() =>{
        let form:any = [];
        this.questions.controls.forEach(control => {
          form.push(control.value);
        })
        console.log("YAY!!!, form Submitted");
        localStorage.setItem("examifyQuestions", JSON.stringify(form));
        this.submitLoader = true;
        this.router.navigate(["/start/heading"]);
      },500)
    }
    else{
      this.questions.controls.forEach(control => {
        if(control.invalid){
          control.markAllAsTouched();
          control.markAsDirty();
        }
      })
    }
   }



}
