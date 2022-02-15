# ele-form

# 超精简代码动态创建Element UI Form表单
## 代码效果图
<img src='https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9634eb26c6b6476aae15576bfccd4cad~tplv-k3u1fbpfcp-watermark.image'/>


## 一、安装方法：

### 1. npm安装
``` bash
npm install ele-form
```

### 2.yarn安装
``` bash
yarn add ele-form
```

## 二、引入方法：

### 1. 全局引入
``` bash
// main.js中
import VueCreateForm from 'ele-form'
Vue.use(VueCreateForm)
```

### 2. 组件内部引入

``` bash
<script>
  import vueCreateForm from 'ele-form'
  export default {
    components: {
      vueCreateForm
    }
  }
</script>
```
## 三、简单使用

``` bash
<template>
  <div>
    <ele-form ref='form' v-model='form' :formData="formData"/>
    <div>
      <el-button type='primary' @click='submit'>提交</el-button>
    </div>
  </div>
</template>

<script>
// 若全局引入，此处不需要再引入
import vueCreateForm from 'ele-form'
export default {
  components: {
    // 若全局引入，此处不需要再引入
    vueCreateForm
  },
  data () {
    return {
      form: {},
      formData: {
        name: {
          type: 'input',
          label: '姓名'
        }
      }
    }
  },
  methods: {
    // 提交
    submit () {
      this.$refs.form.validate(() => {
        // 校验成功
      })
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
```

## 四、VueCreateForm Attributes
| 参数 | 说明 | 类型 | 可选值	| 默认值 | 举例 |
|:------:| :------: | :------: | :------: | :------: | :------: |
| formData | 表单数据项 | object | - | - | 见下方 |
| v-model | 绑定值 | object | - | - | - |
| labelWidth | 表单项label宽度 | string | - | auto | '100px' |
| span | 布局分栏数(同Element UI) | number | 1-24 | 24 | 8 |
| disabled | 禁用 | boolean | - | false | true |
| ref | Vue组件的ref属性 | string | - | - | - |

## 五、FormData Attributes
采用键值对形式，其中key为表单项字段，value则为该表单配置项
### 通用参数
| 参数 | 说明 | 类型 | 可选值	| 默认值 | 举例 |
|:------:| :------: | :------: | :------: | :------: | :------: |
| type | 表单项类型 | string | 见下方 | - | - |
| label | 标签文本 | string | - | - | - |
| disabled | 禁用 | boolean/function/number | - | false | 0/true/() => this.disabled |
| show | 控制表单项显隐方法，接受function返回值为布尔类型 | function | - | - | form => form.type == 1 |
| prompt | label后面的提示信息 | object | - | title默认为“提示”，width默认为200 | {title: '提示', content: '提示内容', width: 200} |

type类型
``` bash
一、输入框类
1、输入框input
2、数字框number
3、整数框integer
4、文本框textarea

二、带选项类
1、select
2、radio
3、checkbox

三、开关类
1、switch

四、日期选择器类
1、year
2、month
3、date
4、datetime
5、datetimerange
6、daterange

五、时间选择器类
1、time
```

### 输入框类
| 参数 | 说明 | 类型 | 可选值	| 默认值 | 举例 |
|:------:| :------: | :------: | :------: | :------: | :------: |
| type | 表单项类型 | string | input/number/integer/textarea | - | - |
| placeholder | 输入框类型表单项占位符 | string/function | - | - | 请输入姓名/() => this.placeholder |
| prepend | type为input/number/integer类型是输入框前置内容，非必须 | string | - | - | ¥ |
| append | type为input/number/integer类型是输入框后置内容，非必须 | string | - | - | 元 |
| maxlength | 输入框类型表单项最大内容长度 | number | - | 无限制 | 200 |
| rows | type为textarea时的行数 | number | - | 4 | 6 |
| min | type为textarea时的行数最小值 | number | - | - | - |

