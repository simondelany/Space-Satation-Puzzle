<template>
  <div class="h-container">
    <p class="person-name">Name:{{ data.name }}</p>
    <p class="person-transfer-time">Transfer time:<span>{{ data.transferTime }}</span></p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import { Person } from '@/store/Person.ts'

@Component
export default class Crew extends Vue {
  @Prop() private data!: Person

  private type () {
    return (this.data.status) ? 'Active' : 'Deceased'
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
@import "@/styles/definitions/_variables.scss";
  .transfer {
    padding-left: $grid-spacer;
    padding-right: $grid-spacer;

    .console {
        height: 30%;
        margin-top: 60%;
        padding: 0;
    }
  }

</style>
