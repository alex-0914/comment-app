import React, { Component } from 'react';
import PropTypes from "prop-types";
class Comment extends Component {
  static propTypes = {
    comment: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    onDeleteComment: PropTypes.func.isRequired
  }

  constructor(props) {
    super(props);
    this.state = {
      timeString: ""
    }
  }

  componentWillMount() {
    this._updateTimeString();
    this._timer = setInterval(
      this._updateTimeString.bind(this),
      5000
    );
  }

  componentWillUnmount() {
    clearInterval(this._timer);
  }

  _updateTimeString() {
    const { comment } = this.props;
    new Date()
    const duration = (+Date.now() - comment.createdTime) / 1000;
    this.setState({
      timeString: duration > 60
        ? `${Math.round(duration/60)}分钟前`
        : `${Math.round(Math.max(duration, 1))}秒钟前`
    });
  }

  _getProccessedContent(content) {
    return content
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;")
      .replace(/`([\s\S]+?)`/g, "<code>$1</code>")
  }

  handleDeleteComment() {
    if (this.props.onDeleteComment) {
      this.props.onDeleteComment(this.props.index);
    }
  }

  render() {
    const { comment } = this.props;
    const { timeString } = this.state;
    return (
      <div className="comment">
        <div className="comment-user">
          <span>{comment.username}&nbsp;:&nbsp;</span> 
        </div>
        <p className="comment-content"
          dangerouslySetInnerHTML={{
            __html: this._getProccessedContent(comment.content)
          }}
        />
        <span className="comment-createtime">
          { timeString }
        </span>
        <p className="comment-delete" onClick={this.handleDeleteComment.bind(this)}>
          Delete
        </p>
      </div>
    )
  }
}

export default Comment;