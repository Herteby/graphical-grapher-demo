<template>
	<div class="editor">
		<template v-if="!object">
			<div>
				<div class="node special">
					<div><b>$</b>filters (WIP)</div>
				</div>
			</div>
			<div>
				<div class="node special">
					<div><b>$</b>options (WIP)</div>
				</div>
			</div>
		</template>
		<div v-for="field, key in fields" v-if="!key.includes('.')">
			<div :class="{node:1, field:1, object:typeof node[key] === 'object', active:node[key]}" @click="clickField(field, key)">
				<div><b>{{icon(field.type)}}</b>{{key}}</div>
				<div v-if="typeof node[key] !== 'object'" class="details">: {{type(key, field.type)}}</div>
				<div class="hover">
					<div>
						<div v-for="val, key in field" v-if="key !== 'type'">{{key}}:<span>{{val}}</span></div>
					</div>
				</div>
			</div>
			<Editor
				v-if="typeof node[key] === 'object'"
				:object="key"
				:node="node[key]"
				:collection="collection"
				:collections="collections">
			</Editor>
		</div>
		<template v-if="!object">
			<div v-for="reducer, key in collection.reducers">
				<div :class="{node:1,reducer:1,active:node[key]}" @click="node[key] ? $delete(node, key) : $set(node, key, 1)">
					<div><b>()</b>{{key}}</div>
					<div class="details">: reducer</div>
					<div class="hover">
						<div>
							<div>body:<span>{{Object.keys(reducer.body).join(', ')}}</span></div>
						</div>
					</div>
				</div>
			</div>
			<div v-for="link, key in collection.links">
				<div :class="{node:1,link:1,active:node[key]}" @click="node[key] ? $delete(node, key) : $set(node, key, {})">
					<div><b>&gt;</b>{{key}}</div>
					<div class="details">: {{link.collection}}</div>
					<div class="hover">
						<div>
							<div>collection: <span>{{link.collection}}</span></div>
							<div v-if="link.inversedBy">inversedBy: <span>{{link.inversedBy}}</span></div>
							<template v-else>
								<div>type:<span>{{link.strategy}}</span></div>
								<div>field:<span>{{link.linkStorageField}}</span></div>
							</template>
						</div>
					</div>
				</div>
				<Editor
					v-if="node[key]"
					:node="node[key]"
					:collection="collections[link.collection]"
					:collections="collections">
				</Editor>
			</div>
		</template>
	</div>
</template>

<script>
	import _ from 'lodash'
	export default {
		name:'Editor',
		props:['collection', 'node', 'collections', 'object'],
		computed:{
			fields(){
				if(this.object){
					console.log(this.object)
					let fields = _.pickBy(this.collection.schema, (val, key) => key.indexOf(this.object) === 0 && key.length > this.object.length)
					fields = _.mapKeys(fields, (val, key) => key.slice(key.indexOf('.') + 1))
					console.log('FIELDS',fields)
					if(this.collection.schema[this.object].type === 'Array'){
						delete fields.$
						fields = _.mapKeys(fields, (val, key) => key.slice(2))
					}
					return fields
				} else {
					return this.collection.schema
				}
			}
		},
		methods:{
			icon(type){
				return {
					'Object':'{}',
					'Array':'[]',
					'String':'""'
				}[type] || type[0]
			},
			type(key, type){
				if(type === 'Array'){
					const content = this.collection.schema[key + '.$']
					if(content){
						return '[' + content.type + ']'
					} else {
						return 'Array'
					}
				} else {
					return type
				}
			},
			clickField(field, key){
				if(this.node[key]){
					this.$delete(this.node, key)
				} else if(field.type === 'Object' && _.keys(this.fields).find(fieldKey => fieldKey.indexOf(key + '.') === 0)){
					this.$set(this.node, key, {})
				} else if(field.type === 'Array' && _.keys(this.fields).find(fieldKey => fieldKey.indexOf(key + '.$.') === 0)){
					this.$set(this.node, key, {})
				} else {
					this.$set(this.node, key, 1)
				}
			}
		}
	}
</script>

<style scoped lang="stylus">
	*
		display flex
		user-select none
	.editor
		flex-direction column
	.node
		padding 5px
		margin 1px
		border-radius 4px
		cursor pointer
		border 1px solid #ccc
		flex-wrap nowrap
		flex-basis fill
		position relative
		&.link, &.object
			b
				background #a0a
			&.active
				flex-direction column
		&.field b
			background #08f
		&.reducer b
			background #f80
		&.special b
			background #0a0
		&.disabled
			cursor default
			b
				background #888			
		&.active
			background #333
			border-color #333
			color white
			&:hover
				background #444
				border-color #444
		&:hover
			background #eee
		.details
			opacity 0.7
			white-space nowrap
		b
			font-family monospace
			width 18px
			align-items center
			justify-content center
			color white
			border-radius 4px
			margin-right 3px
		&:hover .hover
			display flex
	.hover
		position absolute
		top 0px
		right 0px
		display none
		pointer-events none
		> div
			position absolute
			top 0px
			left 0px
			background white
			color black
			box-shadow 0px 1px 5px rgba(0,0,0,0.5)
			border-radius 4px
			z-index 100
			flex-direction column
			white-space nowrap
			div
				border-bottom 1px solid #ddd
				padding 3px
		span
			opacity 0.7
			margin-left 3px
</style>