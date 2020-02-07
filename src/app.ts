import express, { Request, Response } from 'express'

const app = express()
const port = 3000

const hello = `╔═╗┌─┐┬  ┬┌─┐┬─┐┌─┐┌┬┐┌─┐
╠═╝│ ││  ││ │├┬┘├─┤│││├─┤
╩  └─┘┴─┘┴└─┘┴└─┴ ┴┴ ┴┴ ┴`

app.get('/', (req: Request, res: Response) => {
  res.set('Content-Type', 'text/plain')
  res.send(hello)
})

app.listen(port, () => console.log(`run application in port ${port}`))
