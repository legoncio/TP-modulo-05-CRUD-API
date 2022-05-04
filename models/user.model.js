const mongoose = require('mongoose');
const validator = require('validator')
const PASSWORD_PATTERN = /^.{8,}$/;
const bcrypt = require('bcrypt');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
        minlength: 3,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(email) {
            if(!validator.isEmail(email)){
                throw new Error('Invalid email')
            }
        }
    },
    password: {
        type: String,
        required: true,
        match: [PASSWORD_PATTERN, 'Invalid password']
    },
    bio: {
        type: String,
        minlength: 5
    },
    active: {
        type: Boolean,
        default: false
    }
}, { 
  timestamps: true,
  toJSON: {
    transform: function (doc, ret) {
      ret.id = ret._id;
      delete ret.__v;
      delete ret._id;
      delete ret.password;
      
      return ret;
    }
  }
});

userSchema.pre('save', function (next) {
    if (this.isModified('password')) {
        bcrypt.hash(this.password, 10).then((hash) => {
            this.password = hash;
            next();
        });
    } else {
        next();
    }
});

userSchema.methods.checkPassword = function (password) {
  return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);
module.exports = User;