import mongoose from 'mongoose';

/*
Small review schema - could be seperate file but only used here (below in Product)
*/
const reviewSchema = mongoose.Schema({
  name: { type: String, required: true},
  rating: { type: Number, required: true},
  comment: { type: String, required: true}
}, {timestamps: true})

const productSchema = mongoose.Schema({

  //Add a relationship to link the Product with the user who created it
  user: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  reviews: [reviewSchema],   //Array of reviews, see above schema
  rating: {
    type: Number,
    required: true,
    default: 0
  },
  numReviews: {
    type: Number,
    required: true,
    default: 0
  },
  price: {
    type: Number,
    required: true,
    default: 0
  },
  countInStock: {
    type: Number,
    required: true,
    default: 0
  }
}, {
  timestamps: true
});

const Product = mongoose.model('Product', productSchema);

export default Product;