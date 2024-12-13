const fs = require('fs');

interface Item {
  ownerUsername: string;
  // other properties can be added here
}

function getOwnerUsernames(filePath: string): Set<string> {
  const data = fs.readFileSync(filePath, 'utf-8');
  const items: Item[] = JSON.parse(data);

  const ownerUsernames = new Set<string>();
  items.forEach((item) => {
    ownerUsernames.add(item.ownerUsername);
  });

  return ownerUsernames;
}

// Example usage
const filePath =
  '/Users/addyhebou/Downloads/dataset_instagram-hashtag-scraper_2024-11-28_05-06-50-578 (1).json';
const ownerUsernames = getOwnerUsernames(filePath);
console.log(ownerUsernames);
