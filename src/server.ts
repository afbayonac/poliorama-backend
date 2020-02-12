import app from './app'
import { PORT } from './config/constants'

app.listen(PORT, () => { console.log(`Listening to port ${PORT}`) })
