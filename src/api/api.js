import { API_URL, API_KEY } from '../constants'
export default function (params) {
  const { city, type, lang } = params
  return fetch(
    `${API_URL}${type}?q=${city}&units=metric&lang=${lang}&appid=${API_KEY}`
  )
    .then(res => res.json())
    .catch(err => console.log(err))
}
