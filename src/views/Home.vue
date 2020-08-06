<template>
  <div class="home">
    <Button type="primary" @click="visible=true">弹窗表单</Button>
    <dialog-form title="弹窗表单" :visible="visible" :formConfig="{labelWidth:80}" @cancel="visible=false" @submit="handleSubmit">
      <BaseFormItem :fields="formFields" v-model="formParams"></BaseFormItem>
    </dialog-form>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      visible: false,
      formParams: {
        name: "123",
      },
      formFields: [
        {
          label: "input",
          key: "name",
          prop: "name",
          rules: [{ required: true, message: "请输入input", trigger: "blur" }],
        },
        {
          tag: "select",
          label: "select",
          options: [
            {
              id: "1",
              name: "option1",
            },
            {
              id: "2",
              name: "option2",
            },
          ],
        },
        {
          tag: "datePicker",
          label: "datePicker",
        },
        {
          tag: "radioGroup",
          label: "radioGroup",
          key: "radioGroup",
          radios: [
            {
              id: "1",
              name: "radio1",
            },
            {
              id: "2",
              name: "radio2",
            },
          ],
        },
      ],
    };
  },
  methods: {
    handleSubmit() {
      console.log(this.formParams);
    },
  },
};
</script>
<style lang="less" scoped>
</style>