### 带选项类
| 参数 | 说明 | 类型 | 可选值	| 默认值 | 举例 |
|:------:| :------: | :------: | :------: | :------: | :------: |
| type | 表单项类型 | string | select/radio/checkbox | - | - |
| placeholder | type为select时表单项占位符 | string/function | - | - | 请选择性别/() => this.placeholder |
| option | 带选项类表单项的数据项 | array/object/function | - | - | 详见下方 |
| labelKey | option为数组时，label的对应key | string | - | label | name |
| valueKey | option为数组时，value的对应key | string | - | value | id |

#### option
```
// 1、object
option: {1: '张三', 2: '李四'}

// 2、标准Array
option: [{label: '张三', value: 1}, {label: '李四', value: 2}]

// 3、非标准Array
option: [{name: '张三', id: 1}, {name: '李四', id: 2}],
labelKey: 'name',
valueKey: 'id'

// 4、function

this.option = {1: '张三', 2: '李四'}

...
option: () => this.option
...
```

⚠️注意：type为checkbox时，组件v-model绑定的对象中，需声明默认值为[]，即：
```
<ele-form :formData='formData' v-model='form' .../>

...
data () {
  return {
    formData: {
      hobby: {
        type: 'checkbox',
        label: '爱好'
      }
    },
    form: {
      hobby: []
    },

  }
}
```

### 开关类
| 参数 | 说明 | 类型 | 可选值	| 默认值 | 举例 |
|:------:| :------: | :------: | :------: | :------: | :------: |
| type | 表单项类型 | string | switch | - | - |
| activeValue | switch 打开时的值 | boolean/string/number | - | true | - |
| inactiveValue | switch 关闭时的值 | boolean/string/number | - | false | - |

### 日期选择器类
| 参数 | 说明 | 类型 | 可选值	| 默认值 | 举例 |
|:------:| :------: | :------: | :------: | :------: | :------: |
| type | 表单项类型 | string | year/month/date/datetime/datetimerange/daterange | - | - |
| placeholder | 输入框类型表单项占位符 | string/function | - | - | 请选择日期/() => this.placeholder |
| format | 显示在输入框中的格式 | string | - | yyyy-MM-dd HH:mm:ss | - |

### 时间选择器类
| 参数 | 说明 | 类型 | 可选值	| 默认值 | 举例 |
|:------:| :------: | :------: | :------: | :------: | :------: |
| type | 表单项类型 | string | time | - | - |
| placeholder | 输入框类型表单项占位符 | string/function | - | - | 请选择日期/() => this.placeholder |
| format | 显示在输入框中的格式 | string | - | HH:mm:ss | - |
| pickerOptions | 当前时间日期选择器特有的选项参考下表(同Element UI) | object/function | - | - | - |

### 动态表单
| 参数 | 说明 | 类型 | 可选值	| 默认值 | 举例 |
|:------:| :------: | :------: | :------: | :------: | :------: |
| type | 表单项类型 | string | dynamicForm | - | - |
| labelWidth | 表单项label宽度 | string | - | auto | '100px' |
| formData | 动态表单项集合（同五、FormData Attributes） | object | - | - | - |
| max | 动态表单项最大添加数量 | number | - | - | - |

### 插槽slot
| 参数 | 说明 | 类型 | 可选值	| 默认值 | 举例 |
|:------:| :------: | :------: | :------: | :------: | :------: |
| type | 表单项类型 | string | slot | - | - |

### 表单验证
| 参数 | 说明 | 类型 | 可选值	| 默认值 | 举例 |
|:------:| :------: | :------: | :------: | :------: | :------: |
| required | 是否必填 | boolean | true/false | 默认都为必填true | false |
| validator | 自定义验证规则 | array/function | - | - | 同element UI，示例见完整示例 |
| rule | type为输入框类型时，使用ele-form自带的校验规则 | string | phone/idNumber/email/link | - | - |

### 表单项事件
```
// 放在event里，
name: {
  type: 'input'
  label: '姓名',
  // 事件
  event: {
    change: (e) => {},
    blur: (e) => {},
    input: (e) => {},
  }
}
```

