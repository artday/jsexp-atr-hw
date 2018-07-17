import {Component, OnInit, } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {

  value:string='';

  constructor(private router: Router, private route: ActivatedRoute){}


  search(){
    if(this.value.length>3) {
      this.router.navigate(['/films/search'], { queryParams: { q: this.value } });
    }
    if(!this.value) {
      this.router.navigate(['/films/search']);
    }
  };

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.value = params['q']? params['q']: '';
    })
  }

}
