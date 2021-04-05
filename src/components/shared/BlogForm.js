import React from 'react'
import { Link } from 'react-router-dom'

const BlogForm = ({ blog, handleSubmit, handleChange, cancelPath }) => (
  <form onSubmit={handleSubmit} style={{ color: 'white', fontSize: '20px', fontWeight: '200px', paddingLeft: '100px' }}>
    <label>Blog Title</label>
    <div>
      <input
        placeholder="My thoughts"
        value={blog.title}
        name="title"
        onChange={handleChange}
        size="50"
        style={{ borderRadius: '5px' }}
        autoFocus
      />
    </div>
    <br />
    <label>Blog Description</label>
    <div>
      <textarea
        placeholder="A blog about my life experiences."
        value={blog.description}
        name="description"
        onChange={handleChange}
        rows="3"
        cols="50"
        style={{ borderRadius: '5px' }}
      />
    </div>
    <br />
    <div>
      <label>Select Background Color</label>
      <br />

      <label className="bordercolor-choice">Blue
        <input
          type="radio"
          value={'primary'}
          name="borderColor"
          onChange={handleChange}
        />
        <span className="check" style={{ backgroundColor: '#3386FF' }}></span>
      </label>

      <label className="bordercolor-choice">Green
        <input
          type="radio"
          value={'success'}
          name="borderColor"
          onChange={handleChange}
        />
        <span className="check" style={{ backgroundColor: '#76D52C' }}></span>
      </label>

      <label className="bordercolor-choice">Red
        <input
          type="radio"
          value={'danger'}
          name="borderColor"
          onChange={handleChange}
        />
        <span className="check" style={{ backgroundColor: 'red' }}></span>
      </label>

      <label className="bordercolor-choice">Yellow
        <input
          type="radio"
          value={'warning'}
          name="borderColor"
          onChange={handleChange}
        />
        <span className="check" style={{ backgroundColor: '#F6E343' }}></span>
      </label>

      <label className="bordercolor-choice">Turquoise
        <input
          type="radio"
          value={'info'}
          name="borderColor"
          onChange={handleChange}
        />
        <span className="check" style={{ backgroundColor: '#2EBEC1' }}></span>
      </label>

      <label className="bordercolor-choice">Light Gray
        <input
          type="radio"
          value={'light'}
          name="borderColor"
          onChange={handleChange}
        />
        <span className="check" style={{ backgroundColor: 'lightGray' }}></span>
      </label>

      <label className="bordercolor-choice">Dark Gray
        <input
          type="radio"
          value={'dark'}
          name="borderColor"
          onChange={handleChange}
        />
        <span className="check" style={{ backgroundColor: '#6D6F6C' }}></span>
      </label>
    </div>
    <br />
    <button type="submit" className="btn btn-primary" style={{ margin: '7px' }}>Submit</button>
    <Link to={cancelPath}>
      <button className="btn btn-danger">Cancel</button>
    </Link>
  </form>
)

export default BlogForm
