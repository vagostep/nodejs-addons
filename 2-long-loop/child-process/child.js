let result = 0;
for (let i = 0; i < 1e12; i++) {
  result += i;
}
process.send(result);