import { Source } from '../types/source.type';

export class Parse {
    private response: any;
    private returnResponse: any;
    private searchSource: Source;
    constructor() {}

    setResponse(response) {
        this.response = response;
        console.log(this.response);
        return this;
    }

    getResult(searchIn: Source) {
        this.searchSource = searchIn;
        if (searchIn.returnType) {
            switch (searchIn.returnType) {
                case 'json':
                    return this.parseJson();
                case 'xml':
                    //let xmlDom = this.parseXml();
                    //convert xml2json
                    break;
            }
        }
    }

    private parseJson() {
        switch(this.searchSource.name) {
            case 'Hacker News':
                return this.parseHackerNews();
            case 'Wikipedia':
                return this.parseWikiPedia();
            default:
                return this.parseUnknow();
        }

        return [];
    }

    private parseWikiPedia() {
        this.returnResponse = [];
        if (this.response.length ===4) {
            this.response[1].forEach((element, index) => {
                this.returnResponse.push({
                    title: element,
                    url: this.response[3][index] ? this.response[3][index] : ''
                })
            });
        }
        return this.returnResponse;
    }

    private parseHackerNews() {
        if (this.response && this.response.hits && this.response.hits.length) {
            return this.response.hits;
        }

        return [];
    }

    private parseUnknow() {
        return [];
    }


    // private parseXml(xml) {
    //     var dom = null;
    //     if (window.DOMParser) {
    //        try { 
    //           dom = (new DOMParser()).parseFromString(xml, "text/xml"); 
    //        } 
    //        catch (e) { dom = null; }
    //     }
    //     else if (window.ActiveXObject) {
    //        try {
    //           dom = new ActiveXObject('Microsoft.XMLDOM');
    //           dom.async = false;
    //           if (!dom.loadXML(xml)) // parse error ..
     
    //              window.alert(dom.parseError.reason + dom.parseError.srcText);
    //        } 
    //        catch (e) { dom = null; }
    //     }
    //     else
    //        alert("cannot parse xml string!");
    //     return dom;
    // }
}