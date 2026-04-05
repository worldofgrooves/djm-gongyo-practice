#!/bin/bash
# Generate PWA icons using ImageMagick

ICONS_DIR="$(dirname "$0")/../public/icons"

# 192x192
convert -size 192x192 xc:'#f7f3ee' \
  -fill '#c4849a' -draw "ellipse 96,92 15,38 0,360" \
  -fill '#c4849a' -draw "ellipse 73,100 13,32 330,330" \
  -fill '#c4849a' -draw "ellipse 119,100 13,32 30,30" \
  -fill '#c4849a' -draw "ellipse 58,108 11,27 310,310" \
  -fill '#c4849a' -draw "ellipse 134,108 11,27 50,50" \
  -fill '#b8926a' -draw "circle 96,106 96,113" \
  -pointsize 18 -font Serif -fill '#b8926a' -gravity South -annotate +0+20 'Gongyo' \
  "$ICONS_DIR/icon-192.png"

# 512x512
convert -size 512x512 xc:'#f7f3ee' \
  -fill '#c4849a' -draw "ellipse 256,245 40,102 0,360" \
  -fill '#c4849a' -draw "ellipse 195,266 35,87 330,330" \
  -fill '#c4849a' -draw "ellipse 317,266 35,87 30,30" \
  -fill '#c4849a' -draw "ellipse 154,287 30,72 310,310" \
  -fill '#c4849a' -draw "ellipse 358,287 30,72 50,50" \
  -fill '#b8926a' -draw "circle 256,282 256,300" \
  -pointsize 46 -font Serif -fill '#b8926a' -gravity South -annotate +0+55 'Gongyo' \
  "$ICONS_DIR/icon-512.png"

echo "Icons generated"
