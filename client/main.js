import Vue from 'vue'

import GrapherVue from 'meteor/herteby:grapher-vue'
Vue.use(GrapherVue)

import GrapherLive from './grapher-live.vue'

import 'vue-clicky'

new Vue({
	el:'#vue',
	...GrapherLive
})