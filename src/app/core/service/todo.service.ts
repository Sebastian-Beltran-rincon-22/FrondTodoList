import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Item } from 'src/app/shared/models/item';
import id from 'date-fns/locale/id';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }

  public getTask(url:string){
    return this.http.get(url); // GET http://localhost:3000/post
  }

  public postTask(url:string, item:any){
    return this.http.post(url,item)
  }
  public deleteTask(url:string){
    return this.http.delete(url)
  }
  public updateTask(url:string, id:any){
    return this.http.patch(url,id)
  }
}
