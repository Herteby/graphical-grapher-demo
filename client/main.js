import Vue from 'vue'

import 'vue-clicky'

import GrapherVue from 'meteor/herteby:grapher-vue'
Vue.use(GrapherVue)

import GraphicalGrapher from '/imports/ui/GraphicalGrapher.vue'

Vue.prototype.$autoWatch = function(fn, options){
	this.$watch(fn, () => null, {deep:true,immediate:true})
}

new Vue({
	el:'#vue',
	...GraphicalGrapher
})