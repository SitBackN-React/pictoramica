import React from 'react'

const MyImagesPagination = ({ imagesPerPage, totalImages, paginate }) => {
  const pageNumbers = []
  for (let i = 1; i <= Math.ceil(totalImages / imagesPerPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <nav>
        <ul className="pagination">
          {pageNumbers.map(number => (
            <li className="page-item" key={number}>
              <a onClick={() => paginate(number)} href="#my-images" className="page-link">{number}</a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  )
}

export default MyImagesPagination
