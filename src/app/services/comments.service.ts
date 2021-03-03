import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CommentsService {

   httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  endpoint = environment.APIEndpoint + 'Comments';
  
  constructor(private http: HttpClient) { }

  saveComments(postId: string, comment: string) {
    let commentData = {
      PostId: postId,
      Comment: comment
    };
    var commentInfo = JSON.stringify(commentData);

    return this.http.post(this.endpoint, commentInfo, this.httpOptions);
  }

}
