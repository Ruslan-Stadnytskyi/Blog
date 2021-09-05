import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";
import {ActivatedRoute, Params, Router} from "@angular/router";
import {delay} from "rxjs/operators";

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {
  flag:boolean=false
  form: FormGroup|any
  message:string|undefined

  constructor(public auth:AuthService, private router:Router,private route:ActivatedRoute) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe((param:Params)=>{
     if(param['loginAgain']){
       this.message = 'Спочатку увійдіть'
     }
    })
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required,Validators.minLength(6)])
    })
    console.log(this.form)
  }
submit(){

  if(this.form.invalid){
    return
  }

  const user={
    email:this.form.value.email,
    password:this.form.value.password
  }
  this.flag=true;
  console.log(this.flag)
  this.auth.login(user).pipe(delay(200))
    .subscribe(()=>{
    this.form.reset()
    this.router.navigate(['admin','dashboard'])
      this.flag=false;
    console.log(this.flag)
  }, ()=> {
      this.flag=false;
    })



}
}
