import React, { Component } from 'react'
import axios from '../../axios'

import Post from '../../components/Post/Post'
import FullPost from '../../components/FullPost/FullPost'
import NewPost from '../../components/NewPost/NewPost'
import classes from './Blog.css'

class Blog extends Component {
  state = {
    posts: [],
    selectedPostId: null,
    hasError: false
  }

  componentDidMount () {
    axios.get('/posts')
      .then(response => {
        // console.log(response)
        const posts = response.data.slice(0, 4)
        const updatedPosts = posts.map(post => {
          return {
            ...post,
            author: 'Max'
          }
        })
        this.setState({
          posts: updatedPosts
        })
      })
      .catch(error => {
        console.log('Get all posts error! ', error)
        this.setState({
          hasError: true
        })
      })
  }

  getPostDetailsHandler = id => {
    this.setState({
      selectedPostId: id
    })
  }

  render () {
    let posts = <p style={{textAlign: 'center'}}>Ups, something went wrong!</p>
    if (!this.state.hasError) {
      posts = this.state.posts.map(post => {
        return (
          <Post key={post.id}
            id={post.id}
            title={post.title}
            author={post.author}
            click={this.getPostDetailsHandler}
          />
        )
      })
    }

    return (
      <div>
        <section className={classes.Posts}>
          {posts}
        </section>
        <section>
          <FullPost id={this.state.selectedPostId} />
        </section>
        <section>
          <NewPost />
        </section>
      </div>
    )
  }
}

export default Blog
