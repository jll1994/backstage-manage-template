<template>
  <Row type='flex' align='middle' class="portlet-filter">
    <Col class="portlet-filter__form">
    <Form inline :label-width="formConfig.labelWidth" :label-position="formConfig.labelPosition" :label-colon="formConfig.labelColon || false">
      <slot></slot>
      <Button type="primary" @click="search">查询</Button>
    </Form>
    </Col>
    <Col class="portlet-filter__extra">
    <slot name="extra"></slot>
    </Col>
  </Row>
</template>
<script>
export default {
  name: "filterGroup",
  props: {
    formConfig: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    search() {
      let params = {};
      this.$slots.default.forEach(vNode => {
        params = { ...params, ...vNode.componentOptions.propsData.value };
      });
      this.$emit("search", params);
    },
  },
};
</script>
<style lang="less" scoped>
.portlet-filter {
  padding: 15px 20px;
  margin-bottom: 20px;
  background: #fff;
  border: 1px solid #e4e4e4;

  .portlet-filter__form {
    flex: 1;
    /deep/ .ivu-form.ivu-form-inline {
      display: flex;
      align-items: center;
    }
    /deep/ .ivu-form.ivu-form-label-top.ivu-form-inline {
      display: flex;
      align-items: flex-end;
    }
    /deep/ .ivu-form-item {
      margin-bottom: 0;
    }
    /deep/ .ivu-btn {
      vertical-align: middle;
      margin-left: 10px;
    }
  }
  .portlet-filter__extra {
    text-align: right;

    /deep/ .ivu-btn {
      margin-left: 10px;
    }
  }
}
</style>

