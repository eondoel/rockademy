// Buscador de imágenes en wikis de franquicias (uso interno)
const targets = [
  // Dragon Ball
  ['https://dragonball.fandom.com', 'Vegeta', 'vegeta'],
  ['https://dragonball.fandom.com', 'Piccolo', 'piccolo'],
  ['https://dragonball.fandom.com', 'Gohan', 'gohan'],
  ['https://dragonball.fandom.com', 'Bulma', 'bulma'],
  ['https://dragonball.fandom.com', 'Master Roshi', 'roshi'],
  // Jurassic Park
  ['https://jurassicpark.fandom.com', 'Mr. DNA', 'mrdna'],
  ['https://jurassicpark.fandom.com', 'Blue', 'blue'],
  ['https://jurassicpark.fandom.com', 'Mosasaurus', 'mosasaurus'],
  ['https://jurassicpark.fandom.com', 'Triceratops', 'triceratops'],
  ['https://jurassicpark.fandom.com', 'Brachiosaurus', 'brachiosaurus'],
  ['https://jurassicpark.fandom.com', 'Dilophosaurus', 'dilophosaurus'],
  ['https://jurassicpark.fandom.com', 'Spinosaurus', 'spinosaurus'],
  ['https://jurassicpark.fandom.com', 'Stegosaurus', 'stegosaurus'],
  ['https://jurassicpark.fandom.com', 'Pteranodon', 'pteranodon'],
  ['https://jurassicpark.fandom.com', 'Ankylosaurus', 'ankylosaurus'],
  ['https://jurassicpark.fandom.com', 'Indominus rex', 'indominus'],
  ['https://jurassicpark.fandom.com', 'Compsognathus', 'compy'],
  // Malcolm
  ['https://malcolminthemiddle.fandom.com', 'Reese Wilkerson', 'reese'],
  ['https://malcolminthemiddle.fandom.com', 'Dewey Wilkerson', 'dewey'],
  ['https://malcolminthemiddle.fandom.com', 'Hal Wilkerson', 'hal'],
  ['https://malcolminthemiddle.fandom.com', 'Lois Wilkerson', 'lois'],
  ['https://malcolminthemiddle.fandom.com', 'Francis Wilkerson', 'francis'],
  // Minecraft
  ['https://minecraft.wiki', 'Zombie', 'zombie'],
  ['https://minecraft.wiki', 'Skeleton', 'skeleton'],
  ['https://minecraft.wiki', 'Enderman', 'enderman'],
  ['https://minecraft.wiki', 'Pig', 'pig'],
  ['https://minecraft.wiki', 'Cow', 'cow'],
  ['https://minecraft.wiki', 'Chicken', 'mc_chicken'],
  ['https://minecraft.wiki', 'Wolf', 'wolf'],
  ['https://minecraft.wiki', 'Spider', 'spider'],
  ['https://minecraft.wiki', 'Horse', 'horse'],
  ['https://minecraft.wiki', 'Emerald', 'emerald'],
  ['https://minecraft.wiki', 'Gold Ingot', 'gold'],
  ['https://minecraft.wiki', 'Chest', 'chest'],
  ['https://minecraft.wiki', 'Cake', 'mc_cake'],
  ['https://minecraft.wiki', 'Apple', 'mc_apple'],
  ['https://minecraft.wiki', 'Bread', 'mc_bread'],
  ['https://minecraft.wiki', 'Egg', 'mc_egg'],
  ['https://minecraft.wiki', 'Milk Bucket', 'mc_milk'],
  ['https://minecraft.wiki', 'Water Bucket', 'mc_water'],
  ['https://minecraft.wiki', 'Cookie', 'mc_cookie'],
  ['https://minecraft.wiki', 'Bed', 'mc_bed'],
  ['https://minecraft.wiki', 'Pickaxe', 'pickaxe'],
  // Fortnite
  ['https://fortnite.fandom.com', 'Peely', 'peely'],
  ['https://fortnite.fandom.com', 'Battle Bus', 'battlebus'],
  ['https://fortnite.fandom.com', 'Chug Jug', 'chugjug'],
  ['https://fortnite.fandom.com', 'Boogie Bomb', 'boogie'],
];

const out = [];
for (const [base, title, name] of targets) {
  try {
    const url = base + '/api.php?action=query&prop=pageimages&piprop=thumbnail&pithumbsize=400&redirects=1&format=json&titles=' + encodeURIComponent(title);
    const r = await fetch(url, { headers: { 'User-Agent': 'personal-edu-app/1.0' } });
    const j = await r.json();
    const pages = j.query && j.query.pages ? Object.values(j.query.pages) : [];
    const thumb = pages[0] && pages[0].thumbnail && pages[0].thumbnail.source;
    console.log(name + '\t' + (thumb || 'NO_IMAGE'));
  } catch (e) { console.log(name + '\tERROR'); }
}

// esfera individual: buscar en el namespace de archivos
try {
  const r = await fetch('https://dragonball.fandom.com/api.php?action=query&list=search&srnamespace=6&srlimit=8&format=json&srsearch=' + encodeURIComponent('four star dragon ball'), { headers: { 'User-Agent': 'personal-edu-app/1.0' } });
  const j = await r.json();
  for (const hit of (j.query.search || [])) console.log('FILE_CANDIDATE\t' + hit.title);
} catch (e) { console.log('search ERROR'); }
