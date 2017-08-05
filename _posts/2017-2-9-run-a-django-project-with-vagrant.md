---
layout: post
title: Run a Django(with postgresql) project with Vagrant
---

Hello! Have the chance to deploy in a very easy way a Django project no matter which operating system you are using with Vagrant.

Requirements for this tutorial:

* Virtualenvwrapper
* VirtualBox
* Vagrant

<!--more-->

First we need to create a virtual environment, install django and create a project:

```shell
mkvirtualenv DjangoVagrant
pip install django
django-admin startproject DjangoVagrantProject
```

**2.** Now we need to find a proper box for our virtualization, you can find a list of boxes in the vagrant page https://atlas.hashicorp.com/boxes/search. I will use the simplest one (ubuntu/trusty64):

```shell
vagrant init ubuntu/trusty64
```

**3.** Great! we just created a "VagrantFile" in our django project. This file has all our setting for the virtual machine. We are going to open it and edit some lines:

-Uncomment this line:

```
# config.vm.network "forwarded_port", guest: 80, host: 8080
```

and edit it like this:

```
config.vm.network "forwarded_port", guest: 80, host: 9090
```

-Uncomment this line:

```
config.vm.network "private_network", ip: "192.168.33.10"
```

and this line:

```
config.vm.network "public_network"
```

We have our VagrantFile ready to create the virtual machine :D

**4.** Create the virtual machine:

```shell
vagrant up
```

It can take a while, but then we will have our virtual machine running :D

**5.** Now, from the Virtualenvwrapper we will create our requirements.txt file:

```shell
pip freeze > requirements.txt

```

We are ready to install django in our virtual machine

**6.** I will give you a script that create you a django project with virtualenv, it install all the dependencies from the requirements.txt and also it install postgres. Is amazing:

https://github.com/mopitz199/Script-For-Django-In-Vagrant

Copy that file in the root of your django project

Note: you will find inside of this file the username of postgres and the database with his password as well, you can edit it as your wish (according to the database information of your django project)

**7.** Now we need to get into our virtual machine and go to our project:

```shell
vagrant ssh
cd /vagrant
```

**8.** At this moment, we have a folder with all our django project but nothing else. We will run the file that we downloaded and this script will install

 + virtuelenv
 + postgresql
 + virtuelenvwrapper(it will install everything in this wrapper, you can change the name of the wrapper in the file) all the requirements.txt dependencies
 + Also it will create a database with a username as I told you steps before and it will make the migrations and migrate the django project.

Also it will create a database with a username as I told you steps before and it will make the migrations and migrate the django project.

```shell
source config.sh
```

It will take a long time and it will ask you your aprovement for some instalations (nothing complicated).

**8.** After that you will have everything installed and ready to run your django project from the virtual machine. Run "ifconfig" to check you ip and allow it in the django setting:

```shell
ifconfig
```

![_config.yml]({{ site.baseurl }}/assets/inet.png)

Now:

```shell
nano DjangoVagrantProject/settings.py
```

and paste the ip in the "ALLOWED_HOST"

![_config.yml]({{ site.baseurl }}/assets/allowed_host.png)

Finally run:

```shell
python manage.py runserver 192.168.0.17:9090
```

And there you have it! a django project running in a virtual machine with vagrant :D
