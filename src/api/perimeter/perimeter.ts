import { Router } from 'express'
import { getPerimeter} from "./controller";

const perimeterRouter = Router()

perimeterRouter.route('/:id')
  .get(getPerimeter)

export default perimeterRouter
