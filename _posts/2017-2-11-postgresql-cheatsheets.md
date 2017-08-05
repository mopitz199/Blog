---
layout: post
title: PostgreSQL CheatSheets
---

**Service** => **Instance**: Response a una direccion IP y puerto especifico. tiene sus propios permisos de acceso,
mantiene aisalada su informacion o datos.

---

**Database** => Es una organizacion logica de datos y codigo. Un Service(*Instance*) puede contener una o mas Databases

---

<!--more-->

**Schema** => Es una organizacion logica de datos y codigo, un Database puede contener uno o mas Schemas

Ej: podemos tener una tabla llamada *usuario*, esta tabla la podemos crear en dos Schemas distinos y quedaria algo asi:

 - schema1_usuario
 - schema2_usuario

De esta forma, tendremos dos tablas "*iguales*" pero creadas en dos Schemas distintos con sus propios datos. Es posible comunicar tablas de distintos Schemas.

---

**Tablespaces** => Es un archivo fisico.

---


**Catalog** => PostgreSQL, contiene informacion de los objetos que tenemos en nuestra base de datos.

Al ejecutar *psql* estoy ingresando a una Instance, puedo especificarle IP, puerto y otras cosas. Por defecto va a la de localhost.

---

**Archivos de configuracion** =>

- postgresql.conf (contiene configuracion propia de la Instance, como su ip, puerto, numero de conexiones, etc...)
- pg_hba.conf (contiene los permisos de los usuarios que podran acceder al servidor PostgreSQL)
 - trust: no pide password
 - password: pide password, pero la envia en texto plano
 - md5: pide password, pero la envia encriptada en hash md5
 - iden: mapea el usuario que se quiere conectar con un usuario de PostgreSQL y ve si calza, e ingresa como el usuario de PostgreSQL
- pg_ident.conf (contiene el mapaeo de qye usuario se mapeara con un usuario de PostgreSQL)

-Comando para encontrar esos archivos:

```sql
SELECT name, setting FROM pg_settings WHERE category='File Locations';
```

-Comando para ver algunos settings del archivo *postgresql.conf*:

```sql
SELECT name, context, unit, setting, boot_val, reset_val FROM pg_settings WHERE name in ['listen_addresses', 'max_connections', 'shared_buffers', 'efective_cache_size', 'work_mem'] ORDER BY context, name;
```

-Comando para setear un campo del archivo *postgresql.conf*:

```sql
ALERT SYSTEM set work_mem = 8192;
SELECT pg_reload_conf();
```

Este comando creara un archivo llamado *postgresql.auto.conf* que contrandra todos los cambios de valores, y cuando se reinicie el servidor PostgreSQL, se cargara el archivo *postgresql.conf* y luego el *postgres.auto.conf* para aplicar todos los cambios que se han hecho y de esta forma no tener que setear los valores cada vez que se quiera reiniciar el servidor PostgreSQL

-Comando para ver quien esta conectado a nuestra base de datos y cual fue su ultima consulta ejecutada(o ejecutandose):

```sql
SELECT * FROM pg_stat_activity;
```

-Comando para cancelar la consulta que se esta ejecutando a traves de un cierto usuario:

```sql
SELECT pg_cancel_backend(pid);
```

-Comando para desconectar un cierto usuario conectado:

```sql
SELECT pg_terminate_backend(pid);
```

---

### Roles ###

**Roles**: es un usuario de una Instance de PostgreSQL

- roles de sesion: usarios normales que pueden ingresar a la Instance con su password
- roles de grupo: grupo de usuarios con ciertos permisos, para darle permisos a los roles de sesion, usaremos los roles de grupo

-Comando para crear un rol de sesion:

```sql
CREATE ROLE john LOGIN PASSWORD 'john123';
```

-Comando para ver los roles y sus permisos que tenemos en nuetsra Instance:

```sql
SELECT * FROM pg_roles;
```

-Comando para eliminar un role:

```sql
DROP ROLE john;
```

-Comando para crear un rol de sesion con md5 password(manera correcta):

```sql
CREATE ROLE john LOGIN ENCRYPTED PASSWORD 'john123';
```

