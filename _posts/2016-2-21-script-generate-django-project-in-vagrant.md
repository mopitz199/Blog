### Script to generate a Django App with Vagrant

```shell
#!/bin/bash

VIRTUALENV_NAME="vagrantdev"
DB_USER="vagrantuser"
DB_NAME="vagrantdb"
DB_PASSWORD="vagrantpass"

# Install of pip and their dependencies
sudo apt-get update
sudo apt-get install python-pip libpq-dev python-dev build-essential
sudo pip install --upgrade pip
sudo pip install --upgrade virtualenv
sudo pip install --upgrade setuptools

# Install postgres
sudo apt-get install postgresql postgresql-contrib

# Create databse
sudo -u postgres psql -c "CREATE DATABASE $DB_NAME;"
sudo -u postgres psql -c "CREATE USER $DB_USER WITH PASSWORD '$DB_PASSWORD';"
sudo -u postgres psql -c "ALTER ROLE $DB_USER SET client_encoding TO 'utf8';"
sudo -u postgres psql -c "ALTER ROLE $DB_USER SET default_transaction_isolation TO 'read committed';"
sudo -u postgres psql -c "ALTER ROLE $DB_USER SET timezone TO 'UTC';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE $DB_NAME TO $DB_NAME;"


# Install virtualenvwrapper
sudo pip install virtualenvwrapper
export WORKON_HOME=~/Envs
source /usr/local/bin/virtualenvwrapper.sh
mkvirtualenv $VIRTUALENV_NAME
workon $VIRTUALENV_NAME


# Install django
pip install -r requirements.txt

python manage.py makemigrations
python manage.py migrate
```
