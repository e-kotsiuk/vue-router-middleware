function isUndefined (value) {
  return value === undefined
}

function handle (guards, to, from, next) {
  console.log(guards)
  const guardsList = guards.slice(0)
  const nextGuard = guardsList.shift()

  if (isUndefined(nextGuard)) {
    return next()
  }

  nextGuard(to, from, (nextArg) => {
    if (isUndefined(nextArg)) {
      handle(guardsList, to, from, next)
      return
    }
    next(nextArg)
  })
}

function mapGuards (guards) {
  return guards.map(v => {
    const value = v.split(':')
    const module = require('@/middlewares/' + value[0]).default
    if (value[1]) {
      const params = value[1].split(',')
      return module(...params)
    } else {
      return module
    }
  })
}

module.exports = function middleware (...guards) {
  if (guards && guards[0] && Array.isArray(guards[0])) {
    guards = guards[0]
  }
  return (to, from, next) => {
    return handle(mapGuards(guards), to, from, next)
  }
}
