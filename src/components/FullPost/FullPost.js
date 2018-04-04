import React, { Component } from 'react'
import axios from 'axios'

import classes from './FullPost.css'

class FullPost extends Component {
  state = {
    id: null,
    title: '',
    body: '',
    author: ''
  }

  componentDidUpdate () {
    if (this.props.id) {
      if (!this.state.id || (this.state.id && this.state.id !== this.props.id)) {
        axios.get('/posts/' + this.props.id)
          .then(response => {
            // console.log('[FullPost] get response: ', response)
            let post = {...response.data}
            post.author = 'Max'
            this.setState({
              ...post
            })
          })
      }
    }
  }

  removePostHandler = () => {
    axios.delete('/posts/' + this.props.id)
      .then(response => {
        console.log('[FullPost] delete response: ', response)
      })
  }

  render () {
    let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>
    if (this.props.id) {
      post = <p style={{textAlign: 'center'}}>Loading...!</p>
    }
    if (this.state.id) {
      post = (
        <div className={classes.FullPost}>
          <h1>{this.state.title}</h1>
          <p>{this.state.body}</p>
          <div className={classes.Edit}>
            <button
              className={classes.Delete}
              onClick={this.removePostHandler}>
              Delete
            </button>
          </div>
        </div>
      )
    }
    return post
  }
}

export default FullPost
