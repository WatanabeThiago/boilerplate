import pino from 'pino'

export const createLogger = (environment) => {
  const streams = [
    { stream: process.stdout }
  ]

  if (environment?.logging?.file) {
    streams.push({
      stream: pino.destination(environment?.logging?.file)
    })
  }

  return pino({
    level: environment?.logging?.level || 'debug',
    redact: ['headers.authorization']
  },
  pino.multistream(streams))
}
