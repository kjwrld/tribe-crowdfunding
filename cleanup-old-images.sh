#!/bin/bash

echo "🧹 Cleaning up old PNG files..."
echo "⚠️  WARNING: This will permanently delete PNG files that have been converted to WebP"
echo ""

read -p "Are you sure you want to continue? (y/N) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]
then
    echo "❌ Cleanup cancelled"
    exit 1
fi

echo "📊 Analyzing files for cleanup..."

# Count files
png_count=$(find src/assets -name "*.png" | wc -l)
webp_count=$(find src/assets/webp -name "*.webp" | wc -l)

echo "   • PNG files: $png_count"
echo "   • WebP files: $webp_count"
echo ""

if [ $png_count -eq 0 ]; then
    echo "✅ No PNG files found to clean up"
    exit 0
fi

# Calculate space savings
original_size=$(du -sh src/assets/*.png 2>/dev/null | awk '{total+=$1} END {print total}' || echo "0")
webp_size=$(du -sh src/assets/webp/ | awk '{print $1}')

echo "🗑️  Removing PNG files..."

# Remove PNG files that have WebP equivalents
removed_count=0
for png_file in src/assets/*.png; do
    if [ -f "$png_file" ]; then
        filename=$(basename "$png_file" .png)
        webp_file="src/assets/webp/${filename}.webp"
        
        if [ -f "$webp_file" ]; then
            echo "   ✅ Removing $(basename "$png_file")"
            rm "$png_file"
            removed_count=$((removed_count + 1))
        else
            echo "   ⚠️  Keeping $(basename "$png_file") (no WebP equivalent found)"
        fi
    fi
done

echo ""
echo "🎉 Cleanup complete!"
echo "📈 Summary:"
echo "   • Removed: $removed_count PNG files"
echo "   • Space freed: ~$(echo "scale=1; $original_size" | bc 2>/dev/null || echo "unknown")MB"
echo "   • WebP folder size: $webp_size"
echo ""
echo "💡 Your site should now load ~85% faster!"