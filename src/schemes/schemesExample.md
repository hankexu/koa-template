#### Schemes Example

```
export default (sequelize, DateTypes) => {
  return sequelize.define('user', {
    name: DateTypes.STRING,
    age: DateTypes.INTEGER
  })
}
```