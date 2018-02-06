const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

const JWT_SECRET = process.env['JWT_SECRET'];

let UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }],
});

UserSchema.methods.toJSON = function() {
  let user = this;
  let userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email'])
};

UserSchema.methods.generateAuthToken = function() {
  let user = this;
  let access = 'auth';

  let userIdAndAccess = {_id: user._id.toHexString(), access};
  let token = jwt.sign(userIdAndAccess, JWT_SECRET).toString();

  user.tokens.push({access, token});

  return user.save().then(() => token)
};

UserSchema.methods.removeToken = function(token) {
  let user = this;
  return user.update({ $pull: { tokens: { token }}})
};

UserSchema.statics.findByCredentials = function(email, password) {
  let User = this;
  return User.findOne({ email })
    .then((user) => {
      if (!user) {
        return Promise.reject();
      }
      return new Promise((resolve, reject) => {
        bcrypt.compare(password, user.password, (error, result) => {
          result ? resolve(user) : reject();
        })
      })
    })
};

UserSchema.statics.findByToken = function(token) {
  let User = this;
  let decoded;

  try {
    decoded = jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return Promise.reject();
  }

  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};


UserSchema.pre('save', function(next) {
  let user = this;

  if(user.isModified('password')) {
    bcrypt.genSalt(10, (error, salt) => {
      bcrypt.hash(user.password, salt, (error, hash) => {
        user.password = hash;
        next();
      })
    });
  } else {
    next();
  }
});


let User = mongoose.model('User', UserSchema);



module.exports = { User };