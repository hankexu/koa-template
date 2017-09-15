import BaseController from '../core/baseController'
import Response from '../core/response'

export default class HomeController extends BaseController{

  async index(ctx,next){
    Response.error(ctx,0)
  }

  async hello(ctx,next){
    ctx.body = ctx.query
  }
}