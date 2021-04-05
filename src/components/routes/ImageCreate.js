import React from 'react'
import UploadS3Image from '../shared/UploadS3Image'

const ImageCreate = (props) => {
  const { msgAlert, user } = props

  return (
    <UploadS3Image
      {...props}
      user={user}
      msgAlert={msgAlert}
      cancelPath='/my-images'
    />
  )
}

export default ImageCreate
