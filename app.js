const store = new Vuex.Store({
  state: {
    count: 0,
    message: 'hi',
    loading: false
  },
  mutations: {
    increment (state, n) {
      state.count+=n
    },
    loading( state, bool ){
      state.loading=bool;
    }
  },
  actions: {
    increment (context, n) {
      console.groupCollapsed('instead of use commit perform middleware action around commit');
      console.log('perform pre action');
      context.commit('increment', n)
      console.log('perform post action');      
      console.groupEnd();
    },
    routeLoadStart( context ){
      context.commit('loading', true);
    },
    routeLoadEnd( context ){
      context.commit('loading', false);
    }
  }
});

// components
// async

var async = function (resolve, reject) {
    console.log('register async');
  setTimeout(function () {
      console.log('load async');
    // Pass the component definition to the resolve callback
    resolve({
      template: '<div>I am async!</div>'
    })
  }, 1000)
}

Vue.component('async-example', async);

// local component
var local = {
  template: '<div><span>{{ message }}</span><b>shared count<b> {{ count }}</div>',
  data: function(){
    return {message: 'hello'}
  },
  computed: {
    count () {
      return store.state.count
    }
  }
};

Vue.component('my-component', local);

// loading component
var loadingState = {
  template: '<div>Loading <span v-if="loading">Yes</span><span v-else>No</span></div>',
  computed: {
    loading () {
      return store.state.loading
    }
  }
};

Vue.component('loading-state', loadingState);

// state management

// 1. Define route components.
// These can be imported from other files
const Foo = { template: '<div>foo</div>' }
const Bar = function (resolve, reject) {
    console.log('register async');
  setTimeout(function () {
      console.log('load async');
    // Pass the component definition to the resolve callback
    resolve({
      template: '<div>I am async bar! {{count}}</div>',
      computed: {
      count () {
        return store.state.count
      }
    }
    })
  }, 1000)
}

// 2. Define some routes
// Each route should map to a component. The "component" can
// either be an actual component constructor created via
// Vue.extend(), or just a component options object.
// We'll talk about nested routes later.
const routes = [
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar }
]

// 3. Create the router instance and pass the `routes` option
// You can pass in additional options here, but let's
// keep it simple for now.
const router = new VueRouter({
  store,
  // mode: 'history', // route in history and use path (domain/my/path) instead of hash (domain#/my/path)
  routes // short for routes: routes
});

router.beforeEach( (to, from, next) => {
   store.dispatch('routeLoadStart');
   next();
   
  });

router.afterEach((to, from) => {
  store.dispatch('routeLoadEnd');
});


//entrypoint my something like boot or start

var app = new Vue({
    el: '#app',
    store,
    router,
    data: {
      local: {},
      shared: store.state
    },
    methods: {
        incrementInStore ( n, event ){
            this.$store.dispatch('increment', n);
        }
    }
});
