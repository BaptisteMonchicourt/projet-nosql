import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  private _section = '';
  
  constructor() { }

  @Input()
  set section(section: string) {
    this._section = (section && section.trim()) || '<no section set>';
  }

  get section(): string { return this._section; }

  ngOnInit() {
  }

}
