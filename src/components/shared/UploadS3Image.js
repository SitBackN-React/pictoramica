import React, { useState } from 'react'
import { uploadS3 } from './../../api/s3upload.js'
import { Image } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import messages from '../AutoDismissAlert/messages'

// import LoadingButton from './../shared/LoadingButton'

const UploadS3Image = (props) => {
  const { msgAlert, history, user } = props
  const [caption, setCaption] = useState('')
  const [tag, setTag] = useState('')
  const [image, setImageCreate] = useState('')
  const [url, setUrl] = useState('')
  const [forSale, setForSale] = useState(false)
  const [price, setPrice] = useState(0)
  // const [isLoading, setIsLoading] = useState(false)

  const hiddenFileInput = React.useRef(null)

  let link = ''
  // React.useEffect(() => {
  //   if (isLoading) {
  //     setTimeout(() => {
  //       setIsLoading(false)
  //     }, 1000)
  //   }
  // }, [isLoading])

  function uploadWithFormData () {
    const formData = new FormData()
    formData.append('caption', caption)
    formData.append('tag', tag)
    formData.append('image', image)
    formData.append('forSale', forSale)
    formData.append('price', price)

    uploadS3('multipart/form-data', formData, user)
      .then(res => {
        link = res.data.image._id
      })
      .then(() => msgAlert({
        heading: 'Image created successfully',
        message: messages.createImageSuccess,
        variant: 'success'
      }))
      .then(() => history.push(`/images/${link}`))
      .catch(error => {
        setCaption('')
        setTag('')
        setPrice(0)
        setForSale(false)
        setImageCreate(null)
        // setIsLoading(false)
        msgAlert({
          heading: 'Image create failed: ' + error.message,
          message: messages.createImageFailure,
          variant: 'danger'
        })
      })
  }

  return (

    <div className='image-create-body'>
      <form onSubmit={uploadWithFormData}>
        <div className="center">
          <div className="left">
            <button
              onClick={() => hiddenFileInput.current.click()}
              className="btn btn-info add-image" type='button'
              style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', borderRadius: '20px' }}>
              Add Image
              <Image className='img-preview' src={url} />
            </button>
            <input
              style={{ display: 'none' }}
              type='file'
              ref={hiddenFileInput}
              onChange={e => {
                setImageCreate(e.target.files[0])
                // setUrl(URL.createObjectURL(e.target.files[0]))
                setUrl(window.URL.createObjectURL(e.target.files[0]))
                // setUrl(window.URL.revokeObjectURL(e.target.files[0]))
              }}
            />
          </div>
          <br />
          <div className="right">
            <div>
              <label>Image Caption: </label>
              <input
                type='text'
                value={caption}
                onChange={e => { setCaption(e.target.value) }}
                placeholder='My sunset painting'
                size="25"
                autoFocus
              />
            </div>
            <br />
            <div>
              <label>Image Tag: </label>
              <input
                type='text'
                value={tag}
                onChange={e => setTag(e.target.value)}
                placeholder='sunset painting'
                size="25"
              />
            </div>
            <br />
            <div>
              <label>For Sale: </label>
              <input
                type='checkbox'
                value={forSale}
                onChange={e => setForSale(true)}
              />
            </div>
            <br />
            <div>
              <label>Price: $</label>
              <input
                type='number'
                value={price}
                onChange={event => setPrice(Number(event.target.value))}
                placeholder='20'
                size="25"
              />
            </div>
            {/* <LoadingButton
              type="submit"
              className="btn btn-primary share"
              isLoading={isLoading}
              onClick={() => setIsLoading(true)}
            >
              Upload
            </LoadingButton> */}
            <button
              type="submit"
              className="btn btn-primary share"
              // isLoading={isLoading}
              // onClick={() => setIsLoading(true)}
            >
              Upload
            </button>
            <Link to='/my-images'>
              <button className="btn btn-danger" style={{ margin: '7px' }}>Cancel</button>
            </Link>
          </div>
        </div>
        <br />
      </form>
    </div>
  )
}

export default UploadS3Image
