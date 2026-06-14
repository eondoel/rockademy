// Buscador+descargador de imágenes en wikis de franquicias (uso interno)
// Uso: node fetch-images.mjs
import fs from 'fs';

const targets = [
  // Bill & Ted
  ['https://billandted.fandom.com', 'Bill S. Preston', 'bill'],
  ['https://billandted.fandom.com', 'Ted Logan', 'ted'],
  ['https://billandted.fandom.com', 'Phone Booth', 'cabina'],
  // Star Wars (precuelas)
  ['https://starwars.fandom.com', 'Anakin Skywalker', 'anakin'],
  ['https://starwars.fandom.com', 'Obi-Wan Kenobi', 'obiwan'],
  ['https://starwars.fandom.com', 'Darth Maul', 'maul'],
  ['https://starwars.fandom.com', 'Yoda', 'yoda'],
  ['https://starwars.fandom.com', 'R2-D2', 'r2d2'],
  ['https://starwars.fandom.com', 'Padmé Amidala', 'padme'],
  // Mario Bros
  ['https://mario.fandom.com', 'Mario', 'mario'],
  ['https://mario.fandom.com', 'Luigi', 'luigi'],
  ['https://mario.fandom.com', 'Bowser', 'bowser'],
  ['https://mario.fandom.com', 'Princess Peach', 'peach'],
  ['https://mario.fandom.com', 'Yoshi', 'yoshi'],
  ['https://mario.fandom.com', 'Goomba', 'goomba'],
  ['https://mario.fandom.com', 'Super Star', 'estrella'],
  ['https://mario.fandom.com', 'Super Mushroom', 'hongo'],
  // How to Train Your Dragon
  ['https://howtotrainyourdragon.fandom.com', 'Toothless', 'chimuelo'],
  ['https://howtotrainyourdragon.fandom.com', 'Hiccup Horrendous Haddock III', 'hipo'],
  // Cars / Toy Story (Pixar)
  ['https://pixar.fandom.com', 'Lightning McQueen', 'mcqueen'],
  ['https://pixar.fandom.com', 'Mater', 'mate_cars'],
  ['https://pixar.fandom.com', 'Woody', 'woody'],
  ['https://pixar.fandom.com', 'Buzz Lightyear', 'buzz'],
  ['https://pixar.fandom.com', 'Rex', 'rex_ts'],
  // One Piece
  ['https://onepiece.fandom.com', 'Monkey D. Luffy', 'luffy'],
  ['https://onepiece.fandom.com', 'Roronoa Zoro', 'zoro'],
  ['https://onepiece.fandom.com', 'Tony Tony Chopper', 'chopper'],
  ['https://onepiece.fandom.com', 'Going Merry', 'merry'],
];

function extFor(buf) {
  if (buf[0] === 0x89 && buf[1] === 0x50) return 'png';
  if (buf[0] === 0x52 && buf[1] === 0x49) return 'webp';
  if (buf[0] === 0xFF && buf[1] === 0xD8) return 'jpg';
  if (buf[0] === 0x47 && buf[1] === 0x49) return 'gif';
  return null;
}

for (const [base, title, name] of targets) {
  try {
    const api = base + '/api.php?action=query&prop=pageimages&piprop=thumbnail&pithumbsize=400&redirects=1&format=json&titles=' + encodeURIComponent(title);
    const r = await fetch(api, { headers: { 'User-Agent': 'personal-edu-app/1.0' } });
    const j = await r.json();
    const pages = j.query && j.query.pages ? Object.values(j.query.pages) : [];
    const thumb = pages[0] && pages[0].thumbnail && pages[0].thumbnail.source;
    if (!thumb) { console.log(name + '\tNO_IMAGE (' + title + ')'); continue; }
    const ir = await fetch(thumb, { headers: { 'User-Agent': 'personal-edu-app/1.0' } });
    const buf = Buffer.from(await ir.arrayBuffer());
    const ext = extFor(buf);
    if (!ext || buf.length < 200) { console.log(name + '\tFALLO_DESCARGA'); continue; }
    fs.writeFileSync('assets/img/' + name + '.' + ext, buf);
    console.log(name + '.' + ext + '\tOK ' + Math.round(buf.length / 1024) + 'KB');
  } catch (e) { console.log(name + '\tERROR ' + e.message); }
}
