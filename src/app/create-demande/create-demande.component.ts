import { Component, OnInit } from '@angular/core';
import { TypeDemandeService } from '../Service/type-demande.service';

@Component({
  selector: 'app-create-demande',
  templateUrl: './create-demande.component.html',
  styleUrls: ['./create-demande.component.css']
})
export class CreateDemandeComponent implements OnInit {

  TypeDemandeList: any;
  
  constructor(private service : TypeDemandeService) { }

  ngOnInit(): void {
    this.service.getTypeDemandeList().subscribe((data:any)=>{
      this.TypeDemandeList=data;
    })
  }
  onSubmit(){
    
  }

}
