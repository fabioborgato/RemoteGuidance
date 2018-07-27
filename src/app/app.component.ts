import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { OnlineService } from './online.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

    constructor(private online: OnlineService) {}
    ngOnInit() {
      this.online.joint();
    }

}
