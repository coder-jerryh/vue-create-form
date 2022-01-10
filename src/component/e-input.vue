<template>
  <!-- ---------- 输入框 ---------- -->
  <el-input
    :type='item.type'
    v-model="value[itemKey]"
    :placeholder="parent.getPlaceholder(item)"
    :disabled="parent.getBoolean(item.disabled)"
    :maxlength="item.maxlength || 9999"
    :min='item.min'
    :rows='item.rows || 4'
    :autosize="{ minRows: item.rows || 4, maxRows: 20 }"
    @input="parent.getEvent(item, 'input', value)"
    @blur="parent.getEvent(item, 'blur', value)"
    @change="parent.getEvent(item, 'change', value)"
    clearable>
    <!-- 前置内容 -->
    <template slot="prepend" v-if="item.prepend">{{item.prepend}}</template>
    <!-- 后置内容 -->
    <template slot="append" v-if="item.append">{{item.append}}</template>
  </el-input>
</template>

<script>
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
    }
  },
  created () {},
  methods: {}
}
</script>

<style lang='scss' scoped>
</style>
