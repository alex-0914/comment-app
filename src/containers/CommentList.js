import React, { Component } from 'react';
import CommentList from '../components/CommentList';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteComment, initComments } from '../reducers/comments';

class CommentListContainer extends Component {

  static propTypes = {
    comments: PropTypes.array,
    onDeleteComments: PropTypes.func,
    onInitComments: PropTypes.func
  }

  componentWillMount() {
    let comments = localStorage.getItem('comments');
    comments = comments ? JSON.parse(comments) : [];
    this.props.onInitComments(comments);
  }

  handleDeleteComments(index) {
    const { comments } = this.props
    const newComments = [
      ...comments.slice(0, index),
      ...comments.slice(index+1)
    ]
    localStorage.setItem('comments', JSON.stringify(newComments))
    if (this.props.deleteComment) {
      this.props.deleteComment(index);
    }
  }

  render() {
    return <CommentList 
      comments={this.props.comments}
      onDeleteComments={this.handleDeleteComments.bind(this)} 
    />
  }

}

const mapStateToProps = (state) => {
  return {
    comments: state.comments
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onDeleteComments: (commentIndex) => {
      dispatch(deleteComment(commentIndex))
    },
    onInitComments: (comments) => {
      dispatch(initComments(comments))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentListContainer)