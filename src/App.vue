<template>
  <section>
    {{form}}
    <vue-create-form ref='eForm' v-model='form' :formData="formData">
      <p slot="detail">
        我叫{{form.name}}，性别{{sexOption[form.sex]}}，{{currentEducation}}学历，{{form.isInSchool ? '在读' : '已毕业'}}，今年{{form.age}}岁，每月工资{{form.salary}}元，手机号：{{form.phone}}<br/>{{form.introduce}}
      </p>
    </vue-create-form>
    <div class="btns">
      <el-button icon="el-icon-refresh-left" @click="reset">重置</el-button>
      <el-button type="primary" icon='el-icon-check' @click="submit">提交</el-button>
    </div>
  </section>
</template>

<script>
import vueCreateForm from './component/vue-create-form.vue'
export default {
  components:{
    vueCreateForm
  },
  data () {
    return {
      form: {
        name: '',
        hobby: [1, 2],
        age: '',
        job: '',
        educationList: [
          {
            grade: 1,
            schoolName: '深圳幼儿园',
            position: '班长'
          }
        ],
        game: ''
      },
      sexOption: {
        1: '男',
        2: '女'
      },
      jobDisabled: false,
      educationOption: [],
      placeholder: '请输入姓名',
      formData: {
        /** @输入框 **/
        name: {
          type: 'input',
          label: '姓名',
          // 动态placeholder
          placeholder: () => this.placeholder,
          maxlength: 10,
          span: 22,
          prompt: {
            title: '标题',
            content: '<a>请输入真实姓名</a>'
          }
        },
        /** @单选框 **/
        sex: {
          type: 'radio',
          label: '性别',
          // 静态option
          option: { 1: '男', 2: '女' }
        },
        /** @单选框 **/
        game: {
          type: 'input',
          label: '喜欢的游戏',
          required: () => this.form.sex === 1,
          span: 22
        },
        /** @输入框 **/
        idNumber: {
          type: 'input',
          label: '身份证号',
          rule: 'idNumber',
          span: 22
        },
        /** @下拉框 **/
        education: {
          type: 'select',
          label: '学历',
          // 动态option
          option: () => this.educationOption,
          labelKey: 'name',
          valueKey: 'grade',
          span: 22
        },
        /** @动态表单 **/
        educationList: {
          type: 'dynamicForm',
          label: '学校信息',
          span: 22,
          labelWidth: 'auto',
          max: 3,
          required: false,
          formData: {
            grade: {
              type: 'select',
              label: '学龄阶段',
              option: {1: '幼儿园', 2: '小学', 3: '初中', 4: '高中', 5: '大学'},
            },
            schoolName: {
              type: 'input',
              label: '学校名称',
            },
            position: {
              type: 'input',
              label: '职位',
              required: false
            }
          }
        },
        /** @switch **/
        isInSchool: {
          type: 'switch',
          label: '是否在读',
          // 打开时的值
          activeValue: 1,
          // 关闭时的值
          inactiveValue: 0,
          event: {
            change: e => {
              if (e) {
                this.form.job = 1
              }
            }
          }
        },
        /** @下拉框 **/
        job: {
          type: 'select',
          label: '职业',
          option: { 1: '教师', 2: '程序员', 3: '运营' },
          // 在读的话不需要选择职业
          show: () => !this.form.isInSchool,
          span: 22
        },
        /** @多选框 **/
        hobby: {
          type: 'checkbox',
          label: '爱好',
          option: { 1: 'Apple', 2: '小米', 3: 'OPPO', 4: 'vivo' }
        },
        /** @日期选择器 **/
        birthday: {
          type: 'date',
          label: '出生日期',
          // 占一半
          span: 11,
          event: {
            change: (e) => {
              if (e) {
                this.form.age = new Date().getFullYear() - e.slice(0, 4)
              }
            }
          }
        },
        /** @日期选择器 **/
        bi2rthday: {
          type: 'date',
          label: '出生日期',
          // 占一半
          span: 11,
          event: {
            change: (e) => {
              if (e) {
                this.form.age = new Date().getFullYear() - e.slice(0, 4)
              }
            }
          }
        },
        /** @输入框 **/
        age: {
          type: 'input',
          label: '年龄',
          placeholder: '根据出生日期动态计算',
          append: '岁',
          disabled: true,
          // 占一半
          span: 11
        },
        /** @数字框 **/
        salary: {
          type: 'number',
          label: '工资',
          append: '元/月',
          span: 22
        },
        divider: {
          type: 'divider',
          title: '联系方式'
        },
        /** @输入框 **/
        phone: {
          type: 'input',
          label: '手机号',
          rule: 'phone',
          span: 11
        },
        /** @邮箱 **/
        email: {
          type: 'input',
          label: '邮箱',
          rule: 'email',
          span: 11
        },
        /** @个人微博 **/
        weibo: {
          type: 'input',
          label: '个人微博',
          rule: 'link',
          required: false,
          span: 22
        },
        /** @文本框 **/
        introduce: {
          type: 'textarea',
          label: '自我介绍',
          rows: 4,
          span: 22,
          // 默认都是必填，非必填需要声明required: false
          required: false
        },
      //   /** @插槽 **/
      //   detail: {
      //     type: 'slot',
      //     label: '个人信息',
      //     // 默认都是必填，非必填需要声明required: false
      //     required: false
      //   }
      }
    }
  },
  computed: {
    currentEducation () {
      if (this.form.education) {
        return this.educationOption.find(item => item.grade == this.form.education).name
      }
    }
  },
  mounted () {
    // 模拟接口数据
    setTimeout(() => {
      this.educationOption = [
        {name: '本科', grade: 1},
        {name: '专科', grade: 2},
        {name: '高中', grade: 3},
        {name: '中专', grade: 4}
      ]
    }, 1000)
  },
  methods: {
    submit () {
      console.log(this.form)
      this.$refs.eForm.validate(() => {
        console.log('提交成功！')
      })
    },
    reset () {
      this.$refs.eForm.resetFields()
    }
  }
}
</script>

<style lang='less' scoped>
  section {
    border: 1px solid #e9ebf0;
    width: 820px;
    padding: 20px 20px 20px 0!important;
    border-radius: 6px;
    margin: 20px;
    p {
      font-size: 15px;
      color: #444;
    }
    .btns {
      display: flex;
      align-items: center;
      justify-content: center;
      /deep/ .el-button {
        width: 120px;
      }
    }
  }
</style>