const { google } = require('googleapis')
const OAuth2 = google.auth.OAuth2
const calendar = google.calendar('v3')

const SCOPES = ['https://www.googleapis.com/auth/calendar.readonly']

const credentials = {
  client_id: process.env.CLIENT_ID,
  project_id: process.env.PROJECT_ID,
  client_secret: process.env.CLIENT_SECRET,
  calendar_id: process.env.CALENDAR_ID,
  auth_uri: 'https://accounts.google.com/o/oauth2/auth',
  token_uri: 'https://oauth2.googleapis.com/token',
  auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
  redirect_uris: ['https://perryf.github.io/meet/'],
  javascript_origins: [
    'https://perryf.github.io',
    'http://localhost:3000',
    'http://127.0.0.1:8080'
  ]
}

const { client_secret, client_id, redirect_uris, calendar_id } = credentials

module.exports.getAuthURL = async () => {
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  )

  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES
  })

  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    },
    body: JSON.stringify({ authUrl })
  }
}

// https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar.readonly&response_type=code&client_id=937690022891-fensfq0okqtb8tsfs0klpvahv13tm4c6.apps.googleusercontent.com&redirect_uri=https%3A%2F%2Fperryf.github.io%2Fmeet%2F

module.exports.getAccessToken = async event => {
  // needs to be instantiates every time
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  )

  // Decode authorization code extracted from the URL query
  const code = decodeURIComponent(event.pathParameters.code)

  return new Promise((resolve, reject) => {
    oAuth2Client.getToken(code, (err, token) => {
      if (err) return reject(err)
      return resolve(token)
    })
  })
    .then(token => {
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true
        },
        body: JSON.stringify(token)
      }
    })
    .catch(err => {
      console.error(err)
      return {
        statusCode: 500,
        body: JSON.stringify(err)
      }
    })
}

module.exports.getCalendarEvents = async event => {
  const oAuth2Client = new google.auth.OAuth2(
    client_id,
    client_secret,
    redirect_uris[0]
  )

  // decode access token from url query * add credential to oAuth2Client
  const accessToken = decodeURIComponent(event.pathParameters.access_token)
  oAuth2Client.setCredentials({ access_token: accessToken })

  return new Promise((resolve, reject) => {
    calendar.events.list(
      {
        calendarId: calendar_id,
        auth: oAuth2Client,
        timeMin: new Date().toISOString(),
        singleEvents: true,
        orderBy: 'startTime'
      },
      (error, response) => {
        if (error) reject(error)
        else resolve(response)
      }
    )
  })
    .then(results => {
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true
        },
        body: JSON.stringify({ events: results.data.items })
      }
    })
    .catch(err => {
      console.error(err)
      return {
        statusCode: 500,
        body: JSON.stringify(err)
      }
    })
}
