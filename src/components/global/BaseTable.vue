<template>
    <div class="portlet-table">
        <div class="table-heading" v-show="isTableHeader">
            <slot name="tableHeader">
                <div class="table-title-left">
                    <slot name="toolTitle">
                        <Icon type="navicon-round"></Icon>
                        <span>数据列表</span>
                    </slot>
                </div>
                <div class="table-title-right">
                    <slot name="toolBtns"></slot>
                </div>
            </slot>
        </div>
        <div class="table-body">
            <slot name="table">
                <Table ref='selection' :loading="loading" border :columns="cols" :data="url?tableData:dataContent" @on-select="handleSelectRow" @on-select-cancel="handleCancelRow" @on-select-all="handleSelectAll" @on-select-all-cancel="handleSelectAll"></Table>
            </slot>
        </div>
        <div class="table-footer" v-show="isTableFooter">
            <slot name="tableFooter">
                <div class="footer_left">
                    <slot name="handleLeft"></slot>
                </div>
                <div class="footer_right">
                    <slot name="handleRight">
                        <Page ref="paging" style="text-align: right;" v-if="pagingOption.showPaging" :total="url?total:totalSize" :page-size="tableParams.pageSize" :show-elevator="pagingOption.showElevator" :show-sizer="pagingOption.showSizer" :show-total="pagingOption.showTotal" @on-change="onPageNumChange" @on-page-size-change='onPageSizeChange'></Page>
                    </slot>
                </div>
            </slot>
        </div>
    </div>
</template>
<script>
import qs from "qs";
import { mapMutations } from "vuex";
export default {
  data: function() {
    return {
      tableData: [],
      loading: false,
      total: 0,
      initPage: 1,
      selectedItems: new Set(), //选中的集合
    };
  },
  props: {
    isTableHeader: {
      type: Boolean,
      default: false,
    },
    isTableFooter: {
      type: Boolean,
      default: true,
    },
    dataContent: {
      type: Array,
      default: function() {
        return [];
      },
    },
    totalSize: {
      type: Number,
      default: 0,
    },
    url: {
      type: String,
      require: true,
    },
    pagingOption: {
      type: Object,
      default: function() {
        return {
          showPaging: true,
          showTotal: true,
          showElevator: true,
          showSizer: true,
        };
      },
    },
    //传给后台的参数
    tableParams: {
      type: Object,
      default: function() {
        return {
          pageNum: 1,
          pageSize: 10,
        };
      },
    },
    cols: {},
    checkBox: {
      type: Boolean,
      default: true,
    },
    // 多选选中列表返回类型  all-表示当前列表的所有数据 id-表示当前选中的id集合
    dataType: {
      type: String,
      default: "id",
      validator: function(value) {
        return ["all", "id"].indexOf(value) !== -1;
      },
    },
    // 表格数据的唯一标识
    uid: {
      type: String,
      default: "id",
    },
  },
  watch: {
    // 解决同一个页面多个自定义table组件，数据会出现问题
    url(val) {
      this.getData();
    },
  },
  methods: {
    ...mapMutations(["setTableTotalSize"]),
    getData() {
      this.loading = true;
      this.$http
        .get(this.url, {
          params: this.tableParams,
          paramsSerializer: params => {
            return qs.stringify(params, { indices: false });
          },
        })
        .then(res => {
          this.loading = false;
          let { code, data, msg } = res;
          if (code == 0) {
            this.tableData = data.data;
            this.total = data.totalSize - 0;
            this.setTableTotalSize(this.total);
            this.updateChecked();
          } else {
            this.$Notice.error({
              title: "错误提示",
              desc: msg,
            });
          }
        });
    },
    onPageNumChange(pageNum) {
      if (this.url) {
        this.tableParams.pageNum = pageNum;
        this.getData();
      }
    },
    onPageSizeChange(pageSize) {
      if (this.url) {
        this.tableParams.pageSize = pageSize;
        this.getData();
      }
    },
    // 选中某一行触发
    handleSelectRow(selection, row) {
      this.handleAddItems(row);
      this.$emit("onSelectionChange", [...this.selectedItems]);
    },
    // 取消某一行触发
    handleCancelRow(selection, row) {
      if (this.dataType === "id") {
        this.selectedItems.delete(row[this.uid]);
      } else if (this.dataType === "all") {
        let selectArr = [...this.selectedItems];
        let index = selectArr.findIndex(
          item => item[this.uid] === row[this.uid]
        );
        selectArr.splice(index, 1);
        this.selectedItems = new Set(selectArr);
      }
      this.$emit("onSelectionChange", [...this.selectedItems]);
    },
    // 全选和取消全选触发
    handleSelectAll(selection) {
      if (selection.length === 0) {
        //若取消全选删除保存在selectedItems里面和当前table一致的数据，达到当前页取消全选的功能
        let data = this.$refs.selection.data; //当前页table数据
        data.forEach(item => {
          if (this.dataType === "id") {
            if (this.selectedItems.has(item[this.uid])) {
              this.selectedItems.delete(item[this.uid]);
            }
          } else if (this.dataType === "all") {
            let selectArr = [...this.selectedItems];
            let index = selectArr.findIndex(
              v => v[this.uid] === item[this.uid]
            );
            if (index !== -1) {
              selectArr.splice(index, 1);
              this.selectedItems = new Set(selectArr);
            }
          }
        });
      } else {
        selection.forEach(item => {
          this.handleAddItems(item);
        });
      }
      this.$emit("onSelectionChange", [...this.selectedItems]);
    },
    handleAddItems(item) {
      if (this.dataType === "id") {
        this.selectedItems.add(item[this.uid]);
      } else if (this.dataType === "all") {
        this.selectedItems.add(item);
      }
    },
    // 分页保留勾选状态
    updateChecked() {
      let data = this.tableData;
      for (let index in data) {
        let item = data[index];
        if (this.dataType === "id") {
          if (this.selectedItems.has(item[this.uid])) {
            item._checked = true;
          }
        } else if (this.dataType === "all") {
          let selectArr = [...this.selectedItems];
          let index = selectArr.findIndex(v => v[this.uid] === item[this.uid]);
          if (index !== -1) {
            item._checked = true;
          }
        }
      }
    },
  },
  mounted() {
    if (this.url) {
      this.getData();
    }
  },
  created() {
    if (this.checkBox) {
      let index = this.cols.findIndex(item => item.type === "selection");
      if (index) {
        this.cols.unshift({
          type: "selection",
          width: 60,
          align: "center",
        });
      }
    }
  },
};
</script>
<style lang="less" scoped>
.portlet-table {
  background: #f3f3f3;

  .table-heading {
    height: 50px;
    line-height: 50px;
    padding: 0 20px;
    background: #f3f3f3;
    border: 1px solid #e4e4e4;
    border-bottom: 0;
    color: #666;
    overflow: hidden;

    .table-title-left {
      line-height: 50px;
      float: left;
    }

    .table-title-right {
      float: right;

      .ivu-btn {
        margin-left: 5px;
        min-width: 80px;
      }
    }
  }

  .table-body {
    background: #fff;
  }

  .table-footer {
    height: 50px;
    line-height: 48px;
    background: #fff;
    border: 1px solid #e4e4e4;
    border-top: 0;
    padding: 0 15px;

    .footer_left {
      float: left;
      line-height: 48px;
      .btn-text {
        cursor: pointer;
      }
      .ivu-btn {
        margin-left: 10px;
      }
    }

    .ivu-page {
      text-align: right;
    }
  }
}
</style>