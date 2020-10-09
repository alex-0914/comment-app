import React, { Component } from 'react';

export default (WrappedComponent, name) => {
  class LocalStorageActions extends Component {
    constructor() {
      super()
      this.state = {
        data: null
      }
    }

    componentWillMount() {
      let data = localStorage.getItem(name);
      try {
        this.setState({
          data: JSON.parse(data)
        })
      } catch(e) {
        this.setState({ data })
      }
    }

    savaData(data) {
      try {
        localStorage.setItem(name, JSON.stringify(data))
      } catch(e) {
        localStorage.setItem(name, `${data}`)
      } 
    }

    render() {
      return (
        <WrappedComponent
          data={this.state.data}
          savaData={this.savaData.bind(this)}
          {...this.props}
        />
      )
    }

  }

  return LocalStorageActions

}