const splitArrayBy = (array, separator) => array.split(separator)

const convertToLocaleUpperCase = (item) =>
  item.toLocaleUpperCase()

const setValuesFromObject =
  (lastIndex, value, enviroment) => (obj, item, index) => {
    if (lastIndex === index) {
      obj[item] = value
      return enviroment
    }

    return obj[item]
  }

export const configureEnvironmentConfigServer = (
  enviroment,
  obj,
  separator,
  configServer
) => {
  return Object.keys(obj).reduce((env, property) => {
    const propertiersLowerCase = splitArrayBy(property, separator).map(
      convertToLocaleUpperCase
    )

    const lastIndex = propertiersLowerCase.length - 1
    const value = configServer.get(property)

    return propertiersLowerCase.reduce(
      setValuesFromObject(lastIndex, value, env),
      env
    )
  }, enviroment)
}
