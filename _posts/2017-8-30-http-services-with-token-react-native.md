---
layout: post
date: 2017-08-30 13:46
title:  "Http service with token in react native"
mood: react-native
category:
- docs
---

Hi everyone, today I would like to show you a way to use the React Native http service and put the token by default if we have it!

We can separte this tutorial in two parts:

1. Save our token 
2. Put the token in our header of every request


Let's start!

<!--more-->

### 1. Use the React Native local storage to save our token

  Save the token using <a href="https://github.com/sunnylqm/react-native-storage" title="Title">react-native-storage</a>:

  After installing, we need to create an storage, I recommend to save in a global.js file that as the name says, you can write all your global variables

  {% highlight javascript linenos %}
    import Storage from 'react-native-storage';
    ...
    global.storage = new Storage({
    	size: 1000,
    	storageBackend: AsyncStorage,
    	defaultExpires: 1000 * 3600 * 24,
    	enableCache: true,
    })
  {% endhighlight %}

  Then we need to save your token when we get it, typically this will be after login(in the login page):

  {% highlight javascript %}
    Here we get the token(using fetch)
    ...
    let token = responseJson.token
    global.storage.save({
    	key: 'token',
    	data: token,
    	expires: 1000 * 3600
    })
  {% endhighlight %}

  We are done with this part, now that we have token saved globally we just need to use it!

### 2. Create the http service with putting the token by default on each request

I created a file called *http.js* that contains just the function that we are going to create.

{% highlight javascript linenos %}
  import * as utils from './utils';

  export function http(method, path, data){
    let fullUrl = "localhost:8000/"
    return global.storage.load({
      key: 'token',
    }).then(ret => {
      return fetch(fullUrl, {
        method: method,
        headers: {
          'Authorization': 'Token '+ret,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: data
      })
    }).catch(err => {
      console.error("We couldn't get the token")
      return null;
    })
  }
{% endhighlight %}

To use the function, we need to give the parameters(method, path an data) and that's it! The function is returning the fetch callback, so you can check the React Native documentation to check how the fetch callback works.

{% highlight javascript linenos %}
  // Import http service
  import * as http from '../utils/http';
  ...
  let jsonData = {name:"john"}
  resp = http.http('post', 'createPerson/', jsonData);
  if(resp!=null){
    resp.then((response)=>{
      console.warn("Here we have the response")
    })
    resp.catch((error) => {
      console.warn("Here we have an error")
    });
  }else{
    console.warn("Here we couldn't get the token")
  }
{% endhighlight %}

We are calling a *POST* request where the url is *localhost:8000/cratePerson* and the data is a json objects *{name:"john"}*. Also we are capturing the response and the error to handle it! :D
