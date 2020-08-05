<template>
  <Modal :title="title" :value="dialogVisible" :width="width" footer-hide class-name="vertical-center-modal" @on-cancel="cancel">
    <Form ref="form" :model="formModel" :rules="Rules" :label-width="formConfig.labelWidth" :label-position="formConfig.labelPosition" :label-colon="formConfig.labelColon || false">
      <slot></slot>
      <FormItem class="footer">
        <slot name="footer">
          <Button @click="cancel">{{cancelText}}</Button>
          <Button type="primary" :loading="loading" @click="submit">{{confirmText}}</Button>
        </slot>
      </FormItem>
    </Form>
  </Modal>
</template>
<script>
export default {
  name: "dialogForm",
  data() {
    return {
      dialogVisible: this.visible,
      formModel: {},
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
  },
  computed: {
    Rules() {
      let map = {};
      let fields = [];
      this.$slots.default.forEach(vNode => {
        fields = [...fields, ...vNode.componentOptions.propsData.fields];
      });
      fields.filter(item => item.rules).forEach(({ key, prop, rules }) => {
        prop && (map[key] = rules);
      });
      return map;
    },
  },
  watch: {
    visible(val) {
      this.dialogVisible = val;
    },
  },
  mounted() {
    this.formModel = { ...this.getSlotComponent().params };
    this.getSlotComponent().fields.forEach(({ key, value = "" }) => {
      if (key) {
        value = this.formModel[key];
        this.formModel[key] = value;
      }
    });
  },
  methods: {
    cancel() {
      this.$refs["form"].resetFields();
      this.$emit("cancel");
    },
    getSlotComponent() {
      let fields = [];
      let params = {};
      this.$slots.default.forEach(vNode => {
        let component = vNode.componentInstance;
        fields = [...fields, ...component.fields];
        params = { ...params, ...component.params };
      });
      return { fields, params };
    },
    submit() {
      this.formModel = this.getSlotComponent().params;
      let formItems = this.getSlotComponent().fields;
      let flag = formItems.some(item => item.prop);
      if (flag) {
        this.$refs["form"].validate(valid => {
          if (valid) {
            this.$emit("submit");
          }
        });
      } else {
        this.$emit("submit");
      }
    },
  },
};
</script>
<style lang="less" scoped>
.footer {
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
