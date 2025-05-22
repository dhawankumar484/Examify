import { Component, OnInit } from '@angular/core';
import jsPDF from 'jspdf';
// import 'jspdf-autotable';

@Component({
  selector: 'app-finalize-pdf',
  templateUrl: './finalize-pdf.component.html',
  styleUrls: ['./finalize-pdf.component.css']
})
export class FinalizePdfComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  headings:any[]=[ {heading : "Hello World", fontSize:20, align: 'center', }, {heading : "Hello qwertyuioplkjhgfdsazxcvbnm", fontSize:30, align: 'left'}]

  createCustomPDF(isEmail?: boolean) {
    const pdf: any = new jsPDF({
      orientation: 'portrait',
      unit: 'px',
      format: [900, 900]
    });
    pdf.addFont('ArialMS', 'Arial', 'normal');
    const pageHeight = pdf.internal.pageSize.height || pdf.internal.pageSize.getHeight();
    const pageWidth = pdf.internal.pageSize.width || pdf.internal.pageSize.getWidth();
  
    pdf.setFont("Symbol");
    let heightStart = 40;
    this.headings.forEach(element => {
      pdf.setFontSize(element.fontSize);
      pdf.setFont(undefined, 'bold');
      if(element.align == 'center'){
        pdf.text(element.heading, pageWidth / 2, heightStart, 'center')
      }
      else{
        pdf.text(element.heading, 40, heightStart, 'left')
      }
      heightStart+=20;
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
  }

}
