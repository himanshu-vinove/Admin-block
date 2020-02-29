export interface UDescription{
    
    id:number;
    name:string;
    age:number;
    contact:number;
    address:string;
    email:string;
    bio:string;
    
}
export class Description implements UDescription {
   
    id:number;
    name:string;
    age:number;
    contact:number;
    address:string;
    email:string;
    bio:string;

    constructor(name?:string,age?:number,contact?:number,address?:string,email?:string,bio?:string){
        
        this.name = name;
        this.age = age;
        this.contact = contact;
        this.address = address;
        this.email = email;
        this.bio = bio;
    }
}



