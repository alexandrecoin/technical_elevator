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
          >
            {{ button }}
          </button>
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
  },
  methods: {
    callElevator(floor, e) {
      this.$emit('callElevator', floor, {
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
  /* outline: none; */
}
</style>
