import MysqlModel from '../core/mysqlModel'

export default class UserModel extends MysqlModel {

  constructor() {
    super('user')
  }

}