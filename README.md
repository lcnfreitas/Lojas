# Fiesta 

## Description: 
Fiesta is a very simple inventory system app that tracks inventory across multiple "stores". It was created for demo purposes and not real use hence it was kept very simple. 

## Installation: 

### Make sure node is Installed on the machine
To check:
```
node --version
```
To install:
```
curl -sL https://rpm.nodesource.com/setup_10.x | sudo bash -
sudo yum install -y nodejs
node --version
```

### Clone Repo and install dependencies
```
git clone https://github.com/sharonpamela/Fiesta.git
cd ~/Fiesta
npm install
cd ~/Fiesta/client
npm install
npm run build
```
## Database info
```
The database schemas and sample data the app expects are described in the following files:
~/Fiesta/seeders/FiestaDB-MSSQL.sql
~/Fiesta/seeders/FiestaDB-mySL.sql
```
## Run App
```
cd ~/Fiesta
npm start
```

## Access App
```
http//:localhost:3001
```
