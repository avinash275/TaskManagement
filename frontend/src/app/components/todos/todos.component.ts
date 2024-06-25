// import { Component,OnInit } from '@angular/core';
// import { Task } from '../../Task';
// import { HttpClient, HttpClientModule } from '@angular/common/http';
// import { CommonModule } from '@angular/common';
// import { TodoItemComponent } from '../todo-item/todo-item.component';
// import { AddTodoComponent } from '../add-todo/add-todo.component';

// @Component({
//   selector: 'app-todos',
//   standalone: true,
//   imports: [CommonModule,TodoItemComponent,AddTodoComponent,HttpClientModule],
//   templateUrl: './todos.component.html',
//   styleUrl: './todos.component.css',
// })
// export class TodosComponent {
//   todos: Task[] = [];
  
//   localItem:string='';
//   constructor() {
    
//     if (typeof localStorage !== 'undefined') {
//       const item = localStorage.getItem('todos');
//       this.localItem = item !== null ? item : '';
//       this.todos = this.localItem ? JSON.parse(this.localItem) : [];
//     }
//   }
  
//   todoDelete(todo:Task){
//     console.log(todo);
//     const index=this.todos.indexOf(todo);
//     this.todos.splice(index,1);
//     localStorage.setItem("todos",JSON.stringify(this.todos))
//   }
//   todoAdd(todo:Task){
//     console.log(todo);
//     this.todos.push(todo)
//     localStorage.setItem("todos",JSON.stringify(this.todos))
//   }

//   toggleTodo(todo:Task){
//     const index=this.todos.indexOf(todo);
//     this.todos[index].active=!this.todos[index].active;
//     localStorage.setItem("todos",JSON.stringify(this.todos))
//   }
  
// }

import { Component,OnInit } from '@angular/core';
import { Task } from '../../Task';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { TodoItemComponent } from '../todo-item/todo-item.component';
import { AddTodoComponent } from '../add-todo/add-todo.component';

// @Component({
//   selector: 'app-todos',
//   standalone: true,
//   imports: [CommonModule, TodoItemComponent, AddTodoComponent, HttpClientModule],
//   templateUrl: './todos.component.html',
//   styleUrl: './todos.component.css'
// })
// export class TodosComponent implements OnInit {
//   todos: Task[] = [];

//   constructor(private http: HttpClient) {} 

//   ngOnInit(): void {
//     this.fetchTasks();
//   }

//   fetchTasks() {
//     this.http.get<Task[]>('http://localhost:3000/tasks')
//       .subscribe(tasks => {
//         console.log(tasks)
//         this.todos = tasks; 
//       }, error => {
//         console.error('Error fetching tasks:', error);
//       });
//   }

//   // todoDelete(todo: Task) {
//   //   console.log(todo); 
//   //   this.http.delete('http://localhost:3000/tasks')
//   //     .subscribe(() => {
//   //       const index = this.todos.indexOf(todo);
//   //       if (index !== -1) {
//   //         this.todos.splice(index, 1); 
//   //       }
//   //     }, error => {
//   //       console.error('Error deleting task:', error);
//   //     });
//   // }

//   todoDelete(todo: Task) {
//     this.http.delete(`http://localhost:3000/tasks/${todo.id}`)
//       .subscribe(() => {
//         const index = this.todos.findIndex(t => t.id === todo.id);
//         if (index !== -1) {
//           this.todos.splice(index, 1);
//         }
//       });
//   }

//   // todoAdd(todo: Task) {
//   //   console.log(todo); 
//   //   this.http.post<Task>('http://localhost:3000/tasks', todo)
//   //     .subscribe(newTask => {
//   //       this.todos.push(newTask); 
//   //     }, error => {
//   //       console.error('Error adding task:', error);
//   //     });
//   // }

//   generateUniqueId() {
//     const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
//     let id = '';
//     for (let i = 0; i < 10; i++) {
//       id += chars.charAt(Math.floor(Math.random() * chars.length));
//     }
//     return id;
//   }

//   todoAdd(todo: Task) {
//     todo.id = this.todos.length+1; // Assuming generateUniqueId function
//     this.http.post<Task>('http://localhost:3000/tasks', todo)
//       .subscribe(newTask => this.todos.push(newTask));
//       this.fetchTasks();
//   }
  

//   // toggleTodo(todo: Task) {
//   //   const index = this.todos.indexOf(todo);
//   //   if (index !== -1) {
//   //     this.todos[index].active = !this.todos[index].active;

//   //     this.http.put('http://localhost:3000/tasks', { ...todo, active: !todo.active })
//   //       .subscribe(() => console.log('Task updated successfully'), error => {
//   //         console.error('Error updating task:', error);
//   //       });
//   //   }
//   // }

//   toggleTodo(todo: Task) {
//     todo.active = !todo.active;
//     this.http.put(`http://localhost:3000/tasks/${todo.id}`, todo)
//       .subscribe();
//   }
//   updateTodo(todo: Task) {
//     const index = this.todos.indexOf(todo);
//     if (index !== -1) {
//       this.todos[index].active = !this.todos[index].active;

//       this.http.put('http://localhost:3000/tasks', { ...todo })
//         .subscribe(() => console.log('Task updated successfully'), error => {
//           console.error('Error updating task:', error);
//         });
//     }
//   }
// }



@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [CommonModule, TodoItemComponent, AddTodoComponent, HttpClientModule],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.css'
})
export class TodosComponent implements OnInit {
  todos: Task[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getTasks();
  }

  getTasks() {
    this.http.get<Task[]>('https://taskmanagementapplicationbackend-1.onrender.com/tasks')
      .subscribe(tasks => this.todos = tasks);
  }

  todoAdd(todo: Task) {
    this.http.post<Task>('https://taskmanagementapplicationbackend-1.onrender.com/tasks', todo)
      .subscribe(newTask => this.todos.push(newTask));
  }

  todoDelete(todo: Task) {
    this.http.delete(`https://taskmanagementapplicationbackend-1.onrender.com/tasks/${todo.id}`)
      .subscribe(() => {
        const index = this.todos.findIndex(t => t.id === todo.id);
        if (index !== -1) {
          this.todos.splice(index, 1);
        }
      });
  }

  toggleTodo(todo: Task) {
    todo.active = !todo.active;
    this.http.put(`https://taskmanagementapplicationbackend-1.onrender.com/tasks/${todo.id}`, todo)
      .subscribe();
  }
}
