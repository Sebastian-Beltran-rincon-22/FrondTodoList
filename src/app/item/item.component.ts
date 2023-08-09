import { Component, Input } from '@angular/core';
import { Item } from '../shared/models/item';
import { TodoService } from '../core/service/todo.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent {

  constructor(private TodoService: TodoService){

  }
  @Input() Item!: Item


  updateItem(title: string, desc: string, responsable: string, date: string, _id:string):void {
    const updatedTask ={
      todo: title,
      description: desc,
      responsible: responsable,
      dueData: date,
      done: false,
    }
    this.TodoService.updateTask(`https://todolist-vp6o.onrender.com/todo/update/${_id}`, updatedTask)
    .subscribe((data:any) => {
      console.log(data)
      this.Item = data
    });
  }

  deleteItem(id: string) {
    this.TodoService.deleteTask(`https://todolist-vp6o.onrender.com/todo/delete/${id}`)
    .subscribe((response) =>{
      console.log(response)
    });
  }
}
