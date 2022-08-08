import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../Service/employee.service';
import { TypeDemandeService } from '../Service/type-demande.service';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators,AbstractControl } from '@angular/forms';
import {DemandeService } from '../Service/demande.service';
import { Demande, Employee, TypeDemande } from '../employee';
import { isNgTemplate } from '@angular/compiler';

@Component({
  selector: 'app-create-demande',
  templateUrl: './create-demande.component.html',
  styleUrls: ['./create-demande.component.css']
})
export class CreateDemandeComponent implements OnInit {
  demande : Demande = new Demande();
  isVisible: any;
  isSelected: boolean = true;
  TypeDemandeList: TypeDemande[];
  employeeList: Employee[];
  employeeListChecked: Employee[]=[];
  form: FormGroup;
  TypeDemande:TypeDemande;
  selectedValue:TypeDemande;
 
  
  constructor(private service : TypeDemandeService,
    private serviceDemande : DemandeService,
    private serviceEmployee : EmployeeService,
    private fb: FormBuilder ) {
        
     
  }

  ngOnInit(): void {
    
    this.service.getTypeDemandeList().subscribe((data:any)=>{
      this.TypeDemandeList=data,
      console.log(data);
    }),
    this.serviceEmployee.getEmployeesList().subscribe((data:any)=>{
      this.employeeList=data;
      console.log(this.employeeList);
    })
  }
  
      onSubmit(){
       console.log(this.selectedValue);
        this.demande.type_Demande=this.selectedValue;
        this.demande.employeeList=this.employeeListChecked;
        console.log(this.demande);
        this.saveDemande();
        
        
      }

      onCheckboxChange(emp : Employee , event: any) {
          console.log(emp);
              if(event.target.checked)
              {
                  if (this.employeeListChecked.includes(emp)) {
                    this.employeeListChecked.splice(this.employeeListChecked.indexOf(emp));
                        } 
                        else {
                          this.employeeListChecked.push(emp);
                          }
              }
              else 
              {
                    this.employeeListChecked.splice(this.employeeListChecked.indexOf(emp));
              }
          
        console.log(this.employeeListChecked);
      }

      saveDemande(){
        this.serviceDemande.createDemande(this.demande).subscribe( () =>{
          console.log("done");
          
        },
        error => console.log(error));
      }

 

      SelectTypeDemande(selectedValue: any , type_Demande :TypeDemande) {
      
        this.selectedValue=this.TypeDemandeList[1];
        
        console.log(this.selectedValue);
      //  console.log(type_Demande);
    }

}
