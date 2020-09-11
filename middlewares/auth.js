export default function auth (to, from, next) {
  const isAuth = true
  if (isAuth) {
    return next()
  } else {
    next({ name: 'Login' })
  }
}
