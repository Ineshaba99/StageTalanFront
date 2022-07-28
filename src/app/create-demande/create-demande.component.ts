import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../Service/employee.service';
import { TypeDemandeService } from '../Service/type-demande.service';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators,AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-create-demande',
  templateUrl: './create-demande.component.html',
  styleUrls: ['./create-demande.component.css']
})
export class CreateDemandeComponent implements OnInit {
  isVisible: any;
  isSelected: boolean = true;
  TypeDemandeList: any;
  EmployeeList: any;
  form: FormGroup;
  countries: Array<any> = [
    { name: 'India', value: 'india' },
    { name: 'France', value: 'france' },
    { name: 'USA', value: 'USA' },
    { name: 'Germany', value: 'germany' },
    { name: 'Japan', value: 'Japan' }
  ];
  
  constructor(private service : TypeDemandeService, private serviceEmployee : EmployeeService,
    private fb: FormBuilder
    ) {  this.form = fb.group({
      selectedCountries:  new FormArray([])
     });
  }

  ngOnInit(): void {
    
    this.service.getTypeDemandeList().subscribe((data:any)=>{
      this.TypeDemandeList=data;
    }),
    this.serviceEmployee.getEmployeesList().subscribe((data:any)=>{
      this.EmployeeList=data;
    })
  }
  onSubmit(){
    
  }
  onCheckboxChange(event: any) {
    
    const selectedCountries = (this.form.controls['selectedCountries'] as FormArray);
    if (event.target.checked) {
      selectedCountries.push(new FormControl(event.target.value));
    } else {
      const index = selectedCountries.controls
      .findIndex(x => x.value === event.target.value);
      selectedCountries.removeAt(index);
    }
  }

}
