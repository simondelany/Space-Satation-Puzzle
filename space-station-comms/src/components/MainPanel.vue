<template>
  <div class="main-panel">
    <h3>Main Panel</h3>
    <div class="h-container h-60">
        <comms-console />
        <control-panel />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'

import CommsConsole from '@/components/CommsConsole.vue'
import ControlPanel from '@/components/ControlPanel.vue'

@Component({
  components: {
    CommsConsole,
    ControlPanel
  }
})
export default class MainPanel extends Vue {
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
