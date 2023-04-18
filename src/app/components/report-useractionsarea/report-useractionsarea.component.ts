import { Component } from '@angular/core';
declare const annyang: any;

@Component({
  selector: 'app-report-useractionsarea',
  templateUrl: './report-useractionsarea.component.html',
  styleUrls: ['./report-useractionsarea.component.css']
})
export class ReportUseractionsareaComponent {

  toggleSpeech() {
    if((document.getElementById('speech-search') as HTMLInputElement).innerText == " Mic On") {
      if (annyang) {
        let createVis = function (tag: any) {
          console.log('create')
        }

        let removeVis = function (tag: any) {
          console.log('remove')
        }
        let addVis = function (tag: any) {
          console.log('add')
        }

        let useVis = function (tag: any) {
          console.log('use')
        }

        let deleteVis = function (tag: any) {
          console.log('delete')
        }

        let loadData = function (tag: any) {
          console.log('load')
        }

        let commands = {
          'create *tag': createVis,
          'remove *tag': removeVis,
          'add *tag': addVis,
          'use *tag': useVis,
          'delete *tag': deleteVis,
          'load data *tag': loadData,
        };

        annyang.addCommands(commands);
        annyang.addCallback('resultMatch', function (userSaid: string, commandText: string, phrases: string) {
          console.log('match: ' + userSaid); // sample output: 'hello'
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
