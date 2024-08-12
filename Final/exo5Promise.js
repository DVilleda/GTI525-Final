Promise.most = function (proms) {
  // Complétez cette fonction
};
// Exemple d'invocation #1:
var prom1 = Promise.resolve();
var prom2 = Promise.reject();
var prom3 = Promise.reject();
var proms = [prom1, prom2, prom3];
Promise.most(proms)
  .then(function () {
    console.log("La majorité des promesses ont été résolues");
  })
  .catch(function (err) {
    // Cette ligne sera exécutée
    console.log("La majorité des promesses ont été rejetées");
  });
// Exemple d'invocation #2:
var prom4 = Promise.resolve();
var prom5 = Promise.reject();
var prom6 = Promise.reject();
var prom7 = Promise.resolve();
var proms = [prom4, prom5, prom6, prom7];
Promise.most(proms)
  .then(function () {
    // Cette ligne sera exécutée
    console.log("La majorité des promesses ont été résolues");
  })
  .catch(function (err) {
    console.log("La majorité des promesses ont été rejetées");
  });

// Solution:
Promise.most = function (proms) {
  return new Promise((resolve, reject) => {
    var resolveThreshold;
    var rejectThreshold;
    if (proms.length % 2 == 0) {
      // Even
      resolveThreshold = proms.length / 2;
      rejectThreshold = resolveThreshold + 1;
    } else {
      // Odd
      resolveThreshold = (proms.length + 1) / 2;
      rejectThreshold = resolveThreshold; // same
    }
    var resolveCount = 0;
    var rejectCount = 0;
    proms.forEach((prom) => {
      prom
        .then(() => {
          if (++resolveCount == resolveThreshold) resolve();
          console.log(resolve);
        })
        .catch(() => {
          if (++rejectCount == rejectThreshold) reject();
          console.log(reject);
        });
    });
  });
};
