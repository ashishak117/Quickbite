/* src/app/services/upload.service.ts */
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UploadService {
  private api = `${environment.apiUrl}/uploads`;

  constructor(private http: HttpClient) {}

  upload(file: File): Observable<any> {
    const fd = new FormData();
    fd.append('file', file);
    return this.http.post(this.api, fd);
  }
}
