import productionEnv from './production.env'
import developmentEnv from './development.env'

export default (() => {
  const env = process.env
  if (env  === "production") {
    return productionEnv
  } else {
    return developmentEnv
  }
})()