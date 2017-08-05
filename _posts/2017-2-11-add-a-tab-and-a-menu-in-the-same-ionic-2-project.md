---
layout: post
title: Add a tab and a menu in the same Ionic 2 project
---

Hello everyone in this article I'll show you how to create a blank Ionic 2 project and add the tabs + menu tools at the same time and how to manage it, let's start!

<!--more-->

**1.** First we should create an empty Ionic 2 project

```shell
sudo ionic start TabMenuProject blank --v2
```

**2.** Now, we're going to create the menu. in our app.html add this code that will be the menu:

```html
<ion-menu [content]="content">
  <ion-header>
    <ion-toolbar>
      <ion-title>Pages</ion-title>
    </ion-toolbar>
  </ion-header>
  <ion-content>
    <ion-list>
      <button ion-item>
        Login
      </button>
      <button ion-item>
        Signup
      </button>
    </ion-list>
  </ion-content>
</ion-menu>
```

and don't forget to make the reference to the menu:

```html
<ion-nav #content [root]="rootPage"></ion-nav>
```

**3.** The menu is created but there's no button to show it, so in the home.html edit the header:

```html
<ion-header>
  <ion-navbar>
    <button ion-button menuToggle icon-only>
      <ion-icon name='menu'></ion-icon>
    </button>
    <ion-title>
      Ionic Blank
    </ion-title>
  </ion-navbar>
</ion-header>
```

Great! now we have the menu and we can show it without any problems. The second part is the tab, so go for it!

**4.** Generate a new page that will be that tab, in the terminal:

```shell
sudo ionic generate page tabs
```

**5.** Generate another page just for the proper way to show the tab example:

```shell
sudo ionic generate page contact
```

**6.** We have to create our tabs, so go to the tabs.html, remove all the code and add this code:

```html
<ion-tabs>
  <ion-tab tabIcon="heart" [root]="tab1"></ion-tab>
  <ion-tab tabIcon="star" [root]="tab2"></ion-tab>
</ion-tabs>
```

where each ion-tab will be a tab, in this case, "home" and "contact"

**7.** Now we have to link the tab that we just created with the pages, so in the tabs.ts the class should be something like this:

```typescript
export class TabsPage {
  public tab1:any;
  public tab2:any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.tab1 = HomePage;
    this.tab2 = ContactPage;
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad TabsPage');
  }
}
```

don't forget to import the pages:

```typescript
import { HomePage } from '../home/home';
import { ContactPage } from '../contact/contact';
```

**8.** Great! now we have to understand how the tabs works. the tab page that we created will be our rootPage and the tab will manage all the content that in that case is the HomePage and the ContactPage. So lets go to the app.component.ts, import the tabs and change the value of the rootPage:

```typescript
import { TabsPage } from '../pages/tabs/tabs';
```
<br />
```typescript
rootPage = TabsPage;
```

**9.** Perfect! we're almost done :D now we just need to add the pages that we have created in the app.module.ts:

```typescript
import { TabsPage } from '../pages/tabs/tabs';
import { ContactPage } from '../pages/contact/contact';
```
<br />
```typescript
declarations: [
  MyApp,
  HomePage,
  TabsPage,
  ContactPage
]
```
<br />
```typescript
entryComponents: [
  MyApp,
  HomePage,
  TabsPage,
  ContactPage
]
```

**10.** Done! in this simples steps you could create a menu and a tab in the same project from the beginning :D run the server and try it!

```shell
sudo ionic serve
```

**11.** BONUS! you can customize this in different ways, for example you can set how the tab will be shows in the app, just changing some settings in the app.module.ts:

```typescript
imports: [
  IonicModule.forRoot(MyApp, {
    platforms: {
      android: {
        tabsPlacement: 'top'
      },
      ios: {
        tabsPlacement: 'bottom'
      },
      windows: {
        tabsPlacement: 'top'
      }
    }
  })
]
```

there's set that in ios the tab will be shown in the bottom.

I hope you guys liked this tutorial, if you want to download all the project, just go to this link:

[https://github.com/mopitz199/TabMenuProject](https://github.com/mopitz199/TabMenuProject)
