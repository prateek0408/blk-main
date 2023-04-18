import { Component } from '@angular/core';
import { Papa } from 'ngx-papaparse';
import { GlobalConstants } from 'src/app/common/global-constants';

@Component({
  selector: 'app-report-datamodelarea',
  templateUrl: './report-datamodelarea.component.html',
  styleUrls: ['./report-datamodelarea.component.css']
})

export class ReportDatamodelareaComponent {
  constructor(private papa: Papa) {
  }

  fileUpload() {
    const csvFilePath=(document.getElementById('inputGroupFile02') as HTMLInputElement).value
    this.downloadCsvFile(csvFilePath.split('\\')[2])    
  }

  downloadCsvFile(path: string){
    console.log(path)
    this.papa.parse('http://localhost:8887/' + path, {
      download:true,
      header: true,
      dynamicTyping: true,
      skipEmptyLines: 'greedy',
      worker: true,
      complete: this.parseCsvData,
    })
  }

  parseCsvData(csvData: any) {
    csvData['name'] = ((document.getElementById('inputGroupFile02') as HTMLInputElement).value).split('\\')[2]
    GlobalConstants.loadedData.push(csvData);
    console.log(GlobalConstants.loadedData);
    (document.getElementById('inputGroupFile02') as HTMLInputElement).value = "";

    let dataElements: any = [];

    for (let i=0; i<GlobalConstants.loadedData.length; i++){
      dataElements += (
        '<div class="accordion-item"><h2 class="accordion-header" id="headingOne"><button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">' +
        GlobalConstants.loadedData[i].name +
        '</button></h2><div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample"><div class="accordion-body"><p><small>[' +
        Object.keys(GlobalConstants.loadedData[i].data[0]).join("], [") +
        ']</small></p></div></div></div>'
      );
    }

    
    (document.getElementById('data-model') as HTMLInputElement).innerHTML = '<div class="accordion" id="accordionExample">' + dataElements + '</div>'
  }
}
