import { Component, OnInit } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { CommentsService } from '../../services/comments.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  data;
  showTxtComment: boolean = false;
  
  constructor(private postsService: PostsService,
    private commentsService: CommentsService) { }

  ngOnInit(): void {
    this.getPostsPublished();
  }

  SaveComment(itemPost, idText){
    var comment =(<HTMLInputElement>document.getElementsByName(idText+itemPost.id)[0]).value;
    this.commentsService.saveComments(itemPost.id, comment).subscribe((data: {}) => {   
      (<HTMLInputElement>document.getElementsByName(idText+itemPost.id)[0]).value = "";
      this.showTxtComment = !this.showTxtComment;
      window.alert("Comment added!");
    });
  }

  getPostsPublished() {    
    this.postsService.getPosts('non')  
    .subscribe((data: {}) => {
      this.data = [];
      this.data = data;
      
      console.log(data);
    });
  }

  ActivateField(itemPost) {
    this.showTxtComment = !this.showTxtComment;
    }

}
