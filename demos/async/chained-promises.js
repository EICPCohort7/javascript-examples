/* eslint-disable no-unreachable */
const p1 = new Promise((resolve, reject) => {
  resolve('Init: Success!');
});

// Chain 1
p1.then((resultL1) => {
  console.log(resultL1); // Init: Success!
  return 10;
})
  .then((resultL2) => {
    console.log(resultL2); // 10
    return 'Sara';
  })
  .then((resultL3) => {
    console.log(resultL3); // Sara
  })
  .then((resultL4) => {
    console.log(resultL4); // prints "undefined"
  });

// Chain 2: Error handling
p1.then((resultL1) => {
  console.log(resultL1); // Init: Success!
  throw new Error('oh no');
  return 10;
})
  .then((resultL2) => {
    console.log(resultL2); // 10
    return 'Sara';
  })
  .then((resultL3) => {
    console.log(resultL3); // Sara
  })
  .catch((error) => {
    console.error('Something went wrong:', error);
  });

// Chain 3: Jumping tracks
p1.then((resultL1) => {
  console.log(resultL1); // Init: Success!
  return 'Level 1';
})
  .then((resultL2) => {
    console.log(resultL2); // Level 1
    throw new Error('Error: level 2');
    return 'Level 2';
  })
  .then((resultL3) => {
    console.log('We never see this');
    return 'Level 3';
  })
  .catch((error) => {
    console.error('Caught errors up to Level 3:', error);
    throw error;
    // return Promise.reject(error)
  })
  .then(
    (resultL4) => {
      console.log('Level 4 results', resultL4); // Level 4
    },
    (error) => {
      console.error('Level 4 error:', error);
    }
  );
