import { Component, OnInit } from '@angular/core';
import { ProfileService} from '../appservice/profile.service'

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
prof:any;
  constructor(private profService:ProfileService ) { }

  ngOnInit() {
    this.profService.getprofile().subscribe(res=>(this.prof=res))
    // console.log(this.prof);
  }


}
