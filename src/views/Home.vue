<template>
  <div class="home">
    <h1>这是home组件</h1>
    <Button type="primary" @click="visible=true">表单弹窗1</Button>
    <dialog-form title="弹窗表单" :visible="visible" v-model="formParams" :formConfig="{labelWidth:60}" :formFields="formFields" @cancel="visible=false"></dialog-form>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      visible: false,
      formParams: {},
      formFields: [
        {
          key: "key1",
          label: "label1",
        },
        {
          tag: "select",
          key: "key2",
          label: "label2",
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
      ],
    };
  },
};
</script>
<style lang="less" scoped>
h1 {
  color: @primary-color;
}
</style>

