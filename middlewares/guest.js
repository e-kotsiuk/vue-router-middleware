export default function guest (to, from, next) {
  const isGuest = true
  if (isGuest) {
    return next()
  } else {
    next('/dashboard')
  }
}
