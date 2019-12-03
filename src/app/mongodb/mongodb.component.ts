import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MongodbService } from '../services/mongodb.service';
import { Inject }  from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-mongodb',
  templateUrl: './mongodb.component.html',
  styleUrls: ['./mongodb.component.css']
})
export class MongodbComponent implements OnInit {

  public section = "MongoDB";
  // Form and response data
  private myData;
  private formdata;
  private advformdata;
  private loading = false;
  private advanced = false;
  // Input range
  private min;
  private max;
  private value;
  // Stats
  private percEC;
  private percGO;
  private avgECNb;
  private avgGONb;
  private nbOfProteins;
  private percLabbeled;

  constructor(private mongo: MongodbService) {  }

  ngOnInit() {
    this.formdata = new FormGroup({
       searchValue: new FormControl("", Validators.compose([
         Validators.required
       ])),
       searchParameterBtns: new FormControl(""),
       range: new FormControl("")
    });
    this.formdata.get('searchParameterBtns').setValue('entryName');
    this.min = 1;
    this.max = 200;
    this.value = 50;
    this.formdata.get('range').setValue(this.value);

    this.advformdata = new FormGroup({
       EntryName: new FormControl(""),
       Entry: new FormControl(""),
       Keywords: new FormControl(""),
       ProteinNames: new FormControl(""),
       GeneNames: new FormControl(""),
       Organism: new FormControl("")
    });
  }

  getStats(data) {
    const length = data.length;
    console.log(length);

    var percEC = 0;
    var percGO = 0;
    var avgECNb = 0;
    var avgGONb = 0;
    var percLabbeled = 0;

    for(var i=0 ; i<length ; i++) {
      if (data[i]["GO"].length) {
        percGO++;
        avgGONb = avgGONb + data[i]["GO"].length;
        if (data[i]["EC"].length) {
          percLabbeled++;
        }
      }
      if (data[i]["EC"].length) {
        percEC++;
        avgECNb = avgECNb + data[i]["EC"].length;
      }
    }

    percEC = percEC*100/length;
    percGO = percGO*100/length;
    percLabbeled = percLabbeled*100/length;
    avgECNb = avgECNb/length;
    avgGONb = avgGONb/length;

    this.percEC = percEC;
    this.percGO = percGO;
    this.avgECNb = avgECNb;
    this.avgGONb = avgGONb;
    this.nbOfProteins = length;
    this.percLabbeled = percLabbeled;
  }

  onClickSubmit(data) {
    this.loading = true;
    const limit = this.formdata.get('range').value;
    // Entry Name
    if (this.formdata.get('searchParameterBtns').value == 'entryName') {
      this.mongo.getDataFromName(data.searchValue, limit).subscribe(data => {
        this.loading=false;
        if (data.success) {
          this.myData = data.data;
          this.getStats(this.myData);
        } else {
          console.log(data);
        }
      });
    // Entry
    } else if (this.formdata.get('searchParameterBtns').value == 'entry') {
      this.mongo.getDataFromEntry(data.searchValue, limit).subscribe(data => {
        this.loading=false;
        if (data.success) {
          this.myData = data.data;
          this.getStats(this.myData);
        } else {
          console.log(data);
        }
      });
    // Keywords
    } else if (this.formdata.get('searchParameterBtns').value == 'keywords') {
      this.mongo.getDataFromKeywords(data.searchValue, limit).subscribe(data => {
        this.loading=false;
        if (data.success) {
          this.myData = data.data;
          this.getStats(this.myData);
        } else {
          console.log(data);
        }
      });
    // Protein Names
    } else if (this.formdata.get('searchParameterBtns').value == 'proteinNames') {
      this.mongo.getDataFromProteinNames(data.searchValue, limit).subscribe(data => {
        this.loading=false;
        if (data.success) {
          this.myData = data.data;
          this.getStats(this.myData);
        } else {
          console.log(data);
        }
      });
    // Gene Names
  } else if (this.formdata.get('searchParameterBtns').value == 'geneNames') {
      this.mongo.getDataFromGeneNames(data.searchValue, limit).subscribe(data => {
        this.loading=false;
        if (data.success) {
          this.myData = data.data;
          this.getStats(this.myData);
        } else {
          console.log(data);
        }
      });
    // Organism
  } else if (this.formdata.get('searchParameterBtns').value == 'organism') {
      this.mongo.getDataFromOrganism(data.searchValue, limit).subscribe(data => {
        this.loading=false;
        if (data.success) {
          this.myData = data.data;
          this.getStats(this.myData);
        } else {
          console.log(data);
        }
      });
    } else {
      console.log('No radio button checked !');
    }
  }

  onClickSubmitAdv(data) {
    console.log(data);

    if (data.EntryName || data.Entry || data.Keywords || data.ProteinNames || data.GeneNames || data.Organism) {
      this.loading=true;
      const limit = this.formdata.get('range').value;
      this.mongo.getDataFromAdvanced(data, limit).subscribe(data => {
        this.loading=false;
        if (data.success) {
          this.myData = data.data;
          this.getStats(this.myData);
        } else {
          console.log(data);
        }
      });
    }
  }

  toArray(keywords: object) {
    if (keywords) {
      return Object.keys(keywords).map(key => keywords[key]);
    }
    else {
      return [];
    }
  }

  changeValue(value: number) {
      this.value = value;
  }

  toggleAdvanced() {
    this.advanced = !this.advanced;
  }
}
