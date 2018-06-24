#!/usr/bin/env bash

list=`ls images/*.png|sed -e 's/^images\///'  -e 's/\.png$//' | awk ' BEGIN { ORS = ""; print "["; } { print "\/\@"$0"\/\@"; } END { print "]"; }' | sed "s^\"^\\\\\"^g;s^\/\@\/\@^\", \"^g;s^\/\@^\"^g"`

cat << EOF > src/emojiList.js
export const emojiList = $list
EOF
