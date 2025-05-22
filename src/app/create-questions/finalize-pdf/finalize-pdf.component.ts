import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
// import 'jspdf-autotable';

@Component({
  selector: 'app-finalize-pdf',
  templateUrl: './finalize-pdf.component.html',
  styleUrls: ['./finalize-pdf.component.css']
})
export class FinalizePdfComponent implements OnInit {

  questions:any = [];

  constructor() { }

  ngOnInit(): void {
    let localValue = localStorage.getItem('examifyQuestions');
    this.questions = JSON.parse(localValue ? localValue : "[]");

  }

  headings:any[]=[ {heading : "Hello World", fontSize:20, align: 'center', }, {heading : "Hello qwertyuioplkjhgfdsazxcvbnm", fontSize:30, align: 'left'}]
  loadPDFButton:boolean = false;
  createCustomPDF(isEmail?: boolean) {
    this.loadPDFButton = true;
    setTimeout(() => {
      this.loadPDFButton = false;

    const pdf: any = new jsPDF({
      // orientation: 'portrait',
      unit: 'px',
    });
    const pageHeight = pdf.internal.pageSize.height || pdf.internal.pageSize.getHeight();
    const pageWidth = pdf.internal.pageSize.width || pdf.internal.pageSize.getWidth();
    console.log("err", pageHeight)
    pdf.setFont("Symbol");
    let startHeight = 20;
    this.headings.forEach(element => {
      pdf.setFontSize(element.fontSize);
      pdf.setFont(undefined, 'bold');
      if(element.align == 'center'){
        pdf.text(element.heading, pageWidth / 2, startHeight, 'center')
      }
      else{
        pdf.text(element.heading, 20, startHeight, 'left')
      }
      startHeight+=20;
    })


    pdf.setLineWidth(1.5);
    pdf.line(15, startHeight, pageWidth-15, startHeight);

    startHeight+=25;

    pdf.setFontSize(14);
    pdf.setFont(undefined, 'normal');
    let i=1;
    this.questions.forEach((value:any) => {
      if(pageHeight-startHeight<30){
          pdf.addPage();
          startHeight = 20;
      }
      pdf.text(i + ". " + value.question, 20, startHeight, 'left')
      i++;

      if(value.type=='multiple'){
        for(let j=1; j<=value.numberOfOption/2; j+=2){
            startHeight+=15;
            pdf.text(String.fromCharCode(96 + j) + ". " + value['option' + j], 25, startHeight, 'left')
            if(value['option' + (j+1)]){
              pdf.text(String.fromCharCode(96 + j+1) + ". " + value['option' + (j+1)], pageWidth / 2, startHeight, 'left')
            }
            if(pageHeight-startHeight<30){
              pdf.addPage();
              startHeight = 20;
            }
        }
      }
      else if(value.type=='input'){
        pdf.setLineWidth(0.75);
        for(let j=1; j<=value.numberOfLine; j++){
            startHeight+=16;
            pdf.line(25, startHeight, pageWidth-25, startHeight);
            if(pageHeight-startHeight<30){
              pdf.addPage();
              startHeight = 20;
            }
        }
        startHeight+=10;
      }
      else if(value.type=='binary'){
        startHeight+=15;
        pdf.text(String.fromCharCode(97) + ". " + 'True', 25, startHeight, 'left')
        pdf.text(String.fromCharCode(98) + ". " + 'False', pageWidth / 2, startHeight, 'left')
      }

      if(pageHeight-startHeight<40){
          pdf.addPage();
          startHeight = 20;
      }
      else{
        startHeight +=20;
      }

      // if()
    })












    const pdfBlob = pdf.output('blob');
      const pdfUrl = URL.createObjectURL(pdfBlob);
  
      if (!isEmail) {
        const pdfWindow = window.open(pdfUrl, '_blank');
        if (!pdfWindow) {
          // Handle error if the window couldn't be opened
        }
      } else {
        // Handle sending email with PDF blob
      }

      }, 500)
  }

}
