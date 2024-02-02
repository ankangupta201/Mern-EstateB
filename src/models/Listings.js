module.exports = function (mongoose) {
  const listingSchema = mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      address: {
        type: String,
        required: true,
      },
      regular_price: {
        type: Number,
        required: true,
      },
      discount_price: {
        type: Number,
        required: true,
      },
      bathrooms: {
        type: Number,
        required: true,
      },
      bedrooms: {
        type: Number,
        required: true,
      },
      furnished: {
        type: Boolean,
        required: true,
      },
      parking: {
        type: Boolean,
        required: true,
      },
      type: {
        type: String,
        required: true,
      },
      offer: {
        type: Boolean,
        required: true,
      },
      image_urls: {
        type: Array,
        required: true,
      },
      user_ref: {
        type: String,
        required: true,
      },
    },
    { timestamps: true }
  );
  const listings = mongoose.model("listing", listingSchema);
  return listings;
};
