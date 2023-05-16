import axios from 'axios'
import NProgress from 'nprogress'
import { mockData } from './mock-data'

const ENDPOINT_ROOT =
  'https://65kkaglqt4.execute-api.us-east-1.amazonaws.com/dev/api'

/**
 * @param {*} events:
 * This function takes an events array, then uses map to create a new array with only locations.
 * It will also remove all duplicates by creating another new array using the spread operator and spreading a Set.
 * The Set will remove all duplicates from the array.
 */
export const extractLocations = events => {
  const extractLocations = events.map(event => event.location)
  const locations = [...new Set(extractLocations)]
  return locations
}

const removeQuery = () => {
  let newUrl = ''
  if (window.history.pushState && window.location.pathname) {
    newUrl =
      window.location.protocol +
      '//' +
      window.location.host +
      window.location.pathname
    window.history.pushState('', '', newUrl)
  } else {
    newUrl = window.location.protocol + '//' + window.location.host
    window.history.pushState('', '', newUrl)
  }
}

export const getEvents = async () => {
  NProgress.start()

  // if on localhost, display mock data
  if (window.location.href.startsWith('http://localhost')) {
    NProgress.done()
    return mockData
  }

  // if offline, load cached events
  if (!navigator.onLine) {
    const data = localStorage.getItem('lastEvents')
    NProgress.done()
    return data ? JSON.parse(data).events : []
  }

  const token = await getAccessToken()
  if (token) {
    removeQuery()
    const url = `${ENDPOINT_ROOT}/get-events/${token}`
    const result = await axios.get(url)
    if (result.data) {
      const locations = extractLocations(result.data.events)
      localStorage.setItem('lastEvents', JSON.stringify(result.data))
      localStorage.setItem('locations', JSON.stringify(locations))
    }
    NProgress.done()
    return result.data.events
  }
}

const getToken = async code => {
  const encodeCode = encodeURIComponent(code)
  const { access_token } = await fetch(`${ENDPOINT_ROOT}/token/${encodeCode}`)
    .then(res => {
      return res.json()
    })
    .catch(error => error)

  access_token && localStorage.setItem('access_token', access_token)

  return access_token
}

// check token is still valid
const checkToken = async accessToken => {
  const result = await fetch(
    `https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=${accessToken}`
  )
    .then(res => res.json())
    .catch(error => error)

  return result
}

export const getAccessToken = async () => {
  // get access token in local storage, check it matches google access token
  const accessToken = localStorage.getItem('access_token')
  const tokenCheck = accessToken && (await checkToken(accessToken))

  if (!accessToken || tokenCheck.error) {
    await localStorage.removeItem('access_token')
    const searchParams = new URLSearchParams(window.location.search)
    const code = await searchParams.get('code')

    // ? is this needed?
    await localStorage.setItem('code', JSON.stringify(code))

    // get google single sign on url link and redirect
    if (!code) {
      const results = await axios.get(`${ENDPOINT_ROOT}/get-auth-url`)
      return (window.location.href = results.data.authUrl)
    }
    return code && getToken(code)
  }
  return accessToken
}
