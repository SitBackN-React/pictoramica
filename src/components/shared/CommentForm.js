import React from 'react'
import { Link } from 'react-router-dom'

const CommentForm = ({ comment, handleSubmit, handleChange, cancelPath }) => (
  <form className="comment-list" onSubmit={handleSubmit}>
    <div>
      <textarea
        placeholder="Add comment here..."
        value={comment.remark || ''}
        name="remark"
        onChange={handleChange}
        cols="50"
        rows="5"
      ></textarea>
    </div>
    <br />
    <button type="submit" className="btn btn-primary" style={{ margin: '7px' }}>Submit</button>
    <Link to={cancelPath}>
      <button className="btn btn-danger" style={{ margin: '7px' }}>Cancel</button>
    </Link>
  </form>
)

export default CommentForm
