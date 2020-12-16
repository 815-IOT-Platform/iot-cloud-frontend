<template>
  <page-view :avatar="avatar" :title="false">
    <div slot="headerContent">
      <div class="title">{{ timeFix }}，{{ user.userName }}<span class="welcome-text">，{{ welcome }}</span></div>
      <div>维保工程师 | 金城安防 - 维修维护服务部 - 安安运维平台</div>
    </div>
    <div slot="extra">
      <a-row class="more-info">
        <a-col :span="8">
          <head-info :title="$t('dashboard.workplace.project')" content="56" :center="false" :bordered="false"/>
        </a-col>
        <a-col :span="8">
          <head-info :title="$t('dashboard.workplace.teamRank')" content="8/24" :center="false" :bordered="false"/>
        </a-col>
        <a-col :span="8">
          <head-info :title="$t('dashboard.workplace.views')" content="2,223" :center="false" />
        </a-col>
      </a-row>
    </div>

    <div>
      <a-row :gutter="24">
        <a-col :xl="16" :lg="24" :md="24" :sm="24" :xs="24">
          <a-card :bordered="false" title="安安运维平台">
            <p><strong>安安运维平台</strong> 由安安运维（北京）科技有限公司搭建 <strong>主营业务：</strong>  <strong>维修、巡检、备品备件... </strong>等多维度业务。</p>
            <p><strong>公司官网 </strong><a href="https://ananops.com" target="_blank">https://ananops.com</a></p>
            <p><strong>安安运维平台</strong> 依托北京市安全技术防范行业协会资源</p>
            <p><strong>安安运维平台</strong> 承接甲方用户对于安防系统效能提升、运营维保等需求。在平台层对接用户与服务商资源，以标准化，规范化的服务流程保证维保服务质量。</p>
            <ul>
              <li><h3>运营维保</h3></li>
              <p>为用户提供完善的运营维保服务 <router-link to="/others/donateList">功能介绍</router-link></p>
              <li><h3>备品备件</h3></li>
              <p>平台提供用户备件库、服务商备件库以及平台自营备件库，充分保障维保过程中对备品备件的需求</p>
            </ul>
            <p><strong>运营操控平台 </strong><a href="https://ananops.com/console.html" target="_blank">https://ananops.com/console.html</a></p>
          </a-card>

          <a-card title="公司消息" :bordered="false">
            <a-timeline mode="left">
              <a-timeline-item :color="item.color" :key="index" v-for="(item, index) in changeList">
                <p><strong>{{ item.title }}</strong></p>
                <p :key="i" v-for="(c, i) in item.list" class="changList">{{ c }}</p>
              </a-timeline-item>
            </a-timeline>
          </a-card>
        </a-col>
        <a-col
          style="padding: 0 12px"
          :xl="8"
          :lg="24"
          :md="24"
          :sm="24"
          :xs="24">
          <a-card title="公司及平台相关介绍视频" style="margin-bottom: 24px" :bordered="false" :body-style="{padding: 0}">
            <div style="margin:1px">
              <iframe
                src="//player.bilibili.com/player.html?aid=95044508&cid=162255217&page=1"
                scrolling="no"
                border="0"
                frameborder="no"
                framespacing="0"
                allowfullscreen="true"
                style="width:100%;height:400px;"
              >
              </iframe>
            </div>

          </a-card>
          <a-card title="协会动态" style="margin-bottom: 24px" :bordered="false" :body-style="{padding: 0}">
            <h3 style="margin: 12px 26px">【新会员】热烈欢迎安安运维（北京）科技有限公司加入北安协</h3>
            <ul>
              <li><h4>北京安全防范行业协会</h4></li>
              <p>热烈欢迎 安安运维（北京）科技有限公司 加入北京安全防范行业协会，感谢您对协会的信任！协会将继续发挥桥梁和纽带作用，围绕着“找准定位，坚守本分；规范有制，运作有方；务实发展，树立威望”的工作方针，用市场化的服务机制，企业化的管理制度，提升自身能力，更好地为会员单位服务！请各会员单位与我们共同携手，为推动北京安防行业发展贡献力量！9</p>
            </ul>
            <h4 style="margin: 12px 26px"></h4>
            <a href="https://mp.weixin.qq.com/s/SM9x6oMvn6DSfBVNlqlMWw" target="_blank">
              <a-button type="primary" style="margin: 12px 26px">查看详情</a-button>
            </a>
          </a-card>
          <a-card title="相关产品" style="margin-bottom: 24px" :bordered="false" :body-style="{padding: 0}">
            <h3 style="margin: 12px 26px">请扫描下方二维码访问小程序</h3>
            <img style="width:100%" src="http://open.ananops.com/anan.bmp"/>
          </a-card>
          <!-- <a-card title="更新日志" style="margin-bottom: 24px" :bordered="false" :body-style="{padding: 0}">
            <a-collapse defaultActiveKey="0" accordion :bordered="false">
              <a-collapse-panel :header="item.title" :key="index" v-for="(item, index) in changeList">
                <p :key="i" v-for="(c, i) in item.list">{{ c }}</p>
              </a-collapse-panel>
            </a-collapse>
          </a-card> -->
          <a-card title="联系信息" :bordered="false" >
            <a-row>
              <a-col :span="4"><a-icon type="qq" />QQ</a-col>
              <a-col :span="20"><a href="https://jq.qq.com/?_wv=1027&k=5JGXHPD" target="_blank"><a-button type="primary" size="small">xxxxx</a-button></a> 点击按钮联系客服</a-col>
            </a-row>
          </a-card>
        </a-col>
      </a-row>
    </div>
  </page-view>
