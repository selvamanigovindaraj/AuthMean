import { Component, OnInit } from '@angular/core';
import { LoginService} from '../appservice/login.service';
import { Router} from '@angular/router'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMessage: String;
  constructor(private _dataService:LoginService,
              private route:Router ) { }

  ngOnInit() {
  }
  createUser(value){
    this._dataService.login(value)
    .subscribe(
      () => this.gotoview()
    )
  }
  gotoview(){
    this.route.navigateByUrl('/profile')
  }

}
