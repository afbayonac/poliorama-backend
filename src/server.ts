import app from './app'
import { PORT } from './config/constants'

app.on('databaseIsReady', () => {
  app.listen(PORT, () => { console.log(`Listening to port ${PORT}`) })
})
