<template>
  <div>
    <table>
      <tbody>
        <tr v-for="floor in floors" :key="floor">
          <td v-if="floor === currentFloor" class="container">
            <img src="../assets/cell.jpg" />
            <pre class="centered">{{ peopleInElevator.length }}</pre>
          </td>
          <td v-else class="floor">{{ floor }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'Elevator',
  props: {
    floors: Array,
    currentFloor: Number,
    peopleInElevator: Array,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  position: relative;
  text-align: center;
  color: white;
}

/* Centered text */
.centered {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.floor {
  border: solid 1px black;
  width: 150px;
  height: 100px;
}
</style>
