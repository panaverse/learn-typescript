
function delay(milliseconds: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, milliseconds);
  });
}

//Using `then`, `catch`, and `finally`:
delay(1000)
  .then(() => {
    console.log('The delay is over');
  })
  .catch((error) => {
    console.error('Something went wrong:', error);
  })
  .finally(() => {
    console.log('This is always executed');
  });


//Using `async/await`:  
try {
    await delay(1000);
    console.log('Await: The delay is over');
} catch (error) {
    console.error('Await: Something went wrong:', error);
} finally {
    console.log('Await: This is always executed');
}

//Now Do Coding from the following Article
//https://blog.logrocket.com/async-await-in-typescript/


//Review the tutorial and convert the code in TypeScript
//https://www.codingame.com/playgrounds/347/javascript-promises-mastering-the-asynchronous/what-is-asynchronous-in-javascript  
  
  