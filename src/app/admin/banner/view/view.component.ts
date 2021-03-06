import { Component, OnInit,ViewContainerRef } from '@angular/core';
import { BannerService } from '../../../service/banner.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import {Location} from '@angular/common';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {

  banners:any;
  count:any;
  url:any;
  constructor(private service:BannerService,
    private http: HttpClient,
    private router: Router,private _location: Location,
    public toastr: ToastsManager, vcr: ViewContainerRef) { this.toastr.setRootViewContainerRef(vcr); }

  ngOnInit() {
    this.url=environment.apiUrl;
    this.service.getCount().subscribe(res => {
      this.count = res;
     
    });
    this.service.getContent().subscribe(res => {
      this.banners = res;
      if(this.banners.length==0){
        this.router.navigate(['admin/banner/add']);
       }
    });
    if (sessionStorage['SuccessMessage']) {
      this.toastr.success( sessionStorage.getItem("SuccessMessage"));
      sessionStorage.clear();
   }
    

   if (sessionStorage['ErrorMessage']) {
    this.toastr.error( sessionStorage.getItem("ErrorMessage"));
    sessionStorage.clear();
 }
  }

  getContent() {
    this.service.getContent().subscribe(res => {
      this.banners = res;
      if(this.banners.length==0){
        this.router.navigate(['admin/banner/add']);
       }
    });
  }
 
  deleteBanner(id) {
    this.service.deletePage(id).subscribe(data=>{
      if(data.success) {
        this.toastr.info(data.msg);  
        this.getContent();
        this.service.getCount().subscribe(res => {
          this.count = res;
         
        });
        this.router.navigate(['admin/banner/view']);
        window.scrollTo(0, 0);
       }
      if(data.error) {
        window.scrollTo(0, 0);
        this.toastr.error(data.msg);
      }
    });
}



}
