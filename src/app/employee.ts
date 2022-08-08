
export class Employee {
    id : number;
    firstName : string;
    lastName : string;
    emailId : string;
    cin : string;
    numPasseport : string;
}
export class TypeDemande {
    id : number;
    nomTypeDemande : string;
   
}


export class Demande {
    id : number;
    employeeList : Employee[];
    type_Demande : TypeDemande;
    files : File[];

}
export class FileInfo {
    id : number;
    name : string;
    url : string;
    demande_id : number;

}