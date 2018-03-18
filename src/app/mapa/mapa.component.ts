import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { FirebaseListObservable } from "angularfire2/database-deprecated";
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'gt-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent implements OnInit {

  dispositivos: Observable<any[]>;
  item:string;

  
  constructor(private angularFire: AngularFireDatabase, private afAuth: AngularFireAuth, private router: Router) {
    this.dispositivos = angularFire.list("Dispositivos").valueChanges();
  }

  ngOnInit() {
  }

  form_disp(f:NgForm){       
    this.item = f.controls.dispId.value;
  }
}
