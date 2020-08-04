<template>
    <Modal :title="title" :value="dialogVisible" :width="width" footer-hide class-name="vertical-center-modal" @on-cancel="cancel">
        <Form ref="form" :label-width="formConfig.labelWidth" :label-position="formConfig.labelPosition" :label-colon="formConfig.labelColon || false" :model="value" :rules="Rules">
            <template v-for="(item,i) in formFields">
                <FormItem :label="item.label" :prop="item.prop" v-if="item.isRender === undefined ? true : item.isRender">
                    <Input v-if="!item.tag || item.tag==='input'" :type="item.type || 'text'" :value="value[item.key]" @input="handleInput($event,item.key)" :placeholder="item.placeholder || item.label || '请输入'"></Input>
                    <Select v-else-if="item.tag==='select'" :value="value[item.key]" @on-change="handleSelectChange($event,item.key)" :placeholder="item.placeholder || '请选择'">
                        <Option v-for="(option,index) in item.options || ajaxOptions" :key="index" :value="getOptionValuekey(option,item)">{{option[item.optionNamekey || 'name']}}</Option>
                    </Select>
                    <RadioGroup v-else-if="item.tag==='radioGroup'" :value="value[item.key]">
                        <Radio v-for="(radio,index) in item.radios" :key="index" :label="radio.id">{{radio.name}}</Radio>
                    </RadioGroup>
                    <DatePicker v-else-if="item.tag === 'datePicker'" :value="value[item.key]" @on-change="value[item.key]=$event" :type="item.dateType" :format="item.format" :options="item.dateOptions" :placeholder="item.placeholder || '请选择时间'" style="width:100%" clearable></DatePicker>
                    <span v-else>未知控件类型</span>
                </FormItem>
            </template>
            <FormItem class="footer-btns">
                <slot name="footer">
                    <Button @click="cancel">{{cancelText}}</Button>
                    <Button type="primary" :loading="loading" @click="submit">{{confirmText}}</Button>
                </slot>
            </FormItem>
        </Form>
    </Modal>
</template>
<script>
/**
 * formFields接受数组，数组每一项是一个对象
 * {
 *  key, // 键名 入参名称
 *  label,
 *  prop,
 *  rules, // 验证规则 数组类型
 *  tag, // 根据不同的tag渲染不同的标签
 *  type, //tag为input时，不同的类型
 *  placeholder,
 *  options, // tag为select时，option项
 *  optionValuekey, // 可以是字符串也可以是数组类型
 *  optionNamekey
 *  optionsUrl // 远程接口地址
 * }
 */
import { isType } from "@/utils/index";
export default {
  data() {
    return {
      dialogVisible: this.visible,
      ajaxOptions: [],
    };
  },
  props: {
    title: String,
    visible: {
      type: Boolean,
      default: false,
    },
    width: {
      type: [String, Number],
    },
    formConfig: {
      type: Object,
      default: () => ({}),
    },
    formFields: {
      type: Array,
      default: () => [],
    },
    value: {
      type: Object,
      required: true,
    },
    cancelText: {
      type: String,
      default: "取消",
    },
    confirmText: {
      type: String,
      default: "确定",
    },
    // 点击确定按钮时，确定按钮是否显示loading
    loading: {
      type: Boolean,
      default: false,
    },
    ajaxParams: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    Rules() {
      let filterArr = this.formFields.filter(item => item.rules);
      let map = {};
      filterArr.forEach(({ key, prop, rules }) => {
        prop && (map[key] = rules);
      });
      return map;
    },
    getOptionValuekey() {
      return function(option, item) {
        let { tag, key } = item;
        if (tag === "select") {
          let { optionValuekey } = this.formFields.find(
            field => field.key === key
          );
          if (isType("Array")(optionValuekey)) {
            // 处理option这种情况的 :value="item.id+','+item.name"
            let str = "";
            optionValuekey.forEach(val => {
              str += "," + option[val];
            });
            str = str.substr(1);
            return str;
          } else {
            return option[item.optionValuekey || "id"];
          }
        }
      };
    },
  },
  watch: {
    visible(val) {
      this.dialogVisible = val;
    },
  },
  mounted() {
    this.setDefaultValue();
    // 远程加载options数据
    this.getSyncOptions();
  },
  methods: {
    setDefaultValue() {
      const formData = { ...this.value };
      this.formFields.forEach(({ key, value = "" }) => {
        value = formData[key];
        formData[key] = value;
      });
      this.$emit("input", formData);
    },
    getSyncOptions() {
      let urlArr = this.formFields.filter(item => item.optionsUrl);
      if (urlArr.length !== 0) {
        urlArr.forEach(({ optionsUrl }) => {
          this.$http.get(optionsUrl, { params: this.ajaxParams }).then(res => {
            let { code, data, msg } = res;
            if (code === "0") {
              if (data) {
                if (isType("Object")(data)) {
                  this.ajaxOptions = data.data;
                } else {
                  this.ajaxOptions = data;
                }
              }
            } else {
              this.$Notice.error({
                title: "错误提示",
                desc: msg,
              });
            }
          });
        });
      }
    },
    handleInput(val, key) {
      val = val.replace(/\s+/g, "");
      this.$emit("input", { ...this.value, [key]: val });
    },
    handleSelectChange(val, key) {
      this.$emit("change-select", val, key);
      this.$emit("input", { ...this.value, [key]: val });
    },
    cancel() {
      this.$refs["form"].resetFields();
      this.$emit("cancel");
    },
    submit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          this.$emit("submit");
        }
      });
      this.$emit("input", this.value);
    },
  },
};
</script>
<style lang="less" scoped>
// 模态框居中
/deep/ .vertical-center-modal {
  display: flex;
  align-items: center;
  justify-content: center;

  .ivu-modal {
    top: 0;
  }
}
.footer-btns {
  margin-bottom: 0;
  /deep/ .ivu-form-item-content {
    margin-left: 0 !important;
    text-align: center;
    .ivu-btn {
      width: 108px;
      margin: 0 10px;
    }
  }
}
</style>
