import { Component } from '@angular/core';
import { Item } from './item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'todo';

  currentDate: Date = new Date();

  //ToDo: Eliminar esta lista al momento de integrar la API
  filter: "all" | "active" | "done" = "all"



  allItems = [
    {description: "dormir",done:true,date:"20/03/2023"},
  ]
  get items() {
    if (this.filter === "all"){
      return this.allItems
    }
    return this.allItems.filter((item)=>{
      this.filter ==="done" ? item.done : !item.done
    })
  }

  addItem(description:string,date:any){
    this.allItems.unshift({
      description,
      done:false,
      date:date
    })
    this.currentDate = new Date();

  }

  removeItem(item:Item){
    this.allItems.splice(this.allItems.indexOf(item),1)
  }

  updateItem(newvalue:string,oldtvalue:string,newdate:string): void {
    const index = this.allItems.findIndex((item) => item.description === oldtvalue);
    if (index !== -1) {
      this.allItems[index] = {description:newvalue,done:false,date:newdate};

      }
    }
}
