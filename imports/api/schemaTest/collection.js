const Test = new Mongo.Collection('schemaTest')

import SimpleSchema from 'simpl-schema'
import _ from 'lodash'
function createSchema(object){
	_.each(object, (val, key) => {
		if(_.isPlainObject(val)){
			if(!val.type){
				object[key] = createSchema(val)
			} else if (_.isPlainObject(val.type)){
				val.type = createSchema(val.type)
			}			
		}
	})
	return new SimpleSchema(object)
}
Test.attachSchema(createSchema({
	number:{
		type:Number,
		max:999,
		min:10
	},
	stringOrNumber:SimpleSchema.oneOf(String, Number),
	stringOrNumberArray:Array,
	'stringOrNumberArray.$':SimpleSchema.oneOf(String, Number),
	numberOrArray:SimpleSchema.oneOf(Number, Array),
	'numberOrArray.$':Number,
	deepObject:Object,
	'deepObject.1':Object,
	'deepObject.1.2':Object,
	'deepObject.1.2.Success':Boolean,
	deepSchema:{
		1:{
			2:{
				3:{
					Success:Boolean
				}
			}
		}
	},
	deepArray:Array,
	'deepArray.$':Array,
	'deepArray.$.$':Array,
	'deepArray.$.$.$':Boolean,
	objectArrayMix:Object,
	'objectArrayMix.1':Array,
	'objectArrayMix.1.$':Object,
	'objectArrayMix.1.$.2':Array,
	'objectArrayMix.1.$.2.$':Object,
	'objectArrayMix.1.$.2.$.Success':Boolean
}))

export default Test