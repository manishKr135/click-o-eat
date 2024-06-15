import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/curUser';
import { IUserFormData } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormService } from 'src/app/services/form.service';


@Component({
  selector: 'user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  public userForm: FormGroup;
  public userDetails: IUserFormData;
  public currentUser: User;
  public updatedDetails: any;
  public disabled: boolean;
  public edit: boolean;
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
   }

  ngOnInit(): void {
    this.authenticationService.currentUser.subscribe(user => this.currentUser = user);
    this.initializeUserForm();
   
  }
  

  public initializeUserForm():void{ 
    this.userForm =  this.formBuilder.group({
      firstname:[this.currentUser.firstname,[Validators.required]],
      lastname:[this.currentUser.lastname,[Validators.required]],
      email:[this.currentUser.email,[Validators.required,Validators.email]], 
      password:["",[Validators.required, Validators.minLength(6)] ],
    })
    
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
    this.updatedDetails = this.userForm.getRawValue();
    this.updatedDetails['cpassword'] = this.updatedDetails['password'];
    this.formService.updateUser(this.currentUser.id, this.updatedDetails).subscribe((res:any)=>{
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
}
