import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './modules/home/home.component';
import { SourcesService } from './services/source.service';
import { HeaderComponent } from './modules/header/header.component';
import { SearchService } from './services/search.service';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        HeaderComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule
    ],
    providers: [
        SourcesService,
        SearchService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
