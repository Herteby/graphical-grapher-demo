import { Meteor } from 'meteor/meteor'
import UserSchema from './schema'

const Users = Meteor.users

// Users.attachSchema(UserSchema);

if (Meteor.isServer) {
    Users.allow({
        insert: () => true,
        update: () => true,
        remove: () => true,
    })
    Users.deny({
        insert: () => false,
        update: () => false,
        remove: () => false,
    })
}

export default Users