import KoaRouter from 'koa-router'
import routers from '../config/router'
import controllers from '../controller/index'

export default function bindRouter() {
  const router = new KoaRouter()
  if (routers && routers.length) {
    for (const route in routers) {
      const path = routers[route][0]
      const handler = routers[route][1]
      if (typeof handler === 'object') {
        const controllerName = `${handler[Object.keys(handler)[0]].split('.')[0]}Controller`
        const controller = new controllers[controllerName]
        for (const m in handler) {
          const func = handler[m].split('.')[1]
          try {
            router[m](path, controller[func])
          }
          catch (err) {
            throw err
          }
        }
      } else if (typeof handler === 'string') {
        const controllerName = `${handler.split('.')[0]}Controller`
        const controller = new controllers[controllerName]
        router['get'](path, controller['index'])
        router['post'](`${path}`, controller['create'])
        router['get'](`${path}/:id`, controller['show'])
        router['put'](`${path}/:id`, controller['edit'])
        router['patch'](`${path}/:id`, controller['update'])
        router['delete'](`${path}/:id`, controller['delete'])
      }
    }
  }
  return router
}


