export default {
  setUrlPath(router, error) {
    let path = {}
    if (error.response && error.response.status == 404) {
      path = {
        name: '404Resource',
        params: { resource: 'event' }
      }
    } else {
      path = {
        name: 'NetworkError'
      }
    }
    router.push(path)
  }
}
