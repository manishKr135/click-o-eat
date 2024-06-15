import { Component, OnInit } from '@angular/core';
import { IUserFormData } from 'src/app/models/user.model';
import { MustMatch } from 'src/app/shared/must-match.validator';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FormService } from 'src/app/services/form.service';
import { catchError, first } from 'rxjs';
import { Router } from '@angular/router';
import { User } from 'src/app/models/curUser';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  public userForm: FormGroup;
  public userDetails: IUserFormData;
  public disabled: boolean;
  public currentUser: User | null;
  
  constructor(
    private formBuilder: FormBuilder,
    private formService: FormService,
    private router: Router,
    private authenticationService: AuthenticationService,
    private alertService: AlertService
     ) {
    this.userForm = {} as FormGroup;
    this.userDetails = {} as IUserFormData
    this.disabled = true;
    this.currentUser = {} as User;
    this.authenticationService.currentUser.subscribe(user => this.currentUser = user);
   }

  public ngOnInit(): void {
    if(this.currentUser){
      this.router.navigate(['/home']);
  
      }
    this.initializeUsers();
    this.initializeUserForm();
   
  }
 
  public initializeUsers(): void{
    this.formService.getUsersDetails().subscribe((res: IUserFormData[])=>{
      localStorage.setItem("users", JSON.stringify(res));
    })
    
  }

  public initializeUserForm():void{
    this.userForm = this.formBuilder.group({
      firstname:['',[Validators.required]],
      lastname:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required, Validators.minLength(6)] ],
      cpassword:['',[Validators.required]],
      disclaimer: [false]
    },{
      validator:MustMatch('password','cpassword')
    })
  }
  
  ngDoCheck(): void{
    if(this.userForm.status ==="VALID" && this.userForm.controls['disclaimer'].value === true){
      this.disabled = false;
    }
    else{
      this.disabled = true;
    }
    
  }

  get userFormControls(){
    return this.userForm.controls;
  }
  public onSubmit(){
     this.userDetails = this.userForm.getRawValue();
     this.formService.sendUserDetails(this.userDetails).pipe(first(),
     catchError((error: any, caught: any) =>{
      this.alertService.error("Email already exists!!!");
      return error;
     }),
     ).subscribe((response: any)=>{
       this.alertService.success("Successfully registered!!!")
       setTimeout(()=>{
         this.router.navigate(['/login']);
       }, 1000);
     }
     );
   
  }

}
