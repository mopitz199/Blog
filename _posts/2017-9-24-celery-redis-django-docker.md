---
layout: post
date: 2017-09-24 17:02
title:  "Use Celery + Redis in a Django project with Docker"
mood: docker
category:
- docs
---

Hi everyone welcome to a new tutorial. Today we're going to create the basic structure to run Celery + Redis(as a broker) in a Django project with Docker.

<!--more-->

###### You have to install <a href="https://docs.docker.com/engine/installation/" title="docker site">'docker'</a> and <a href="https://docs.docker.com/compose/install/" title="docker site">'docker-compose'</a> before start this tutorial.

This tutorial will have 2 steps:
* Create the all docker's files
* Setting up celery

**1- Creating all the docker files. This part is based on the official <a href="https://docs.docker.com/compose/django/" title="docker site">site</a> of docker**

First, in a folder(it will contain all your project) we have to create 3 files. The first one, will be the '*Dockerfile*' for your Django project:

{% highlight bash %}
FROM python:3
ENV PYTHONUNBUFFERED 1
RUN mkdir /code
WORKDIR /code
ADD requirements.txt /code/
RUN pip install -r requirements.txt
ADD . /code/
{% endhighlight %}

Here we have used python 3 as image to create our Django project and at the same time creating a '*code*' folder in our container with all the files of our current folder, including the *requirements.txt*

Now the '*docker-compose.yml*' file that will have all the logical structure of our containers:

{% highlight yml %}
version: '3'

services:
  redis:
    image: redis
    command: redis-server
    ports:
      - '6379:6379'
  db:
    image: postgres
  web:
    build: .
    command: python3 manage.py runserver 0.0.0.0:8000
    volumes:
      - .:/code
    ports:
      - '8000:8000'
    depends_on:
      - db
  celery:
    build: .
    command: celery -A djangorediscelery worker -B
    volumes:
      - .:/code
    links:
      - db
      - redis
{% endhighlight %}

The important parts here is that:
- We are creating the redis server in a container
- The celery process is in another container that will be created with the same image as your Django project
- We're creating the volume to synchronize our folder with the folder of our Django project
- Linking redis with celery.

Finally, the requirements.txt:

    celery==4.1.0
    Django==1.11.5
    psycopg2==2.7.3.1
    redis==2.10.6

This file doesn't need explanation ejeje :D

At this point you must have something like this:

```
your folder
│   requirements.txt
│   Dockerfile
|   docker-compose.yml
```

Run:

    $ docker-compose docker-compose run web django-admin.py startproject djangorediscelery .

    $ docker-compose up


**2- Setting up celery**

Write this in '*djangorediscelery/__init__.py*':

{% highlight python %}
from __future__ import absolute_import, unicode_literals

# This will make sure the app is always imported when
# Django starts so that shared_task will use this app.
from .celery import app as celery_app

__all__ = ['celery_app']
{% endhighlight %}

Create a '*djangorediscelery/celery.py*' file and write this:

{% highlight python %}
from __future__ import absolute_import, unicode_literals
import os
from celery import Celery
from celery import shared_task

# set the default Django settings module for the 'celery' program.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'djangorediscelery.settings')

app = Celery('djangorediscelery')

# Using a string here means the worker doesn't have to serialize
# the configuration object to child processes.
# - namespace='CELERY' means all celery-related configuration keys
#   should have a `CELERY_` prefix.
app.config_from_object('django.conf:settings', namespace='CELERY')

# Load task modules from all registered Django app configs.
app.autodiscover_tasks()
{% endhighlight %}

Create a '*djangorediscelery/tasks.py*' file and write this:

{% highlight python %}
from __future__ import absolute_import, unicode_literals
from celery import task

@task()
def printHello():
    return "Hello"
{% endhighlight %}


In our '*djangorediscelery/settings.py*' add this:

{% highlight python %}
CELERY_BROKER_URL = 'redis://redis:6379/0'
CELERY_IMPORTS = ['djangorediscelery.tasks',]
from celery.schedules import crontab
CELERY_BEAT_SCHEDULE = {
    'printHello': {
        'task': 'djangorediscelery.tasks.printHello',
        'schedule': 10.0,
    },
}
{% endhighlight %}

And that's it! Now you just need to run again your docker-compose and you should see each 10 seconds in the celery log the task showing "Hello"

I leave you <a href="https://github.com/mopitz199/BasicDockerDjangoRedisCelery" title="docker site">here</a> the code where you can see it!
