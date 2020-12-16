<template>
  <div>
    <a-table :columns="columns" :data-source="data" bordered>
      <div
        slot="filterDropdown"
        slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }"
        style="padding: 8px"
      >
        <a-input
          v-ant-ref="c => (searchInput = c)"
          :placeholder="`搜索 ${column.dataIndex}`"
          :value="selectedKeys[0]"
          style="width: 188px; margin-bottom: 8px; display: block;"
          @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
          @pressEnter="() => handleSearch(selectedKeys, confirm, column.dataIndex)"
        />
        <a-button
          type="primary"
          icon="search"
          size="small"
          style="width: 90px; margin-right: 8px"
          @click="() => handleSearch(selectedKeys, confirm, column.dataIndex)"
        >搜索</a-button>
        <a-button size="small" style="width: 90px" @click="() => handleReset(clearFilters)">重置</a-button>
      </div>
      <a-icon
        slot="filterIcon"
        slot-scope="filtered"
        type="search"
        :style="{ color: filtered ? '#108ee9' : undefined }"
      />
      <span slot="action">
        <a @click="toContractDetail(record)">合同详情</a>
        <a-divider type="verticle" />
        <a>修改</a>
        <a-divider type="verticle" />
        <a @click="toProjects(record)">查看所有项目</a>
      </span>
    </a-table>
    <a-button @click="onOpen">查看</a-button>
    <!--展示合同详情抽屉-->
    <a-drawer
      width="900"
      :visible="showContractDetailVisible"
      placement="right"
      :closable="true"
      @close="closeContractDetail"
    >
      <a-descriptions bordered :column="2" size="small">
        <a-descriptions-item label="合同唯一ID">{{ }}</a-descriptions-item>
        <a-descriptions-item label="合同编号"></a-descriptions-item>
        <a-descriptions-item label="合同名称"></a-descriptions-item>
        <a-descriptions-item label="合同类型"></a-descriptions-item>
        <a-descriptions-item label="用户方名称"></a-descriptions-item>
        <a-descriptions-item label="用户方ID"></a-descriptions-item>
        <a-descriptions-item label="服务方名称"></a-descriptions-item>
        <a-descriptions-item label="服务方ID"></a-descriptions-item>
        <a-descriptions-item label="用户方法人"></a-descriptions-item>
        <a-descriptions-item label="服务方法人"></a-descriptions-item>
        <a-descriptions-item label="服务方代理内容"></a-descriptions-item>
        <a-descriptions-item label="服务方开户银行"></a-descriptions-item>
        <a-descriptions-item label="服务方银行账号"></a-descriptions-item>
        <a-descriptions-item label="服务方供辅助金额"></a-descriptions-item>
        <a-descriptions-item label="合同开始时间"></a-descriptions-item>
        <a-descriptions-item label="合同结束时间"></a-descriptions-item>
        <a-descriptions-item label="合同签订时间"></a-descriptions-item>
        <a-descriptions-item label="付款时间"></a-descriptions-item>
        <a-descriptions-item label="支付方式"></a-descriptions-item>
        <a-descriptions-item label="项目金额"></a-descriptions-item>
        <a-descriptions-item label="服务方是否包备品备件"></a-descriptions-item>
        <a-descriptions-item label="服务方是否提供备品备件替换服务"></a-descriptions-item>
        <a-descriptions-item label="维修维护最迟响应时间（小时）"></a-descriptions-item>
        <a-descriptions-item label="月度记录表提交周期（天）"></a-descriptions-item>
      </a-descriptions>
      <a-descriptions bordered :columns="3" size="small">
        <a-descriptions-item label="合同是否变更"></a-descriptions-item>
        <a-descriptions-item label="合同是否作废"></a-descriptions-item>
        <a-descriptions-item label="合同是否自动顺延"></a-descriptions-item>
        <a-descriptions-item
          label="维修工身份验证流程"
          :span="3">111111111111111111111111111111111111111111111111111111111111111111111111111111111</a-descriptions-item>
        <a-descriptions-item label="合同描述" :span="3"></a-descriptions-item>
      </a-descriptions>
    </a-drawer>
    <!--展示项目列表抽屉-->
    <a-drawer
      width="1000"
      :visible="showProjectsVisible"
      placement="right"
      :closable="true"
      @close="closeProjects"
    >
      <a-page-header
        title="项目列表">
        <template slot="extra">
          <a-button @click="toNewProject" type="primary">新建项目</a-button>
        </template>
      </a-page-header>
      <a-table :columns="projectsColumns" :data-source="projectsData" bordered>
        <div
          slot="filterDropdown"
          slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }"
          style="padding: 8px"
        >
          <a-input
            v-ant-ref="c => (searchInput = c)"
            :placeholder="`搜索 ${column.dataIndex}`"
            :value="selectedKeys[0]"
            style="width: 188px; margin-bottom: 8px; display: block;"
            @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
            @pressEnter="() => handleSearch(selectedKeys, confirm, column.dataIndex)"
          />
          <a-button
            type="primary"
            icon="search"
            size="small"
            style="width: 90px; margin-right: 8px"
            @click="() => handleSearch(selectedKeys, confirm, column.dataIndex)"
          >搜索</a-button>
          <a-button size="small" style="width: 90px" @click="() => handleReset(clearFilters)">重置</a-button>
        </div>
        <a-icon
          slot="filterIcon"
          slot-scope="filtered"
          type="search"
          :style="{ color: filtered ? '#108ee9' : undefined }"
        />
        <span slot="projectAction">
          <a @click="toProjectDetail(record)">项目详情</a>
        </span>
      </a-table>
    </a-drawer>
    <!--展示项目详情抽屉-->
    <a-drawer
      width="1000"
      :visible="showProjectDetailVisible"
      placement="right"
      :closable="true"
      @close="closeProjectDetail"
    >
      <a-page-header
        title="项目详情">
        <template slot="extra">
          <a-button @click="toNewProject" type="primary">新建项目</a-button>
        </template>
      </a-page-header>
      <a-descriptions bordered :column="2" size="small">
        <a-descriptions-item label="项目编号"></a-descriptions-item>
        <a-descriptions-item label="项目名称"></a-descriptions-item>
        <a-descriptions-item label="用户公司编号"></a-descriptions-item>
        <a-descriptions-item label="服务商公司编号"></a-descriptions-item>
        <a-descriptions-item label="用户公司名称"></a-descriptions-item>
        <a-descriptions-item label="服务商公司名称"></a-descriptions-item>
        <a-descriptions-item label="用户负责人编号"></a-descriptions-item>
        <a-descriptions-item label="服务商负责人编号"></a-descriptions-item>
        <a-descriptions-item label="用户负责人姓名"></a-descriptions-item>
        <a-descriptions-item label="服务商负责人姓名"></a-descriptions-item>
        <a-descriptions-item label="用户负责人电话"></a-descriptions-item>
        <a-descriptions-item label="服务商负责人电话"></a-descriptions-item>
        <a-descriptions-item label="项目是否作废"></a-descriptions-item>
        <a-descriptions-item label="项目类型"></a-descriptions-item>
        <a-descriptions-item label="项目开始时间"></a-descriptions-item>
        <a-descriptions-item label="项目结束时间"></a-descriptions-item>
        <a-descriptions-item label="是否关联合同"></a-descriptions-item>
        <a-descriptions-item label="关联合同编号"></a-descriptions-item>
        <a-descriptions-item label="服务商联系方式"></a-descriptions-item>
        <a-descriptions-item label="服务商24小时移动电话"></a-descriptions-item>
        <a-descriptions-item label="服务商24小时值班电话"></a-descriptions-item>
        <a-descriptions-item label="服务商24小时联系邮箱"></a-descriptions-item>
        <a-descriptions-item label="用户相关联系人" :span="3"></a-descriptions-item>
        <a-descriptions-item label="项目相关描述" :span="3"></a-descriptions-item>
      </a-descriptions>
    </a-drawer>
    <a-drawer
      width="1000"
      :visible="showNewProject"
      placement="right"
      :closable="true"
      @close="closeNewProject"
    >
    </a-drawer>
  </div>
