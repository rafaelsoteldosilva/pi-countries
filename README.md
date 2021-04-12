<p align='left'>
    <img src="https://i.postimg.cc/jjDgHSsb/Countries.jpg" alt="Adventures and Countries App" />
</p>

# Adventures and Countries App

## General Features

This App was built using React, Redux, Node, Express and Sequelize with PostGres.

## App structure

The app is structured in two main parts, api, which is the backend, and client, which is the front end

### API

The main code of api is in the folder src, which is in turn divided in three folders:

- models
- routes
- controllers

### MODELS

Here is where all the app models or tables are defined using Sequelize, there are two basic models Country and Activity

#### The Country Model

The Country model keeps all countries where activities are held, including information such as Name, Continent, Sub region, Area, Flag, etc

#### The Activity Model

This model keeps track of all the activities there are, it includes information such as name, type (which can be Skiing, Bungee, canooing, etc.)

### Controllers

In controllers we can find all enpoints that perform actions on the database.

Activity.Controllers have endpoints like addActivity, that as the name implise, adds activities to the model Activity, and Country.Controller that has all country methods needed

### Routes

It will tell us of all the routes to controller methods, and the type of endpoints: get, post, put or delete

### CLIENT

In the client part we find all the components that render the info on the front end

There is the src folder, which in turns has the components, and the redux folder

### Components

Each component is accompanied by its CSS own style module, the project uses styled components

### Redux

Here we can find all redux related folders, actions, reducers and store.

We use action creators for all method that will affect the redux state, methods such as fetchCountriesRequestActn, then fetches all countries and load the into the redux state

We use only one reducer, and one store

## General Behavior

The app loads all the countries from an external API named REST Countries, then, there's a button to save all countries and activities created to a Postgres database named countries






