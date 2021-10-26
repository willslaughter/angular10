import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  readonly APIUrl="http://localhost:49625/api";
  readonly PhotoUrl = "http://http://localhost:49625/Photos"

  constructor(private http:HttpClient) { }

  getMovList():Observable<any[]> {
    return this.http.get<any>(this.APIUrl+'/movie');
  }

  UploadPhoto(val:any) {
    return this.http.post(this.APIUrl+'/movie/SaveFile',val)
  }

  getAllMovieNames():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl+'/movie')
  }

  updateMovList(val:any) {
    return this.http.put<any>(this.APIUrl+'/movie', val);
  }

  deleteMovList(val:any) {
    return this.http.delete<any>(this.APIUrl+'/movie' +val);
  }

  getAllMovie():Observable<any[]>{
    return this.http.get<any[]>(this.APIUrl+'/movie/')
  }
}
