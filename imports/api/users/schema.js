import SimpleSchema from 'simpl-schema'

export default new SimpleSchema({
    _id: {type: String},
    emails: {type: Array},
    'emails.$': {type: Object},
    'emails.$.address': {
        type: String,
        regEx: SimpleSchema.RegEx.Email
    },
    'emails.$.verified': {type: Boolean},
    emails2: {type: Array},
    'emails2.$': new SimpleSchema({
        address: {
            type:String,
            regEx:SimpleSchema.RegEx.Email
        },
        verified:Boolean
    }),
    number:SimpleSchema.oneOf(Number, String),
    createdAt: {type: Date},
    services: {type: Object, blackbox: true},
    roles: {type: Array},
    'roles.$': {type: String},
    profile: {
        type: Object,
        optional: true
    },
    'profile.firstname': {
        type: String,
        optional: true
    },
    'profile.lastname': {
        type: String,
        optional: true
    },

    groupIds: {
        type: Array,
        optional: true,
    },
    'groupIds.$': {
        type: String,
    },
})