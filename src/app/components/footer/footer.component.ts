import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/curUser';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  public date: any;
  public currentUser: User
  constructor(
    private authenticationService: AuthenticationService
  ) {
    this.currentUser = {} as User;
   }

  public ngOnInit(): void {
    this.authenticationService.currentUser.subscribe((user) => {
      this.currentUser = user;
    });
    this.date = new Date();
    setInterval(()=>{
      this.date = new Date();
    }, 1000);
  }

}
