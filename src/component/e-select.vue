<template>
  <!-- ---------- 选择框 ---------- -->
  <el-select
    v-model="value[itemKey]"
    :placeholder="parent.getPlaceholder(item)"
    :disabled="parent.getBoolean(item.disabled)"
    :multiple='item.multiple'
    :allow-create='item.allowCreate'
    :collapse-tags='item.collapseTags'
    @change="change"
    default-first-option
    filterable
    clearable>
    <el-option
      v-for="(opt, i) in parent.getOption(item)"
      :key="i"
      :value="opt.value"
      :label="opt.label"
      :disabled='opt.disabled'/>
  </el-select>
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
  methods: {
    change (e) {
      this.item.onChange && this.item.onChange(e, this.value)
    }
  }
}
</script>

<style lang='scss' scoped>
  .el-select {
    width: 100%;
  }
</style>