</template>

<script>
const columns = [ // 合同列表有哪些列
  {
    title: '序号',
    dataIndex: 'key',
    key: 'key'
  },
  {
    title: '合同名称',
    dataIndex: 'contractName',
    key: 'contractName',
    scopedSlots: {
      filterDropdown: 'filterDropdown',
      filterIcon: 'filterIcon',
      customRender: 'customRender'
    },
    onFilter: (value, record) =>
      record.contractName
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => {
          this.searchInput.focus()
        })
      }
    }
  },
  {
    title: '合同唯一编号',
    dataIndex: 'contractId',
    key: 'contractId',
    scopedSlots: {
      filterDropdown: 'filterDropdown',
      filterIcon: 'filterIcon',
      customRender: 'customRender'
    },
    onFilter: (value, record) =>
      record.contractId
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => {
          this.searchInput.focus()
        })
      }
    }
  },
  {
    title: '合同类型',
    dataIndex: 'contractType',
    key: 'contractType',
    filters: [
      { text: '制式合同', value: '制式合同' },
      { text: '自定义合同', value: '自定义合同' },
      { text: '其他', value: '其他' }
    ],
    onFilter: (value, filters) =>
      filters.contractType
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => {
          this.searchInput.focus()
        })
      }
    }
  },
  {
    title: '服务方组织名称',
    dataIndex: 'partyAName',
    key: 'partyAName',
    scopedSlots: {
      filterDropdown: 'filterDropdown',
      filterIcon: 'filterIcon',
      customRender: 'customRender'
    },
    onFilter: (value, record) =>
      record.partyAName
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => {
          this.searchInput.focus()
        })
      }
    }
  },
  {
    title: '操作',
    key: 'action',
    scopedSlots: { customRender: 'action' }
  }
]

