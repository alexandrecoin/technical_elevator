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
      await this.changeFloor(this.people);
    },

    changeFloor(people) {
      people.forEach(async (person) => {
        let floorDifference = person.from - this.currentFloor;
        if (floorDifference > 0) this.goUp(floorDifference, person);
        if (floorDifference < 0) this.goDown(floorDifference, person);
      });
      // this.people.shift();
    },

    async goUp(floorDifference, person) {
      // MONTEE DE L'ASCENSEUR
      if (floorDifference > 0) {
        let i = this.currentFloor;
        for (i; i < person.from; i++) {
          await this.moveUp();
        }
        //Reste à l'étage
        await this.waitForPerson();
        // Pour descendre par la suite
        if (person.to < this.currentFloor) {
          for (let j = this.currentFloor; j > person.to; j--) {
            await this.moveDown();
          }
        }
        // Pour monter par la suite
        if (person.to > this.currentFloor) {
          for (let j = this.currentFloor; j < person.to; j++) {
            await this.moveUp();
          }
        }
      }
    },
    async goDown(floorDifference, person) {
      // DESCENTE DE L'ASCENSEUR
      if (floorDifference < 0) {
        let i = this.currentFloor;
        for (i; i > person.from; i--) {
          await this.moveDown();
        }
        // Reste à l'étage
        await this.waitForPerson();
        // Pour descendre par la suite
        if (person.to < this.currentFloor) {
          for (let j = this.currentFloor; j > person.to; j--) {
            await this.moveDown();
          }
        }

        // Pour monter par la suite
        if (person.to > this.currentFloor) {
          for (let j = this.currentFloor; j < person.to; j++) {
            await this.moveUp();
          }
        }
      }
    },

    moveUp() {
      return new Promise((resolve) => {
        setTimeout(() => {
          this.currentFloor++;
          resolve('Floor updated');
        }, 500);
      });
    },

    moveDown() {
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
