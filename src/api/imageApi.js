import apiUrl from '../apiConfig'
import axios from 'axios'

// S3 upload
export const addS3image = (contentType, formData, user) => {
  return axios({
    method: 'POST',
    url: apiUrl + '/post-image',
    headers: {
      'Authorization': `Bearer ${user.token}`,
      'Content-Type': contentType
    },
    data: formData
  })
}

export const showArtwork = (artId) => {
  return axios({
    url: apiUrl + `/artworks/${artId}`,
    method: 'GET'
  })
}

export const indexArtwork = () => {
  return axios({
    url: apiUrl + '/images/',
    method: 'GET'
  })
}

export const showArtistArt = (artistId) => {
  return axios({
    url: apiUrl + `/artworks/user/${artistId}`,
    method: 'GET'
  })
}

export const deleteArtwork = (artId, user) => {
  return axios({
    url: apiUrl + `/artworks/${artId}`,
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${user.token}`
    }
  })
}

// Possibly need s3 PATCH route
export const editArtwork = (formData, artId, user) => {
  return axios({
    url: apiUrl + `/artworks/${artId}`,
    method: 'PATCH',
    headers: {
      'Authorization': `Bearer ${user.token}`
    },
    data: formData
  })
}

// 5 most recent images - targetted at carousel
export const getRecentImages = () => {
  return axios({
    url: apiUrl + '/artworks/recent',
    method: 'GET'
  })
}
