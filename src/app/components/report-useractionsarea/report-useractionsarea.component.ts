import { Component } from '@angular/core';
import { GlobalConstants } from 'src/app/common/global-constants';
import { Papa } from 'ngx-papaparse';
import { go } from 'fuzzysort';
import * as fuzzysort from 'fuzzysort';
declare const annyang: any;

@Component({
  selector: 'app-report-useractionsarea',
  templateUrl: './report-useractionsarea.component.html',
  styleUrls: ['./report-useractionsarea.component.css']
})
export class ReportUseractionsareaComponent {
  currentChart: any = '';
  chartID: string = '';
  stopwords: string[] = ["i","me","my","myself","we","our","ours","ourselves","you","your","yours","yourself","yourselves","he","him","his","himself","she","her","hers","herself","it","its","itself","they","them","their","theirs","themselves","what","which","who","whom","this","that","these","those","am","is","are","was","were","be","been","being","have","has","had","having","do","does","did","doing","a","an","the","and","but","if","or","because","as","until","while","of","at","by","for","with","about","against","between","into","through","during","before","after","above","below","to","from","up","down","in","out","on","off","over","under","again","further","then","once","here","there","when","where","why","how","all","any","both","each","few","more","most","other","some","such","no","nor","not","only","own","same","so","than","too","very","s","t","can","will","just","don","should","now"];
  xlabel: string[] = ["x label", "acceleable", "excitable", "label x", "ex lable", "ex label", "x level", "x-label", "label-x"];
  ylabel: string[] = ["y label", "viable", "violable", "bilable", "label why", "lable y", "y-label", "label-y", "y level"];
  xaxis: string[] = ["x axis", "exces", "exactis", "ex-axis", "ex axis", "x-axis", "access", "excess", "exacts"];
  yaxis: string[] = ["y axis", "y-axis", "axis y", "axis-y", "y exces", "y access", "y excess", "y exacts", "y exactis", "why exces", "why access", "why excess", "why exacts", "why exactis"];
  saxis: string[] = ["secondary axis", "secondary access", "secondary excess", "secondary exces", "secondary excess", "secondary exacts", "second axis", "second access", "second excess", "second exces", "second excess", "second exacts"];

  constructor(private papa: Papa) {
  }

