var hostname = "";
var index = lunr(function () {
    this.field('title')
    this.field('content', {boost: 10})
    this.field('category')
    this.field('tags')
    this.ref('id')
});



    index.add({
      title: "Sync Vs Async Request Promises JavaScript",
      category: ["docs"],
      content: "Hi everyone, today I want to show a comparison between async and sync request when we want to do something when multiple requests are done.\n\n\n\n\n",
      tags: [],
      id: 0
    });
    

    index.add({
      title: "React Native Push Notification",
      category: ["docs"],
      content: "Hi everyone, today I want to show how to use push notification in React Native.\nI will use local and remote notification using the google server notification.\n\n\n\n\n",
      tags: [],
      id: 1
    });
    

    index.add({
      title: "Django Channels in production with Docker",
      category: ["docs"],
      content: "Hi everyone, today I want to show how to create a Django project using Django Channles in PRODUCTION!, yes in production :D with Docker.\n\n\n\n\n",
      tags: [],
      id: 2
    });
    

    index.add({
      title: "Create a django project with gunicorn and nginx using docker",
      category: ["docs"],
      content: "Hi everyone welcome to a new tutorial. Today we’re going to create a django production environment with docker.\n\n\nWe have to create 2 docker containers:\n\n\n  Django container(with gunicorn)\n  Nginx container\n\n\nWatch the next video so see how to do it! :D\n\n\n",
      tags: [],
      id: 3
    });
    

    index.add({
      title: "Use Celery + Redis in a Django project with Docker",
      category: ["docs"],
      content: "Hi everyone welcome to a new tutorial. Today we’re going to create the basic structure to run Celery + Redis(as a broker) in a Django project with Docker.\n\n\n\nYou have to install ‘docker’ and ‘docker-compose’ before start this tutorial.\n\nThis tutorial will have 2 steps:\n\n  Create the all docker’s files\n  Setting up celery\n\n\n1- Creating all the docker files. This part is based on the official site of docker\n\nFirst, in a folder(it will contain all your project) we have to create 3 files. The first one, will be the ‘Dockerfile’ for your Django project:\n\nFROM python:3\nENV PYTHONUNBUFFERED 1\nRUN mkdir /code\nWORKDIR /code\nADD requirements.txt /code/\nRUN pip install -r requirements.txt\nADD . /code/\n\nHere we have used python 3 as image to create our Django project and at the same time creating a ‘code’ folder in our container with all the files of our current folder, including the requirements.txt\n\nNow the ‘docker-compose.yml’ file that will have all the logical structure of our containers:\n\nversion: '3'\n\nservices:\n  redis:\n    image: redis\n    command: redis-server\n    ports:\n      - '6379:6379'\n  db:\n    image: postgres\n  web:\n    build: .\n    command: python3 manage.py runserver 0.0.0.0:8000\n    volumes:\n      - .:/code\n    ports:\n      - '8000:8000'\n    depends_on:\n      - db\n  celery:\n    build: .\n    command: celery -A djangorediscelery worker -B\n    volumes:\n      - .:/code\n    links:\n      - db\n      - redis\n\nThe important parts here is that:\n\n  We are creating the redis server in a container\n  The celery process is in another container that will be created with the same image as your Django project\n  We’re creating the volume to synchronize our folder with the folder of our Django project\n  Linking redis with celery.\n\n\nFinally, the requirements.txt:\n\ncelery==4.1.0\nDjango==1.11.5\npsycopg2==2.7.3.1\nredis==2.10.6\n\n\n\nThis file doesn’t need explanation ejeje :D\n\nAt this point you must have something like this:\n\nyour folder\n│   requirements.txt\n│   Dockerfile\n|   docker-compose.yml\n\n\n\nRun:\n\n$ docker-compose docker-compose run web django-admin.py startproject djangorediscelery .\n\n$ docker-compose up\n\n\n\n2- Setting up celery\n\nWrite this in ‘djangorediscelery/init.py’:\n\nfrom __future__ import absolute_import, unicode_literals\n\n# This will make sure the app is always imported when\n# Django starts so that shared_task will use this app.\nfrom .celery import app as celery_app\n\n__all__ = ['celery_app']\n\nCreate a ‘djangorediscelery/celery.py’ file and write this:\n\nfrom __future__ import absolute_import, unicode_literals\nimport os\nfrom celery import Celery\nfrom celery import shared_task\n\n# set the default Django settings module for the 'celery' program.\nos.environ.setdefault('DJANGO_SETTINGS_MODULE', 'djangorediscelery.settings')\n\napp = Celery('djangorediscelery')\n\n# Using a string here means the worker doesn't have to serialize\n# the configuration object to child processes.\n# - namespace='CELERY' means all celery-related configuration keys\n#   should have a `CELERY_` prefix.\napp.config_from_object('django.conf:settings', namespace='CELERY')\n\n# Load task modules from all registered Django app configs.\napp.autodiscover_tasks()\n\nCreate a ‘djangorediscelery/tasks.py’ file and write this:\n\nfrom __future__ import absolute_import, unicode_literals\nfrom celery import task\n\n@task()\ndef printHello():\n    return \"Hello\"\n\nIn our ‘djangorediscelery/settings.py’ add this:\n\nCELERY_BROKER_URL = 'redis://redis:6379/0'\nCELERY_IMPORTS = ['djangorediscelery.tasks',]\nfrom celery.schedules import crontab\nCELERY_BEAT_SCHEDULE = {\n    'printHello': {\n        'task': 'djangorediscelery.tasks.printHello',\n        'schedule': 10.0,\n    },\n}\n\nAnd that’s it! Now you just need to run again your docker-compose and you should see each 10 seconds in the celery log the task showing “Hello”\n\nI leave you here the code where you can see it!\n",
      tags: [],
      id: 4
    });
    

    index.add({
      title: "Http service with token in react native",
      category: ["docs"],
      content: "Hi everyone, today I would like to show you a way to use the React Native http service and put the token by default if we have it!\n\nWe can separte this tutorial in two parts:\n\n\n  Save our token\n  Put the token in our header of every request\n\n\nLet’s start!\n\n\n\n1. Use the React Native local storage to save our token\n\nSave the token using react-native-storage:\n\nAfter installing, we need to create an storage, I recommend to save in a global.js file that as the name says, you can write all your global variables\n\n1\n2\n3\n4\n5\n6\n7\n8\n9    import Storage from 'react-native-storage';\n    ...\n    global.storage = new Storage({\n    \tsize: 1000,\n    \tstorageBackend: AsyncStorage,\n    \tdefaultExpires: 1000 * 3600 * 24,\n    \tenableCache: true,\n    })\n  \n\n\nThen we need to save your token when we get it, typically this will be after login(in the login page):\n\n    Here we get the token(using fetch)\n    ...\n    let token = responseJson.token\n    global.storage.save({\n    \tkey: 'token',\n    \tdata: token,\n    \texpires: 1000 * 3600\n    })\n  \n\nWe are done with this part, now that we have token saved globally we just need to use it!\n\n2. Create the http service with putting the token by default on each request\n\nI created a file called http.js that contains just the function that we are going to create.\n\n1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15\n16\n17\n18\n19\n20\n21  import * as utils from './utils';\n\n  export function http(method, path, data){\n    let fullUrl = \"localhost:8000/\"\n    return global.storage.load({\n      key: 'token',\n    }).then(ret =&gt; {\n      return fetch(fullUrl, {\n        method: method,\n        headers: {\n          'Authorization': 'Token '+ret,\n          'Accept': 'application/json',\n          'Content-Type': 'application/json',\n        },\n        body: data\n      })\n    }).catch(err =&gt; {\n      console.error(\"We couldn't get the token\")\n      return null;\n    })\n  }\n\n\nTo use the function, we need to give the parameters(method, path an data) and that’s it! The function is returning the fetch callback, so you can check the React Native documentation to check how the fetch callback works.\n\n1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15  // Import http service\n  import * as http from '../utils/http';\n  ...\n  let jsonData = {name:\"john\"}\n  resp = http.http('post', 'createPerson/', jsonData);\n  if(resp!=null){\n    resp.then((response)=&gt;{\n      console.warn(\"Here we have the response\")\n    })\n    resp.catch((error) =&gt; {\n      console.warn(\"Here we have an error\")\n    });\n  }else{\n    console.warn(\"Here we couldn't get the token\")\n  }\n\n\nWe are calling a POST request where the url is localhost:8000/cratePerson and the data is a json objects {name:”john”}. Also we are capturing the response and the error to handle it! :D\n",
      tags: [],
      id: 5
    });
    

    index.add({
      title: "Validate react native input",
      category: ["docs"],
      content: "Hi everyone, today I want to show a proper way to validate our inputs or forms in react native and how to handle errors.\n\n\n\n\n\nBefore\n\n\n\nAfter\n\n\n",
      tags: [],
      id: 6
    });
    

    index.add({
      title: "Django project with Docker",
      category: ["docs"],
      content: "Hi everyone, to create a django project with docker, we will use a this official link that explain how to do it.\n\n\n",
      tags: [],
      id: 7
    });
    

    index.add({
      title: "Django REST Framework like a ninja",
      category: null,
      content: "Hello everyone. This post is to show you all the tricks that I’ve been learning until now about Django REST Framework and create the best api for your app :D\n\nCheck this page is awesome, you can navigate through the DRF classes and check all the code :D Thanks to @_aericson at @vintasoftware\n\n\n\nViewSets(Model)\n\nYou can overwrite any function that I will mention, in the ViewSet class.\n\nclass UserViewSet(viewsets.ModelViewSet):\n    \"\"\"\n    A viewset for viewing and editing user instances.\n    \"\"\"\n    serializer_class = UserSerializer\n    queryset = User.objects.all()\n\n\n\n-The simpliest model viewset\n\nclass UserViewSet(viewsets.ModelViewSet):\n    \"\"\"\n    A viewset for viewing and editing user instances.\n    \"\"\"\n    serializer_class = UserSerializer\n    queryset = User.objects.all()\n\n\n\n-Use a serializers according to the request\n\ndef get_serializer_class(self):\n    if self.action == 'list':\n        return CustomListSerializer\n    if self.action == 'create':\n        return CustomistCreateSerializer\n    if self.action == 'retrieve':\n        return CustomRetrieveSerializer\n    if self.action == 'update':\n        return CustomUpdateSerializer\n    if self.action == 'partial_update':\n        return CustomPartialUpdateSerializer\n    if self.action == 'destroy':\n        return CustomDestroySerializer\n    return CustomNormalSerializer\n\n\n\n-Custom each request\n\nThe belows functions are the real one of DRF, you can edit them and overwrite as your needs\n\ndef list(self, request, *args, **kwargs):\n    queryset = self.filter_queryset(self.get_queryset())\n\n    page = self.paginate_queryset(queryset)\n    if page is not None:\n        serializer = self.get_serializer(page, many=True)\n        return self.get_paginated_response(serializer.data)\n\n    serializer = self.get_serializer(queryset, many=True)\n    return Response(serializer.data)\n\n\n\ndef create(self, request, *args, **kwargs):\n    serializer = self.get_serializer(data=request.data)\n    serializer.is_valid(raise_exception=True)\n    self.perform_create(serializer)\n    headers = self.get_success_headers(serializer.data)\n    return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)\n\n\n\ndef retrieve(self, request, *args, **kwargs):\n    instance = self.get_object()\n    serializer = self.get_serializer(instance)\n    return Response(serializer.data)\n\n\n\ndef update(self, request, *args, **kwargs):\n    partial = kwargs.pop('partial', False)\n    instance = self.get_object()\n    serializer = self.get_serializer(instance, data=request.data, partial=partial)\n    serializer.is_valid(raise_exception=True)\n    self.perform_update(serializer)\n\n    if getattr(instance, '_prefetched_objects_cache', None):\n        # If 'prefetch_related' has been applied to a queryset, we need to\n        # refresh the instance from the database.\n        instance = self.get_object()\n        serializer = self.get_serializer(instance)\n\n    return Response(serializer.data)\n\n\n\ndef partial_update(self, request, *args, **kwargs):\n    kwargs['partial'] = True\n    return self.update(request, *args, **kwargs)\n\n\n\ndef destroy(self, request, *args, **kwargs):\n    instance = self.get_object()\n    self.perform_destroy(instance)\n    return Response(status=status.HTTP_204_NO_CONTENT)\n\n\n\n-Create a post list like this:\n\n[\n    {\n        \"id\": 26,\n        \"workShiftStart\": \"2017-02-02\",\n        \"workShiftEnd\": \"2018-02-02\",\n        \"personStart\": \"2018-02-02\",\n        \"workShift\": 74,\n        \"person\": {\n            \"id\": 206,\n            \"nombre\": \"NICOLAS\"\n        }\n    },\n    {\n        \"id\": 27,\n        \"workShiftStart\": \"2018-02-02\",\n        \"workShiftEnd\": \"2018-02-02\",\n        \"personStart\": \"2018-03-01\",\n        \"workShift\": 74,\n        \"person\": {\n            \"id\": 112,\n            \"nombre\": \"Pablo\"\n        }\n    },\n]\n\n\n\nWhere each JSON Object is a model in our Django models. So to create a list where you create all the elements, or none elements (atomic creation) we have to overwrite the create function of our ViewSet Class\n\ndef create(self, request):\n    serializer = WorkShiftPersonCreateSerializer(data=request.data, many=True)\n    if serializer.is_valid():\n        serializer.save()\n        return Response(serializer.data, status=status.HTTP_201_CREATED)\n    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)\n\n\n\nHere, the key is the many=True that create a serialize that contain many objects and then you can process them like just one object but they are multiples objects.\n\nSerializers\n\n-Create an array of objects in a object like this:\n\n{\n    \"name\": \"Turno raro\",\n    \"holidaysConsider\": false,\n    \"tolerance\": 5,\n    \"shiftType\": \"R\",\n    \"days\": [\n        {\n            \"hasSnack\": false,\n            \"snackTime\": 2.0,\n            \"workShiftDay\": \"1\",\n            \"start\": \"00:00:00\",\n            \"end\": \"23:59:00\",\n            \"workDay\": true\n        },\n        {\n            \"hasSnack\": false,\n            \"snackTime\": 2.0,\n            \"workShiftDay\": \"1\",\n            \"start\": \"00:00:00\",\n            \"end\": \"23:59:00\",\n            \"workDay\": true\n        }\n    ]\n}\n\n\n\nwhere this JSON is a workshift that contain days, and you can to save the workshift but also each day with DRF as well and make the relation with the workshift that is a FK(Foreign Key) relation. The way to do that is overwritting the create method in the workshift serializer:\n\nclass WorkShiftSerializer(serializers.ModelSerializer):\n\n    days = DayWorkShiftSerializer(many=True, read_only=False)\n\n    class Meta:\n        model = WorkShift\n        fields = ('id','name','holidaysConsider','tolerance','shiftType', 'days')\n        read_only_fields = ('id',)\n\n    def create(self, validated_data):\n        days = validated_data.pop('days')\n        workShift = WorkShift.objects.create(**validated_data)\n        for day in days:\n            Day.objects.create(workShift=workShift, **day)\n        return workShift\n\n\n\nHere in the create function, we’ll recieve the data(JSON) and we will pop the days. Then create the workshift that will have this data:\n\n{\n    \"name\": \"Turno raro\",\n    \"holidaysConsider\": false,\n    \"tolerance\": 5,\n    \"shiftType\": \"R\",\n}\n\n\n\nand then for each day, create it and make the relations :D\n\nRoutings\n",
      tags: [],
      id: 8
    });
    

    index.add({
      title: "PostgreSQL CheatSheets",
      category: null,
      content: "Service =&gt; Instance: Response a una direccion IP y puerto especifico. tiene sus propios permisos de acceso,\nmantiene aisalada su informacion o datos.\n\n\n\nDatabase =&gt; Es una organizacion logica de datos y codigo. Un Service(Instance) puede contener una o mas Databases\n\n\n\n\n\nSchema =&gt; Es una organizacion logica de datos y codigo, un Database puede contener uno o mas Schemas\n\nEj: podemos tener una tabla llamada usuario, esta tabla la podemos crear en dos Schemas distinos y quedaria algo asi:\n\n\n  schema1_usuario\n  schema2_usuario\n\n\nDe esta forma, tendremos dos tablas “iguales” pero creadas en dos Schemas distintos con sus propios datos. Es posible comunicar tablas de distintos Schemas.\n\n\n\nTablespaces =&gt; Es un archivo fisico.\n\n\n\nCatalog =&gt; PostgreSQL, contiene informacion de los objetos que tenemos en nuestra base de datos.\n\nAl ejecutar psql estoy ingresando a una Instance, puedo especificarle IP, puerto y otras cosas. Por defecto va a la de localhost.\n\n\n\nArchivos de configuracion =&gt;\n\n\n  postgresql.conf (contiene configuracion propia de la Instance, como su ip, puerto, numero de conexiones, etc…)\n  pg_hba.conf (contiene los permisos de los usuarios que podran acceder al servidor PostgreSQL)\n  trust: no pide password\n  password: pide password, pero la envia en texto plano\n  md5: pide password, pero la envia encriptada en hash md5\n  iden: mapea el usuario que se quiere conectar con un usuario de PostgreSQL y ve si calza, e ingresa como el usuario de PostgreSQL\n  pg_ident.conf (contiene el mapaeo de qye usuario se mapeara con un usuario de PostgreSQL)\n\n\n-Comando para encontrar esos archivos:\n\nSELECT name, setting FROM pg_settings WHERE category='File Locations';\n\n\n\n-Comando para ver algunos settings del archivo postgresql.conf:\n\nSELECT name, context, unit, setting, boot_val, reset_val FROM pg_settings WHERE name in ['listen_addresses', 'max_connections', 'shared_buffers', 'efective_cache_size', 'work_mem'] ORDER BY context, name;\n\n\n\n-Comando para setear un campo del archivo postgresql.conf:\n\nALERT SYSTEM set work_mem = 8192;\nSELECT pg_reload_conf();\n\n\n\nEste comando creara un archivo llamado postgresql.auto.conf que contrandra todos los cambios de valores, y cuando se reinicie el servidor PostgreSQL, se cargara el archivo postgresql.conf y luego el postgres.auto.conf para aplicar todos los cambios que se han hecho y de esta forma no tener que setear los valores cada vez que se quiera reiniciar el servidor PostgreSQL\n\n-Comando para ver quien esta conectado a nuestra base de datos y cual fue su ultima consulta ejecutada(o ejecutandose):\n\nSELECT * FROM pg_stat_activity;\n\n\n\n-Comando para cancelar la consulta que se esta ejecutando a traves de un cierto usuario:\n\nSELECT pg_cancel_backend(pid);\n\n\n\n-Comando para desconectar un cierto usuario conectado:\n\nSELECT pg_terminate_backend(pid);\n\n\n\n\n\nRoles\n\nRoles: es un usuario de una Instance de PostgreSQL\n\n\n  roles de sesion: usarios normales que pueden ingresar a la Instance con su password\n  roles de grupo: grupo de usuarios con ciertos permisos, para darle permisos a los roles de sesion, usaremos los roles de grupo\n\n\n-Comando para crear un rol de sesion:\n\nCREATE ROLE john LOGIN PASSWORD 'john123';\n\n\n\n-Comando para ver los roles y sus permisos que tenemos en nuetsra Instance:\n\nSELECT * FROM pg_roles;\n\n\n\n-Comando para eliminar un role:\n\nDROP ROLE john;\n\n\n\n-Comando para crear un rol de sesion con md5 password(manera correcta):\n\nCREATE ROLE john LOGIN ENCRYPTED PASSWORD 'john123';\n\n\n\n-Comando para crear un rol de sesion que exista hasta una cierta fecha:\n\n\n  ‘2015-2-20 00:00’\n  ‘infinity’\n\n\nCREATE ROLE john LOGIN ENCRYPTED PASSWORD 'john123' VALID UNTIL '2015-2-20 00:00';\n\n\n\n-Comando para crear un rol con ciertos permisos:\n\n\n  CREATEDB\n  SUPERUSER\n  CREATEROLES\n\n\nCREATE ROLE john LOGIN ENCRYPTED PASSWORD 'john123' CREATEDB;\n\n\n\n-Comando para crear rol de grupo:\n\nCREATE ROLE platzi INHERIT;\n\n\n\nEl rol puede ser de sesion o de grupo\n\n-Comando para agregar un rol de sesion a un rol de grupo:\n\nGRANT john to platzi;\n\n\n\n\n\nDatabase\n\n-Comando para crear una base de datos:\n\nCREATE DATABASE platzi_db;\n\n\n\n-Comando para eliminar una base de datos:\n\nDROP DATABASE platzi_db;\n\n\n\n-Comando para asignarle una plantilla a una base de datos al momento de crearla:\n\nCREATE DATABASE platzi_db TEMPLATE template1;\n\n\n\n-Comando para restaurar una base de datos a partir de un archivo:\n\npg_restore -d db_name restore_file\n\n\n\nTemplates =&gt; Son configuraciones que estan almacenadas, y que al momento de crear una base de datos con esa plantilla, esa base de datos tendra todas esas configuracion, que pueden ser:\n\n\n  extensiones(postGIS, etc..)\n  tablas por defecto\n  roles para esa base de datos\n  etc..\n\n\n-Comando para crear un template a partir de una base de datos:\n\nUPDATE pg_database SET datistemplate = true WHERE datname = 'platzi_db';\n\n\n\nYa no se podra usar esa base de datos, ya que ahora es un template\n\nComando para cambiarme a de una base de datos a otra:\n\n\\c platzi_db\n\n\n\n\n\nSchemas\n\nLa idea de un Schema es poder tener las tablas agrupas en una misma base de datos, de esta forma si tengo varias tablas relacionadas al manejo de usuarios, las puedo agrupar en un Schema, luego si tengo tablas relacionadas con un inventario, las puedo agrupar en otros Schema, y de esta forma tener un orden en la misma base de datos cuando estas crecen mucho.\n\n-Comando para crear un Schema (debo estar adentro de una base de datos):\n\nCREATE SCHEMA schema_inventario;\n\n\n\n\n\nPrivileges\n\n-Comando para dar privilegios a una tabla en particular de un schema a un rol:\n\nGRANT ALL ON ALL TABLES IN SCHEMA schema_inventario TO platzi;\n\n\n\n-Comando para ejecutar “SQL” directamente desde la terminal, en este caso en particular se le aplican provilegios a una base de datos.\n\npsql database_name -c \"GRANT ALL ON ALL TABLES IN SCHEMA public to user;\"\n\n\n\nListado de privilegios y de como sar privilegios a distintos tipos de objetos(tables, schemas, databases, etc…)\n\n\n\nData Types\n\nSEQUENCE: Es un valor entero incremental que no se puede cambiar. Se usa como id de tabla ya que por cada fila, ese valor incrementara.\n\nVARCHAR: Sirve para guardar cadenas de texto variables, ya que si el maximo es 255, y guardamos una cadena de 10, NO rellenara el resto con espacio, y de esa forma no gastaremos espacio innecesario.\n\nARRAY: Guarda un arreglo literalmente para su uso como arreglo en un formato de este tipo: Ej: {1,4,8,9}\n\n\n\nFunctions\n\n-lpad: rellena con un caracter en especial:\n\n\n  lpad(‘ab’, 3 ,0) =&gt; 0ab\n\n\n-repeat: repite un string:\n\n\n  repeat(‘-‘, 4) =&gt; —-\n\n\n-trim: quita los espacios de la derecha e izuqierda de un string\n\n\n  trim(‘   tr    ‘) =&gt; tr\n\n\n-split_part: separa un string por un caracter, los guarda en un arreglo y luego podemos obetner cualquiera de esos:\n\n\n  split_part(‘312-4657-2947’, ‘-‘, 2) =&gt; 4657\n\n\n-string_to_array: separa un string por un caracter(devuelve un arreglo)\n\n\n  string_to_array(‘aaa.bbb.ccc’, ‘.’) =&gt; {aaa,bbb,ccc}\n\n",
      tags: [],
      id: 9
    });
    

    index.add({
      title: "Minify an Ionic 2 project with app-script",
      category: null,
      content: "Hello everyone, in this tutorial I will show you in a very short way how you can minify an Ionic 2 project. Let’s start!\n\n\n\n1. Create an empty project:\n\nsudo ionic start MyMinifyProject blank --v2\n\n\n\n2. Go to the package.json and we have to add this line:\n\n\"scripts\": {\n  ...\n  \"ionic:minify\": \"ionic-app-scripts minify\"\n  ...\n}\n\n\n\nThat line will able you to execute the script to miinify your project. You can go to this link to see more about it and take a look to all the script that are able:\n\nhttps://ionicframework.com/docs/v2/resources/app-scripts/\n\nAnd this link to see the options that you can use in each script:\n\nhttps://github.com/driftyco/ionic-app-scripts#command-line-flags\n\n3. We are done! just go to the terminal and run:\n\nsudo npm run ionic:minify\n\n\n\nYou will have the “www” folder with the css and js minify ready to be served for any service :D\n",
      tags: [],
      id: 10
    });
    

    index.add({
      title: "Consume REST Api with Token Authentication in Ionic 2",
      category: null,
      content: "Hello everyone, in this article I would like to show you how to use API REST with Token Authentication in Ionic 2 in simple steps :D\n\n\n\n1. Let’s create an empty project:\n\nsudo ionic start HttpServiceProject blank --v2\n\n\n\n2. Now we have to create a provider that will be an http service:\n\nsudo ionic g provider HttpService\n\n\n\nThis service will manage the token\n\n3. Edit the http-service.ts that we just created:\n\nimport { Injectable } from '@angular/core';\nimport { Http, Headers } from '@angular/http';\nimport 'rxjs/add/operator/map';\n\n@Injectable()\nexport class HttpService {\n\n  constructor(private _http: Http) {\n    console.log('Hello HttpService Provider');\n  }\n\n  createAuthorizationHeader(headers: Headers) {\n    headers.append('Content-Type', 'application/json');\n    headers.append('Authorization', 'Token ' + localStorage.getItem(\"auth_token\"));\n    return headers;\n  }\n\n  get(url) {\n    var headers = this.createAuthorizationHeader(new Headers());\n    return this._http.get(url, {headers: headers}).map(\n      res =&gt; { return res.json() }\n    );\n  }\n\n  post(url, data) {\n    var headers = this.createAuthorizationHeader(new Headers());\n    return this._http.post(url, data, {headers: headers}).map(\n      res =&gt; {return res.json() }\n    );\n  }\n\n}\n\n\n\nWe need to explain some things, we created to methods( get and post ), an each method will make the according call, just with something different, that will be the token that they will set in the header before the call. The key is in the “createAuthorizationHeader” method that is in charge to get the token, and as you can see we are getting the token form the localStorage, that’s means that we should storage the token before the call, for this example you can create a fake token.\n\n4. In the home.ts we have to use the service:\n\nimport { HttpService } from '../../providers/http-service';\n\n\n\n@Component({\n  selector: 'page-home',\n  templateUrl: 'home.html',\n  providers: [HttpService]\n})\n\n\n\nconstructor(\n    public navCtrl: NavController,\n    private _httpService: HttpService\n  ) {\n      _httpService.get(\"http://jsonplaceholder.typicode.com/posts\")\n        .subscribe(\n          data =&gt; {\n            this.posts = data;\n          },\n          error =&gt; {\n\n          }\n        )\n  }\n\n\n\nAs you can see, we are using an url example, that in your case will be your service, in this case we are requesting by posts and now we have to show the results in our home template.\n\n5. In our home.html insert a list like this:\n\n\n&lt;ion-list&gt;\n  &lt;ion-item *ngFor=\"let post of posts; let i = index\"&gt;\n    &lt;h2&gt;{{ post.title }}&lt;/h2&gt;\n    &lt;h3&gt;{{ post.id }}&lt;/h3&gt;\n    &lt;p&gt;{{ post.body }}&lt;/p&gt;\n  &lt;/ion-item&gt;\n&lt;/ion-list&gt;\n\n\n\n\nThis list will show all the posts that we requested.\n\n6. If you check the headers in the request you will see the token if you created a fake one:\n\ncreateAuthorizationHeader(headers: Headers) {\n  headers.append('Content-Type', 'application/json');\n  // Fake token\n  headers.append('Authorization', 'Token ' + 'cds6ds7cds5csdcds');\n  return headers;\n}\n\n\n\n\n\n7. In that way you created a service that is available to consume external services using a token authentication if is necessary :D. If you want to download the project just go to this link:\n\nhttps://github.com/mopitz199/HttpServiceWithTokenProject\n",
      tags: [],
      id: 11
    });
    

    index.add({
      title: "Add a tab and a menu in the same Ionic 2 project",
      category: null,
      content: "Hello everyone in this article I’ll show you how to create a blank Ionic 2 project and add the tabs + menu tools at the same time and how to manage it, let’s start!\n\n\n\n1. First we should create an empty Ionic 2 project\n\nsudo ionic start TabMenuProject blank --v2\n\n\n\n2. Now, we’re going to create the menu. in our app.html add this code that will be the menu:\n\n&lt;ion-menu [content]=\"content\"&gt;\n  &lt;ion-header&gt;\n    &lt;ion-toolbar&gt;\n      &lt;ion-title&gt;Pages&lt;/ion-title&gt;\n    &lt;/ion-toolbar&gt;\n  &lt;/ion-header&gt;\n  &lt;ion-content&gt;\n    &lt;ion-list&gt;\n      &lt;button ion-item&gt;\n        Login\n      &lt;/button&gt;\n      &lt;button ion-item&gt;\n        Signup\n      &lt;/button&gt;\n    &lt;/ion-list&gt;\n  &lt;/ion-content&gt;\n&lt;/ion-menu&gt;\n\n\n\nand don’t forget to make the reference to the menu:\n\n&lt;ion-nav #content [root]=\"rootPage\"&gt;&lt;/ion-nav&gt;\n\n\n\n3. The menu is created but there’s no button to show it, so in the home.html edit the header:\n\n&lt;ion-header&gt;\n  &lt;ion-navbar&gt;\n    &lt;button ion-button menuToggle icon-only&gt;\n      &lt;ion-icon name='menu'&gt;&lt;/ion-icon&gt;\n    &lt;/button&gt;\n    &lt;ion-title&gt;\n      Ionic Blank\n    &lt;/ion-title&gt;\n  &lt;/ion-navbar&gt;\n&lt;/ion-header&gt;\n\n\n\nGreat! now we have the menu and we can show it without any problems. The second part is the tab, so go for it!\n\n4. Generate a new page that will be that tab, in the terminal:\n\nsudo ionic generate page tabs\n\n\n\n5. Generate another page just for the proper way to show the tab example:\n\nsudo ionic generate page contact\n\n\n\n6. We have to create our tabs, so go to the tabs.html, remove all the code and add this code:\n\n&lt;ion-tabs&gt;\n  &lt;ion-tab tabIcon=\"heart\" [root]=\"tab1\"&gt;&lt;/ion-tab&gt;\n  &lt;ion-tab tabIcon=\"star\" [root]=\"tab2\"&gt;&lt;/ion-tab&gt;\n&lt;/ion-tabs&gt;\n\n\n\nwhere each ion-tab will be a tab, in this case, “home” and “contact”\n\n7. Now we have to link the tab that we just created with the pages, so in the tabs.ts the class should be something like this:\n\nexport class TabsPage {\n  public tab1:any;\n  public tab2:any;\n  constructor(\n    public navCtrl: NavController,\n    public navParams: NavParams\n  ) {\n    this.tab1 = HomePage;\n    this.tab2 = ContactPage;\n  }\n  ionViewDidLoad() {\n    console.log('ionViewDidLoad TabsPage');\n  }\n}\n\n\n\ndon’t forget to import the pages:\n\nimport { HomePage } from '../home/home';\nimport { ContactPage } from '../contact/contact';\n\n\n\n8. Great! now we have to understand how the tabs works. the tab page that we created will be our rootPage and the tab will manage all the content that in that case is the HomePage and the ContactPage. So lets go to the app.component.ts, import the tabs and change the value of the rootPage:\n\nimport { TabsPage } from '../pages/tabs/tabs';\n\n\n\nrootPage = TabsPage;\n\n\n\n9. Perfect! we’re almost done :D now we just need to add the pages that we have created in the app.module.ts:\n\nimport { TabsPage } from '../pages/tabs/tabs';\nimport { ContactPage } from '../pages/contact/contact';\n\n\n\ndeclarations: [\n  MyApp,\n  HomePage,\n  TabsPage,\n  ContactPage\n]\n\n\n\nentryComponents: [\n  MyApp,\n  HomePage,\n  TabsPage,\n  ContactPage\n]\n\n\n\n10. Done! in this simples steps you could create a menu and a tab in the same project from the beginning :D run the server and try it!\n\nsudo ionic serve\n\n\n\n11. BONUS! you can customize this in different ways, for example you can set how the tab will be shows in the app, just changing some settings in the app.module.ts:\n\nimports: [\n  IonicModule.forRoot(MyApp, {\n    platforms: {\n      android: {\n        tabsPlacement: 'top'\n      },\n      ios: {\n        tabsPlacement: 'bottom'\n      },\n      windows: {\n        tabsPlacement: 'top'\n      }\n    }\n  })\n]\n\n\n\nthere’s set that in ios the tab will be shown in the bottom.\n\nI hope you guys liked this tutorial, if you want to download all the project, just go to this link:\n\nhttps://github.com/mopitz199/TabMenuProject\n",
      tags: [],
      id: 12
    });
    

    index.add({
      title: "Run a Django(with postgresql) project with Vagrant",
      category: null,
      content: "Hello! Have the chance to deploy in a very easy way a Django project no matter which operating system you are using with Vagrant.\n\nRequirements for this tutorial:\n\n\n  Virtualenvwrapper\n  VirtualBox\n  Vagrant\n\n\n\n\nFirst we need to create a virtual environment, install django and create a project:\n\nmkvirtualenv DjangoVagrant\npip install django\ndjango-admin startproject DjangoVagrantProject\n\n\n\n2. Now we need to find a proper box for our virtualization, you can find a list of boxes in the vagrant page https://atlas.hashicorp.com/boxes/search. I will use the simplest one (ubuntu/trusty64):\n\nvagrant init ubuntu/trusty64\n\n\n\n3. Great! we just created a “VagrantFile” in our django project. This file has all our setting for the virtual machine. We are going to open it and edit some lines:\n\n-Uncomment this line:\n\n# config.vm.network \"forwarded_port\", guest: 80, host: 8080\n\n\n\nand edit it like this:\n\nconfig.vm.network \"forwarded_port\", guest: 80, host: 9090\n\n\n\n-Uncomment this line:\n\nconfig.vm.network \"private_network\", ip: \"192.168.33.10\"\n\n\n\nand this line:\n\nconfig.vm.network \"public_network\"\n\n\n\nWe have our VagrantFile ready to create the virtual machine :D\n\n4. Create the virtual machine:\n\nvagrant up\n\n\n\nIt can take a while, but then we will have our virtual machine running :D\n\n5. Now, from the Virtualenvwrapper we will create our requirements.txt file:\n\npip freeze &gt; requirements.txt\n\n\n\n\nWe are ready to install django in our virtual machine\n\n6. I will give you a script that create you a django project with virtualenv, it install all the dependencies from the requirements.txt and also it install postgres. Is amazing:\n\nhttps://github.com/mopitz199/Script-For-Django-In-Vagrant\n\nCopy that file in the root of your django project\n\nNote: you will find inside of this file the username of postgres and the database with his password as well, you can edit it as your wish (according to the database information of your django project)\n\n7. Now we need to get into our virtual machine and go to our project:\n\nvagrant ssh\ncd /vagrant\n\n\n\n8. At this moment, we have a folder with all our django project but nothing else. We will run the file that we downloaded and this script will install\n\n\n  virtuelenv\n  postgresql\n  virtuelenvwrapper(it will install everything in this wrapper, you can change the name of the wrapper in the file) all the requirements.txt dependencies\n  Also it will create a database with a username as I told you steps before and it will make the migrations and migrate the django project.\n\n\nAlso it will create a database with a username as I told you steps before and it will make the migrations and migrate the django project.\n\nsource config.sh\n\n\n\nIt will take a long time and it will ask you your aprovement for some instalations (nothing complicated).\n\n8. After that you will have everything installed and ready to run your django project from the virtual machine. Run “ifconfig” to check you ip and allow it in the django setting:\n\nifconfig\n\n\n\n\n\nNow:\n\nnano DjangoVagrantProject/settings.py\n\n\n\nand paste the ip in the “ALLOWED_HOST”\n\n\n\nFinally run:\n\npython manage.py runserver 192.168.0.17:9090\n\n\n\nAnd there you have it! a django project running in a virtual machine with vagrant :D\n",
      tags: [],
      id: 13
    });
    

    index.add({
      title: "How to create and run an apk file from Ionic2 app",
      category: null,
      content: "Hi everyone, in this tutorial I’ll show you how to create an apk file (for android) from an Ionic2 app in simple steps, let’s start!\n\n\n\n1. First we will need some requirements, you need to:\n\n\n  Install Android Studio or just the SDK(to build the app)\n  Install the some API’s (16,24, and one of the last once) from the SDK Manager\n  Install ADB(to install our app in our emulator\n  create an emulator with the AVD Manager(to run the app)\n\n\n2. Create an empty project:\n\nsudo ionic start BlankProject blank --v2\n\n\n\n3. We need to create the android platform:\n\nsudo ionic platform add android\n\n\n\nIf we get an error like this: “Error: Failed to find ‘ANDROID_HOME’ environment variable. Try setting setting it manually.” is because we need to set our ANDROID_HOME variable. A quick solution would be put something like this:\n\nsudo ANDROID_HOME=\"/home/maximiliano/Android/Sdk/\" ionic platform add android\n\n\n\nWhere is your case you have to write YOUR path to the SDK.\n\n4. After that, we are going to use cordova to build our apk file:\n\nsudo cordova build --release android\n\n\n\nAgain, if you haven’t setted up our ANDROID_HOME enviroment variable you can solve it writting this:\n\nsudo ANDROID_HOME=\"/home/maximiliano/Android/Sdk/\" cordova build --release android\n\n\n\n5. Now let’s go to our apk file, in my case is in:\n\ncd platforms/android/build/outputs/apk/\n\n\n\nYou will see that your app has a name like this: “android-release-unsigned.apk”. That is because you need to sign your app before use it, so, let’s do it!\n\n6. To sign our app we need to create a key first:\n\nsudo keytool -genkey -v -keystore my-release-key.keystore -alias alias_name -keyalg RSA -keysize 2048 -validity 10000\n\n\n\nWhere “my-release-key.keystore” will be the name that you key will have(you can put any name)\n\n7. Now we will apply the key in our app:\n\nsudo jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore my-release-key.keystore android-release-unsigned.apk alias_name\n\n\n\nWhere “android-release-unsigned.apk” is the name of the apk that you created steps before\n\n8. We are almost done, we’re going to optimize a little bit our app running this command:\n\nsudo /home/maximiliano/Android/Sdk/build-tools/25.0.2/zipalign -v 4 android-release-unsigned.apk final.apk\n\n\n\nWhere you have to write YOUR path to “zipalign” that is where your SDK is saved. then you have two names, the first one is your current app and the second one is the name that you optimize app will have(write any name, but don’t forget the apk extension)\n\n9. Great! now we have our apk ready :D would you like to run it? Let’s do it! Go to the SDK tools:\n\ncd /home/maximiliano/Android/Sdk/tools/\n\n\n\nAnd run:\n\n./android avd\n\n\n\nThen, create an AVD(Android Virtual Device) with one of your API Level (16,24, etc…)\nOnce it is created, run it, you will have something like this:\n\n\n\nSo you are ready to install you apk in that AVD\n\n10. Go where our app (final.apk) is and run:\n\nadb devices\n\n\n\nYou should see something like this:\n\n\n\nThat means that you have you emulator running and waitting for our app :D, now install it!\n\nadb install final.apk\n\n\n\nYou should see in the AVD the default cordova icon with our project name:\n\n\n\nCome on! run it!!!\n",
      tags: [],
      id: 14
    });
    

    index.add({
      title: "Documentation - Configuration & First Steps",
      category: ["docs","help"],
      content: "Configuration\nAll configuration options are in the _config.yml file.\n\n\n    \n    Created by Patricia Mafra\n\n\nGeneral Settings\n\n  name: Your name.\n  job_title: Your job title.\n  email: Your email. There are two cases where email is used. First, if you entered the email and you’ve activated show_email option the end result will be a visible social email icon in the sidebar. The second use of your email is when you do not set your own avatar. In this case your email is used by the gravatar plugin to automatically fetch your gravatar.\n  description: Describe yourself with a couple of words.\n  avatar: Write down the full path to the avatar http://mysite.com/blog/assets/images/avatar.jpg. If you comment this row, “Steve” checks if you have an email and shows your gravatar if you have any.\n  favicon: Want a favicon? Enter the full path here. For example http://mysite.com/blog/assets/favicon.ico.\n  twitter_handler: Add your Twitter username without the @. It will be used for Twitter Cards. The default card type for “Steve” is Summary Card with Large Image.\n  analytics_code: Add your Google Analytics Tracking ID. Example ID: UA-XXXXXXX-2.\n  disqus: Add your website shortname from Disqus.\n\n\nImportant Note: Keep in mind that name, job_title, twitter_handler and some of the post specific variables are used as default meta data in some cases.\n\n\n\nSocial Accounts\n\n  social_networks: Here you can find the list of all the available social networks that you can currently use. Of course you can always add a new one by yourself or ask for it to be available in the next version of the theme. If you don’t want a specific social network to be seen, just leave the url value empty or delete the line.\n\n\nImportant: Do not change the names of the social networks!\n\nModules Settings\nOne thing to remember - 1 is on, 0 is off.\n\n\n  show_categories: If it is on and you’ve added categories in the post itself the categories will be visible. If it is off and you’ve added categories in the post they will be hidden. This option is helpful if you want to turn on/off categories for all your posts at once.\n  show_tags: If it is on and you’ve added tags in the post itself the tags will be visible. If it is off and you’ve added tags in the post they will be hidden.  This option is helpful if you want to turn on/off tags for all your posts at once.\n  show_email: If this is turned on and you’ve entered an email value in email, an email icon will appear next to your social media accounts and all your readers will be able to contact you.\n  show_rss: If this is turned on, a new RSS button will appear in the sidebar next to your social media accounts.\n  show_comments: If it is on and you’ve added comments: true in the post itself the comments will be visible. If it is off and you’ve added comments: true in the post the comments will be hidden. This option is helpful if you want to turn on/off comments for all your posts at once.\n  show_menu: If it is on the main menu will be visible.\n  fixed_sidebar: If it is on the sidebar will be fixed (sticky).\n\n\nDefaults\n\n  defaults: The only available option at the moment is whether to enable the comments automatically in the post or not. The default value is true.\n\n\nServing\nThese options are pretty important, so take a closer look. If you experience any problems with your paths you should check them here.\n\n\n  url: Enter your domain! Example: https://mysite.com\n  baseurl: The baseurl can remain empty if you’re not going to host your site in a subfolder. But if you want your site to be something like htttp://mysite.com/blog you should write down /blog here.\n\n\nIncludes\n\n\n  include: Force the inclusion of the pages directory.\n\n\nOutputting\n\n\n  permalink: By default your links will look like this http://mysite.com/categories/post-name.html. If you want a different permalink check Jekyll documentation.\n  category_dir: The default directory is categories, so for example if you go to random category index you will see something like this http://mysite.com/categories/category-name/postname.html.\n\n\nPagination\n\n  paginate: You should enter a number that stands for the number of posts per page.\n  paginate_path: The default path is /page:num/, so for example if you go to second page you will see something like this http://mysite.com/page2/.\n\n\nImportant Note: Pagination is currently working only on home page due to Jekyll limitations.\n\nConversion\n\n  markdown: Choose your Markdown renderer. Different Markdown renderers supported by Jekyll sometimes have extra options available. I suggest to stick with the default.\n  excerpt_separator: By default when you’re writing a post, you should add &lt;!--more--&gt; to define excerpt. You have three options - to leave it as is, to change the tag or to completely remove it but in this case you’ll always see the full content.\n\n\nAssets Settings\n\n  sass: Choose the path to all of yours SCSS partials and the compression method for the final file.\n\n\nIf you need extra help, just check out the official Jekyll documentation.\n\nAdditional Configuration\n\n\n\tHow to change your default theme color?\n\tJust go to /assets/partials/_vars.scss and change the color of the $primary-color variable.\n\t\n\tHow Facebook knows which image to use for sharing?\n\tBy default the script gets the first image in the post so take that in mind when you write a blog post.\n\n\nAdding Post\n\nThe next thing after you are done with the configuration file is to add your first post. You will need to have at least basic knowledge of HTML or Markdown.\n\nAll you need to do is to create a new file with name YYYY-MM-DD-my-first-post and .markdown or .md extension. Create it in the _posts folder. By default the name of the file is composed by date and title but you can overwrite these in the post’s front matter.\n\nIn the beginning of the every post you have a so called front matter block which contains some data about the post. Here is the short description of the options.\n\nlayout: The post layout.\n\ndate: Exact date when the post is published. The date is actually pretty important and I suggest you never change it. Specific date helps Jekyll to order correctly all the posts. Also, the date is used to generate a unique ID, so Disqus can always get the right comments for the right post, even when you change the title.\n\ntitle: Post’s title.\n\ndescription: Meta description used for better SEO.\n\ncomments: By default they are always true, but if you want to turn them off for a specific post just set this to false.\n\ncategory: List the categories in which you want your post to appear.\n\ntags: List your tags here.\n\nAdding Page\n\nAdding page is even simpler than adding post. Just create a sub-folder to the pages directory and inside that sub-folder create index.md file. The folder name is your page name. Every folder must contain index file. Pages are also using front matter to add information to your page.\n\nlayout: The page layout.\n\ntitle: Page’s title.\n\npermalink: This is important. If you do not enter the permalink, your url will be something like this http://example.com/_pages/about. Enter the permalink and get rid of /_pages/ part. Do not forget the trailing slash!\n\nThat’s it! Do not hesitate to ask if you have any questions. Also you can send me feature requests. There are some nice features that are planed for the upcoming versions. Happy blogging!\n",
      tags: ["documentation","steve","jekyll"],
      id: 15
    });
    

    index.add({
      title: "Installation",
      category: ["docs","help"],
      content: "\n    \n\n\nI assume you have already downloaded and installed Ruby. Here’s what you need to do next:\n\n\n  Run gem install jekyll bundler.\n  Copy the theme in your desired folder.\n  Enter into the folder by executing cd name-of-the-folder.\n  Run bundle install.\n  If you want to access and customize the theme, use bundle exec jekyll serve. This way it will be accessible on http://localhost:4000.\n  Upload the content of the compiled _site folder on your host server.\n\n",
      tags: ["installation","steve","jekyll"],
      id: 16
    });
    

    index.add({
      title: "What is Jekyll?",
      category: ["docs"],
      content: "Jekyll is a parsing engine bundled as a ruby gem used to build static websites from dynamic components such as templates, partials, liquid code, markdown, etc. Jekyll is known as “a simple, blog aware, static site generator”.\n\n\n\n\n\nWhat does Jekyll do?\n\nJekyll is installed as a ruby gem local computer. Once installed you can call jekyll serve in the terminal in a directory and provided that directory is setup in a way jekyll expects, it will do magic stuff like parse markdown/textile files, compute categories, tags, permalinks, and construct your pages from layout templates and partials.\n\nOnce parsed, Jekyll stores the result in a self-contained static _site folder. The intention here is that you can serve all contents in this folder statically from a plain static web-server.\n\nYou can think of Jekyll as a normalish dynamic blog but rather than parsing content, templates, and tags on each request, Jekyll does this once beforehand and caches the entire website in a folder for serving statically.\n\nSource: http://jekyllbootstrap.com/lessons/jekyll-introduction.html\n",
      tags: [],
      id: 17
    });
    

    index.add({
      title: "Sample Data",
      category: ["docs"],
      content: "Markdown (or Textile), Liquid, HTML &amp; CSS go in. Static sites come out ready for deployment.\n\nHeadings\n\nHeading 1\n\nHeading 2\n\nHeading 3\n\nHeading 4\n\nHeading 5\n\nHeading 6\n\nBlockquote\n\n\n  No more databases, comment moderation, or pesky updates to install—just your content.\n\n\nUnordered List\n\n\n  Jekyll\n  Ruby\n  Markdown\n  Liquid\n\n\nOrdered List\n\n\n  Jekyll\n  Ruby\n  Markdown\n  Liquid\n\n\nLink\n\nThis is an example inline link.\n\nParagraph w/ strong, em, etc.\n\nThese are just a few of the available configuration options. Many configuration options can either be specified as flags on the command line, or alternatively (and more commonly) they can be specified in a _config.yml file at the root of the source directory. Jekyll will automatically use the options from this file when run. For example, if you place the following lines in your _config.yml file.\n\nImage\n\n\t\n\tPhoto by Rachel Davis.\n\n\nVideo\n\n\n\nDefault Code Block\n\nThis is code blog.\n\n\n\nStyled Code Block\n\n1\n2\n3\n4\n5\n6\n7\n8\n9\n10\n11\n12\n13\n14\n15\n16\n17\n18#!/usr/bin/ruby\n\n$LOAD_PATH &lt;&lt; '.'\nrequire \"support\"\n\nclass Decade\ninclude Week\n   no_of_yrs=10\n   def no_of_months\n      puts Week::FIRST_DAY\n      number=10*12\n      puts number\n   end\nend\nd1=Decade.new\nputs Week::FIRST_DAY\nWeek.weeks_in_month\nWeek.weeks_in_year\nd1.no_of_months\n\n\nDefinition Lists\n\n\n    Definition Title\n    Definition Description\n\n\nParagraphs w/ Aligned Images\n\nThe Jekyll gem makes a jekyll executable available to you in your Terminal window. You can use this command in a number of ways.\n\n\n\t\n\tPhoto by Dustin Lee.\n\n\nThis site aims to be a comprehensive guide to Jekyll. We’ll cover topics such as getting your site up and running, creating and managing your content, customizing the way your site works and looks, deploying to various environments, and give you some advice on participating in the future development of Jekyll itself.\n\nJekyll is a simple, blog-aware, static site generator. It takes a template directory containing raw text files in various formats, runs it through a converter (like Markdown) and our Liquid renderer, and spits out a complete, ready-to-publish static website suitable for serving with your favorite web server. Jekyll also happens to be the engine behind GitHub Pages, which means you can use Jekyll to host your project’s page, blog, or website from GitHub’s servers for free.\n\n\n\t\n\tPhoto by LoboStudio Hamburg.\n\n\nThroughout this guide there are a number of small-but-handy pieces of information that can make using Jekyll easier, more interesting, and less hazardous. Here’s what to look out for.\n\nIf you come across anything along the way that we haven’t covered, or if you know of a tip you think others would find handy, please file an issue and we’ll see about including it in this guide.\n\nThe front matter is where Jekyll starts to get really cool. Any file that contains a YAML front matter block will be processed by Jekyll as a special file. The front matter must be the first thing in the file and must take the form of valid YAML set between triple-dashed lines.\n",
      tags: [],
      id: 18
    });
    

    index.add({
      title: "Script Generate Django Project In Vagrant",
      category: null,
      content: "Script to generate a Django App with Vagrant\n\n#!/bin/bash\n\nVIRTUALENV_NAME=\"vagrantdev\"\nDB_USER=\"vagrantuser\"\nDB_NAME=\"vagrantdb\"\nDB_PASSWORD=\"vagrantpass\"\n\n# Install of pip and their dependencies\nsudo apt-get update\nsudo apt-get install python-pip libpq-dev python-dev build-essential\nsudo pip install --upgrade pip\nsudo pip install --upgrade virtualenv\nsudo pip install --upgrade setuptools\n\n# Install postgres\nsudo apt-get install postgresql postgresql-contrib\n\n# Create databse\nsudo -u postgres psql -c \"CREATE DATABASE $DB_NAME;\"\nsudo -u postgres psql -c \"CREATE USER $DB_USER WITH PASSWORD '$DB_PASSWORD';\"\nsudo -u postgres psql -c \"ALTER ROLE $DB_USER SET client_encoding TO 'utf8';\"\nsudo -u postgres psql -c \"ALTER ROLE $DB_USER SET default_transaction_isolation TO 'read committed';\"\nsudo -u postgres psql -c \"ALTER ROLE $DB_USER SET timezone TO 'UTC';\"\nsudo -u postgres psql -c \"GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $DB_NAME;\"\n\n\n# Install virtualenvwrapper\nsudo pip install virtualenvwrapper\nexport WORKON_HOME=~/Envs\nsource /usr/local/bin/virtualenvwrapper.sh\nmkvirtualenv $VIRTUALENV_NAME\nworkon $VIRTUALENV_NAME\n\n\n# Install django\npip install -r requirements.txt\n\npython manage.py makemigrations\npython manage.py migrate\n\n\n",
      tags: [],
      id: 19
    });
    


