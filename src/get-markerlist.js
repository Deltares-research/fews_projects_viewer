import axios from 'axios'

export default function () {
  return axios({
    method: 'post',
    url: 'https://v-web018.external.intra/fewsprojectviewer/projectviewer/site/php_new/get_markerlist.php'
  })
    .then(({ data }) => {
      return typeof data === 'object'
        ? data
        : JSON.parse(data)
    })
}
