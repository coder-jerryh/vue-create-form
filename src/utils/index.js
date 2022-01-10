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
