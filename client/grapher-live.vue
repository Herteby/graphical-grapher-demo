<template>
	<div class="grapher-live" v-if="collections">
		<h1>Grapher Live</h1>
		<div class="collections">
			<div v-for="collection in Object.keys(collections)" 
			@click="currentCollection = collection" 
			:class="{active:currentCollection == collection}">
				{{collection}}
			</div>
		</div>
		<div v-if="currentCollection" class="columns">
			<div>
				<h2>Editor</h2>
				<editor :collection="collections[currentCollection]" :node="query" :collections="collections"></editor>
			</div>			
			<div>
				<h2>Query</h2>
				<div class="query">{{query}}</div>
			</div>
			<div>
				<h2>Result</h2>
				<div class="result">{{result}}</div>
			</div>
		</div>
		<pre>{{collections}}</pre>
		<pre>{{namedQueries}}</pre>
	</div>
</template>

<script>
	import Editor from './editor.vue'
	export default {
		components:{Editor},
		data(){
			return {
				collections:undefined,
				namedQueries:undefined,
				currentCollection:undefined,
				queries:{}
			}
		},
		created(){
			Meteor.call('grapher.live_docs', (err, res) => {
				console.log(res || err)
				this.collections = res.collections
				this.namedQueries = res.namedQueries
			})
		},
		computed:{
			query(){
				if(!this.queries[this.currentCollection]){
					this.$set(this.queries, this.currentCollection, {})
				}
				return this.queries[this.currentCollection]
			}
		},
		grapher:{
			result(){
				const collection = Mongo.Collection.get(this.currentCollection || 'users')
				console.log(this.currentCollection, collection)
				return {
					disabled:!this.currentCollection,
					collection:collection,
					subscribe:false,
					query:this.query
				}		
			}
		}
	}
</script>

<style scoped lang="stylus">
	*
		display flex
	.grapher-live
		font-family sans-serif
		flex-direction column
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
	.columns
		> div
			flex-direction column
			flex-grow 1
	.query, .result
		white-space pre-wrap
</style>