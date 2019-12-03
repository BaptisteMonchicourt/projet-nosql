import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs'

interface myData {
  success: boolean,
  data: any
}

@Injectable({
  providedIn: 'root'
})
export class MongodbService {

  constructor(private http: HttpClient) { }

  getData(): Observable<myData> {
    return this.http.get<myData>('/api/data');
  }

  getDataFromName(entryName, limit) {
    // Add safe, URL encoded search parameter if there is a search term
    const options = { params: new HttpParams().set('EntryName', entryName).set('limit', limit) };
    return this.http.get<myData>('/api/data-from-name', options);
  }

  getDataFromEntry(entry, limit) {
    // Add safe, URL encoded search parameter if there is a search term
    const options = { params: new HttpParams().set('Entry', entry).set('limit', limit) };
    return this.http.get<myData>('/api/data-from-entry', options);
  }

  getDataFromKeywords(keywords, limit) {
    // Add safe, URL encoded search parameter if there is a search term
    const options = { params: new HttpParams().set('Keywords', keywords).set('limit', limit) };
    return this.http.get<myData>('/api/data-from-keywords', options);
  }

  getDataFromProteinNames(proteinNames, limit) {
    // Add safe, URL encoded search parameter if there is a search term
    const options = { params: new HttpParams().set('ProteinNames', proteinNames).set('limit', limit) };
    return this.http.get<myData>('/api/data-from-protein-names', options);
  }

  getDataFromGeneNames(geneNames, limit) {
    // Add safe, URL encoded search parameter if there is a search term
    const options = { params: new HttpParams().set('GeneNames', geneNames).set('limit', limit) };
    return this.http.get<myData>('/api/data-from-gene-names', options);
  }

  getDataFromOrganism(organism, limit) {
    // Add safe, URL encoded search parameter if there is a search term
    const options = { params: new HttpParams().set('Organism', organism).set('limit', limit) };
    return this.http.get<myData>('/api/data-from-organism', options);
  }

  getDataFromAdvanced(data, limit) {
    // Add safe, URL encoded search parameter if there is a search term
    var params = new HttpParams().set('limit', limit);

    if (data.EntryName) {
      params = params.append("EntryName", data.EntryName);
    }
    if (data.Entry) {
      params = params.append("Entry", data.Entry);
    }
    if (data.Keywords) {
      params = params.append("Keywords", data.Keywords);
    }
    if (data.ProteinNames) {
      params = params.append("ProteinNames", data.ProteinNames);
    }
    if (data.GeneNames) {
      params = params.append("GeneNames", data.GeneNames);
    }
    if (data.Organism) {
      params = params.append("Organism", data.Organism);
    }

    console.log(params);

    const options = { params: params };
    return this.http.get<myData>('/api/data-from-advanced', options);
  }
}
