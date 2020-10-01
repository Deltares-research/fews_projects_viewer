import axios from 'axios'

export default function (id) {
  return axios({
    method: 'post',
    url: 'https://fewsapplications.deltares.nl/data/backend/get_markerinfo.php',
    data: { data: id },
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  })
    .then((response) => {
      return response.data
    })
}
