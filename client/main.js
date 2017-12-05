import Vue from 'vue'

import 'vue-clicky'

import GraphicalGrapher from '/imports/ui/GraphicalGrapher.vue'

Vue.prototype.$autoWatch = function(fn, options){
	this.$watch(fn, () => null, {deep:true,immediate:true})
}

new Vue({
	el:'#vue',
	...GraphicalGrapher
})