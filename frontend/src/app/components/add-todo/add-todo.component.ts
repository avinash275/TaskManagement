import { Component,EventEmitter,Output,Input } from '@angular/core';
import { Task } from '../../Task';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-todo',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './add-todo.component.html',
  styleUrl: './add-todo.component.css'
})
export class AddTodoComponent {
  title:string=''
  description:string=''
  id:number=1
  
  @Output() todoAdd:EventEmitter<Task>=new EventEmitter();
  onSubmit(){
    const todo={
      id:this.id,
      title:this.title,
      desc:this.description,
      active:true
    }
    this.todoAdd.emit(todo)
  }

}
