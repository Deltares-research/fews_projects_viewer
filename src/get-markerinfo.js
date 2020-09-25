import axios from 'axios'

export default function (id) {
  return axios({
    method: 'post',
    url: 'https://v-web018.external.intra/fewsprojectviewer/projectviewer/site/php_new/get_markerinfo.php',
    data: { data: id },
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
  })
    .then((response) => {
      return response.data
    })
}