-Comando para crear un rol de sesion que exista hasta una cierta fecha:

- '2015-2-20 00:00'
- 'infinity'

```sql
CREATE ROLE john LOGIN ENCRYPTED PASSWORD 'john123' VALID UNTIL '2015-2-20 00:00';
```

-Comando para crear un rol con ciertos permisos:

- CREATEDB
- SUPERUSER
- CREATEROLES

```sql
CREATE ROLE john LOGIN ENCRYPTED PASSWORD 'john123' CREATEDB;
```

-Comando para crear rol de grupo:

```sql
CREATE ROLE platzi INHERIT;
```

*El rol puede ser de sesion o de grupo*

-Comando para agregar un rol de sesion a un rol de grupo:

```sql
GRANT john to platzi;
```

---

### Database ###

-Comando para crear una base de datos:

```sql
CREATE DATABASE platzi_db;
```

-Comando para eliminar una base de datos:

```sql
DROP DATABASE platzi_db;
```

-Comando para asignarle una plantilla a una base de datos al momento de crearla:

```sql
CREATE DATABASE platzi_db TEMPLATE template1;
```

-Comando para restaurar una base de datos a partir de un archivo:

```shell
pg_restore -d db_name restore_file
```

**Templates** => Son configuraciones que estan almacenadas, y que al momento de crear una base de datos con esa plantilla, esa base de datos tendra todas esas configuracion, que pueden ser:

- extensiones(postGIS, etc..)
- tablas por defecto
- roles para esa base de datos
- etc..

-Comando para crear un template a partir de una base de datos:

```sql
UPDATE pg_database SET datistemplate = true WHERE datname = 'platzi_db';
```

*Ya no se podra usar esa base de datos, ya que ahora es un template*

Comando para cambiarme a de una base de datos a otra:

```sql
\c platzi_db
```

---

### Schemas ###

La idea de un Schema es poder tener las tablas agrupas en una misma base de datos, de esta forma si tengo varias tablas relacionadas al manejo de usuarios, las puedo agrupar en un Schema, luego si tengo tablas relacionadas con un inventario, las puedo agrupar en otros Schema, y de esta forma tener un orden en la misma base de datos cuando estas crecen mucho.

-Comando para crear un Schema (debo estar adentro de una base de datos):

```sql
CREATE SCHEMA schema_inventario;
```

---

### Privileges ###

-Comando para dar privilegios a una tabla en particular de un schema a un rol:

```sql
GRANT ALL ON ALL TABLES IN SCHEMA schema_inventario TO platzi;
```

-Comando para ejecutar *"SQL"* directamente desde la terminal, en este caso en particular se le aplican provilegios a una base de datos.

```sql
psql database_name -c "GRANT ALL ON ALL TABLES IN SCHEMA public to user;"
```


[Listado de privilegios](https://www.postgresql.org/docs/9.6/static/sql-grant.html) y de como sar privilegios a distintos tipos de objetos(tables, schemas, databases, etc...)

---

### Data Types ###

SEQUENCE: Es un valor entero incremental que no se puede cambiar. Se usa como id de tabla ya que por cada fila, ese valor incrementara.

VARCHAR: Sirve para guardar cadenas de texto variables, ya que si el maximo es 255, y guardamos una cadena de 10, NO rellenara el resto con espacio, y de esa forma no gastaremos espacio innecesario.

ARRAY: Guarda un arreglo literalmente para su uso como arreglo en un formato de este tipo: *Ej: {1,4,8,9}*

---

### Functions ###

-lpad: rellena con un caracter en especial:

- lpad('ab', 3 ,0) => 0ab

-repeat: repite un string:

- repeat('-', 4) => ----

-trim: quita los espacios de la derecha e izuqierda de un string

- trim('   tr    ') => tr

-split_part: separa un string por un caracter, los guarda en un arreglo y luego podemos obetner cualquiera de esos:

- split_part('312-4657-2947', '-', 2) => 4657

-string_to_array: separa un string por un caracter(devuelve un arreglo)

- string_to_array('aaa.bbb.ccc', '.') => {aaa,bbb,ccc}
