#!/bin/bash

echo "🚀 Starting image optimization..."

# Create webp directory if it doesn't exist
mkdir -p src/assets/webp

# Initialize counters
total_original_size=0
total_webp_size=0
converted_count=0

echo "📊 Converting images to WebP..."

# Convert all PNG images to WebP
for img in src/assets/*.png; do
    if [ -f "$img" ]; then
        # Get original file size
        original_size=$(stat -f%z "$img")
        total_original_size=$((total_original_size + original_size))
        
        # Extract filename without extension
        filename=$(basename "$img" .png)
        
        # Convert to WebP with high quality
        magick "$img" -quality 85 "src/assets/webp/${filename}.webp"
        
        # Get new file size
        webp_size=$(stat -f%z "src/assets/webp/${filename}.webp")
        total_webp_size=$((total_webp_size + webp_size))
        
        # Calculate savings
        savings=$(echo "scale=1; (($original_size - $webp_size) * 100) / $original_size" | bc)
        original_kb=$(echo "scale=1; $original_size / 1024" | bc)
        webp_kb=$(echo "scale=1; $webp_size / 1024" | bc)
        
        echo "✅ ${filename}.png: ${original_kb}KB → ${webp_kb}KB (${savings}% smaller)"
        
        converted_count=$((converted_count + 1))
    fi
done

# Calculate total savings
total_savings=$(echo "scale=1; (($total_original_size - $total_webp_size) * 100) / $total_original_size" | bc)
total_original_mb=$(echo "scale=1; $total_original_size / 1048576" | bc)
total_webp_mb=$(echo "scale=1; $total_webp_size / 1048576" | bc)

echo ""
echo "🎉 Conversion Complete!"
echo "📈 Summary:"
echo "   • Converted: $converted_count images"
echo "   • Original size: ${total_original_mb}MB"
echo "   • WebP size: ${total_webp_mb}MB"
echo "   • Total savings: ${total_savings}%"
echo ""
echo "💡 Next steps:"
echo "   1. Update image imports to use WebP versions"
echo "   2. Add loading screen component"
echo "   3. Implement lazy loading"
echo "   4. Remove old PNG files"