import { Component } from "@angular/core";
import { FormBuilder, Form, FormControl, FormGroup, Validators } from '@angular/forms';
import { Sources, Source } from 'src/app/types/source.type';
import { SourcesService } from 'src/app/services/source.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})

export class HomeComponent {
    public searchForm: FormGroup;
    public searchSources: Sources;
    public results: any;
    public searching: boolean;
    public searchDone: boolean;
    public searchObj: any;
    constructor(
        private fb: FormBuilder,
        private sourceService: SourcesService,
        private searchService: SearchService
    ) {
        this.searching = false;
        this.searchDone = false;
        this.createForm();
        this.getSources();
    }

    public doSearch() {
        if (this.searchForm.value && this.searchForm.value.searchQ
            && this.searchForm.value.source) {
            let searchIn: Source = this.searchSources.find((item) => {
                return item.name === this.searchForm.value.source;
            });
            if (searchIn && searchIn.baseUrl) {
                this.searchObj = {
                    searchQ: this.searchForm.value.searchQ,
                    source: this.searchForm.value.source
                };
                this.searching = true;
                let searchUrl = searchIn.baseUrl + this.searchForm.value.searchQ;
                this.searchService
                    .performSearch(searchUrl)
                    .subscribe(
                        (response) => {
                            this.results = this.searchService
                                .parseResponse(response)
                                .getResult(searchIn);
                            this.searching = false;
                            this.searchDone = true;
                        },
                        error => {
                            console.log(error);
                            this.searching = false;
                        }
                    )

            }
        }
    }

    private createForm() {

        this.searchForm =this.fb.group({
            searchQ: new FormControl('', Validators.required),
            source: new FormControl('', Validators.required)
        });
    }

    private getSources() {
        this.searchSources = this.sourceService
            .getSources();
    }
}
