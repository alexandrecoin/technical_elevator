function moveUp() {
  return new Promise((resolve) => {
    setTimeout(() => {
      this.currentFloor++;
      resolve('Floor updated');
    }, 500);
  });
}

function moveDown() {
  return new Promise((resolve) => {
    setTimeout(() => {
      this.currentFloor--;
      resolve('Floor updated');
    }, 500);
  });
}

function waitForPerson() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('Waited');
    }, 1000);
  });
}

export default {
  moveUp,
  moveDown,
  waitForPerson,
};