## 六、VueCreateForm Events
| 事件名 | 说明 | 举例 |
|:------: | :------: | :------: |
| validate | 提交验证 | this.$refs.form.validate(() => { // todo }) |
| resetFields | 重置表单 | this.$refs.form.resetFields() |

## 七、完整示例
(1) 自定义表单验证\
(2) 带选项类动态option\
(3) 绑定事件\
(4) 输入框后置内容\
(5) 控制显隐\
(6) 表单项非必填\
(7) 清空表单\
(8) 提交表单\
(9) 布局分栏\
(10) 使用组件内部校验规则\
(11) 动态表单

``` bash
<template>
  <div>
    <el-button type='warning' @click="changeOption">点击改变优惠券类型couponTypes</el-button>
    <ele-form
      ref='vueCreateForm'
      v-model='form'
      labelWidth='100px'
      :formData="formData"/>
    <el-button type='primary' @click="submit">提交</el-button>
  </div>
</template>

<script>
// 若全局引入，此处不需要再引入
import vueCreateForm from 'ele-form'
export default {
  components: {
    // 若全局引入，此处不需要再引入
    vueCreateForm
  },
  data () {
    // (1) 自定义表单验证
    const floatRequireMoney = (rule, value, callback) => {
      if (value) {
        var reg = /^(([1-9]{1}\d*)|(0{1}))(\.\d{1})?$/
        if (value < 0 || value > 9.9) {
          return callback(new Error('折扣范围在0~9.9之间'))
        } else if (!reg.test(value)) {
          return callback(new Error('最多保留1位小数'))
        } else {
          callback()
        }
      }
    }
    return {
      // (2) 动态option，changeOption方法触发改变
      couponTypes: {
        1: '抵扣劵',
        2: '折扣劵'
      },
      formData: {
        phone: {
          type: 'input',
          label: '手机号',
          // (10) 使用组件内部校验规则
          rule: 'phone'
        },
        couponName: { 
          type: 'input', 
          label: '优惠券名称',
          // (3) 绑定事件
          event: {
            // (3) 输入框input事件
            input: this.inputCouponName
          },
          // (9) 布局分栏
          span: 12
        },
        // (2) 动态option，请使用Funtion返回参数
        type: {
          type: 'radio',
          label: '优惠券类型',
          option: () => this.couponTypes,
          // (9) 布局分栏
          span: 12
        },
        rate: {
          type: 'number',
          label: '折扣比例',
          placeholder: '请输入折扣比例，如8.5',
          // (1) 自定义表单验证
          validator: floatRequireMoney,
          // (4) 输入框后置内容
          append: '折',
          // (5) 控制显隐
          show: form => form.type === 2
        },
        date: { type: 'datetimerange', label: '有效期' },
        way: {
          type: 'radio',
          label: '投放方式',
          // 静态option
          option: {
            1: '系统主动发放'
            2: '用户自领'
          } 
        },
        instructions: { type: 'textarea', label: '使用说明' },
        // (6) 备注设置非必填
        remark: { type: 'textarea', label: '备注', required: false },
        // (11) 动态表单
        limitList: {
          type: 'dynamicForm',
          label: '使用限制',
          labelWidth: 'auto',
          max: 3,
          formItem: {
            couponType: {
              type: 'select',
              label: '优惠券类型',
              option: {
                1: '抵扣劵',
                2: '折扣劵'
              },
            },
            limit: {
              type: 'integer',
              label: '每次可使用',
              append: '张'
            }
          }
        }
      },
      form: {}
    }
  },
  methods: {
    // (3) 绑定输入框input事件
    inputCouponName (e) {
      console.log(e)
    },
    // (2) 点击改变优惠券类型couponTypes
    changeOption () {
      this.couponTypes = {
        1: '满减券',
        2: '免单券',
        3: '打折券'
      }
    },
    // (7) 清空表单
    clear () {
      this.$refs.vueCreateForm.resetFields()
    },
    // (8) 提交表单
    submit () {
      // 表单验证
      this.$refs.vueCreateForm.validate(() => {
        // todo...
      })
    }
  }
}
</script>

<style lang='scss' scoped>
</style>
```

作者VX：Nice2cu_Hu，目前Vue-create-form已投入实际生产中，极大的减少前端工程师开发后台管理系统表单的工作量\
稳定且可靠，作者长期维护中…