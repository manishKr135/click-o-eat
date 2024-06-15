import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/curUser';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  public currentUser: User;
  constructor(
    private authenticationService: AuthenticationService,
  ) { 
    this.currentUser = {} as User;
    this.authenticationService.currentUser.subscribe(user => this.currentUser = user);
  }

  ngOnInit(): void {
    this.authenticationService.currentUser.subscribe(user => this.currentUser = user);
  }

}
