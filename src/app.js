import Koa from 'Koa'
import logger from 'koa-logger'
import bodyParser from 'koa-bodyparser'
import compress from 'koa-compress'
import error from 'koa-error'

import {port} from './config/index'
import bindRouter from "./core/router";

const app = new Koa()

app.use(error({
  accepts:['html'],
  env:process.env.NODE_ENV
}))

app.use(compress())
app.use(logger())
app.use(bodyParser())

app.use(bindRouter().routes())

app.listen(port, () => {
  console.log(`listening port ${port}`)
})

