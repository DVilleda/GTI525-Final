var delayedPromise = function (delay) {
  return new Promise(function (resolve, reject) {
    console.log("Delayed promise = " + delay);
    setTimeout(function () {
      resolve("I have waited for: " + delay);
    }, delay);
  });
};
//Commence en sequence
//Promise 2 commence seulement quand promise 1 a resolve
var sequentialStart = async () => {
  var slow = await delayedPromise(4000);
  console.log(slow);
  var fast = await delayedPromise(2000);
  console.log(fast);
};
sequentialStart();

//Commence en meme temps
//Peuvent finir dans n'importe quel ordre mais print en ordre de call
var concurrentStart = () => {
  return Promise.all([delayedPromise(4000), delayedPromise(2000)]).then(
    (messages) => {
      console.log(messages[0]); // slow
      console.log(messages[1]); // fast
    }
  );
};
concurrentStart();

//Fonctionne en Parallele
//Ordre pas important
//Une fois promise fini elle va print meme si la derniere dans la liste
var parallel = async () => {
  await Promise.all([
    (async () => console.log(await delayedPromise(4000)))(),
    (async () => console.log(await delayedPromise(2000)))(),
  ]);
};
parallel();
