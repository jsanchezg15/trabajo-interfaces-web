
# Explicación trabajo
Carlos Melero y Jorge Sánchez
El trabajo usa una api Rest que aporta información sobre los videojuegos de pokemon.
Al iniciar la aplicación tenemos dos opciones 
1) Buscar pokemon (imagen izquierda)
2) Pokemon aleatorio (derecha)

Independientemente del botón que pulsemos la aplicación hará varias llamadas para conseguir todos el nombre y url de cada uno de los pokemon. 
Esto lo utilizaremos para el buscador que aparecerá arriba a la izquierda. El buscador permite buscar los pokemon que contengan la secuencia de
caracteres introducida en el input text. Solo se mostrarán los primeros 10 pokemon encontrados. Al pinchar en cualquiera de las opciones se 
mostrará la información detallada del pokemon (Utilizamos la url para buscar los datos al pinchar en el nombre del buscador).
Si pulsamos el boton de la izquierda el pokemon mostrado será siempre Charizard (la imagen del propio botón)
Si pulsamos el botón de la izquierda el pokemon mostrado será aleatorio.
Podemos volver al menu de inicio dandole al botón que aparece arriba al lado del buscador.

Datos del pokemon:
  Se muestra la imagen, el nombre, numero, altura, peso, habilidades, posibles items (no todos los pokemon tienen items) y movimientos.
  Se puede hacer click en las listas de habilidades, items y movimientos.
  Cuando hacemos click en estas listas utilizamos la url correspondiente para buscar los datos en la api.
  Hay un botón que permite cambiar la imagen del pokemon por su versión shiny (cambio de colores).
  
Datos de habilidades:
  Se muestra el nombre, el efecto y los pokemon que pueden tener la habilidad.
  Se puede hacer click en la lista de pokemon para buscar los datos de dicho pokemon.
  
Datos de movimiento:
  Se muestra el nombre, efecto, precisión, potencia, pp (power points) y los pokemon que pueden aprender dicho movimiento.
  Se puede hacer click en la lista de pokemon para buscar los datos de dicho pokemon.

Datos de item:
  Se muestra la imagen, el nombre, efecto y pokemon que pueden tener dicho item.
  Se puede hacer click en la lista de pokemon para buscar los datos de dicho pokemon.
  

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
