// 校验规则
export const defineValidator = {
  /** @手机号 **/
  phone: {
    maxlength: 11,
    validator: (rule, value, callback) => {
      if (value) {
        const reg = /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/
        if (!reg.test(value)) {
          return callback(new Error('请输入正确的手机号'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
  },
  /** @身份证号 **/
  idNumber: {
    maxlength: 18,
    validator: (rule, value, callback) => {
      if (value) {
        const reg = /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/
        if (!reg.test(value)) {
          return callback(new Error('请输入正确的身份证号'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
  },
  /** @邮箱 **/
  email: {
    validator: (rule, value, callback) => {
      if (value) {
        const reg = /^([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|_|.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/
        if (!reg.test(value)) {
          return callback(new Error('请输入正确的邮箱'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
  },
  /** @链接地址 **/
  link: {
    validator: (rule, value, callback) => {
      if (value) {
        const reg = /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-.,@?^=%&:/~+#]*[\w\-@?^=%&/~+#])?/
        if (!reg.test(value)) {
          return callback(new Error('请输入正确的链接地址'))
        } else {
          callback()
        }
      } else {
        callback()
      }
    }
  }
}

// 深拷贝
export const deepCopy = (obj) => {
  // JSON.parse(JSON.stringify(obj)) 拷贝会导致【function】和【undefined】拷贝之后丢失
  // obj为数组要新创建数组，为对象则创建对象
  const newObj = Array.isArray(obj) ? [] : {}
  for (const key in obj) {
    // 判断是不是对象的自有属性，排出原型
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key]
      // 引用数据类型，排出null，JS的坑typeof null === 'object'
      if (typeof value === 'object' && value !== null) {
        // 递归遍历对象中的引用数据类型
        newObj[key] = deepCopy(value)
      } else {
        // 基础数据类型
        newObj[key] = value
      }
    }
  }
  return newObj
}

// 是不是function
export const isFn = (value) => typeof value === 'function'