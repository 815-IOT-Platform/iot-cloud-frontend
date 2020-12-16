<template>
  <page-view>
    <a-card :bordered="false">

      <div class="table-operator">
        <a-button v-if="addEnable" type="primary" icon="plus" @click="$refs.modal.add()">新建</a-button>
      </div>

      <s-table size="default" ref="table" rowKey="id" :columns="columns" :data="loadData">
        <span slot="serial" slot-scope="text, record, index">{{ index + 1 }}</span>
        <span slot="action" slot-scope="text, record">
          <a v-if="logEnabel" @click="handleLogs(record)">日志</a>
          <a-divider type="vertical" />
          <a v-if="detailEnabel" @click="handleDetail(record)">详情</a>
          <a-divider type="vertical" />
          <a v-if="editEnabel" @click="handleEdit(record)">编辑</a>
          <a-divider type="vertical" />
          <a v-if="removeEnable" @click="deleteItem(record)">删除</a>
        </span>
      </s-table>

      <new-item-modal ref="modal" @ok="handleOk" />

    </a-card>
  </page-view>
</template>

<script>
import { STable } from '@/components'
import { PageView } from '@/layouts'
import NewItemModal from './modules/NewItemModal'
import { checkPermission } from '@/utils/permissions'
import { getTaskItem, transformListII, deleteMdmcTaskItem } from '@/api/mdmc'

export default {
  name: 'TaskItemList',
  components: {
    PageView,
    STable,
    NewItemModal
  },
  data () {
    return {
      visible: false,
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 }
      },
      form: this.$form.createForm(this),
      mdl: {},
      permissions: [],
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      // 表头
      columns: [
        {
          title: '序号',
          scopedSlots: { customRender: 'serial' }
        },
        {
          title: '维修任务ID',
          dataIndex: 'taskId'
        },
        {
          title: '子项ID',
          dataIndex: 'id'
        },
        {
          title: '设备名称',
          dataIndex: 'deviceName'
        },
        {
          title: '设备编号',
          dataIndex: 'deviceId'
        },
        {
          title: '故障地址',
          dataIndex: 'troubleAddres'
        },
        {
          title: '故障等级',
          dataIndex: 'level'
        },
        {
          title: '故障描述',
          dataIndex: 'description'
        },
        {
          title: '操作',
          width: '200px',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      // 加载数据方法 必须为 Promise 对象
      loadData: parameter => {
        this.queryParam = {
          id: 2,
          taskId: this.$route.params.id
        }
        return getTaskItem(Object.assign(parameter, this.queryParam))
          .then(res => {
            res = transformListII(res)
            return res
          })
      },
      addEnable: checkPermission('system:dict:add'),
      editEnabel: checkPermission('system:dict:edit'),
      removeEnable: checkPermission('system:dict:remove'),
      detailEnabel: true,
      logEnabel: true
    }
  },
  created () {
  },
  methods: {
    handleEdit (record) {
      this.$refs.modal.edit(record)
    },
    handleOk () {
      this.$refs.table.refresh(true)
      console.log('handleSaveOk')
    },
    handleDetail (record) {
      this.$router.push({ path: `/mdmc/taskItemDetail/${record.id}` })
    },
    handleLogs (record) {
      this.$router.push({ path: `/mdmc/taskItemLog/${record.id}` })
    },
    dataModal (taskId) {
      this.$refs.modal.show(taskId)
    },
    deleteItem (record) {
      deleteMdmcTaskItem(record.id).then(res => {
        this.$message.success(`删除成功`)
        window.location.reload()
        // this.$router.go(0)
      })
    }
  },
  watch: {
    /*
      'selectedRows': function (selectedRows) {
        this.needTotalList = this.needTotalList.map(item => {
          return {
            ...item,
            total: selectedRows.reduce( (sum, val) => {
              return sum + val[item.dataIndex]
            }, 0)
          }
        })
      }
      */
  }
}
</script>
