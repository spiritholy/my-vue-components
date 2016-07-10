var Vue = require('vue');
var App = require('./App');
// var VueRouter = require("vue-router");

// Vue.use(VueRouter);

/* eslint-disable no-new */
new Vue({
  el: 'body',
  components: { App }
});

// var router = new VueRouter();

// router.map({
// 	"/foo": {
// 		component: require("./components/Foo.vue")
// 	},

// 	"/bar": {
// 		component: require("./components/Bar.vue")
// 	},

// 	"/login": {
// 		component: require("./components/Login.vue")
// 	},

// 	"/home": {
// 		component: require("./components/Home.vue")
// 	}
// });

// router.start(require("./App.vue"), "#app");