</template>

<script>
import { timeFix } from '@/utils/util'
import { mapState } from 'vuex'
import { PageView } from '@/layouts'
import HeadInfo from '@/components/tools/HeadInfo'
import DetailList from '@/components/tools/DetailList'
import { getRoleList, getServiceList } from '@/api/manage'
import { Radar } from '@/components'
import { Timeline } from 'ant-design-vue'
const TimelineItem = Timeline.Item
const DetailListItem = DetailList.Item
const DataSet = require('@antv/data-set')

export default {
  name: 'Workplace',
  components: {
    PageView,
    HeadInfo,
    DetailListItem,
    TimelineItem,
    Radar
  },
  data () {
    return {
      timeFix: timeFix(),
      avatar: '',
      user: {},

      projects: [],
      loading: true,
      radarLoading: true,
      activities: [],
      teams: [],

      // data
      axis1Opts: {
        dataKey: 'item',
        line: null,
        tickLine: null,
        grid: {
          lineStyle: {
            lineDash: null
          },
          hideFirstLine: false
        }
      },
      axis2Opts: {
        dataKey: 'score',
        line: null,
        tickLine: null,
        grid: {
          type: 'polygon',
          lineStyle: {
            lineDash: null
          }
        }
      },
      scale: [{
        dataKey: 'score',
        min: 0,
        max: 80
      }],
      axisData: [
        { item: '引用', a: 70, b: 30, c: 40 },
        { item: '口碑', a: 60, b: 70, c: 40 },
        { item: '产量', a: 50, b: 60, c: 40 },
        { item: '贡献', a: 40, b: 50, c: 40 },
        { item: '热度', a: 60, b: 70, c: 40 },
        { item: '引用', a: 70, b: 50, c: 40 }
      ],
      changeList: [
        { title: '【协会动态】协会安防系统维修维护运营中心正式运营',
          color: 'green',
          list: [
            '2019年11月18日，北京安全防范行业协会（以下简称协会）召开了协会安防系统维修维护运营中心（以下简称运营中心）正式运营会议，理事长单志刚，副理事长兼秘书长张莹，副理事长杜强出席会议并听取了运营中心筹备小组工作汇报。'
          ]
        }
      ],
      radarData: []
    }
  },
  computed: {
    ...mapState({
      nickname: (state) => state.user.nickname,
      welcome: (state) => state.user.welcome
    }),
    userInfo () {
      return this.$store.getters.userInfo
    }
  },
  created () {
    this.user = this.userInfo
    this.avatar = this.userInfo.avatar

    getRoleList().then(res => {
      // console.log('workplace -> call getRoleList()', res)
    })

    getServiceList().then(res => {
      // console.log('workplace -> call getServiceList()', res)
    })
  },
  mounted () {
    this.getTeams()
    this.initRadar()
  },
  methods: {
    getTeams () {
      this.$http.get('/workplace/teams')
        .then(res => {
          this.teams = res.result
          this.loading = false
        })
    },
    initRadar () {
      this.radarLoading = true

      this.$http.get('/workplace/radar')
        .then(res => {
          const dv = new DataSet.View().source(res.result)
          dv.transform({
            type: 'fold',
            fields: ['个人', '团队', '部门'],
            key: 'user',
            value: 'score'
          })

          this.radarData = dv.rows
          this.radarLoading = false
        })
    }
  }
}
</script>

<style lang="less" scoped>
.changList{
  margin-top: -14px;
}
.members {
    a {
      display: block;
      margin: 12px 0;
      line-height: 24px;
      height: 24px;
      .member {
        font-size: 14px;
        color: rgba(0, 0, 0, .65);
        line-height: 24px;
        max-width: 100px;
        vertical-align: top;
        margin-left: 12px;
        transition: all 0.3s;
        display: inline-block;
      }
      &:hover {
        span {
          color: #1890ff;
        }
      }
    }
  }
</style>
