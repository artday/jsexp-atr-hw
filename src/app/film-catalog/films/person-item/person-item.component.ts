import {Component, OnInit, Input, SimpleChanges, OnChanges} from '@angular/core';
import {ImageService} from "../../../services/image.service";

@Component({
  selector: 'person-item',
  templateUrl: './person-item.component.html',
  styleUrls: ['./person-item.component.css']
})
export class PersonItemComponent implements OnChanges{
  imgType = 'profile';
  imgSize = 'sl';

  indexImg:string;

  @Input('data1') person;

  constructor(private imgService: ImageService){}

  ngOnChanges(changes: SimpleChanges): void {
    this.indexImg = this.imgService.indexImgUrl(this.imgType, this.imgSize, this.person['profile_path']);
  }

  get name(){ return this.person.name; }
  get popularity(){ return <number>this.person.popularity.toFixed(2); }
}
