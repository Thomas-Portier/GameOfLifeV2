import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cell',
  templateUrl: './cell.component.html',
  styleUrls: ['./cell.component.css']
})
export class CellComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // alert('Open 2 ');
  }

  public handleClick(event) {
      var cell = this.getElement(event)
      this.changeColor(cell);
  }

  getElement(event){
    
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    var value = idAttr.nodeValue;
    var cell = document.getElementById(value);
    return cell;
  }

  changeColor(cell){

    if(cell.className == 'isAlive') {
      cell.className = 'isDead';
    } else {
      cell.className = 'isAlive';
    }

  }


}
