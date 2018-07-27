import { Component, OnInit, Input} from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FileUploadService } from '../../file-upload.service';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-post-registration',
  templateUrl: './post-registration.component.html',
  styleUrls: ['./post-registration.component.css']
})
export class PostRegistrationComponent implements OnInit {
    userData = {
      phone: '',
      company: ''
    };
  // data: any;

  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;

  downloadURL: Observable<string>;

  id = localStorage.getItem('userID');

  constructor(private http: HttpClient, private router: Router, private storage: AngularFireStorage) { }

  ngOnInit() {  }

  completeRegistration() {

      this.http.post('http://localhost:3000/auth/user/completeRegistration/' + this.id, this.userData).subscribe(resp => {
          // this.data = resp;
          this.router.navigate(['/user/dashboard']);
     }, err  => {
          console.log('errore');
          //  this.router.navigate(['auth/user/login']);
          this.router.navigate(['/user/dashboard']);
    });

  }

  upload(event) {

    const self = this;
    this.ref = this.storage.ref(this.id);
    this.task = this.ref.put(event.target.files[0]);
    this.downloadURL = this.ref.getDownloadURL();

    this.task.then((snapshot) => {

              snapshot.ref.getDownloadURL().then(function(url) {
                        const photoURL = url;
                        console.log('File available at', photoURL);

                        self.http.post('http://localhost:3000/auth/user/uploadPhoto/' + self.id, {photoURL: photoURL}).subscribe(resp => {
                            console.log(photoURL);
                        }, err  => {
                        console.log('errore');
                        });
              });

    });
  }

}
