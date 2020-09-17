import React, { Component } from 'react'
import PropTypes from 'prop-types'

class CommentInput extends Component {

  static propTypes = {
    onSubmit: PropTypes.func.isRequired,
  }

  constructor() {
    super()
    this.state = {
      username: '',
      content: '',
    }
  }

  componentWillMount() {
    this._loadUsername();
  }

  componentDidMount() {
    this.textarea.focus()
  }


  _saveUsername(username) {
    localStorage.setItem('username', username)
  }

  _loadUsername() {
    let username = localStorage.getItem("username");
    if(username) {
      this.setState({
        username
      })
    }
  }

  handleUsernameChange(event) {
    this.setState({
      username: event.target.value,
    })
  }

  handleUsernameBlur(event) {
    this._saveUsername(event.target.value)
  }

  handleCommentChange(event) {
    this.setState({
      content: event.target.value,
    })
  }

  handleSubmit(event) {
    if (this.props.onSubmit) {
      const { username, content } = this.state
      this.props.onSubmit({ username, content })
    }
    this.setState({
      content: '',
    })
  }

  render() {
    return (
      <div className="comment-input">
        <div className="comment-field">
          <span className="comment-field-name">UserName:</span>
          <div className="comment-field-input">
            <input
              value={this.state.username}
              onChange={this.handleUsernameChange.bind(this)}
              onBlur={this.handleUsernameBlur.bind(this)}
            />
          </div>
        </div>
        <div className="comment-field">
          <span className="comment-field-name">Comment:</span>
          <div className="comment-field-input">
            <textarea
              ref={(textarea) => (this.textarea = textarea)}
              value={this.state.content}
              onChange={this.handleCommentChange.bind(this)}
            />
          </div>
        </div>
        <div className="comment-field-button">
          <button onClick={this.handleSubmit.bind(this)}>Publish</button>
        </div>
      </div>
    )
  }
}

export default CommentInput
