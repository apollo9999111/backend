<template>
  <div class="table-basic-vue frame-page h-panel">
    <div class="h-panel-bar">
      <span class="h-panel-title">首页导航</span>
    </div>
    <div class="h-panel-body">
      <div class="float-box mb-10">
        <p-button
          glass="h-btn h-btn-primary"
          icon="h-icon-plus"
          permission="nav.store"
          text="添加"
          @click="create()"
        ></p-button>
      </div>
      <div class="float-box mb-10">
        <Table :loading="loading" :datas="datas">
          <TableItem prop="id" title="ID" :width="80"></TableItem>
          <TableItem prop="sort" title="升序" :width="80"></TableItem>
          <TableItem prop="name" title="链接" :wdith="120"></TableItem>
          <TableItem prop="url" title="url" :width="200"></TableItem>
          <TableItem prop="active_routes" title="active"></TableItem>
          <TableItem title="操作" align="center" :width="200">
            <template slot-scope="{ data }">
              <p-del-button permission="nav.destroy" @click="remove(datas, data)"></p-del-button>
              <p-button
                glass="h-btn h-btn-s h-btn-primary"
                permission="nav.edit"
                text="编辑"
                @click="edit(data)"
              ></p-button>
            </template>
          </TableItem>
        </Table>
      </div>
      <div class="float-box mb-10">
        <Pagination
          v-if="pagination.total > 0"
          align="right"
          v-model="pagination"
          @change="changePage"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pagination: {
        page: 1,
        size: 20,
        total: 0
      },
      datas: [],
      loading: false
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.getData(true);
    },
    changePage() {
      this.getData();
    },
    getData(reload = false) {
      if (reload) {
        this.pagination.page = 1;
      }
      this.loading = true;
      R.Nav.List(this.pagination).then(resp => {
        this.datas = resp.data.data;
        this.pagination.total = resp.data.total;
        this.loading = false;
      });
    },
    create() {
      this.$Modal({
        closeOnMask: false,
        hasCloseIcon: true,
        component: {
          vue: resolve => {
            require(['./create'], resolve);
          }
        },
        events: {
          success: (modal, data) => {
            modal.close();
            this.getData();
          }
        }
      });
    },
    remove(data, item) {
      R.Nav.Delete({ id: item.id }).then(resp => {
        HeyUI.$Message.success('成功');
        this.getData();
      });
    },
    edit(item) {
      this.$Modal({
        closeOnMask: false,
        hasCloseIcon: true,
        component: {
          vue: resolve => {
            require(['./edit'], resolve);
          },
          datas: {
            id: item.id
          }
        },
        events: {
          success: (modal, data) => {
            modal.close();
            this.getData();
          }
        }
      });
    }
  }
};
</script>
