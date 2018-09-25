import { Component, OnInit } from '@angular/core';

import { FormsModule, NgForm } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'gt-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css']
})
export class CadastroComponent implements OnInit {


  constructor(private angularFire: AngularFireDatabase, private afAuth: AngularFireAuth) { }

  ngOnInit() {
    
  }    
  
  form_submit(f: NgForm) {
  this.angularFire.list("Dispositivos").push(
      {
        email: f.controls.email.value,
        dispId: f.controls.dispId.value,
        latitude: -8.059010760184787,
        longitude: -34.872234793572446
      }
      ).then((t: any) => console.log('dados gravados: ' + t.key)),
      (e: any) => console.log(e.message);
      f.controls.email.setValue('');
      f.controls.dispId.setValue('');
  }

}
