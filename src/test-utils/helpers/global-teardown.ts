module.exports = async () => {
  if (global.__jestSpawnProcess__) {
    console.log("Killing serverless offline process...");
    global.__jestSpawnProcess__.kill();
    global.__jestSpawnProcess__ = undefined;
  }
};
