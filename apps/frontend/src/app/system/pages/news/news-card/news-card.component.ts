import {Component, Input} from '@angular/core';
import {News} from "@maorix-contract/types";

@Component({
  selector: 'maorix-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.css'],
})
export class NewsCardComponent {

  @Input() news: News;

  constructor() {}
}
