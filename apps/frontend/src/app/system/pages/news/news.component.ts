import { Component } from '@angular/core';
import {news} from "./mock-data/news";

@Component({
  selector: 'maorix-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.css'],
})
export class NewsComponent {
  MOCK_NEWS = news;
  constructor() {}
}
