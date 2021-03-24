import { API_URL, API_KEY } from '@/constants'
export default function (params) {
  const { weatherType, city } = params
  //return `${API_URL}${weatherType}?q=${city}&appid=${API_KEY}`
  return fetch(
    `${API_URL}${weatherType}?q=${city}&units=metric&lang=ru&appid=${API_KEY}`
  )
    .then(res => res.json())
    .catch(err => console.log(err))
}
