import debug from 'debug'

const polioramaLogger = debug('poliorama')

const logger = {
  info: polioramaLogger.extend('info'),
  err: polioramaLogger.extend('err'),
  debug: polioramaLogger.extend('debug'),
  warn: polioramaLogger.extend('warn')
}

export default logger
