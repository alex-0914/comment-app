import React, { Component } from 'react';
import CommentInput from './CommentInput';
import CommentList from './CommentList';

class CommentApp extends Component {
  constructor() {
    super();
    this.state = {
      comments: []
    }
  }


  handleSubmitComment(comment) {
    if (!comment) return;
    if (!comment.username) return alert("Please input username");
    if (!comment.content) return alert("Please input content");
    const { comments } = this.state;
    comments.push(comment)
    this.setState({
      comments
    })
  }

  render() {
    const { comments } = this.state;
    return (
      <div className="wrapper">
        <CommentInput onSubmit={this.handleSubmitComment.bind(this)}/>
        <CommentList comments={comments}/>
      </div>
    )
  }
}

export default CommentApp;