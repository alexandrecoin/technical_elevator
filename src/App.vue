<template>
  <div id="app">
    <Elevator class="component" :floors="floors" :currentFloor="currentFloor" />
    <Panel
      class="component"
      :floors="floors"
      :buttons="buttons"
      :people="people"
      :currentFloor="currentFloor"
      @callElevator="runProcess"
    />
  </div>
</template>

<script>
import Elevator from './components/Elevator.vue';
import Panel from './components/Panel.vue';

export default {
  name: 'App',
  components: {
    Elevator,
    Panel,
  },
  data() {
    return {
      floors: [6, 5, 4, 3, 2, 1, 0],
      buttons: [0, 1, 2, 3, 4, 5, 6],
      people: [],
      currentFloor: 0,
    };
  },
  methods: {
    async runProcess(person) {
      this.people.push(person);
      console.log(this.people);
      await this.changeFloor(this.people);
    },

    changeFloor(people) {
      people.forEach(async (person) => {
        const { from, to } = person;
        let floorDifference = from - this.currentFloor;
        console.log(floorDifference);

        // MONTEE DE L'ASCENSEUR
        if (floorDifference > 0) {
          let i = this.currentFloor;
          for (i; i < from; i++) {
            await this.goUp();
          }
          //Reste à l'étage
          await this.waitForPerson();
          // Pour descendre par la suite
          if (to < this.currentFloor) {
            for (let j = this.currentFloor; j > to; j--) {
              await this.goDown();
            }
          }
          // Pour monter par la suite
          if (to > this.currentFloor) {
            for (let j = this.currentFloor; j < to; j++) {
              await this.goUp();
            }
          }
        }

        // DESCENTE DE L'ASCENSEUR
        if (floorDifference < 0) {
          let i = this.currentFloor;
          for (i; i > from; i--) {
            await this.goDown();
          }
          // Reste à l'étage
          await this.waitForPerson();
          // Pour descendre par la suite
          if (to < this.currentFloor) {
            for (let j = this.currentFloor; j > to; j--) {
              await this.goDown();
            }
          }

          // Pour monter par la suite
          if (to > this.currentFloor) {
            for (let j = this.currentFloor; j < to; j++) {
              await this.goUp();
            }
          }
        }
        this.people.shift();
      });
    },

    async goUp() {
      return new Promise((resolve) => {
        setTimeout(() => {
          this.currentFloor++;
          resolve('Floor updated');
        }, 500);
      });
    },

    async goDown() {
      return new Promise((resolve) => {
        setTimeout(() => {
          this.currentFloor--;
          resolve('Floor updated');
        }, 500);
      });
    },

    waitForPerson() {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve('Waited');
        }, 1000);
      });
    },
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  display: flex;
  flex-direction: row;
  text-align: center;
  justify-content: center;
  color: #2c3e50;
  margin-top: 60px;
}

.component {
  width: 20%;
}
</style>
