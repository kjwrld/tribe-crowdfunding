const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const INPUT_DIR = './src/assets';
const OUTPUT_DIR = './src/assets/webp';

// Create output directory
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function convertToWebP() {
  const files = fs.readdirSync(INPUT_DIR);
  const imageFiles = files.filter(file => 
    /\.(jpg|jpeg|png)$/i.test(file) && !file.includes('webp')
  );

  console.log(`Found ${imageFiles.length} images to convert...`);

  for (const file of imageFiles) {
    const inputPath = path.join(INPUT_DIR, file);
    const outputName = file.replace(/\.(jpg|jpeg|png)$/i, '.webp');
    const outputPath = path.join(OUTPUT_DIR, outputName);

    try {
      console.log(`Converting ${file}...`);
      
      // Get original size
      const stats = fs.statSync(inputPath);
      const originalSize = (stats.size / 1024).toFixed(2);

      // Convert to WebP with high quality
      await sharp(inputPath)
        .webp({ quality: 85, effort: 6 })
        .toFile(outputPath);

      // Get new size
      const newStats = fs.statSync(outputPath);
      const newSize = (newStats.size / 1024).toFixed(2);
      const savings = ((stats.size - newStats.size) / stats.size * 100).toFixed(1);

      console.log(`✅ ${file}: ${originalSize}KB → ${newSize}KB (${savings}% smaller)`);

    } catch (error) {
      console.error(`❌ Error converting ${file}:`, error.message);
    }
  }

  console.log('\n🎉 WebP conversion complete!');
}

// Run if called directly
if (require.main === module) {
  convertToWebP().catch(console.error);
}

module.exports = { convertToWebP };