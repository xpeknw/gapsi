# GAPSI

Gapsi Project is an implementation of Koa backend + Angular site, to manage Providers registry.

## Prerequisites

Before running the project, make sure you have the following prerequisites installed:

### Node.js
You need to have **Node.js** installed on your machine.

- You can download Node.js from the [Node.js Official Website](https://nodejs.org/).

### Angular
You need to have **Angular** installed on your machine.

```bash
npm install -g @angular/cli
```

## Front-end

Navigate to the 'Front' Folder and execute npm install to fulfill prerequisites and be able to launch the administration panel. By default [panel](http://localhost:4200) 

```bash
npm install
```

## Front-end usage

To launch dev mode use

```bash
ng serve
```
Open your browser and navigate to http://localhost:4200/ to see the application running.

Alternatively a build can be created to load in a server. This will create the "dist" folder ready for production.

```bash
ng build --configuration production
```

## Front-end Installation as Chrome App

To launch dev mode use

```bash
ng serve
```
Open your browser and navigate to http://localhost:4200/ to see the application running. 
Click on "Install Application"
The promt will ask for confirmation, once it is instaled you can directly access to it from chrome applications.

## Back-end

Configuration file is required as '.env' 
The default file can be renamed and use it as is to have default configuration.

```bash
PORT=3000
APP_VERSION=1.0.0
DATA_FILE=data.json
OPENAPI_YAML=openapi.yaml
```

Data file is required as 'db.json' with the next structure.

```JSON
[{
    "id": "1",
    "name": "Corporativo J 1",
    "trade_name": "Corporativo J 1 S.C",
    "address": "Circuito 101, Ciudad F, País B"
}]
```

Navigate to the 'Back' Folder and execute npm install to fulfill prerequisites and be able to launch the Backend. By default [backend](http://localhost:3000) 

```bash
npm install
```


## Back-end usage

To launch dev mode use

```bash
node app.js
```

Alternatively can be runned using nodemon or forever to be autorenewed on failure or modifications.

```bash
# start nodemon for reload on updated files 
nodemon app.js

# start forever instance and nodemon
forever start -c nodemon .

# stop the proccess
forever stop {forever id}

```

## Documentation

While back-end is running the documentation will be found in [Documentation](http://localhost:3000/docs)

Also in the root folder, there are two files called 'Gapsi.postman_collection.json' and 'Gapsi GraphQL.postman_collection.json' Postman ready.

The GraphQL can be accessed through [GraphQL](http://localhost:3000/graphql)

```graphql

# List all the providers
query Providers {
    providers {
        id
        name
        trade_name
        address
    }
}

# Get provider information by id
query Provider {
    provider(id: null) {
        id
        name
        trade_name
        address
    }
}

# Create provider 
mutation AddProvider {
    addProvider {
        id
        name
        trade_name
        address
    }
}

# Update provider information using Id
mutation UpdateProvider {
    updateProvider(id: null) {
        id
        name
        trade_name
        address
    }
}

# Delete provider information using Id
mutation {
  deleteProvider(id: "10") {
    id
    name
    trade_name
    address
  }
}
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)