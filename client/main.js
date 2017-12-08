import Vue from 'vue'

import 'vue-clicky'

import {GraphicalGrapher} from 'meteor/herteby:graphical-grapher'

new Vue({
	el:'#app',
	...GraphicalGrapher
})

/* Uncomment this and comment out the code above to test the React wrapper
import React from 'react'
import ReactDOM from 'react-dom'
import {GraphicalGrapherReact} from 'meteor/herteby:graphical-grapher'

ReactDOM.render(React.createElement(GraphicalGrapherReact, null), document.getElementById('app'))*/