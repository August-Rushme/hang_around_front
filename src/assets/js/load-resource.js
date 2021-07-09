const context = require.context('.', true, /\.(png|jpe?g|svg)$/)

const obj = {}
context.keys().forEach(key => {
  const fileCode = key
    .split('./')
    .pop()
    .substring(0, key.length - 6)
    .replace(/\//g, '-')
  obj[fileCode] = context(key)
})

export default obj
