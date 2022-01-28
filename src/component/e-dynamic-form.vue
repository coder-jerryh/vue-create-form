<template>
  <!-- 动态表单 -->
  <section class="dynamicForm">
    <el-button
      class="add"
      :prevent='false'
      icon="el-icon-plus"
      type="primary"
      plain
      @click="list.push(item.defaultValue || {})"
      :disabled='(item.max == list.length) || item.disabled'
    >添加</el-button>
    <ul>
      <li :class="`col-${item.itemSpan}`" v-for="(dynamicItem, dynamicI) in list" :key="dynamicI">
        <slot :dynamicI='dynamicI'/>
        <el-button
          class="del"
          plain
          :prevent='false'
          type="danger"
          icon="el-icon-close"
          :disabled='(item.min == list.length) || item.disabled'
          @click="list.splice(dynamicI, 1)"/>
      </li>
    </ul>
  </section>
</template>

<script>

export default {
  props: {
    item: Object,
    /** @item
      defaultValue: 点击添加生成的默认值
      max: 最大添加数量
      min: 最小添加数量
      disabled: 禁用
      itemSpan: 布局分栏数
    **/
    itemKey: String,
    value: Object
  },
  computed: {
    list () {
      return this.value[this.itemKey] || []
    }
  }
}
</script>

<style lang='scss' scoped>
  .dynamicForm {
    .add {
      margin-bottom: 10px;
    }
    ul {
      margin: 0 -6px -20px;
      display: flex;
      flex-wrap: wrap;
      &:empty {
        margin-top: 10px;
      }
      @for $i from 1 to 25 {
        .col-#{$i}{
          width: calc(#{percentage(($i/24))} - 12px);
        }
      }
      li {
        margin: 0 6px;
        border: 1px solid #eceef4;
        margin-bottom: 10px;
        border-radius: 4px;
        background: #f8f8f8;
        position: relative;
        /deep/ .el-form {
          min-height: inherit;
          padding: 5px 4px 10px 10px;
          margin-right: 0;
          flex: 1;
          .el-form-item {
            &:not(.is-required) .el-form-item__label::before {
              display: none;
            }
          }
        }
        .del {
          position: absolute;
          right: -1px;
          top: -1px;
          border-radius: 1px 4px;
          width: 25px;
          height: 25px;
          padding: 0;
          font-size: 16px;
        }
      }
    }
  }
</style>