const projectsColumns = [ // 项目列表有哪些列
  {
    title: '序号',
    key: 'key',
    dataIndex: 'key'
  },
  {
    title: '项目名称',
    dataIndex: 'projectName',
    key: 'projectName',
    scopedSlots: {
      filterDropdown: 'filterDropdown',
      filterIcon: 'filterIcon',
      customRender: 'customRender'
    },
    onFilter: (value, record) =>
      record.projectName
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => {
          this.searchInput.focus()
        })
      }
    }
  },
  {
    title: '项目唯一ID',
    dataIndex: 'projectId',
    key: 'projectId',
    scopedSlots: {
      filterDropdown: 'filterDropdown',
      filterIcon: 'filterIcon',
      customRender: 'customRender'
    },
    onFilter: (value, record) =>
      record.projectId
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => {
          this.searchInput.focus()
        })
      }
    }
  },
  {
    title: '项目类型',
    dataIndex: 'projectType',
    key: 'projectType',
    filters: [
      { text: '维修项目', value: '维修项目' },
      { text: '巡检项目', value: '巡检项目' },
      { text: '其他项目', value: '其他项目' }
    ],
    onFilter: (value, filters) =>
      filters.projectType
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => {
          this.searchInput.focus()
        })
      }
    }
  },
  {
    title: '状态',
    dataIndex: 'projectState',
    key: 'projectState',
    filters: [
      { text: '有效', value: '有效' },
      { text: '作废', value: '作废' }
    ],
    onFilter: (value, filters) =>
      filters.projectState
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => {
          this.searchInput.focus()
        })
      }
    }
  },
  {
    title: '操作',
    key: 'action',
    scopedSlots: { customRender: 'projectAction' }
  }
]
const data = [ // 合同列表数据（有真数据后可以删掉）
  {
    key: '1',
    contractName: 'abcdef',
    contractId: '12345',
    contractType: '其他',
    partyAName: 'liu123'
  },
  {
    key: '2',
    contractName: 'abcxyz',
    contractId: '12345678',
    contractType: '制式合同',
    partyAName: 'liupeihan'
  }
]
const projectsData = [
  {
    key: '1',
    projectName: 'liupeihan的项目',
    projectType: '巡检类型',
    projectState: '有效'
  }
]
const contractDetail = [] // 合同详情
export default {
  name: 'ContractManager',
  data () {
    return {
      showContractDetailVisible: false,
      showProjectsVisible: false,
      showProjectDetailVisible: false,
      columns,
      projectsColumns,
      data,
      projectsData,
      contractDetail
    }
  },
  methods: {
    toContractDetail (record) {
      this.showContractDetailVisible = true
    },
    toProjects (record) {
      this.showProjectsVisible = true
    },
    toProjectDetail (record) {
      this.showProjectDetailVisible = true
    },
    toNewProject (record) {

    },
    closeContractDetail () {
      this.showContractDetailVisible = false
    },
    closeProjects () {
      this.showProjectsVisible = false
    },
    closeProjectDetail () {
      this.showProjectDetailVisible = false
    },
    handleSearch (selectedKeys, confirm, dataIndex) {
      confirm()
      this.searchText = selectedKeys[0]
      this.searchedColumn = dataIndex
    },
    handleReset (clearFilters) {
      clearFilters()
      this.searchText = ''
    }
  }
}
</script>

<style scoped>
</style>
