import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TaskDashboardComponent } from './task-dashboard/task-dashboard.component';
import { TaskCreateComponent } from './task-create/task-create.component';
import { TaskEditComponent } from './task-edit/task-edit.component';
import { TaskDeleteComponent } from './task-delete/task-delete.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [TaskDashboardComponent, TaskCreateComponent, TaskEditComponent, TaskDeleteComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ToastrModule.forRoot(),
    RouterModule.forChild([
        { path: 'Dashboard', component: TaskDashboardComponent },
        { path: 'createTask', component: TaskCreateComponent }
    ])
  ]
})
export class TaskModule { }
