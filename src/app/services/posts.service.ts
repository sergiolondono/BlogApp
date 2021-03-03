import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  data: any;
  endpoint = environment.APIEndpoint + 'Posts';

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  private extractData(res: Response) {
    let body = res;
    return body || { };
  }

  getPostsPublished() {
     return this.http.get(this.endpoint + '/published/all').pipe(
        map(this.extractData));
    }

  getPosts(rol) {
      return this.http.get(this.endpoint + '/' + rol).pipe(
        map(this.extractData));
    }
    
  savePosts(postDB) {
    var postInfo = JSON.stringify(postDB);  
    return this.http.post(this.endpoint, postInfo, this.httpOptions);
  }

  updatePost(idPost, postDB){
    console.log(idPost, postDB);
    var postInfo = JSON.stringify(postDB);
    return this.http.put(this.endpoint + '/' + idPost, postInfo, this.httpOptions);
  }

  deletePost(idPost){
    return this.http.delete(this.endpoint + '/' + idPost, this.httpOptions);
  }

}
