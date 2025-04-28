const args = process.argv.slice(2);

console.log("Received args:", args);

process.stdin.on("data", (data) => {
  const upperCaseData = data.toString().toUpperCase();
  process.stdout.write(upperCaseData);
});
