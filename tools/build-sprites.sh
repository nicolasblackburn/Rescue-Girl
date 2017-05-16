#!/bin/bash
# depends on aseprite and glue utilities

IMG_SRC_DIR=artworks/src
IMG_BUILD_DIR=artworks/build

# clean build directory
rm -rf $IMG_BUILD_DIR/* 

mkdir $IMG_BUILD_DIR/sprites

# resize files and copy in build directory (using aseprite)
for fp in $IMG_SRC_DIR/*.ase; do 
	fn=$(basename "$fp") 
	fn="${fn%.*}" 
	fout="$IMG_BUILD_DIR/sprites/${fn}.png" 
	format="$IMG_BUILD_DIR/sprites/{title}-{layer}-{frame}.png" 
	aseprite --batch $fp --split-layers --filename-format $format --save-as $fout
done

# resize files and copy in build directory (using image magick)
#for fp in $IMG_SRC_DIR/*.png; do 
#	fn=$(basename "$fp") 
#	ext="${fn##*.}" 
#	fn="${fn%.*}" 
#	fout="$IMG_BUILD_DIR/sprites/${fn}.$ext" 
#	convert "$fp" -crop 16x16 "$fout"
#done

for fp in $IMG_BUILD_DIR/sprites/*.png; do 
	fn=$(basename "$fp") 
	ext="${fn##*.}" 
	fn="${fn%.*}" 
	for sz in 4; do 
		fout="$IMG_BUILD_DIR/sprites/${fn}-${sz}x.$ext" 
		convert "$fp" -scale ${sz}00% +antialias "$fout"
	done 
	rm -f $fp
done

# glue "$IMG_BUILD_DIR/sprites" "$IMG_BUILD_DIR" --json --css --json-format=hash

# resize files
#for f in `ls -1 $DIR`; do
#	echo $f
#	convert "$DIR/$f" -filter Point -resize $2 +antialias "$DIR/$f"
#done

#convert tileset-2.png -filter Point -resize 768x768 +antialias tileset-2.png
#convert tileset-2.png -fuzz 0% -fill '#a599fc' -opaque '#566b7f' tileset-3.png
