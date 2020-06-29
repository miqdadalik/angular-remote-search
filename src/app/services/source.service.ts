import { Injectable } from "@angular/core";
import { Sources } from '../types/source.type';

@Injectable()

export class SourcesService {
    private sources: Sources
    private storage: any;
    constructor() {
        this.sources = [];
        this.storage = localStorage;
    }

    public getSources() {
        if (this.sources.length) {
            return this.sources;
        } else {
            let lSource = this.storage.getItem('sources');
            if (lSource && lSource != '') {
                try {
                    this.sources = JSON.parse(lSource);
                    return this.sources;
                } catch(e) {
                    return this.defualtSources();
                }
            }
        }

        return this.defualtSources();
    }

    private defualtSources() {
        this.sources.push({
            name: 'Hacker News',
            baseUrl: 'https://hn.algolia.com/api/v1/search?query=',
            returnType: 'json'
        });
        this.sources.push({
            name: 'Wikipedia',
            baseUrl: 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&origin=*&search=',
            returnType: 'json'
        });

        return this.sources;
    }
}