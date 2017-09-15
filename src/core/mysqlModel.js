import Sequelize from 'sequelize'
import path from 'path'
import mysqlConfig from '../config/mysql'

const globalDB = (() => {
  let sequelize
  return {
    getInstance: () => {
      if (!sequelize) {
        sequelize = new Sequelize(mysqlConfig.database, mysqlConfig.username, mysqlConfig.password, mysqlConfig.options)
      }
      return sequelize
    }
  }
})()

export default class MysqlModel {
  constructor(...schemes) {
    //Sequelize实例
    this.db = globalDB.getInstance()

    //Sequelize模型，可包含多个
    this.models = {}
    this.options = {
      attributes: null,
      where: {},
      limit: 100,
      offset: 0,
      order: [],
      group: null,
      having: null
    }

    schemes.forEach((item) => {
      this.models[item] = this._import(item)
    })
    this.currentModel = this.models[Object.keys(this.models)[0]]

  }

  reset() {
    this.options = {
      attributes: null,
      where: {},
      limit: 100,
      offset: 0,
      order: [],
      group: null,
      having: null
    }
  }

  _import(scheme) {
    return this.db.import(path.join(__dirname, '../schemes', scheme))
  }

  _switchModel(modelName) {
    if (!modelName || this.currentModel.name == modelName) {
      return
    }

    if (Object.keys(this.models).includes(modelName)) {
      this.currentModel = this.models[modelName]
    } else {
      throw Error(`${modelName} dose not exist`)
    }
  }

  get(modelName = null) {
    this._switchModel(modelName)
    this.commit()
    return this.currentModel.findAll(this.options)
  }

  commit(){
    for (const key in this.options){
      if(this.options[key]==null){
        Reflect.deleteProperty(this.options,key)
      }
    }
  }

  count(modelName = null) {
    this._switchModel(modelName)
    this.commit()
    return this.currentModel.count(this.options)
  }

  from(modelName) {
    this._switchModel(modelName)
    return this
  }

  select(...fields) {
    this.options.attributes = []
    fields.forEach(item => {
      this.options.attributes.push(item)
    })
    return this
  }

  where(condition) {
    Object.assign(this.options.where, condition)
    return this
  }

  group(field) {
    this.options.group = field
    return this
  }

  order(field,regular='DESC'){
    this.options.order.push([field,regular])
    return this
  }

  having(condition) {
    this.options.having = condition
    return this
  }

  limit(value, offset = 0) {
    this.options.limit = Number(value)
    this.options.offset = Number(offset)
    return this
  }

  findOne(modelName) {

  }
}

