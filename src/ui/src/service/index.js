import Axios from 'axios'

const connect = async ({ url, method, params, data }) => {
  const res = await Axios({
    url,
    method,
    params,
    data
  })
  return res.data
}

export default connect
