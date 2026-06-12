// Descarga el paquete de imágenes a assets/img (uso interno)
import fs from 'fs';

const list = `vegeta	https://static.wikia.nocookie.net/dragonball/images/9/94/Vegeta_anime_profile.png/revision/latest/scale-to-width-down/246?cb=20250723190507
piccolo	https://static.wikia.nocookie.net/dragonball/images/b/b7/Super_Hero_-_Piccolo_artwork_3.png/revision/latest/scale-to-width-down/275?cb=20250923210449
gohan	https://static.wikia.nocookie.net/dragonball/images/3/3b/Gohan_anime_profile_3.png/revision/latest/scale-to-width-down/187?cb=20250617191059
bulma	https://static.wikia.nocookie.net/dragonball/images/a/a6/Bulma_anime_profile.png/revision/latest/scale-to-width-down/137?cb=20250617190824
roshi	https://static.wikia.nocookie.net/dragonball/images/5/5f/Master_roshi_enhanced.jpg/revision/latest/scale-to-width-down/297?cb=20210310020858
esfera_bola	https://dragonball.fandom.com/wiki/Special:FilePath/4_Star_Dragon_Ball_Edit.png
mrdna	https://static.wikia.nocookie.net/jurassicpark/images/1/17/1-extraction-mr-dna.png/revision/latest/scale-to-width-down/400?cb=20150202214403
blue	https://static.wikia.nocookie.net/jurassicpark/images/6/62/Blue_in_2022.jpg/revision/latest/scale-to-width-down/317?cb=20250331041409
mosasaurus	https://static.wikia.nocookie.net/jurassicpark/images/d/d3/RebbirthMosasaurusrender.PNG/revision/latest/scale-to-width-down/400?cb=20260104063438
triceratops	https://static.wikia.nocookie.net/jurassicpark/images/5/52/Jurassic_world_fallen_kingdom_triceratops_by_sonichedgehog2-dc9dwcu.png/revision/latest/scale-to-width-down/400?cb=20180427200649
brachiosaurus	https://static.wikia.nocookie.net/jurassicpark/images/0/00/JWFKBrachiosaurusRender.png/revision/latest/scale-to-width-down/344?cb=20180427201052
dilophosaurus	https://static.wikia.nocookie.net/jurassicpark/images/a/a7/Dilophosaurus_Open_Frills.png/revision/latest/scale-to-width-down/400?cb=20240214114411
spinosaurus	https://static.wikia.nocookie.net/jurassicpark/images/9/9b/Pleaseuseinspino.png/revision/latest/scale-to-width-down/400?cb=20150219013731
stegosaurus	https://static.wikia.nocookie.net/jurassicpark/images/8/8f/Jurassic_world_fallen_kingdom_stegosaurus_v4_by_sonichedgehog2-dco06sh.png/revision/latest/scale-to-width-down/400?cb=20180928221819
pteranodon	https://static.wikia.nocookie.net/jurassicpark/images/1/1a/Pteranodon_render.png/revision/latest/scale-to-width-down/400?cb=20180723084903
ankylosaurus	https://static.wikia.nocookie.net/jurassicpark/images/c/cc/JWFKAnkylosaurusRender.png/revision/latest/scale-to-width-down/400?cb=20180427200330
indominus	https://static.wikia.nocookie.net/jurassicpark/images/9/96/Indominus_Rex_New.png/revision/latest/scale-to-width-down/400?cb=20250701022405
compy	https://static.wikia.nocookie.net/jurassicpark/images/8/87/Compy_JWR.jpg/revision/latest/scale-to-width-down/400?cb=20260316020859
reese	https://static.wikia.nocookie.net/malcolminthemiddle/images/7/70/Reese_S7_.webp/revision/latest/scale-to-width-down/307?cb=20251217141528
dewey	https://static.wikia.nocookie.net/malcolminthemiddle/images/3/3c/Dewey_S7_.webp/revision/latest/scale-to-width-down/283?cb=20251217014209
hal	https://static.wikia.nocookie.net/malcolminthemiddle/images/2/21/Hal_S7.webp/revision/latest/scale-to-width-down/300?cb=20240914143902
lois	https://static.wikia.nocookie.net/malcolminthemiddle/images/8/8e/LoisWilkerson.jpg/revision/latest/scale-to-width-down/292?cb=20190728113820
francis	https://static.wikia.nocookie.net/malcolminthemiddle/images/2/22/Francis_s7_promoshoot.jpg/revision/latest/scale-to-width-down/284?cb=20260517003342
zombie	https://minecraft.wiki/images/Zombie_JE3_BE2.png?c5423
skeleton	https://minecraft.wiki/images/thumb/Lefthandedskeleton.png/400px-Lefthandedskeleton.png?2221f
enderman	https://minecraft.wiki/images/thumb/Enderman_JE3.png/400px-Enderman_JE3.png?c6308
pig	https://minecraft.wiki/images/thumb/Temperate_Pig_JE4_BE2.png/400px-Temperate_Pig_JE4_BE2.png?c550c
cow	https://minecraft.wiki/images/thumb/Cow_JE7_BE4.png/400px-Cow_JE7_BE4.png?3de94
mc_chicken	https://minecraft.wiki/images/Chicken_JE2_BE2.png?30245
wolf	https://minecraft.wiki/images/thumb/Wolf_JE2_BE2.png/400px-Wolf_JE2_BE2.png?ee46e
spider	https://minecraft.wiki/images/thumb/Spider_JE5_BE4.png/400px-Spider_JE5_BE4.png?b090e
horse	https://minecraft.wiki/images/thumb/Creamy_Horse.png/400px-Creamy_Horse.png?ea14a
emerald	https://minecraft.wiki/images/Emerald_JE3_BE3.png?4c5f3
gold	https://minecraft.wiki/images/Gold_Ingot_JE4_BE2.png?80cd6
chest	https://minecraft.wiki/images/Chest.gif?ca959
mc_cake	https://minecraft.wiki/images/Cake_JE4.png?7c59e
mc_apple	https://minecraft.wiki/images/Apple_JE3_BE3.png?3853a
mc_bread	https://minecraft.wiki/images/Bread_JE3_BE3.png?e1046
mc_egg	https://minecraft.wiki/images/Egg_JE2_BE2.png?495d9
mc_milk	https://minecraft.wiki/images/Milk_Bucket_JE2_BE2.png?99ff1
mc_water	https://minecraft.wiki/images/Water_Bucket_JE2_BE2.png?db4ce
mc_cookie	https://minecraft.wiki/images/Cookie_JE2_BE2.png?15f78
mc_bed	https://minecraft.wiki/images/thumb/White_Bed_%28N%29.png/400px-White_Bed_%28N%29.png?4df42
pickaxe	https://minecraft.wiki/images/Wooden_Pickaxe_JE3_BE3.png?fa797
peely	https://static.wikia.nocookie.net/fortnite/images/f/fc/Peely_%28v30.00%29_-_Outfit_-_Fortnite.png/revision/latest?cb=20240524202045
battlebus	https://static.wikia.nocookie.net/fortnite/images/d/d7/Battle_Bus_-_Vehicle_-_Fortnite.png/revision/latest/scale-to-width-down/400?cb=20210927140325
chugjug	https://static.wikia.nocookie.net/fortnite/images/a/a5/Chug_Jug_-_Item_-_Fortnite.png/revision/latest/scale-to-width-down/400?cb=20200124184715
boogie	https://static.wikia.nocookie.net/fortnite/images/1/16/Boogie_Bomb_-_Item_-_Fortnite.png/revision/latest/scale-to-width-down/400?cb=20210215173311`;

function extFor(buf) {
  if (buf[0] === 0x89 && buf[1] === 0x50) return 'png';
  if (buf[0] === 0x52 && buf[1] === 0x49) return 'webp'; // RIFF
  if (buf[0] === 0xFF && buf[1] === 0xD8) return 'jpg';
  if (buf[0] === 0x47 && buf[1] === 0x49) return 'gif';
  return null;
}

const results = [];
for (const line of list.trim().split('\n')) {
  const [name, url] = line.split('\t');
  try {
    const r = await fetch(url, { headers: { 'User-Agent': 'personal-edu-app/1.0' }, redirect: 'follow' });
    const buf = Buffer.from(await r.arrayBuffer());
    const ext = extFor(buf);
    if (!ext || buf.length < 500) { results.push(name + ' FALLO (' + r.status + ', ' + buf.length + 'B)'); continue; }
    fs.writeFileSync('assets/img/' + name + '.' + ext, buf);
    results.push(name + '.' + ext + ' OK ' + Math.round(buf.length / 1024) + 'KB');
  } catch (e) { results.push(name + ' ERROR ' + e.message); }
}
console.log(results.join('\n'));
