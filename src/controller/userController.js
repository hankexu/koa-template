import BaseController from '../core/baseController'
import MysqlModel from '../core/mysqlModel'
export default class UserController extends BaseController{

  async index(ctx,next){

    const userModel = new MysqlModel('user')

    ctx.body = await userModel.get()
  }
}