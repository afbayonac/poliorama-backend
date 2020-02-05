import express, { Request, Response } from 'express'

const app = express()
const port = 3000

app.get('/', (req: Request, res: Response) => res.send('express application'))
app.listen(port, () => console.log(`run POLIORAMA application in port ${port}`))
