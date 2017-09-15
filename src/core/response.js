import errMsg from '../config/errerMsg.json'
export default class Response {
  static success(ctx,data) {
    ctx.body = data
  }
  static error(ctx,err1,err2 = null){
    const error = {}
    if (typeof err1=='number'){
      error.code = err1
      error.msg = err2 || errMsg[err1]
    }else{
      error.code = 'undefined'
      error.msg = err1
    }
    ctx.status = 500
    ctx.body = error
  }
}