<template>
  <div class="footer">
    <div class="links">
      <a
        href="https://ananops.com"
        target="_blank"
      >公司首页</a>
      <a
        href="https://ananops.com"
        target="_blank"
      >
        <a-icon type="github" />
      </a>
      <a href="http://www.bspia.com">北京安全防范行业协会</a>
    </div>
    <div class="copyright">
      Copyright
      <a-icon type="copyright" /> 2020 <span>安安运维（北京）科技有限公司</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GlobalFooter',
  data () {
    return {}
  }
}
</script>

<style lang="less" scoped>
.footer {
  padding: 0 16px;
  margin: 48px 0 24px;
  text-align: center;

  .links {
    margin-bottom: 8px;

    a {
      color: rgba(0, 0, 0, 0.45);

      &:hover {
        color: rgba(0, 0, 0, 0.65);
      }

      &:not(:last-child) {
        margin-right: 40px;
      }
    }
  }
  .copyright {
    color: rgba(0, 0, 0, 0.45);
    font-size: 14px;
  }
}
</style>
