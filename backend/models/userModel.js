import mongoose from 'mongoose';

//Create the User Schema
const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false
  }
}, {
  //'Created at' and 'Updated at' fields will be auto created with the below option
  timestamps: true
});

//Create a new Mongoose model using the schmema above
const User = mongoose.model('User', userSchema);

export default User;