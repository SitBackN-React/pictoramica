import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

import AuthenticatedRoute from './components/AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from './components/AutoDismissAlert/AutoDismissAlert'
import Header from './components/Header/Header'

// User
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'
import SignOut from './components/SignOut/SignOut'
import ChangePassword from './components/ChangePassword/ChangePassword'

// HomePage
import HomePage from './components/routes/HomePage'

// Images
import UploadS3Image from './components/routes/ImageCreate'
import AllImages from './components/routes/AllImages'
import MyImages from './components/routes/MyImages'
import Image from './components/routes/Image'
import ImageTag from './components/routes/ImageTag'
import EditS3Image from './components/routes/ImageEdit'

// Blogs
import BlogCreate from './components/routes/BlogCreate'
import AllBlogs from './components/routes/AllBlogs'
import MyBlogs from './components/routes/MyBlogs'
import Blog from './components/routes/Blog'
import BlogEdit from './components/routes/BlogEdit'

// Posts
import PostCreate from './components/routes/PostCreate'
import Post from './components/routes/Post'
import PostPublic from './components/routes/PostPublic'
import PostEdit from './components/routes/PostEdit'

// Comments
import CommentCreate from './components/routes/CommentCreate'
import CommentDelete from './components/routes/CommentDelete'

// Cart
import Cart from './components/routes/Cart'

// Text Editor
import TextEditor from './components/routes/TextEditor'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: null,
      msgAlerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  deleteAlert = (id) => {
    this.setState((state) => {
      return { msgAlerts: state.msgAlerts.filter(msg => msg.id !== id) }
    })
  }

  msgAlert = ({ heading, message, variant }) => {
    const id = uuid()
    this.setState((state) => {
      return { msgAlerts: [...state.msgAlerts, { heading, message, variant, id }] }
    })
  }

  render () {
    const { msgAlerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {msgAlerts.map(msgAlert => (
          <AutoDismissAlert
            key={msgAlert.id}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
            id={msgAlert.id}
            deleteAlert={this.deleteAlert}
          />
        ))}
        <AuthenticatedRoute user={user} path='/home-page' render={(props) => (
          <HomePage {...props} msgAlert={this.msgAlert} user={user} />
        )} />
        <main className="container">
          {/* User Account */}
          <Route path='/sign-up' render={() => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={user} />
          )} />

          {/* Images */}
          <AuthenticatedRoute user={user} path='/post-image' render={(props) => (
            <UploadS3Image
              {...props}
              msgAlert={this.msgAlert}
              setImage={this.setImage}
              user={user} />
          )} />
          <AuthenticatedRoute user={user} exact path='/my-images' render={() => (
            <MyImages msgAlert={this.msgAlert} user={user}/>
          )} />
          <AuthenticatedRoute user={user} exact path='/images/:imageId/edit-image' render={(props) => (
            <EditS3Image {...props} msgAlert={this.msgAlert} user={user}/>
          )} />
          <AuthenticatedRoute user={user} exact path='/images/:imageId' render={(props) => (
            <Image {...props} msgAlert={this.msgAlert} user={user}/>
          )} />
          <AuthenticatedRoute user={user} exact path='/all-images' render={(props) => (
            <AllImages {...props} msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/all-images/tag' render={(props) => (
            <ImageTag {...props} msgAlert={this.msgAlert} user={user} />
          )} />

          {/* Blogs */}
          <AuthenticatedRoute user={user} exact path='/create-blog' render={() => (
            <BlogCreate msgAlert={this.msgAlert} user={user}/>
          )} />
          <AuthenticatedRoute user={user} exact path='/all-blogs' render={(props) => (
            <AllBlogs {...props} msgAlert={this.msgAlert} user={user}/>
          )} />
          <AuthenticatedRoute user={user} exact path='/blogs/:blogId' render={(props) => (
            <Blog {...props} msgAlert={this.msgAlert} user={user}/>
          )} />
          <AuthenticatedRoute user={user} exact path='/my-blogs' render={(props) => (
            <MyBlogs {...props} msgAlert={this.msgAlert} user={user}/>
          )} />
          <AuthenticatedRoute user={user} exact path='/blogs/:blogId/edit-blog' render={(props) => (
            <BlogEdit {...props} msgAlert={this.msgAlert} user={user}/>
          )} />

          {/* Posts */}
          <AuthenticatedRoute user={user} exact path='/blogs/:blogId/create-post' render={(props) => (
            <PostCreate {...props} msgAlert={this.msgAlert} user={user}/>
          )} />
          <AuthenticatedRoute user={user} exact path='/blogs/:blogId/posts/:postId' render={(props) => (
            <Post {...props} token={this.state.user ? this.state.user.token : null} msgAlert={this.msgAlert} user={user}/>
          )} />
          <AuthenticatedRoute user={user} exact path='/blogs/:blogId/posts/:postId/post-public' render={(props) => (
            <PostPublic {...props} token={this.state.user ? this.state.user.token : null} msgAlert={this.msgAlert} user={user}/>
          )} />
          <AuthenticatedRoute user={user} exact path='/blogs/:blogId/posts/:postId/edit-post' render={(props) => (
            <PostEdit {...props} msgAlert={this.msgAlert} user={user}/>
          )} />

          {/* Comments */}
          <AuthenticatedRoute user={user} exact path='/blogs/:blogId/posts/:postId/comment-create' render={(props) => (
            <CommentCreate {...props} msgAlert={this.msgAlert} user={user}/>
          )} />
          <AuthenticatedRoute user={user} exact path='/blogs/:blogId/posts/:postId/comment-delete' render={(props) => (
            <CommentDelete {...props} msgAlert={this.msgAlert} user={user}/>
          )} />

          {/* Cart */}
          <AuthenticatedRoute user={user} path='/cart' render={(props) => (
            <Cart {...props} msgAlert={this.msgAlert} user={user} />
          )} />

          {/* Text Editor */}
          <AuthenticatedRoute user={user} exact path='/text-editor' render={(props) => (
            <TextEditor {...props} msgAlert={this.msgAlert} user={user}/>
          )} />

        </main>
      </Fragment>
    )
  }
}

export default App
