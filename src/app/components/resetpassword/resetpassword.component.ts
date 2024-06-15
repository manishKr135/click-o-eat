import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, first, map } from 'rxjs';
import { IUserFormData } from 'src/app/models/user.model';
import { AlertService } from 'src/app/services/alert.service';
import { FormService } from 'src/app/services/form.service';
import { MustMatch } from 'src/app/shared/must-match.validator';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
  public userDetail: IUserFormData
  public isFound: boolean;
  public  forgetPassForm: FormGroup;
  public disabled: boolean;
  public rdisabled: boolean;
  
  constructor(
    private formService: FormService, 
    private formBuilder: FormBuilder,
    private router: Router,
    private alertService: AlertService
    ) { 
    this.userDetail = {} as IUserFormData;
    this.isFound = false;
    this.disabled = true;
    this.rdisabled = true;
    this.forgetPassForm = {} as FormGroup;
   
  }

  ngOnInit(): void {
    this.forgetPassForm = this.formBuilder.group({
      email: ['', [Validators.required,Validators.email]],
      password:['',[Validators.required, Validators.minLength(6)] ],
      cpassword:['',[Validators.required]],
  },{
    validator:MustMatch('password','cpassword')
  });
  
  
  
  }

  ngDoCheck(): void{
    if(this.forgetPassForm.controls['email'].status ==="VALID"){
      this.disabled = false;
    }
    else{
      this.disabled = true;
    }
    if(this.forgetPassForm.status ==="VALID"){
      this.rdisabled = false;
    }
    else{
      this.rdisabled = true;
    }
    
  }

  get f() { return this.forgetPassForm.controls; }

  public forgotPassword(): void{ 
    this.getUserDetail(this.f['email'].value);
  }

  public getUserDetail(email: string): void{
    this.formService.getUsersDetailsByEmail(email).pipe(map((user: any)=>{
      return user[0];
    })
    ).subscribe((res: any)=>{
     
      
      this.userDetail = res;
      if(this.userDetail){
        this.alertService.success("User found!!!");
        this.isFound = true;
       }
       else{
         this.alertService.error("User doesn't found!!!");
         this.isFound = false
       }
       setTimeout(()=>{
        this.alertService.clear();
       },5000)
    })
  }

  public resetpassword(): void{
    this.formService.updateUser
    (
      this.userDetail.id, {"password": this.f['password'].value, "cpassword": this.f['cpassword'].value}
    )
    .subscribe((res: any)=>{
      this.alertService.success("Password successfully changed!!!");
      setTimeout(()=>{
        this.router.navigate(['/login']);  
       },1000)
    })
      
  }
     
}
