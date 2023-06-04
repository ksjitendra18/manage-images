import Cookies from 'js-cookie'
import URL from './url'
const checkAuth = async () => {
  const authToken = Cookies.get('auth-token')
  const res = await fetch(`${URL}/.netlify/functions/status`, {
    method: 'POST',
    body: JSON.stringify({ authToken: authToken })
  })
  const resData = await res.json()
  return resData
}

export default checkAuth
