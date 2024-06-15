import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, first } from 'rxjs';
import { User } from 'src/app/models/curUser';
import { IUserFormData } from 'src/app/models/user.model';
import { AlertService } from 'src/app/services/alert.service';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { FormService } from 'src/app/services/form.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public loginForm: FormGroup;
  public disabled: boolean
  public currentUser: User;
  constructor(
    private formBuilder: FormBuilder,   
    private authenticationService: AuthenticationService,
    private router: Router,
    private formService: FormService,
    private alertService: AlertService
    ) { 
        this.loginForm = {} as FormGroup;
        this.disabled = true;
        this.currentUser = {} as User;
    }

  public ngOnInit() {
    this.authenticationService.currentUser.subscribe(user => this.currentUser = user);
    if(this.currentUser){
    this.router.navigate(['/home']);

    }
    this.initializeUsers();
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required,Validators.email]],
      password: ['', Validators.required]
  });
  
  }
  ngDoCheck(): void{
    if(this.loginForm.status ==="VALID"){
      this.disabled = false;
    }
    else{
      this.disabled = true;
    }   
  }

  public initializeUsers(): void{
    this.formService.getUsersDetails().subscribe((res: IUserFormData[])=>{
      localStorage.setItem("users", JSON.stringify(res))
    })   
  }


  get f() { return this.loginForm.controls; }

  public onSubmit(): void{
    this.authenticationService.login(this.f['email'].value, this.f['password'].value)
    .pipe(first(),
     catchError((error: any, caught: any) =>{
      console.log(caught);
      
      this.alertService.error("Invalid Credentials!!!");
      return error;
     }))
    .subscribe(
        data => {
            this.alertService.success("Logged In Successfully.");
            setTimeout(()=>{
              this.router.navigate(['/home']);
            }, 1000);
        });
  }
}