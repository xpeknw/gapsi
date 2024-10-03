# GAPSI

Gapsi Project is an implementation of Koa backend + Angular site, to manage Providers registry.

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

Alternatively a build can be created to load in a server. This will create the "dist" folder ready for production.

```bash
ng build --configuration production
```

## Back-end

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
forever stop <forever id>

```

## Documentation

While back-end is running the documentation will be found in [Documentation](http://localhost:3000/docs)
Also in the Back folder, there are two files called 'Gapsi.postman_collection.json' and 'Gapsi GraphQL.postman_collection.json' Postman ready.
The GraphQL can be accessed through (GraphQL)[http://localhost:3000/graphql]

## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)