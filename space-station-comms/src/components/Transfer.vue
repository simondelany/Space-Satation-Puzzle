<template>
  <div class="transfer">
    <p class="area-title">{{ type }}</p>
    <div id="confirm-transfer"
      class="submit"
      v-bind:class="{disabled: disabled}"
      @click="startTransfer">
      {{ msg }}
    </div>
    <div class="console">
        <crew v-for="(person, index) of crew"
            v-bind:key="index"
            :data="person"/>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Person } from '@/store/Person.ts'
import Crew from '@/components/Crew.vue'

@Component({
  components: {
    Crew
  }
})
export default class StationModule extends Vue {
  @Prop() private status!: boolean
  @Prop() private crew!: Person[]
  @Prop() private selectedCrew!: Person[]
  @Prop() private transferCapacity!: number

  get type () {
    return (this.status) ? 'Return' : 'Outward'
  }

  get disabled () {
    return this.selectedCrew.length !== this.transferCapacity
  }

  get msg () {
    return (this.disabled) ? 'Transfer' : 'Click to Transfer'
  }

  private startTransfer () {
    if (!this.disabled) {
      this.$emit('startTransfer')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/styles/definitions/_variables.scss";
  .transfer {
    padding: 0;

    .console {
      height: 60%;
      padding: 0;
      background-color: black;
      border: none;
    }
  }

  #confirm-transfer {
    height: 3vmin;
    padding: 0.5vmin;
    background-color: blue;
    color: $color-primary;
    border: 1px solid;
    margin-top: 5%;
  }

  #confirm-transfer.disabled {
    background-color: $background-darkest;
    color: $color-secondary;
  }

</style>
