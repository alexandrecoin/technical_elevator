<template>
  <table>
    <tbody>
      <tr v-for="floor in floors" :key="floor">
        <td class="floor">
          <button
            v-for="button in buttons"
            :key="button"
            :value="button"
            @click="callElevator(floor, $event)"
            :disabled="button === floor"
          >
            {{ button }}
          </button>
          <div>{{ passengers(floor) }}</div>
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
export default {
  name: 'Panel',
  props: {
    floors: Array,
    buttons: Array,
    currentFloor: Number,
    peopleWaitingOnFloors: Array,
  },
  computed: {
    passengers() {
      return (floor) =>
        this.peopleWaitingOnFloors.filter((person) => person.from === floor)
          .length;
    },
  },
  methods: {
    callElevator(floor, e) {
      this.$emit('callElevator', {
        from: floor,
        to: +e.target.value,
      });
    },
  },
};
</script>
<style scoped>
.floor {
  border: solid 1px black;
  border-radius: 10px;
  width: 150px;
  height: 100px;
}

button {
  width: 2em;
  height: 2em;
  border-radius: 50%;
}
</style>
