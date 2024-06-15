import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/curUser';
import { IUserFormData } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-user-add-payment-details',
  templateUrl: './user-add-payment-details.component.html',
  styleUrls: ['./user-add-payment-details.component.css']
})
export class UserAddPaymentDetailsComponent implements OnInit {

  public userForm: FormGroup;
  public userDetails: IUserFormData;
  public currentUser: User;
  public updatedDetails: any;
  public disabled: boolean;
  public edit: boolean;
  public months: number[];
  public years: number[];
  constructor(
    private formBuilder: FormBuilder,
    private formService: FormService,
    private authenticationService: AuthenticationService,
    
  ) {
    this.userForm = {} as FormGroup;
    this.currentUser = {} as User;
    this.userDetails = {} as IUserFormData
    this.disabled = true;
    this.edit = false;
    this.months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    this.years = [2022, 2023, 2024, 2025, 2026, 2027, 2028, 2029, 2030]
   }

  ngOnInit(): void {
    this.authenticationService.currentUser.subscribe(user => this.currentUser = user);

    this.initializeUserForm();
    
    
  }
  

  public initializeUserForm():void{
   
    this.userForm =  this.formBuilder.group({
      name:["",[Validators.required]],
      cardNo:["",[Validators.required, Validators.minLength(16)]],
      month:["",[Validators.required]], 
      year:["",[Validators.required] ],
      cvv:["",[Validators.required, Validators.minLength(3), Validators.minLength(3)] ],
    })
    
  }
  public formReset(): void{
    
    this.userFormControls['name'].setValue("");
    this.userFormControls['cardNo'].setValue("");
    this.userFormControls['month'].setValue("Month");
    this.userFormControls['year'].setValue("Year");
    this.userFormControls['cvv'].setValue("");
  }

  public onAddCard():void{
    this.updatedDetails = this.userForm.getRawValue();
   
    this.formService.updateUser(this.currentUser.id, {payment:[this.updatedDetails]}).subscribe((res:any)=>{
     localStorage.setItem('currentUser', JSON.stringify({
       id:res.id,
       firstname: res.firstname,
       lastname: res.lastname,
       email: res.email,
       address: res.address? res.address:[],
       payment: res.payment? res.payment: []
     })) 
     this.authenticationService.currentUserUpdate = {
      id:res.id,
      firstname: res.firstname,
      lastname: res.lastname,
      email: res.email,
      address: res.address? res.address:[],
      payment: res.payment? res.payment: []
    }    
    })
    this.formService.getUsersDetails().subscribe((res: IUserFormData[])=>{
      localStorage.setItem("users", JSON.stringify(res))
    })
    this.toggleEdit();
  }
  ngDoCheck(): void{
    
    if(this.userForm.status ==="VALID"){
      this.disabled = false;
    }
    else{
      this.disabled = true;
    }
  }

  public toggleEdit(): void{
    this.edit = !this.edit
  }
  
  get userFormControls(){
    return this.userForm.controls;
  }
  public onSubmit():void{
   
  }
}
