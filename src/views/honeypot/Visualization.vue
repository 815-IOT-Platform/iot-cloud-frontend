<template>
  <div>
    <dv-flyline-chart-enhanced class="flyline-chart" :config="config" dev style="width:100%;height:100%;" />
  </div>
</template>

<script>

export default {
  name: 'visualization',
  data () {
    return {
      config: {
        icon: {
          show: true,
          // src: require('../assets/img/zuobiao.png'),
          width: 50,
          height: 50
        },
        points: [
          {
            name: '内蒙古',
            coordinate: [0.59, 0.37],
            icon: {
              show: true,
              // src: require('../assets/img/zuobiao-center.png'),
              width: 50,
              height: 50
            },
            halo: {
              show: true,
            },
          },
          {
            name: '青海省',
            coordinate: [0.36, 0.52]
          },
          {
            name: '四川省',
            coordinate: [0.48, 0.66]
          },
          {
            name: '北京市',
            coordinate: [0.68, 0.35]
          },
        ],
        lines: [
          {
            source: '内蒙古',
            target: '青海省'
          },
          {
            source: '内蒙古',
            target: '四川省',
            color: '#00feff'
          },
          {
            source: '内蒙古',
            target: '北京市'
          },
        ],
        line: {
          width: 2
        },
      },
    }
  },
  beforeCreate () {

  },
  created () {

  },
  methods: {

  }
}
</script>
