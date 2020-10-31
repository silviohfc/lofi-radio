# Lo-Fi Radio <img align="right" src="public/assets/icon128x128.png" width="100">
> Simple Chrome Extension to provide you a good ambient sound!

[![forthebadge](https://forthebadge.com/images/badges/made-with-javascript.svg)](https://forthebadge.com) [![forthebadge](https://forthebadge.com/images/badges/built-with-love.svg)](https://forthebadge.com) \
![GitHub repo size](https://img.shields.io/github/repo-size/silviohfc/informerbot?style=for-the-badge) ![GitHub](https://img.shields.io/github/license/silviohfc/informerbot?color=blue&style=for-the-badge)

<img src="public/assets/screenshot.png" style="border: 1px solid #ddd" />

## Getting Started
Clone the repo:
``` 
$ git clone https://github.com/silviohfc/lofi-radio
```
It's actually using **JSONbin** as the JSON host for radio data, you can create your own data like that:
``` 
{
    "name": "<radio name>",
    "src": "<stream link>"
}
```
Then you will need edit ```app/backgrounds.js```, inside the file exists the method called ```getStationsJSON```, just change de url to your JSON link and the key if it's a private one.


## License
Distributed under the MIT License. See ```LICENSE``` for more information.