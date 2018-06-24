# EMOBOT

Slackbot to create emojis. Plz halp it to

* create moar emojis
* create animated gifz

## Adding Images

Make PNG size 128 x 128 px. Try to position eyes and mouth with this guide:

![guide](./guide.png)

Add image to dir `images/`. Run `bash list_emojis.sh` to update emoji list for
app.

## Emoji Rest API

The slack part uses the Emoji Rest API that can also be used
separately. In localhost like this:

```bash
yarn build
yarn watch &
open http://localhost:5000/emoji/emoji-intense-joy-laugh
``` 

The api just stacks the images listed on top of each other
in the order they are listed. 
