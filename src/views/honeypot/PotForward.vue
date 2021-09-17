<template>
  <div>
    <iframe src="http://127.0.0.1:8080" id="mobsf" scrolling="no" frameborder="0" style="left: 240px; height: 1000px; right:0px;bottom:100px;"></iframe>
  </div>
</template>

<script>
export default {
  name: 'PotForward',
  mounted () {
    /**
     * iframe-宽高自适应显示
     */
    function changeMobsfIframe () {
      const mobsf = document.getElementById('mobsf');
      const deviceWidth = document.body.clientWidth;
      const deviceHeight = document.body.clientHeight;
      mobsf.style.width = (Number(deviceWidth)-240) + 'px';
      mobsf.style.height = (Number(deviceHeight)-64) + 'px';
    }

    changeMobsfIframe()

    window.onresize = function () {
      changeMobsfIframe()
    }
  }
}
</script>

<style scoped>

</style>