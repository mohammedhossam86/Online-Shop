const mongoose = require('mongoose');
const validator = require('validator');

const orderSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true
    },

    phone: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return validator.isMobilePhone(v, 'ar-EG');
        },
        message: props => `${props.value} is not a valid phone number`
      }
    },

    city: {
      type: String,
      required: true
    },

    address: {
      type: String,
      required: true
    },

    cartsId: {
      type: [String],
      required: true
    },
    status: {
      type: String,
      default: 'Pending',
      enum: ['Pending', 'Shipped', 'Delivered', 'Canceled']
    },
    paymentMethod: {
        type: String,
        default: 'cod',
        enum:['cod' , 'visa' , 'credit']
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Order', orderSchema);