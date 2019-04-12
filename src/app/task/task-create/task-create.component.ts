import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, FormArray } from '@angular/forms';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css']
})
export class TaskCreateComponent implements OnInit {
  personsForm: FormGroup;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.personsForm = this.fb.group({
      persons: this.fb.array([])
    });
  }

  onSubmit() {
    alert(JSON.stringify(this.personsForm.value));
  }

  addPerson() {
    (<FormArray>this.personsForm.get('persons')).push(this.fb.group({
      name: []
    }));
  }

  get persons() {
    return (<FormArray>this.personsForm.get('persons')).controls;
  }

  removePerson(i) {
    (<FormArray>this.personsForm.get('persons')).removeAt(i);
  }
}
