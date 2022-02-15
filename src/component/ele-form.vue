<template>
  <el-form :model="form" :rules="rules" ref="eForm" :label-width="labelWidth" :label-position='labelPosition' :validate-on-rule-change='false' :disabled='disabled' size="small">
    <template v-for="(item, itemKey) in formData">
      <!-- 分割线 -->
      <el-divider v-if="item.type == 'divider'" content-position="left" :key="itemKey">{{item.label}}</el-divider>
      <!-- 表单 -->
      <el-form-item :class="`el-col-${computedSpan(item)}`" :prop="itemKey" v-else-if="!item.show || item.show(form)" :key="itemKey">
        <!-- label -->
        <label v-if="item.label" slot="label" :class="{'has-prompt': item.prompt}">
          <span>{{item.label}}</span>
          <!-- 提示 -->
          <el-popover
            v-if="item.prompt"
            placement="top-start"
            trigger="hover"
            :width="item.prompt.width || 200"
            :title="item.prompt.title || '提示'">
            <!-- 图标 -->
            <i class="el-icon-info" slot="reference"></i>
            <!-- 提示内容 -->
            <p name="content" v-html="item.prompt.content || '未填写提示内容'"></p>
          </el-popover>
        </label>
        <!-- ---------- 插槽 ---------- -->
        <slot v-if="item.type == 'slot'" :name='itemKey'/>
        <!-- 组件 -->
        <component v-else v-model="form" :is='components[item.type]' :itemKey='itemKey' :item='item'>
          <!-- 动态表单 -->
          <template slot-scope='{dynamicI}'>
            <ele-form
              ref='dynamicForm'
              v-model="form[itemKey][dynamicI]"
              :formData="item.formData"
              :labelWidth='item.labelWidth'
              :disabled='item.disabled'
            />
          </template>
        </component>
      </el-form-item>
    </template>
  </el-form>
</template>

<script>
import eInput from './e-input.vue'
import eSelect from './e-select.vue'
import eRadio from './e-radio.vue'
import eCheckbox from './e-checkbox.vue'
import eSwitch from './e-switch.vue'
import eDatePicker from './e-date-picker.vue'
import eTimePicker from './e-time-picker.vue'
import eUpload from './e-upload.vue'
import eDynamicForm from './e-dynamic-form.vue'
import eCascader from './e-cascader.vue'
// 引入校验规则
/** @手机号phone **/
/** @身份证号idNumber **/
/** @邮箱email **/
import { defineValidator, isFn } from '../utils/index'

