console.log('task1');
console.log('Input the text and press Enter');
process.stdin.setEncoding('utf8');

process.stdin.on('readable', function() {
  let chunk;
  while ((chunk = process.stdin.read()) !== null) {
    const result = chunk.split('');
    result.length -= 1;
    result.reverse();
    process.stdout.write(`${result.join('')}\n`);
  }
});

process.stdin.on('end', function() {
  process.stdout.write('end');
});