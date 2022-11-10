import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NewsRoutingModule } from './news-routing.module';
import { NewsComponent } from './news.component';
import { NewsCardComponent } from './news-card/news-card.component';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";

@NgModule({
  declarations: [NewsComponent, NewsCardComponent],
  imports: [CommonModule, NewsRoutingModule, MatCardModule, MatButtonModule, MatIconModule],
  exports: [
    NewsCardComponent
  ]
})
export class NewsModule {}
