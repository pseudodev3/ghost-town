#!/usr/bin/env node
// Image conversion script - run: node convert-images.js

const fs = require('fs');
const path = require('path');

console.log('=====================================');
console.log('Image Conversion Helper');
console.log('=====================================\n');

const imagesToConvert = [
    { file: 'pfp.gif', size: '1.7MB', estimatedWebp: '~200KB' },
    { file: 'maps.png', size: '820KB', estimatedWebp: '~150KB' },
    { file: 'ad.gif', size: '212KB', estimatedWebp: '~50KB' }
];

console.log('Images to convert:\n');
imagesToConvert.forEach(img => {
    console.log(`  ${img.file} (${img.size}) → WebP (${img.estimatedWebp})`);
});

console.log('\n-------------------------------------');
console.log('Option 1: Online Converter (Quick)');
console.log('-------------------------------------');
console.log('1. Go to: https://convertio.co/gif-webp/');
console.log('2. Upload your GIF/PNG files');
console.log('3. Download WebP versions');
console.log('4. Place them in the assets/ folder');

console.log('\n-------------------------------------');
console.log('Option 2: Command Line (If installed)');
console.log('-------------------------------------');
console.log('Install cwebp:');
console.log('  Mac: brew install webp');
console.log('  Ubuntu: sudo apt install webp');
console.log('\nConvert:');
console.log('  cwebp pfp.gif -o pfp.webp');
console.log('  cwebp maps.png -o maps.webp');
console.log('  cwebp ad.gif -o ad.webp');

console.log('\n-------------------------------------');
console.log('Option 3: Install Node.js converter');
console.log('-------------------------------------');
console.log('  npm install sharp --save-dev');
console.log('  node convert-with-sharp.js');

console.log('\n=====================================');
console.log('Expected savings: ~2MB (60% reduction)');
console.log('=====================================\n');
