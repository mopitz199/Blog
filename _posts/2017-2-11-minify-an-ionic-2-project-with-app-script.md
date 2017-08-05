---
layout: post
title: Minify an Ionic 2 project with app-script
---

Hello everyone, in this tutorial I will show you in a very short way how you can minify an Ionic 2 project. Let's start!

<!--more-->

**1.** Create an empty project:

```shell
sudo ionic start MyMinifyProject blank --v2
```

**2.** Go to the *package.json* and we have to add this line:

```json
"scripts": {
  ...
  "ionic:minify": "ionic-app-scripts minify"
  ...
}
```

That line will able you to execute the script to miinify your project. You can go to this link to see more about it and take a look to all the script that are able:

[https://ionicframework.com/docs/v2/resources/app-scripts/](https://ionicframework.com/docs/v2/resources/app-scripts/)

And this link to see the options that you can use in each script:

[https://github.com/driftyco/ionic-app-scripts#command-line-flags](https://github.com/driftyco/ionic-app-scripts#command-line-flags)

**3.** We are done! just go to the terminal and run:

```shell
sudo npm run ionic:minify
```

You will have the *"www"* folder with the css and js minify ready to be served for any service :D
