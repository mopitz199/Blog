---
layout: post
title: How to create and run an apk file from Ionic2 app
---

Hi everyone, in this tutorial I'll show you how to create an apk file (for android) from an Ionic2 app in simple steps, let's start!

<!--more-->

**1.** First we will need some requirements, you need to:

+ Install Android Studio or just the SDK(to build the app)
+ Install the some API's (16,24, and one of the last once) from the SDK Manager
+ Install ADB(to install our app in our emulator
+ create an emulator with the AVD Manager(to run the app)

**2.** Create an empty project:

```shell
sudo ionic start BlankProject blank --v2
```

**3.** We need to create the android platform:

```shell
sudo ionic platform add android
```

If we get an error like this: "Error: Failed to find 'ANDROID_HOME' environment variable. Try setting setting it manually." is because we need to set our ANDROID_HOME variable. A quick solution would be put something like this:

```shell
sudo ANDROID_HOME="/home/maximiliano/Android/Sdk/" ionic platform add android
```

Where is your case you have to write **YOUR** path to the SDK.

**4.** After that, we are going to use cordova to build our apk file:

```shell
sudo cordova build --release android
```

Again, if you haven't setted up our ANDROID_HOME enviroment variable you can solve it writting this:

```shell
sudo ANDROID_HOME="/home/maximiliano/Android/Sdk/" cordova build --release android
```

**5.** Now let's go to our apk file, in my case is in:

```shell
cd platforms/android/build/outputs/apk/
```

You will see that your app has a name like this: "android-release-unsigned.apk". That is because you need to sign your app before use it, so, let's do it!

**6.** To sign our app we need to create a key first:

```shell
sudo keytool -genkey -v -keystore my-release-key.keystore -alias alias_name -keyalg RSA -keysize 2048 -validity 10000
```

Where "my-release-key.keystore" will be the name that you key will have(you can put any name)

**7.** Now we will apply the key in our app:

```shell
sudo jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore android-release-unsigned.apk alias_name
```

Where "android-release-unsigned.apk" is the name of the apk that you created steps before

**8.** We are almost done, we're going to optimize a little bit our app running this command:

```shell
sudo /home/maximiliano/Android/Sdk/build-tools/25.0.2/zipalign -v 4 android-release-unsigned.apk final.apk
```

Where you have to write YOUR path to "zipalign" that is where your SDK is saved. then you have two names, the first one is your current app and the second one is the name that you optimize app will have(write any name, but don't forget the apk extension)

**9.** Great! now we have our apk ready :D would you like to run it? Let's do it! Go to the SDK tools:

```shell
cd /home/maximiliano/Android/Sdk/tools/
```

And run:

```shell
./android avd
```

Then, create an AVD(Android Virtual Device) with one of your API Level (16,24, etc...)
Once it is created, run it, you will have something like this:

![_config.yml]({{ site.baseurl }}/assets/android_screen.png)

So you are ready to install you apk in that AVD

**10.** Go where our app (final.apk) is and run:

```shell
adb devices
```

You should see something like this:

![_config.yml]({{ site.baseurl }}/assets/seleccion_device.png)

That means that you have you emulator running and waitting for our app :D, now install it!

```shell
adb install final.apk
```

You should see in the AVD the default cordova icon with our project name:

![_config.yml]({{ site.baseurl }}/assets/blank_project_icon.png)

Come on! run it!!!
