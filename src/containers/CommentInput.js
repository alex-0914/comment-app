import React, { Component } from 'react';
import CommentInput from '../components/CommentInput';
import PropTypes from 'prop-types';
import { addComment } from '../reducers/comments';
import { connect } from 'react-redux';

class CommentInputContainer extends Component {

  static propTypes = {
    comments: PropTypes.array,
    onAddComment: PropTypes.func
  }

  constructor() {
    super() 
    this.state = {
      username: ''
    }
  }

  componentWillMount() {
    this._loadUsername()
  }

  _loadUsername() {
    let username = localStorage.getItem('username')
    if (username) {
      this.setState({
        username
      })
    }
  }



  handleSubmitComment(comment) {
    if (!comment) return 
    if (!comment.username) return alert('No username')
    if (!comment.content) return alert('No Content')
    const { comments } = this.props
    const newComments = [
      ...comments,
      comment
    ]
    localStorage.setItem('comments', JSON.stringify(newComments));
    if (this.props.onSubmit) {
      this.props.onSubmit(comment)
    }
  }


  _saveUsername(username) {
    localStorage.setItem('username', username)
  }

  render() {
    return (
      <CommentInput 
        username={this.state.username}
        onSubmit={this.handleSubmitComment.bind(this)}
        onUsernameInputBlur={this._saveUsername.bind(this)}
      />
    )
  }
}

const mapStateToProps = (state) => {
  return {
    comments: state.comments
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onSubmit: (comment) => dispatch(addComment(comment))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentInputContainer)