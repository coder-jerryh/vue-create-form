<template>
  <!-- ---------- 单选框 ---------- -->
  <el-radio-group
    v-model="value[itemKey]"
    :disabled="parent.getBoolean(item.disabled)"
    @change="item.onChange && item.onChange($event, value)">
    <el-radio
      v-for="(opt, i) in parent.getOption(item)"
      :key="i"
      :label="opt.value"
      :disabled='opt.disabled'
      >{{opt.label}}</el-radio>
  </el-radio-group>
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
.el-radio-group{
  margin-top: 6px;
  .el-radio{
    margin-right: 24px;
    margin-bottom: 8px;
    &:last-child{
      margin-right: 0;
    }
    /deep/ .el-radio__label{
      padding-left: 6px;
    }
  }
}
</style>
