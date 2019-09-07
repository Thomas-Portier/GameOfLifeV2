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
  public lifeMapCopy: boolean[][] = [];
  public lifeAroundMap: number[][] = [];
  public numberOfCellOnSide = 20;

  constructor() {

    this.lifeMap = this.fillTableValuesWith(false);
    this.lifeMapCopy = this.fillTableValuesWith(false);
    this.nextLifeMap = this.fillTableValuesWith(false);
    this.lifeAroundMap = this.fillTableValuesWith(0);

  }

  private fillTableValuesWith( value ) {
    let tableToReturn = [];
    let tableRow = [];
    let count = 0;
    for (let i = 0; i < this.numberOfCellOnSide * this.numberOfCellOnSide; i++) {
      count++;
      if (count == this.numberOfCellOnSide) {
        tableRow.push(value);
        tableToReturn.push(tableRow);
        count = 0;
        tableRow = [];
      }
      else {
        tableRow.push(value);
      }
    }
    return tableToReturn;
  }

  public lifeStart(){    
    
    this.setCurrentLifeMapCopy();
    this.setLifeAroundMap();
    this.setNextLifeMap();
    this.displayNextLifeMap();
    
  }


  private setCurrentLifeMapCopy() { 
    let lifeMapCopy = this.fillTableValuesWith(false);
    for (let i = 0; i < this.numberOfCellOnSide; i++) {
      for (let j = 0; j < this.numberOfCellOnSide; j++) {
        var cell = this.getElement(i, j);
        if (cell && cell.className == 'isAlive') {
          this.lifeMapCopy[i][j] = true;
        }
        else {
          this.lifeMapCopy[i][j] = false;
        }
      }
    }

  }




  private setLifeAroundMap() {
    for (let i = 0; i < this.numberOfCellOnSide ; i++) {
      for (let j = 0; j < this.numberOfCellOnSide ; j++) {
        var lifeAroundCount = 0;
        if(this.lifeMapCopy[i - 1] !== undefined){
          if (this.lifeMapCopy[i - 1][j - 1] !== undefined && this.lifeMapCopy[i - 1][j - 1] )
          lifeAroundCount++;
          if ( this.lifeMapCopy[i - 1][j] !== undefined && this.lifeMapCopy[i - 1][j] )
          lifeAroundCount++;
          if ( this.lifeMapCopy[i - 1][j + 1] !==  undefined && this.lifeMapCopy[i - 1][j + 1] )
          lifeAroundCount++;
        }

        if ( this.lifeMapCopy[i][j - 1] !==  undefined && this.lifeMapCopy[i][j - 1] )
        lifeAroundCount++;
        if ( this.lifeMapCopy[i][j + 1] !==  undefined && this.lifeMapCopy[i][j + 1] )
        lifeAroundCount++;

        if(this.lifeMapCopy[i + 1] !== undefined){
          if ( this.lifeMapCopy[i + 1][j - 1] !==  undefined && this.lifeMapCopy[i + 1][j - 1] )
          lifeAroundCount++;
          if ( this.lifeMapCopy[i + 1][j] !==  undefined && this.lifeMapCopy[i + 1][j] )
          lifeAroundCount++;
          if ( this.lifeMapCopy[i + 1][j + 1] !==  undefined &&  this.lifeMapCopy[i + 1][j + 1] )
          lifeAroundCount++;
        }

        this.lifeAroundMap[i][j] = lifeAroundCount;
      }
    }
  }


  private setNextLifeMap() {
    for (let i = 0; i < this.numberOfCellOnSide; i++) {
      for (let j = 0; j < this.numberOfCellOnSide; j++) {

        if (this.lifeMapCopy[i][j] == false){
          if(this.lifeAroundMap[i][j] == 3){
            this.nextLifeMap[i][j] = true;
          }
        }  

        if(this.lifeMapCopy[i][j]){
          if(this.lifeAroundMap[i][j] == 2 || this.lifeAroundMap[i][j] == 3){
            this.nextLifeMap[i][j] = true;
          } else{
            this.nextLifeMap[i][j] = false;
          }
        }
      }
    }
  }


  private displayNextLifeMap() {
    
    for (let i = 0; i < this.numberOfCellOnSide; i++) {
      for (let j = 0; j < this.numberOfCellOnSide; j++) {
        let cell = this.getElement(i, j);
        if (this.nextLifeMap[i][j] == true) {
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
