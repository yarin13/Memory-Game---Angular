import { Component } from '@angular/core';
import { UsersService } from '../shared/services/users.service';
import { RootObject } from '../shared/models/root-object.model';
import {User} from '../shared/models/user.model'
import {Image} from '../shared/models/images.model'
import { isNgContainer } from '@angular/compiler';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {

myRootObject: RootObject;
public rows:number[] = [1,2,3,4];
public cols:number[] = [1,2,3];
public _randArr:number[] = [];
public disableFuncFlag:boolean = false;
public secFlag:boolean = false;
public showImg:boolean = false;
public firstImg:Image;
public secImg:Image;
public steps:number = 0;
public pairs:number = 0;
public _timer: number = 0;
public interval;
public timerFlag:boolean = false;

constructor(private myUsersService: UsersService) {
  this.newGame();
 }

 
 public newGame():void{
   this.pauseTimer();
  this.myUsersService.getUsers(); 
  this._randArr = [];
  this._randArr = this.randArr;
  this.steps = 0;
  this._timer = 0;
  this.timerFlag = false;
  this.disableFuncFlag = false;
  
  
}


  public get photosArr():Image[]{
    return this.myUsersService.firstImages;
  }

  public get randArr():number[]{
    while(this._randArr.length < 12){
      let randNum = Math.floor(Math.random() * 12) ; 
      if(!(this._randArr.includes(randNum))){
        this._randArr.push(randNum); 
      }  
    }
    return this._randArr;
  }


  public imageClicked(image:Image):void{

    if(!this.timerFlag)
    {
      this.timerFlag = true;
      this.startTimer();
    }

    if(!this.disableFuncFlag){

      //if no photo was clicked
      if(this.firstImg == undefined || !this.firstImg.clicked){
        console.log("first image just clicked "+ image.serialNumber);
        this.firstImg = image;
        this.firstImg.id = image.id;
        this.firstImg.clicked = true;
      }
      
      //if first photo already clicked
      else  if(this.firstImg != undefined && this.firstImg.clicked && this.firstImg.serialNumber != image.serialNumber)
      {
        console.log("second image just clicked "+ image.serialNumber);
        this.secImg = image;
        this.secImg.id = image.id;
        this.secImg.clicked = true;
        this.disableFuncFlag = true;
        console.log("this.firstImg.id "+this.firstImg.id);
        console.log("this.secImg.id "+this.secImg.id);
        this.steps +=1;
        setTimeout(()=>{this.checkEquality(this.firstImg,this.secImg);},1000);
      }

    }
    return;
  
  }
  public checkEquality(first:Image,sec:Image):void{
    console.log("checkEqulity() "+ first.id);

    if(first.id == sec.id){
      first.paired = true;
      sec.paired = true;
      this.pairs++;
      if(this.pairs == 6)
        this.pauseTimer();
    }
      first.clicked= false;
      sec.clicked = false;

    this.disableFuncFlag= false;
  }

  startTimer() {
    this.interval = setInterval(() => {
      this._timer++
    },1000)
  }

  pauseTimer() {
    clearInterval(this.interval);
  }
  public get timer():number{
    return this._timer;
  }
  
}