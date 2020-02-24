import app from './app'
import { PORT } from './config/constants'
import { createServer } from 'http'

const server = createServer(app)

app.on('databaseIsReady', () => {
  server.listen(PORT, () => { console.log(`Poliorama backend is running to port ${PORT}`) })
})

export default server
