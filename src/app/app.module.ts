import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router'
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MongodbComponent } from './mongodb/mongodb.component';
import { Neo4jComponent } from './neo4j/neo4j.component';

// Services
import { MongodbService } from './services/mongodb.service';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MongodbComponent,
    Neo4jComponent,
    ToolbarComponent,
    FooterComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot([
       {
          path: '',
          component: HomeComponent
       },
       {
         path: 'mongodb',
         component: MongodbComponent
       },
       {
         path: 'neo4j',
         component: Neo4jComponent
       }
     ]),
    HttpClientModule
  ],
  providers: [MongodbService],
  bootstrap: [AppComponent]
})
export class AppModule { }
