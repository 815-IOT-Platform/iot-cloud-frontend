<template>
  <a-descriptions title="Edge Info" bordered :node="node">
    <a-descriptions-item label="OS Image">
      {{ node.nodeInfo.osImage }}
    </a-descriptions-item>
    <a-descriptions-item label="Architecture">
      {{ node.nodeInfo.architecture }}
    </a-descriptions-item>
    <a-descriptions-item label="Operating System">
      {{ node.nodeInfo.operatingSystem }}
    </a-descriptions-item>
    <a-descriptions-item label="Container Version">
      {{ node.nodeInfo.containerRuntimeVersion }}
    </a-descriptions-item>
    <a-descriptions-item label="Kernel Version">
      {{ node.nodeInfo.kernelVersion }}
    </a-descriptions-item>
    <a-descriptions-item label="Kubelet Version">
      {{ node.nodeInfo.kubeletVersion }}
    </a-descriptions-item>
    <a-descriptions-item v-if="node.status === 'RUNNING'" label="Status" :span="3">
      <a-badge status="processing" text="Running" />
    </a-descriptions-item>
    <a-descriptions-item v-else-if="node.status === 'CRASHED'" label="Status" :span="3">
      <a-badge status="error" text="Crashed" />
    </a-descriptions-item>
    <a-descriptions-item label="Capacity">
      cpu: {{ node.capacity.cpu }}
      <br />
      memory: {{ node.capacity.memory }}
      <br />
      pods: {{ node.capacity.pods }}
      <br />
    </a-descriptions-item>
    <a-descriptions-item label="Allocatable">
      cpu: {{ node.allocatable.cpu }}
      <br />
      memory: {{ node.allocatable.memory }}
      <br />
      pods: {{ node.allocatable.pods }}
      <br />
    </a-descriptions-item>
  </a-descriptions>
</template>

<script>
export default {
  name: 'nodeStatus',
  props: ['node']
}
</script>

<style scoped>

</style>