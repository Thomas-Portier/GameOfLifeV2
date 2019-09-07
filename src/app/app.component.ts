import { Component } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {

  public lifeMap: boolean[][] = [];
  public nextLifeMap: boolean[][] = [];
  public lifeAroundMap: number[][] = [];

  constructor() {

    this.lifeMap = this.fillTableValuesWith(false);
    this.nextLifeMap = this.lifeMap.slice(0);
    this.lifeAroundMap = this.fillTableValuesWith(0);

  }

  private fillTableValuesWith( value ) {
    let tableToreturn = [];
    let numberOfCellOnSide = 50;
    let row = [];
    let count = 0;
    for (let i = 0; i < numberOfCellOnSide * numberOfCellOnSide; i++) {
      count++;
      if (count == numberOfCellOnSide) {
        row.push(value);
        tableToreturn.push(row);
        count = 0;
        row = [];
      }
      else {
        row.push(value);
      }
    }
    return tableToreturn;
  }

  public lifeStart(){    
    
    this.getCurrentLifeMap();
    this.setLifeAroundMap();
    this.setNextLifeMap();
    this.displayNextLifeMap();
    
  }


  private getCurrentLifeMap() {
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        var cell = this.getElement(i, j);
        if (cell && cell.className == 'isAlive') {
          this.lifeMap[i][j] = true;
        }
        else {
          this.lifeMap[i][j] = false;
        }
      }
    }
  }




  private setLifeAroundMap() {
    for (let i = 1; i < 9; i++) {
      for (let j = 1; j < 9; j++) {
        var lifeAroundCount = 0;
        if (this.lifeMap[i - 1][j - 1] == true)
          lifeAroundCount += 1;
        if (this.lifeMap[i - 1][j] == true)
          lifeAroundCount += 1;
        if (this.lifeMap[i - 1][j + 1] == true)
          lifeAroundCount += 1;
        if (this.lifeMap[i][j - 1] == true)
          lifeAroundCount += 1;
        if (this.lifeMap[i][j + 1] == true)
          lifeAroundCount += 1;
        if (this.lifeMap[i + 1][j - 1] == true)
          lifeAroundCount += 1;
        if (this.lifeMap[i + 1][j] == true)
          lifeAroundCount += 1;
        if (this.lifeMap[i + 1][j + 1] == true)
          lifeAroundCount += 1;
        this.lifeAroundMap[i - 1][j - 1] = lifeAroundCount;
      }
    }
  }


  private setNextLifeMap() {
    for (let i = 1; i < 9; i++) {
      for (let j = 1; j < 9; j++) {
        if (this.lifeAroundMap[i][j] == 3) {
          this.nextLifeMap[i][j] = true;
        }
        else if (this.lifeMap[i][j] == true && this.lifeAroundMap[i][j] == 2 || this.lifeAroundMap[i][j] == 3) {
          this.nextLifeMap[i][j] = false;
        }
      }
    }
  }


  private displayNextLifeMap() {
    for (let i = 1; i < 9; i++) {
      for (let j = 1; j < 9; j++) {
        let cell = this.getElement(i, j);
        if (cell && this.nextLifeMap[i][j] == true) {
          cell.className = 'isAlive';
        }
        else {
          cell.className = 'isDead';
        }
      }
    }
  }

  public handleClick(event) {
    var cell = this.getClickedElement(event)
    this.changeColor(cell);

  }

  public changeColor(cell){

    if(cell.className == 'isAlive') {
      cell.className = 'isDead';
    } else {
      cell.className = 'isAlive';
    }

  }


  public getClickedElement(event ){
    var target = event.target || event.srcElement || event.currentTarget;
    var idAttr = target.attributes.id;
    var value = idAttr.nodeValue;
    var cell = document.getElementById(value);
    return cell;

  }

  private getElement(i: number, j: number) {

    let cellId = i + '_' + j;
    var cell = document.getElementById(cellId);
    return cell;

  }


}
