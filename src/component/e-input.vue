<template>
  <!-- ---------- 输入框 ---------- -->
  <el-input
    :type='item.type'
    v-model="inputValue"
    :placeholder="parent.getPlaceholder(item)"
    :disabled="parent.getBoolean(item.disabled)"
    :maxlength="item.maxlength || 9999"
    :min='item.min'
    :rows='item.rows || 4'
    :autosize="{ minRows: item.rows || 4, maxRows: 20 }"
    @input="input"
    @blur="item.onBlur && item.onBlur(value)"
    @change="item.onChange && item.onChange(value)"
    clearable>
    <!-- 前置内容 -->
    <template slot="prepend" v-if="item.prepend">{{item.prepend}}</template>
    <!-- 后置内容 -->
    <template slot="append" v-if="item.append">{{item.append}}</template>
  </el-input>
</template>

<script>
import {debounce} from '../utils/index'
export default {
  props: {
    item: Object,
    itemKey: String,
    value: Object
  },
  inject: {
    parent: {
      type: Object,
      default: null
    }
  },
  data () {
    return {
      inputValue: ''
    }
  },
  computed: {
    formValue () {
      return this.value[this.itemKey]
    }
  },
  watch: {
    value: {
      handler () {
        this.inputValue = this.formValue
      },
      immediate: true
    }
  },
  methods: {
    input: debounce(function () {
      this.value[this.itemKey] = this.inputValue
      this.item.onInput && this.item.onInput(this.value)
    }, 300)
  }
}
</script>

<style lang='scss' scoped>
</style>
