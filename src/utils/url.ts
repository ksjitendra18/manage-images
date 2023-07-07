let URL = ''

// this is only for developement purposes. The function server runs of different platform
if (import.meta.env.MODE === 'development') {
  URL = 'http://localhost:43340'
}

export default URL
