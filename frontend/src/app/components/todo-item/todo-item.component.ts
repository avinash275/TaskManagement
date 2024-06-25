import { Component, Input,EventEmitter, Output } from '@angular/core';
import { Task } from '../../Task';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './todo-item.component.html',
  styleUrl: './todo-item.component.css'
})
export class TodoItemComponent {
  @Input() todo!: Task;
  @Input() i !:number;

  @Output() todoDelete:EventEmitter<Task>=new EventEmitter();
  @Output() todoCheckbox:EventEmitter<Task>=new EventEmitter();
  onClick(todo:Task){
    this.todoDelete.emit(todo)
    console.log("onClick has been Triggered");
  }
  onCheckBoxClick(todo:Task){
    this.todoCheckbox.emit(todo)
  }
}
