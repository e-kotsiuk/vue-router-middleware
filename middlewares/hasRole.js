export default function hasRole (...roles) {
  console.log('middleware hasRole')
  if (roles && roles[0] && Array.isArray(roles[0])) {
    roles = roles[0]
  }
  return (to, from, next) => {
    if (/* check if user has role */ true) {
      return next()
    }
    return next('404')
  }
}
