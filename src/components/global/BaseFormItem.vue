<template>
  <div>
    <template v-for="(item,i) in fields">
      <FormItem :label="item.label" :prop="item.prop" v-if="item.isRender === undefined ? true : item.isRender">
        <Input v-if="!item.tag || item.tag==='input'" :type="item.type || 'text'" :value="item.key&&value[item.key]" @input="handleInput($event,item.key)" :placeholder="item.placeholder || item.label || '请输入'"></Input>
        <Select v-else-if="item.tag==='select'" :value="item.key&&value[item.key]" @on-change="handleSelectChange($event,item.key)" :placeholder="item.placeholder || '请选择'">
          <Option v-for="(option,index) in item.options || ajaxOptions" :key="index" :value="getOptionValuekey(option,item)">{{option[item.optionNamekey || 'name']}}</Option>
        </Select>
        <RadioGroup v-else-if="item.tag==='radioGroup'" :value="item.key&&value[item.key]" @on-change="handleChangeRadioGroup($event,item.key)">
          <Radio v-for="(radio,index) in item.radios" :key="index" :label="radio.id">{{radio.name}}</Radio>
        </RadioGroup>
        <DatePicker v-else-if="item.tag === 'datePicker'" :value="item.key&&value[item.key]" @on-change="handleChangeDate($event,item.key)" :type="item.dateType" :format="item.format" :options="item.dateOptions" :placeholder="item.placeholder || '请选择时间'" style="width:100%" clearable></DatePicker>
        <span v-else>未知控件类型</span>
      </FormItem>
    </template>
  </div>
</template>
<script>
/**
 * fields接受数组，数组每一项是一个对象
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
  name: "baseFormItem",
  data() {
    return {
      params: this.value,
    };
  },
  props: {
    fields: {
      type: Array,
      default: () => [],
    },
    value: {
      type: Object,
      required: true,
    },
    ajaxParams: {
      type: Object,
      default: () => {},
    },
  },
  computed: {
    getOptionValuekey() {
      return function(option, item) {
        let { tag, key } = item;
        if (tag === "select") {
          let { optionValuekey } = this.fields.find(field => field.key === key);
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
    value(newValue) {
      this.params = newValue;
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
      this.fields.forEach(({ key, value = "" }) => {
        if (key) {
          value = formData[key];
          formData[key] = value;
        }
      });
      this.$emit("input", formData);
    },
    getSyncOptions() {
      let urlArr = this.fields.filter(item => item.optionsUrl);
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
      key && this.$emit("input", { ...this.value, [key]: val });
    },
    handleSelectChange(val, key) {
      if (key) {
        this.$emit("change-select", val, key);
        this.$emit("input", { ...this.value, [key]: val });
      }
    },
    handleChangeRadioGroup(val, key) {
      key && this.$emit("input", { ...this.value, [key]: val });
    },
    handleChangeDate(val, key) {
      key && this.$emit("input", { ...this.value, [key]: val });
    },
  },
};
</script>
