import Vue from 'vue'

import 'vue-clicky'

import {GraphicalGrapher} from 'meteor/herteby:graphical-grapher'

Vue.prototype.$autoWatch = function(fn, options){
	this.$watch(fn, () => null, {deep:true,immediate:true})
}

new Vue({
	el:'#app',
	...GraphicalGrapher
})

/*
import React from 'react'
import ReactDOM from 'react-dom'
import {GraphicalGrapherReact} from 'meteor/herteby:graphical-grapher'

ReactDOM.render(React.createElement(GraphicalGrapherReact, null), document.getElementById('app'))*/