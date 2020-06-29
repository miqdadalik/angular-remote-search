import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Parse } from './parse.service';
import { Source } from '../types/source.type';

@Injectable()

export class SearchService extends Parse {
    constructor(
        private http: HttpClient
    ) {
        super();
    }

    performSearch(queryUrl: string, headers?: any) {

        return this.http.get(queryUrl, {
            headers: headers
        });
    }

    parseResponse(response: any) {
        this.setResponse(response);
        return this;
    }
}
