# Vue

 - easy to use
 - consistent learning curve
 - easy and fast integration
 - state aware

## Respect the order!

 1. register all global components
 2. initiate store of states
 3. register routes
 4. initiate view model

## Devtools

Use devtools with google

## concepts

### states

States allow manipulation and receiving of data with a given api and protect data for direct manipulation.

#### Example 1

Storing task to all storages

 - Database
 - LocalStorage

Save changes to store `store.dispatch('save_task', task)`

Dispatch is saving data to storages and executes mutator `store.commit('save_task', task)`

### routes

Dynamic load components based on given route.