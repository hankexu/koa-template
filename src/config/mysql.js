const development = {
  database: 'development',
  username: 'hanke',
  password: '123456',
  options: {
    host: '192.168.3.20',
    dialect: 'mysql',
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    }
  }
}

export default development