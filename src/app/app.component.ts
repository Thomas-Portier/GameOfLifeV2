import { Component } from '@angular/core';

import * as _ from 'lodash';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // encapsulation: ViewEncapsulation.None
})
export class AppComponent {

  public startButtonclicked = false;
  public pauseButtonclicked = false;
  public lifeMap: boolean[][] = [];
  public nextLifeMap: boolean[][] = [];
  public lifeMapCopy: boolean[][] = [];
  public lifeAroundMap: number[][] = [];
  public numberOfCellOnSide = 70;
  public currentGeneration = 0;
  // public delay = 500; //in milliseconds
  public speed = 1; 
  public delay = 2048; //in milliseconds

  public isGameOver = false;
  public isGamePaused = false;

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
    for (let i = 0; i < this.numberOfCellOnSide * this.numberOfCellOnSide ; i++) {
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
    this.isGameOver = false;
    this.isGamePaused = false;
    this.pauseButtonclicked = false;
    this.currentGeneration = 0;
      this.handleOneLifeCycle();      
  }

  public lifePaused(){
    this.startButtonclicked = false;
    this.isGamePaused = true;
  }


  private handleOneLifeCycle() {


    if(!this.isGamePaused){

      this.setDelayWithSpeedRange();
      this.setCurrentLifeMapCopy();
      this.setLifeAroundMap();
      this.setNextLifeMap();
      this.displayNextLifeMap();
      this.setIsgameOver();

      this.currentGeneration++;
      if(!this.isGameOver){
          setTimeout(() => {
            this.handleOneLifeCycle();
          }, this.delay); 
      } 
    }
  }



  private setCurrentLifeMapCopy() { 

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
    return null;
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
    return null;
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
    return null;
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
    return null;
  }


  private setIsgameOver() {
    if (_.isEqual(this.nextLifeMap, this.lifeMapCopy)) {
      this.isGameOver = true;
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

  private setDelayWithSpeedRange() {
    if (this.speed > 0 && this.speed < 10)
      this.delay = 2048;
    if (this.speed > 10 && this.speed < 20)
      this.delay = 1024;
    if (this.speed > 20 && this.speed < 30)
      this.delay = 512;
    if (this.speed > 30 && this.speed < 40)
      this.delay = 256;
    if (this.speed > 40 && this.speed < 50)
      this.delay = 128;
    if (this.speed > 50 && this.speed < 60)
      this.delay = 64;
    if (this.speed > 60 && this.speed < 70)
      this.delay = 32;
    if (this.speed > 70 && this.speed < 80)
      this.delay = 16;
    if (this.speed > 80 && this.speed < 90)
      this.delay = 8;
    if (this.speed > 90 && this.speed <= 100)
      this.delay = 4;
  }
  


}
