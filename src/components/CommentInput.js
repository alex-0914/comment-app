import React, { Component } from 'react'
import PropTypes from 'prop-types'

class CommentInput extends Component {

  static propTypes = {
    username: PropTypes.any,
    onSubmit: PropTypes.func,
    onUsernameInputBlur: PropTypes.func
  }

  static defaultProps = {
    username: ''
  }

  constructor(props) {
    super(props)
    this.state = {
      username: props.username, // get username from props
      content: '',
    }
  }

  // autofocus textarea
  componentDidMount() {
    this.textarea.focus()
  }

  handleUsernameBlur(event) {
    if (this.props.onUsernameInputBlur) {
      this.props.onUsernameInputBlur(event.target.value)
    }
  }

  handleUsernameChange(event) {
    this.setState({
      username: event.target.value,
    })
  }

  handleContentChange(event) {
    this.setState({
      content: event.target.value,
    })
  }

  handleSubmit() {
    if (this.props.onSubmit) {
      const { username, content } = this.state
      this.props.onSubmit({ 
        username, 
        content,
        createdTime: +new Date()
      })
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
              onChange={this.handleContentChange.bind(this)}
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
