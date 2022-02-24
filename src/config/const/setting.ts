export function getBaseUrl() {
  if (process.env.NODE_ENV == 'development') {
    return '127.0.0.1:8080'
  } else if (process.env.NODE_ENV == 'debug') {
    return ''
  } else if (process.env.NODE_ENV == 'production') {
    return 'http://api.123dailu.com/'
  }
}

export const TIME_OUT: number = 10 * 1000