var store = [{
    "title": "Sync Vs Async Request Promises JavaScript",
    "link": "/docs/sync_vs_async_request_promises_javascript.html",
    "image": null,
    "date": "September 11, 2018",
    "category": ["docs"],
    "excerpt": "Hi everyone, today I want to show a comparison between async and sync request when we want to do something..."
},{
    "title": "React Native Push Notification",
    "link": "/docs/react-native-push-notification.html",
    "image": null,
    "date": "January 16, 2018",
    "category": ["docs"],
    "excerpt": "Hi everyone, today I want to show how to use push notification in React Native. I will use local and..."
},{
    "title": "Django Channels in production with Docker",
    "link": "/docs/django-channels-in-production-with-docker.html",
    "image": null,
    "date": "January 11, 2018",
    "category": ["docs"],
    "excerpt": "Hi everyone, today I want to show how to create a Django project using Django Channles in PRODUCTION!, yes in..."
},{
    "title": "Create a django project with gunicorn and nginx using docker",
    "link": "/docs/django-gunicorn-nginx-docker.html",
    "image": null,
    "date": "October 16, 2017",
    "category": ["docs"],
    "excerpt": "Hi everyone welcome to a new tutorial. Today we’re going to create a django production environment with docker. We have..."
},{
    "title": "Use Celery + Redis in a Django project with Docker",
    "link": "/docs/celery-redis-django-docker.html",
    "image": null,
    "date": "September 24, 2017",
    "category": ["docs"],
    "excerpt": "Hi everyone welcome to a new tutorial. Today we’re going to create the basic structure to run Celery + Redis(as..."
},{
    "title": "Http service with token in react native",
    "link": "/docs/http-services-with-token-react-native.html",
    "image": null,
    "date": "August 30, 2017",
    "category": ["docs"],
    "excerpt": "Hi everyone, today I would like to show you a way to use the React Native http service and put..."
},{
    "title": "Validate react native input",
    "link": "/docs/validate-react-native-input.html",
    "image": null,
    "date": "August 29, 2017",
    "category": ["docs"],
    "excerpt": "Hi everyone, today I want to show a proper way to validate our inputs or forms in react native and..."
},{
    "title": "Django project with Docker",
    "link": "/docs/django-project-with-docker.html",
    "image": null,
    "date": "August 14, 2017",
    "category": ["docs"],
    "excerpt": "Hi everyone, to create a django project with docker, we will use a this official link that explain how to..."
},{
    "title": "Django REST Framework like a ninja",
    "link": "/django-rest-framework-like-a-ninja.html",
    "image": null,
    "date": "March 3, 2017",
    "category": null,
    "excerpt": "Hello everyone. This post is to show you all the tricks that I’ve been learning until now about Django REST..."
},{
    "title": "PostgreSQL CheatSheets",
    "link": "/postgresql-cheatsheets.html",
    "image": null,
    "date": "February 11, 2017",
    "category": null,
    "excerpt": "Service =&gt; Instance: Response a una direccion IP y puerto especifico. tiene sus propios permisos de acceso, mantiene aisalada su..."
},{
    "title": "Minify an Ionic 2 project with app-script",
    "link": "/minify-an-ionic-2-project-with-app-script.html",
    "image": null,
    "date": "February 11, 2017",
    "category": null,
    "excerpt": "Hello everyone, in this tutorial I will show you in a very short way how you can minify an Ionic..."
},{
    "title": "Consume REST Api with Token Authentication in Ionic 2",
    "link": "/consume-rest-api-with-token-authentication-in-ionic-2.html",
    "image": null,
    "date": "February 11, 2017",
    "category": null,
    "excerpt": "Hello everyone, in this article I would like to show you how to use API REST with Token Authentication in..."
},{
    "title": "Add a tab and a menu in the same Ionic 2 project",
    "link": "/add-a-tab-and-a-menu-in-the-same-ionic-2-project.html",
    "image": null,
    "date": "February 11, 2017",
    "category": null,
    "excerpt": "Hello everyone in this article I’ll show you how to create a blank Ionic 2 project and add the tabs..."
},{
    "title": "Run a Django(with postgresql) project with Vagrant",
    "link": "/run-a-django-project-with-vagrant.html",
    "image": null,
    "date": "February 9, 2017",
    "category": null,
    "excerpt": "Hello! Have the chance to deploy in a very easy way a Django project no matter which operating system you..."
},{
    "title": "How to create and run an apk file from Ionic2 app",
    "link": "/how-to-create-and-run-an-apk-file-from-ionic2-app.html",
    "image": null,
    "date": "February 9, 2017",
    "category": null,
    "excerpt": "Hi everyone, in this tutorial I’ll show you how to create an apk file (for android) from an Ionic2 app..."
},{
    "title": "Documentation - Configuration & First Steps",
    "link": "/docs/help/docmentation.html",
    "image": null,
    "date": "March 20, 2016",
    "category": ["docs","help"],
    "excerpt": "Configuration All configuration options are in the _config.yml file. Created by Patricia Mafra General Settings name: Your name. job_title: Your..."
},{
    "title": "Installation",
    "link": "/docs/help/installation.html",
    "image": null,
    "date": "March 16, 2016",
    "category": ["docs","help"],
    "excerpt": "I assume you have already downloaded and installed Ruby. Here’s what you need to do next: Run gem install jekyll..."
},{
    "title": "What is Jekyll?",
    "link": "/docs/what-is-jekyll.html",
    "image": null,
    "date": "March 15, 2016",
    "category": ["docs"],
    "excerpt": "Jekyll is a parsing engine bundled as a ruby gem used to build static websites from dynamic components such as..."
},{
    "title": "Sample Data",
    "link": "/docs/sample-data.html",
    "image": null,
    "date": "March 11, 2016",
    "category": ["docs"],
    "excerpt": "Markdown (or Textile), Liquid, HTML &amp; CSS go in. Static sites come out ready for deployment. Headings Heading 1 Heading..."
},{
    "title": "Script Generate Django Project In Vagrant",
    "link": "/script-generate-django-project-in-vagrant.html",
    "image": null,
    "date": "February 21, 2016",
    "category": null,
    "excerpt": "Script to generate a Django App with Vagrant #!/bin/bash VIRTUALENV_NAME=\"vagrantdev\" DB_USER=\"vagrantuser\" DB_NAME=\"vagrantdb\" DB_PASSWORD=\"vagrantpass\" # Install of pip and their dependencies..."
}]

$(document).ready(function() {
    $('#search-input').on('keyup', function () {
        var resultdiv = $('#results-container');
        if (!resultdiv.is(':visible'))
            resultdiv.show();
        var query = $(this).val();
        var result = index.search(query);
        resultdiv.empty();
        $('.show-results-count').text(result.length + ' Results');
        for (var item in result) {
            var ref = result[item].ref;
            var searchitem = '<li><a href="'+ hostname + store[ref].link+'">'+store[ref].title+'</a></li>';
            resultdiv.append(searchitem);
        }
    });
});