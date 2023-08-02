import { Component } from '@angular/core';
import { Item } from './shared/models/item';
import { TodoService } from './core/service/todo.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {

  constructor(private TodoService:TodoService){

  }
  title = 'todo';
  public allItem: any = []
  currentDate: Date = new Date();

  //ToDo: Eliminar esta lista al momento de integrar la API
  filter: "all" | "active" | "todo" = "all"
ngOnInit():void{
  this.loadData();
  }
  public loadData(){
    this.TodoService.getTask('https://todolist-vp6o.onrender.com/todo/')
    .subscribe(response =>{
      console.log (response)
      this.allItem = response;
    })
}
  addItem(description:string,dueData:Date | null,todo:string,responsible:string){
    const newTask = {
      description: description,
      done:false,
      dueData: new Date(),
      todo: todo,
      responsible: responsible,
    }
    this.allItem.unshift(newTask)
    this.currentDate = new Date();
    console.log(newTask)
    this.TodoService.postTask("https://todolist-vp6o.onrender.com/todo/create",newTask)
    .subscribe(data =>{
      console.log (data)
    })
  }
  get items() {
    if (this.filter === "all"){
      return this.allItem
    }
    return this.allItem.filter((item:Item)=>{
      this.filter ==="todo" ? item.todo : !item.todo
    })
  }
  deleteItem(item:Item){
    this.allItem.splice(this.allItem.indexOf(item),1)
  }

  updateItem(description:string,dueData:Date | null,todo:string,responsible:string,oldvalue:string): void {
    const index = this.allItem.findIndex((item:any) => item.todo === oldvalue);
    if (index !== -1) {
      this.allItem[index] = {
        description: description,
        done:false,
        dueData: dueData,
        todo: todo,
        responsible: responsible,
      };
      this.TodoService.deleteTask("https://todolist-vp6o.onrender.com/todo/delete/:id",this.allItem[index])
      this.TodoService.updateTask("https://todolist-vp6o.onrender.com/todo/update/:id",this.allItem[index])
      }
    }
}

