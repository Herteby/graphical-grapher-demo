<template>
	<div class="editor">
		<div v-for="link, key in collection.links">
			<div :class="{node:1,link:1,active:node[key]}" @click="node[key] ? $delete(node, key) : $set(node, key, {})">
				{{key}}<div class="details">: {{link.collection}}</div>
			</div>
			<editor v-if="node[key]" :collection="collections[link.collection]" :node="node[key]" :collections="collections"></editor>
		</div>
		<div v-for="field, key in collection.schema">
			<div :class="{node:1,field:1,active:node[key]}" @click="node[key] ? $delete(node, key) : $set(node, key, 1)">
				{{key}}<div class="details">: {{field.type}}</div>
			</div>
		</div>
		<div v-for="reducer, key in collection.reducers">
			<div :class="{node:1,reducer:1,active:node[key]}" @click="node[key] ? $delete(node, key) : $set(node, key, 1)">
				{{key}}
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name:'editor',
		props:['collection', 'node', 'collections']
	}
</script>

<style scoped lang="stylus">
	*
		display flex
	.editor
		flex-direction column
		padding 5px
		border 1px solid #ccc
		border-radius 4px
	.node
		padding 5px
		margin-bottom 2px
		border-radius 4px
		color white
		cursor pointer
		&.field
			background #08f
		&.link
			background #a0a
			&.active
				flex-direction column
		&.reducer
			background #a00
		&.active
			background #0a0
		.details
			opacity 0.7
</style>