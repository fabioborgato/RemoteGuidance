import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FileUploadService } from '../../file-upload.service';
import { AngularFireStorage, AngularFireStorageReference, AngularFireUploadTask } from 'angularfire2/storage';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-add-intervento',
  templateUrl: './add-intervento.component.html',
  styleUrls: ['./add-intervento.component.css']
})
export class AddInterventoComponent implements OnInit {

  intervento = {
      title: '',
      description: '',
      duration: Number,
      date: Date
  };


  ref: AngularFireStorageReference;
  task: AngularFireUploadTask;

  downloadURL: Observable<string>;

  id = localStorage.getItem('userID');

  nFiles = 0;

  httpOptions = {
    headers: new HttpHeaders({ 'Authorization': localStorage.getItem('jwtToken') })
  };

  constructor(private http: HttpClient, private router: Router, private storage: AngularFireStorage) { }

  ngOnInit() {
  }

  cancel() {
    console.log('cancel');
    this.router.navigate(['admin/interventi']);
  }

  upload(event) {
    console.log('upload triggered');
    this.nFiles = event.target.files.length;
    // for (let i = 0; i < event.target.files.length; i++) {
    //   console.log('object ' + i + event.target.files[i].name);
    // }

    const self = this;
    this.ref = this.storage.ref('/upload/' + this.id);
    this.task = this.ref.put(event.target.files[0]);
    this.downloadURL = this.ref.getDownloadURL();

    this.task.then((snapshot) => {

          try {
                        snapshot.ref.getDownloadURL().then(function(url) {
                          console.log('File available at', url);

                        // tslint:disable-next-line:max-line-length
                        // self.http.post('http://localhost:3000/auth/user/uploadPhoto/' + self.id, {photoURL: photoURL}).subscribe(resp => {
                        //               console.log(photoURL);
                        //           }, err  => {
                        //           console.log('errore');
                        //           });
                        });
          } catch (e) {
            console.log(e);
          }


    });
  }

  save() {
    console.log(this.intervento);

    this.http.post('http://localhost:3000/admin/intervento', {intervento: this.intervento}, this.httpOptions).subscribe(resp => {
                console.log(resp);
                this.router.navigate(['admin/interventi']);
            }, err  => {
                console.log(err);
    });
  }

}
