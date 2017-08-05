---
layout: post
title: Consume REST Api with Token Authentication in Ionic 2
---

Hello everyone, in this article I would like to show you how to use API REST with Token Authentication in Ionic 2 in simple steps :D

<!--more-->

**1.** Let's create an empty project:

```shell
sudo ionic start HttpServiceProject blank --v2
```

**2.** Now we have to create a provider that will be an http service:

```shell
sudo ionic g provider HttpService
```

This service will manage the token

**3.** Edit the http-service.ts that we just created:

```typescript
import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class HttpService {

  constructor(private _http: Http) {
    console.log('Hello HttpService Provider');
  }

  createAuthorizationHeader(headers: Headers) {
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Token ' + localStorage.getItem("auth_token"));
    return headers;
  }

  get(url) {
    var headers = this.createAuthorizationHeader(new Headers());
    return this._http.get(url, {headers: headers}).map(
      res => { return res.json() }
    );
  }

  post(url, data) {
    var headers = this.createAuthorizationHeader(new Headers());
    return this._http.post(url, data, {headers: headers}).map(
      res => {return res.json() }
    );
  }

}
```

We need to explain some things, we created to methods( get and post ), an each method will make the according call, just with something different, that will be the token that they will set in the header before the call. The key is in the "createAuthorizationHeader" method that is in charge to get the token, and as you can see we are getting the token form the localStorage, that's means that we should storage the token before the call, for this example you can create a fake token.

**4.** In the home.ts we have to use the service:

```typescript
import { HttpService } from '../../providers/http-service';
```
<br />
```typescript
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
  providers: [HttpService]
})
```
<br />
```typescript
constructor(
    public navCtrl: NavController,
    private _httpService: HttpService
  ) {
      _httpService.get("http://jsonplaceholder.typicode.com/posts")
        .subscribe(
          data => {
            this.posts = data;
          },
          error => {

          }
        )
  }
```

As you can see, we are using an url example, that in your case will be your service, in this case we are requesting by posts and now we have to show the results in our home template.

**5.** In our home.html insert a list like this:

```html
{% raw %}
<ion-list>
  <ion-item *ngFor="let post of posts; let i = index">
    <h2>{{ post.title }}</h2>
    <h3>{{ post.id }}</h3>
    <p>{{ post.body }}</p>
  </ion-item>
</ion-list>
{% endraw %}
```

This list will show all the posts that we requested.

**6.** If you check the headers in the request you will see the token if you created a fake one:

```typescript
createAuthorizationHeader(headers: Headers) {
  headers.append('Content-Type', 'application/json');
  // Fake token
  headers.append('Authorization', 'Token ' + 'cds6ds7cds5csdcds');
  return headers;
}
```

![_config.yml]({{ site.baseurl }}/assets/request-token.png)

**7.** In that way you created a service that is available to consume external services using a token authentication if is necessary :D. If you want to download the project just go to this link:

[https://github.com/mopitz199/HttpServiceWithTokenProject](https://github.com/mopitz199/HttpServiceWithTokenProject)
