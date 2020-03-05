import { createServer } from 'http'

import app from './app'
import { PORT } from './config/constants'
import logger from './logger'

const server = createServer(app)

app.on('databaseIsReady', () => {
  server.listen(PORT, () => { logger.info(`Poliorama backend is running to port ${PORT}`) })
})

export default server
