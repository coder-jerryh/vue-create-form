<template>
  <!-- ---------- 多选框 ---------- -->
  <el-checkbox-group
    v-if="isRightType"
    v-model="value[itemKey]"
    :disabled="parent.getBoolean(item.disabled)"
    @change="item.onChange && item.onChange($event, value)">
    <el-checkbox
      v-for="(opt, i) in parent.getOption(item)"
      :key="i"
      :label="opt.value"
      :disabled='opt.disabled'
      >{{opt.label}}</el-checkbox>
  </el-checkbox-group>
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
  computed: {
    isRightType () {
      return Array.isArray(this.value[this.itemKey])
    }
  },
  methods: {}
}
</script>

<style lang='scss' scoped>
</style>
