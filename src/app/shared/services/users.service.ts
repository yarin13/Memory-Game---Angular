import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RootObject } from '../models/root-object.model';
import { User } from '../models/user.model';
import { Image } from '../models/images.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private myHttpClient: HttpClient) { 
      this.getUsers();
  }

  public _index = -1;
  public rootObject: RootObject = new RootObject();
  public _firstImages:string[] = [];
  public images:Image[] = [];


  public getUsers() {
      this.myHttpClient
          .get<RootObject>("https://reqres.in/api/users?page=2")
          .subscribe(
              res => {
                this.rootObject.data = res.data;
                for(let j = 0; j < 2; j++){
                  for(let i = 0; i < res.data.length; i++)
                  {
                    let currImage:Image = {};
                    this._firstImages.push(res.data[i].avatar);
                    currImage.avatar = res.data[i].avatar;
                    currImage.id = res.data[i].id;
                    currImage.clicked = false;
                    currImage.paired = false;
                    currImage.serialNumber = (j+1) * (i+1);
                    this.images.push(currImage);
                  }
                }

              },
              err=>{console.log(err)}
          )
  }

  public get userData():User[]{
    return this.rootObject.data;
  }

  public get firstImages():Image[]{
    return this.images;
  }




}
