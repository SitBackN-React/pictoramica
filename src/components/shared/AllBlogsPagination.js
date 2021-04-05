import React from 'react'

const AllBlogsPagination = ({ blogsPerPage, totalBlogs, paginate }) => {
  const pageNumbers = []
  for (let i = 1; i <= Math.ceil(totalBlogs / blogsPerPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <nav>
        <ul className="pagination">
          {pageNumbers.map(number => (
            <li className="page-item" key={number}>
              <a onClick={() => paginate(number)} href="#all-blogs" className="page-link">{number}</a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default AllBlogsPagination
