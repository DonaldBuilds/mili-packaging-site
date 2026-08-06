const fs = require('fs');
const html = fs.readFileSync('./dist-latest/index.html','utf8');

// Check SEO tags
const lines = html.split('\n');
lines.forEach(line => {
  if (line.includes('<title>') || line.includes('description') || line.includes('canonical'))
    console.log(line.trim());
});
