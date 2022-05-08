import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  getProducts() {
    return this.httpClient.get<any>(environment.config.BaseUrl + 'getProducts')
  }
  getProductById(values: any): Observable<any> {
    return this.httpClient.post(environment.config.BaseUrl + 'getProductById', values);
  }
  addProduct(values: FormData): Observable<any> {
    return this.httpClient.post(environment.config.BaseUrl + 'addProduct', values);
  }
  updateProduct(values: any): Observable<any> {
    return this.httpClient.post(environment.config.BaseUrl + 'updateProduct', values);
  }
  deleteProduct(values: any): Observable<any> {
    return this.httpClient.post(environment.config.BaseUrl + 'deleteProduct', values);
  }
}
