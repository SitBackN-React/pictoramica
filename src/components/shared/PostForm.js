import React from 'react'
import { Link } from 'react-router-dom'

const PostForm = ({ post, handleSubmit, handleChange, cancelPath }) => (
  <form onSubmit={handleSubmit}>
    <div>
      <label>Blog Post Title</label>
      <input
        placeholder="Ex: What I have to say"
        value={post.title || ''}
        name="title"
        onChange={handleChange}
        size="25"
        autoFocus
      />
    </div>
    <div>
      <label>Content</label>
      <textarea
        placeholder="Ex: My first blog post is about..."
        value={post.content || ''}
        name="content"
        onChange={handleChange}
        cols="25"
        rows="10"
      ></textarea>
    </div>
    <br />
    <button type="submit" className="btn btn-primary">Submit</button>
    <Link to={cancelPath}>
      <button className="btn btn-danger">Cancel</button>
    </Link>
  </form>
)

export default PostForm