// placeholder前缀
const PlaceholderPrefixs = {
  upload: '请上传',
  input: '请输入',
  integer: '请输入',
  textarea: '请输入',
  number: '请输入',
  radio: '请选择',
  cascader: '请选择',
  checkbox: '请选择',
  select: '请选择',
  datetimerange: '请选择',
  dynamicForm: '请完善'
}
export default {
  name: 'ele-form',
  provide () {
    return {
      parent: this
    }
  },
  props: {
    // 表单数据项
    formData: {
      type: Object,
      default: () => {},
      required: true
    },
    // 表单数据
    value: {
      type: Object,
      default: () => {},
      required: true
    },
    // label宽度
    labelWidth: {
      type: String,
      default: 'auto'
    },
    // 布局分栏数
    span: {
      type: Number,
      default: 24
    },
    // 只读属性
    disabled: {
      type: Boolean,
      default: false
    },
    labelPosition: {
      type: String,
      default: 'top'
    },
    required: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      components: {
        // 输入框
        input: eInput,
        number: eInput,
        integer: eInput,
        textarea: eInput,
        // 下拉框
        select: eSelect,
        // 单选框
        radio: eRadio,
        // 多选框
        checkbox: eCheckbox,
        // switch开关
        switch: eSwitch,
        // 日期选择器
        year: eDatePicker,
        month: eDatePicker,
        date: eDatePicker,
        datetime: eDatePicker,
        datetimerange: eDatePicker,
        daterange: eDatePicker,
        // 时间
        time: eTimePicker,
        timerange: eTimePicker,
        // 上传
        upload: eUpload,
        // 动态表单
        dynamicForm: eDynamicForm,
        // 级联选择器
        cascader: eCascader
      }
    }
  },
  computed: {
    // 组件
    eForm () {
      return this.$refs.eForm
    },
    // 表单
    form () {
      return this.value
    },
    // 规则
    rules () {
      const ruleObj = {}
      for (const formKey in this.formData) {
        const item = this.formData[formKey]
        let { required, rule, type, validator } = item
        const rules = []
        if (isFn(required)) {
          required = required(this.value)
        }
        // 必填（声明required为false表示非必填）
        if (required || (this.required && required !== false)) {
          rules.push({ required: true, message: this.getPlaceholder(item), trigger: item.validTrigger || 'blur' })
        }
        // 输入框默认校验规则：手机、身份证号等……
        if (type === 'input' && rule) {
          const { maxlength, validator } = defineValidator[rule] || {}
          if (validator) {
            // 最大长度
            item.maxlength = maxlength || 9999
            // 校验规则
            rules.push({ required, validator })
          } else {
            // 不存在该规则
            console.warn('ele-form:', `不支持rule为“${rule}”类型的校验规则`)
          }
        }
        // 自定义校验规则
        if (validator) {
          // 转换成数组类型
          const validators = isFn(validator) ? [validator] : validator
          validators.forEach(validator => {
            rules.push({ required, validator })
          })
        }
        ruleObj[formKey] = rules
      }
      return ruleObj
    },
    // placeholder
    getPlaceholder () {
      return item => {
        let placeholder = item.placeholder
        if (placeholder) {
          // placeholder是方法
          if (isFn(placeholder)) {
            placeholder = placeholder.apply(this.parent || this.$parent)
          }
          return placeholder
        } else {
          return `${PlaceholderPrefixs[item.type] || '请选择'}${item.label}`
        }
      }
    },
    // 获得radio、select、checkbox的option
    getOption () {
      return item => {
        let option = item.option
        let newOption = []
        // option是方法
        if (isFn(option)) {
          // apply改变this指向，第一个参数为新的this指向（tips：自定参数必须放在数组里[参数1, 参数2]）
          option = item.option.apply(this.$parent, [this.form])
        }
        if (option) {
        // option是数组
          if (Array.isArray(option)) {
            newOption = option.map(opt => {
              return {
                ...opt,
                label: opt[item.labelKey || 'label'],
                value: opt[item.valueKey || 'value']
              }
            })
          } else {
          // option是对象
            for (const key in option) {
              newOption.push({
                label: option[key],
                value: isNaN(Number(key)) ? key : Number(key)
              })
            }
          }
        } else {
          console.warn('ele-form:', `未声明“${item.label}”的option值`)
        }
        return newOption
      }
    },
    // 计算布尔值
    getBoolean () {
      return (param) => {
        // 是方法
        if (isFn(param)) {
          // call改变this指向，第一个为新的this指向，第二个为自定义参数
          return Boolean(param.call(this.$parent, this.form))
        } else {
        // 不是方法
          return Boolean(param)
        }
      }
    },
    // 计算pickerOption
    getPickerOptions () {
      return (item) => {
        let option = item.pickerOptions || {}
        if (isFn(option)) {
          // apply改变this指向，第一个参数为新的this指向（tips：自定参数必须放在数组里[参数1, 参数2]）
          option = option.apply(this.$parent)
        }
        return option
      }
    },
    computedSpan () {
      return (item) => {
        if (item.type === 'divider') {
          return 24
        } else {
          return item.span || this.span
        }
      }
    }
  },
  mounted () {
    this.setDefaultValue()
  },
  methods: {
    // 提交验证
    validate (callback = '') {
      // 有callback表示第一级
      callback && (window.validFlags = [])
      const dynamicForm = this.$refs.dynamicForm || []
      const dynamicFormFlag = dynamicForm.every(item => item.validate())
      let validFlag = false
      this.eForm.validate(valid => {
        validFlag = valid
        validFlags.push(dynamicFormFlag)
        if (valid && validFlags.every(item => item)) {
          callback && callback(true)
        }
      })
      return validFlag
    },
    // 重置表单
    resetFields () {
      this.eForm.resetFields()
      const form = {}
      for (const key in this.form) {
        form[key] = this.form[key] || ''
      }
      this.$emit('input', form)
    },
    // 清除验证
    clearValidate () {
      this.eForm.clearValidate()
    },
    // 设置默认值
    setDefaultValue () {
      const form = {...this.value}
      for (const key in this.formData) {
        const {type, inactiveValue, multiple} = this.formData[key]
        const value = this.form[key]
        let defaultValue = ''
        if (['checkbox', 'dynamicForm'].includes(type) || multiple) {
          defaultValue = []
        } else if (type === 'switch') {
          defaultValue = inactiveValue || false
        }
        // 分割线不需要设置默认值
        if (type !== 'divider') {
          form[key] = typeof value === 'undefined' ?  defaultValue : value
        }
      }
      this.$emit('input', form)
    }
  }
}
</script>

<style lang='scss' scoped>
  .el-form {
    overflow: hidden;
    padding-bottom: 5px;
    min-height: 200px;
    display: flex;
    flex-wrap: wrap;
    align-content: flex-start;
    margin: 0 -6px;
    // 富文本宽度
    /deep/ .el-date-editor {
      width: 100%;
    }
    // 分割线上下距离
    /deep/ .el-divider--horizontal {
      margin: 18px 6px 14px;
      width: calc(100% - 12px);
    }
    /deep/ .el-form-item {
      margin-bottom: 6px;
      padding: 0 6px;
    }
    /deep/ .has-prompt {
      position: relative;
      padding-right: 22px;
      // 提示图标样式
      .el-icon-info {
        width: 100%;
        color: #E6A23C;
        font-size: 17px;
        cursor: pointer;
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        transition: all ease .25s;
        left: 0;
        right: 0;
        text-align: right;
        &:hover {
          opacity: .7;
        }
      }
    }
  }
</style>
