<template>
  <div>
    <Button type="primary" @click="visible=true">弹窗表单</Button>
    <dialog-form title="弹窗表单" :visible="visible" :formConfig="{labelWidth:80}" @cancel="visible=false" @submit="handleSubmit">
      <BaseFormItem :fields="formFields" v-model="formParams"></BaseFormItem>
    </dialog-form>
    <filter-group :formConfig="{labelWidth:68}">
      <BaseFormItem :fields="filterFields" v-model="filterParams"></BaseFormItem>
      <template v-slot:extra>
        <Button type="primary">新增</Button>
        <Button>导出</Button>
      </template>
    </filter-group>
    <filter-group :formConfig="{labelPosition:'top'}">
      <BaseFormItem :fields="filterFields" v-model="filterParams"></BaseFormItem>
      <template v-slot:extra>
        <Button type="primary">新增</Button>
        <Button>导出</Button>
      </template>
    </filter-group>
    <base-table :dataContent="tableData" :cols="cols"></base-table>
    <result status="404" title="404" subtitle="页面没有找到，跑到火星上面去了">
      <template #extra>
        <div>信息提交哈啊哈</div>
      </template>
      <template #actions>
        <Button type="primary">返回修改</Button>
      </template>
    </result>
    <empty>
      <template #extra>
        <Button type="primary">去首页</Button>
      </template>
    </empty>
    <Row style="background:#eee;padding:20px">
      <Col span="6">
      <Card>
        <statistic title="Feekbook" value="11" suffix="%"></statistic>
      </Card>
      </Col>
      <Col span="6" offset="1">
      <Card>
        <statistic title="Feekbook" :value="11" suffix="%" :valueStyle="{color: '#3f8600'}">
          <template #prefix>
            <Icon type="md-arrow-up" size="24" />
          </template>
        </statistic>
      </Card>
      </Col>
    </Row>
  </div>
</template>

<script>
import http from "@/api";
export default {
  name: "home",
  data() {
    return {
      visible: false,
      formParams: {
        name: "123",
        select: "1",
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
          key: "select",
          prop: "select",
          label: "select",
          options: [
            {
              id: "",
              name: "option",
            },
            {
              id: "1",
              name: "option1",
            },
            {
              id: "2",
              name: "option2",
            },
          ],
          rules: [
            { required: true, message: "请选择select", trigger: "change" },
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
      filterParams: {},
      filterFields: [
        {
          label: "用户名：",
          key: "username",
        },
        {
          label: "类型：",
          tag: "select",
          key: "type",
          width: 180,
          options: [
            {
              id: "1",
              name: "类型1",
            },
            {
              id: "2",
              name: "类型2",
            },
          ],
        },
      ],
      tableData: [
        {
          id: 1,
          name: "张珊",
        },
        {
          id: 2,
          name: "王哈桑",
        },
        {
          id: 3,
          name: "李四",
        },
      ],
      cols: [
        {
          title: "姓名",
          align: "center",
          key: "name",
        },
      ],
    };
  },
  mounted() {
    console.log(http);
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

