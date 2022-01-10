<template>
  <!-- ---------- 上传框 ---------- -->
  <e-upload
    :fileType="item.fileType || 'image'"
    v-model="value[itemKey]"
    :limit='item.limit || 1'
    :disabled="parent.getBoolean(item.disabled)"
    :type='item.uploadType'
    :uploadApi='item.uploadApi'
    :accept='item.accept'/>
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
