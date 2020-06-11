<template>
  <div id="app">
    <Elevator
      class="component"
      :floors="floors"
      :currentFloor="currentFloor"
      :peopleInElevator="peopleInElevator"
    />
    <Panel
      class="component"
      :floors="floors"
      :buttons="buttons"
      :currentFloor="currentFloor"
      :peopleWaiting="peopleWaiting"
      @callElevator="addPeople"
    />
  </div>
</template>

<script>
import Elevator from './components/Elevator.vue';
import Panel from './components/Panel.vue';

import promises from './utils/promises';

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
      firstPassenger: [],
      peopleWaiting: [],
      peopleInElevator: [],
      currentFloor: 0,
    };
  },
  methods: {
    moveUp: promises.moveUp,
    moveDown: promises.moveDown,
    waitForPerson: promises.waitForPerson,
    async addPeople(person) {
      if (!this.firstPassenger.length) {
        this.firstPassenger.push(person);
        try {
          while (this.firstPassenger.length) {
            await this.changeFloor(this.firstPassenger[0]);
          }
        } catch (e) {
          console.log(e);
        }
      } else {
        this.peopleWaiting.push(person);
      }
    },

    async changeFloor(person) {
      let floorDifference = person.from - this.currentFloor;
      if (floorDifference > 0)
        await this.elevatorGoUpstairs(
          floorDifference,
          this.currentFloor,
          person,
        );
      if (floorDifference < 0)
        await this.elevatorGoDownstairs(floorDifference, person);
    },

    async elevatorGoUpstairs(floorDifference, currentFloor, person) {
      // Récupération du premier passager
      for (let i = currentFloor; i < person.from; i++) {
        await this.moveUp();
      }
      this.peopleInElevator.push(person);

      // Tri de l'ensemble des personnes qui attendent pour voir qui descend au plus bas niveau
      let peopleWaitingToGoDownstairs = this.peopleWaiting
        .filter((people) => people.direction === 'down')
        .sort((a, b) => b.from - a.from);
      let downstairsPassengers = [
        ...this.peopleInElevator,
        ...peopleWaitingToGoDownstairs,
      ];
      // --> Calcul du plus bas niveau à atteindre
      let minimumFloor = downstairsPassengers.reduce(
        (min, object) => (object.to < min ? object.to : min),
        downstairsPassengers[0].to,
      );
      console.log(minimumFloor);

      // Boucle sur les étages à parcourir
      if (person.direction === 'down') {
        for (let floor = person.from; floor > minimumFloor; floor--) {
          // Personnes qui montent dans l'ascenseur à l'étage "floor"
          if (
            peopleWaitingToGoDownstairs.filter(
              (person) => person.from === floor,
            ).length
          ) {
            await this.waitForPerson();
            let peopleGoingInElevator = peopleWaitingToGoDownstairs.filter(
              (person) => person.from === floor,
            );
            peopleGoingInElevator.map((person) => {
              this.peopleInElevator.push(person);
              let index = this.peopleWaiting.indexOf(person);
              // Suppression des passagers en attente 
              this.peopleWaiting.splice(index, 1);
              peopleWaitingToGoDownstairs.splice(index, 1);
            });
            console.log(peopleWaitingToGoDownstairs.length);
          }
          let peopleGoingDownstairs = this.peopleWaiting
            .filter((people) => people.direction === 'down')
            .sort((a, b) => b.to - a.to);

          // Pour personnes qui descendent de l'ascenseur à l'étage "floor"
          if (
            peopleGoingDownstairs.filter((person) => person.to === floor).length
          ) {
            console.log('descend');
            let peopleLeavingElevator = peopleWaitingToGoDownstairs.filter(
              (person) => person.to === floor,
            );

            peopleLeavingElevator.map((person) => {
              let index = this.peopleInElevator.indexOf(person);
              this.peopleInElevator.splice(index, 1);
            });
            await this.waitForPerson();
          }
          await this.moveDown();
        }
        this.peopleInElevator.shift();
      }
      this.firstPassenger.shift();
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
