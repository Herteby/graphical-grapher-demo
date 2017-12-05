<template>
	<div class="graphicalGrapher" v-if="collections">
		<h1>Graphical Grapher</h1>
		<div class="collections">
			<div v-for="collection in Object.keys(collections)" 
			@click="currentCollection = collection" 
			:class="{active:currentCollection == collection}">
				{{collection}}
			</div>
		</div>
		<div v-if="currentCollection" class="options">
			<label v-if="dev"><input type="checkbox" v-model="bypassFirewall">Bypass firewall<span> (not available in production)</span></label>
			<label><input type="checkbox" v-model="single">Single result</label>
		</div>
		<div v-if="currentCollection" class="columns">
			<div>
				<h2>Editor</h2>
				<Editor :collection="collections[currentCollection]" :node="query" :collections="collections"></Editor>
			</div>			
			<div>
				<h2>Query</h2>
				<textarea v-model="jsonQuery" :class="{query:1,badQuery}"></textarea>
			</div>
			<div>
				<h2>Result <span>{{result.timeElapsedMs}}ms</span></h2>
				<div class="result">{{result.data}}</div>
			</div>
		</div>
		<h1 v-else>Choose a collection</h1>
		<pre>{{collections}}</pre>
		<pre>{{namedQueries}}</pre>
	</div>
</template>

<script>
	import _ from 'lodash'
	import Editor from './Editor.vue'
	export default {
		components:{Editor},
		data(){
			return {
				collections:undefined,
				namedQueries:undefined,
				currentCollection:undefined,
				queries:{},
				badQuery:false,
				single:false,
				bypassFirewall:false,
				result:{}
			}
		},
		created(){
			Meteor.call('grapher.live_docs', (err, res) => {
				if(err){
					throw err
				}
				this.collections = res.collections
				this.namedQueries = res.namedQueries
			})
			this.$autoWatch(()=>{
				const collection = this.currentCollection
				if(!collection){
					return
				}
				const body = {[this.currentCollection]:_.cloneDeep(this.query)}
				if(this.single){
					_.set(body[this.currentCollection], '$options.limit', 1)
				}
				Meteor.call('grapher.live', {
					body:body,
					params:undefined,
					checkUser:!this.bypassFirewall
				},
				(err, res) => this.result = res || err)
			})
		},
		computed:{
			query(){
				if(!this.queries[this.currentCollection]){
					this.$set(this.queries, this.currentCollection, {})
				}
				return this.queries[this.currentCollection]
			},
			jsonQuery:{
				get(){
					let query = JSON.stringify(this.query, null, '  ')
					return query
				},
				set(val){
					try{
						const query = JSON.parse(val)
						this.queries[this.currentCollection] = query
						this.badQuery = false
					} catch(err) {
						this.badQuery = true
					}
				}
			},
			dev(){
				return Meteor.isDevelopment
			},
			cleanedResult(){
				return _.omitBy(this.result, key => key[0] == '$')
			}
		}
	}
</script>

<style scoped lang="stylus">
	.graphicalGrapher
		font-family sans-serif
		flex-direction column
		*
			display flex
			user-select none
	.collections
		border-radius 8px
		overflow hidden
		div
			cursor pointer
			padding 10px
			flex-grow 1
			background #333
			color white
			justify-content center
			&:hover
				background #444
			&.active
				background #0a0
	.options
		label
			padding 5px
			margin 5px
			cursor pointer
			align-items center
			&:hover
				background #eee
			span
				opacity 0.5
				margin-left 5px
		input
			height 20px
			width 20px
	.columns
		h2
			margin-top 0
			span
				margin-left auto
				opacity 0.5
				font-weight normal
		> div
			flex-direction column
			flex-basis 33%
			flex-grow 1
			flex-shrink 1
			padding 10px
	.query, .result
		white-space pre-wrap
		flex-grow 1
		user-select all
		cursor text
	.query
		border none
		outline none
		resize none
		&.badQuery
			color red
</style>