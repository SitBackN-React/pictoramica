import React, { useState, useEffect } from 'react'
import { uploadS3 } from './../../api/s3upload.js'
import { Link } from 'react-router-dom'
import { Image } from 'react-bootstrap'
import axios from 'axios'
import apiUrl from '../../apiConfig'
// import ImageForm from '../shared/ImageForm'
import ForSale from './ForSale'
import LoadingButton from './../shared/LoadingButton'
import messages from './../AutoDismissAlert/messages'

function EditS3Image (props) {
  const [caption, setCaption] = useState('')
  const [tag, setTag] = useState('')
  const [image, setImage] = useState('')
  const [url, setUrl] = useState('')
  const [price, setPrice] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const hiddenFileInput = React.useRef(null)
  let link = ''

  // const [image, setImage] = useState({
  //   tag: '',
  //   caption: '',
  //   imageUrl: '',
  //   forSale: false
  // })
  // const [updated, setUpdated] = useState(false)
  // const { msgAlert } = props
  //  functions like a componentDidMount
  useEffect(() => {
    axios({
      url: `${apiUrl}/images/${props.match.params.imageId}`,
      method: 'GET',
      headers: {
        'Authorization': `Token token=${props.user.token}`
      }
    })
      .then(res => {
        setImage(res.data.image)
        console.log(res.data.image)
        return res
      })
      .catch(console.error)
  }, [])

  // const handleChange = event => {
  //   event.persist()
  //   setImage(prevImage => {
  //     const updatedField = { [event.target.name]: event.target.value }
  //     const editedImage = Object.assign({}, prevImage, updatedField)
  //     return editedImage
  //   })
  // }
  //
  // const handleSubmit = event => {
  //   event.preventDefault()
  //   axios({
  //     url: `${apiUrl}/images/${props.match.params.imageId}`,
  //     method: 'PATCH',
  //     headers: {
  //       'Authorization': `Token token=${props.user.token}`
  //     },
  //     data: { image }
  //   })
  //     .then(() => setUpdated(true))
  //     // .catch(console.error)
  //     .then(() => msgAlert({
  //       heading: 'Edited Image',
  //       message: messages.editImageSuccess,
  //       variant: 'success'
  //     }))
  //     .catch(error => {
  //       setImage({
  //         tag: '',
  //         caption: '',
  //         imageUrl: '',
  //         forSale: false })
  //       msgAlert({
  //         heading: 'Failed to update ' + error.message,
  //         message: messages.editImageFailure,
  //         variant: 'danger'
  //       })
  //     })
  // }

  // if (updated) {
  //   return <Redirect to={`/images/${props.match.params.imageId}`} />
  // }

  React.useEffect(() => {
    if (isLoading) {
      setTimeout(() => {
        setIsLoading(false)
      }, 1000)
    }
  }, [isLoading])

  function uploadWithFormData () {
    const formData = new FormData()
    formData.append('caption', caption)
    formData.append('tag', tag)
    formData.append('image', image)
    formData.append('price', price)

    const { msgAlert, history, setImage, user } = props
    uploadS3('multipart/form-data', formData, user)
      .then(res => {
        setImage(res.data.image)
        link = res.data.image._id
      })
      .then(() => msgAlert({
        heading: 'Image created successfully',
        message: messages.createImageSuccess,
        variant: 'success'
      }))
      .then(() => history.push((`/images/${link}`)))
      .catch(error => {
        setCaption('')
        setTag('')
        setPrice('')
        setImage(null)
        setIsLoading(false)
        msgAlert({
          heading: 'Image update failed: ' + error.message,
          // message: messages.createImageFailure,
          variant: 'danger'
        })
      })
  }

  return (

    <div className='image-create-body'>
      <form onSubmit={uploadWithFormData}>
        <div className="center">
          <div className="left">
            <img src={image.imageUrl} className="img-preview"/>
            <button
              onClick={() => hiddenFileInput.current.click()}
              className="btn btn-info add-image" type='button'>
              Update Image
            </button>
            <input
              style={{ display: 'none' }}
              type='file'
              ref={hiddenFileInput}
              onChange={e => {
                setImage(e.target.files[0])
                setUrl(URL.createObjectURL(e.target.files[0]))
              }}
            />
          </div>
          <br />
          <div className="right">
            <div>
              <label>Image Caption</label>
              <input
                type='text'
                value={image.caption}
                onChange={e => { setCaption(e.target.value) }}
                placeholder='Example: My sunset painting'
                size="25"
              />
            </div>
            <br />
            <div>
              <label>Image Tag</label>
              <input
                type='text'
                value={image.tag}
                onChange={e => setTag(e.target.value)}
                placeholder='Example: #sunset #painting'
                size="25"
              />
            </div>
            <br />
            <div style={{ color: 'black' }}>For Sale:
              <ForSale
                image={image}
                {...props}
                user={props.user}
              />
            </div>
            <br />
            <div>
              <label>Price</label>
              <input
                type='number'
                value={image.price}
                onChange={e => setPrice(e.target.value)}
                placeholder='Example: $20'
                size="25"
              />
            </div>
            <LoadingButton
              type="submit"
              className="btn btn-primary share"
              isLoading={isLoading}
              onClick={() => setIsLoading(true)}
            >
              Upload
            </LoadingButton>
            <Link to='/my-images'>
              <button className="btn btn-danger">Cancel</button>
            </Link>
          </div>
        </div>
        <br />
        <Image className='img-preview' src={url} />
      </form>
    </div>
  )
}

// const ImageEdit = props => {
//
//
//
//   return (
//     <div>
//       <ImageForm
//         image={image}
//         handleChange={handleChange}
//         handleSubmit={handleSubmit}
//         cancelPath={`/images/${props.match.params.imageId}`}
//       />
//     </div>
//   )
// }
export default EditS3Image