  fileUpload() {
    const csvFilePath=(document.getElementById('inputGroupFile02') as HTMLInputElement).value
    this.downloadCsvFile("deals_data.csv")    
    console.log(1)
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

  removeWords(a: any, b: string[]){
    console.log(a);
    a = a.split(' ');
    let removedArray = a.filter((el: any) => {
      return !this.stopwords.includes(el);
    });
    
    removedArray = removedArray.join(' ')
    console.log(4 + removedArray);
    console.log(b)
    return b.reduce((acc , val) => {
     const regex = new RegExp(` ${val}`, "g");
      return acc.replace(regex, '');
   }, removedArray);
  }

  fuzzyMatch(a: string, b: string[]){
    let results = fuzzysort.go(a, b)
    console.log(results[0].target);
    return {"data": GlobalConstants.loadedData[0].data.map((d: { [x: string]: any; }) => d[results[0].target]), 'label': results[0].target};
  }
  

  matchAxisCols(a: string[], b: string[], c: string, d: string, e: string) {
    let mainArr = a.concat(b);
    console.log(1+ c)
    let cleanQuery = this.removeWords(c, mainArr);
    console.log(2+ cleanQuery);
    
    if(GlobalConstants.loadedData.length == 0){
      alert("Please add a dataset first");
    } else {
      var colVals = this.fuzzyMatch(cleanQuery, Object.keys(GlobalConstants.loadedData[0].data[0]));
      console.log(colVals)
      console.log(GlobalConstants.chartJSON);
      if(JSON.stringify(GlobalConstants.chartJSON) == "{}"){
        alert('Please add a chart first');
        
      } else {
        GlobalConstants.chartJSON[this.chartID][e] = colVals['label']
        GlobalConstants.chartJSON[this.chartID][d] = colVals['data']
        console.log(GlobalConstants.chartJSON)
      }
    }

      
   };
   
  matchLabels(a: string) {
    if(JSON.stringify(GlobalConstants.chartJSON) == "{}"){
      alert('Please add a chart first');
      
    } else {
      GlobalConstants.chartJSON[this.chartID][a] ="xxxxx"
      console.log(GlobalConstants.chartJSON)
    }
  }
  
  

  matchAdds(tag: any) {
    let results = go('level', this.xlabel);

    //console.log(results[0].target);
    if        (this.saxis.some(v => tag.includes(v))) {
        return this.matchAxisCols(['at', 'add', 'had', 'hard', 'are'], this.saxis, tag, 's-axis', 's-label');
    } else if (this.yaxis.some(v => tag.includes(v))) {
        return this.matchAxisCols(['at', 'add', 'had', 'hard', 'are'], this.yaxis, tag, 'y-axis', 'y-label');
    } else if (this.xaxis.some(v => tag.includes(v))) {
      return this.matchAxisCols(['at', 'add', 'had', 'hard', 'are'], this.xaxis, tag, 'x-axis', 'x-label');
    } else if (this.xlabel.some(v => tag.includes(v))) {
      return this.matchLabels('x-label');
    } else if (this.ylabel.some(v => tag.includes(v))) {
      return this.matchLabels('y-label');
    } else {
      return 5;
    }
  }

  toggleSpeech() {
    if((document.getElementById('speech-search') as HTMLInputElement).innerText == " Mic On") {
      if (annyang) {
        let createVis =  (tag: any) => {
          tag = tag.toLowerCase();
          switch (true) {
            case ((tag.indexOf("bar chart") !=-1) || (tag.indexOf("bar chat") !=-1)):
              this.chartID = "chart" + Date.now();
              GlobalConstants.chartJSON[this.chartID] = {'type':'bar'};
              this.currentChart = this.chartID;
              console.log(GlobalConstants.chartJSON)
              console.log('bar chart created'); break;
            case (tag.indexOf("new dashboard") !=-1):
              console.log('new dashboard'); break;
            default:
              console.log('no match'); break;
           }
          
        }

        let removeVis = function (tag: any) {
          tag = tag.toLowerCase();
          console.log(tag);

        }
        let addVis =  (tag: any) => {
          tag = tag.toLowerCase();
          console.log(tag);
          let output = this.matchAdds(tag);
          console.log(output);
          
        }

        let useVis = function (tag: any) {
          tag = tag.toLowerCase();
          console.log(tag);
        }

        let deleteVis = function (tag: any) {
          tag = tag.toLowerCase();
          console.log(tag);
        }

        let loadData =  (tag: any) => {
          tag = tag.toLowerCase();
          console.log(tag);
          if ((tag.indexOf('excel')>-1) || (tag.indexOf('axel')>-1) || (tag.indexOf('xl')>-1)) {
            this.fileUpload();
          }
        }

        let updateVis =  (tag: any) => {
          tag = tag.toLowerCase();
          console.log(tag);
          
        }

        let commands = {
          'create *tag': createVis,
          'remove *tag': removeVis,
          'add *tag': addVis,
          'at *tag': addVis,
          'had *tag': addVis,
          'are *tag': addVis,
          'hard *tag': addVis,
          'use *tag': useVis,
          'change *tag': updateVis,
          'update *tag': updateVis,
          'delete *tag': deleteVis,
          'load data *tag': loadData,
        };

        annyang.addCommands(commands);
        annyang.addCallback('resultMatch', function (userSaid: string, commandText: string, phrases: string) {
          (document.getElementById('speech-input') as HTMLInputElement).value = userSaid;
        });
        annyang.addCallback('resultNoMatch', function (userSaid: string, commandText: string, phrases: string) {
            console.log('no match: ' + userSaid); // sample output: 'hello'
            (document.getElementById('speech-input') as HTMLInputElement).value = userSaid;
        });
        annyang.start();
        (document.getElementById('speech-search') as HTMLInputElement).innerHTML = '<i class="bi bi-mic-mute-fill"></i> Mic Off'
      } else {
          alert('Could not start Annyang')
      }
    } else {
      if (annyang) {
        annyang.removeCallback();
        annyang.abort();
        (document.getElementById('speech-search') as HTMLInputElement).innerHTML = '<i class="bi bi-mic-fill"></i> Mic On'
    } else {
        alert('Could not pause Annyang')
    }
    }
  }
  


}
