import axios from 'axios'

export default function () {
  return axios({
    method: 'post',
    url: 'https://fewsapplications.deltares.nl/data/backend/get_markerlist.php'
  })
    .then(({ data }) => {
      return typeof data === 'object'
        ? data
        : JSON.parse(data)
    })
}
