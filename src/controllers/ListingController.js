const { Listing } = require("../models/db");
const { z } = require("zod");
const { listingOperations } = require("../utils/responseMessage");
const { code } = require("../utils/httpcode");
/////
const ListingSchema = z
  .object({
    name: z
      .string()
      .min(3)
      .max(100, { message: "Name must be between 3 and 100 characters" }),
    description: z.string({ message: "Description must be a string" }),
    address: z.string({ message: "Address must be a string" }),
    regular_price: z.number({ message: "Regular price must be a number" }),
    discount_price: z.number({ message: "Discount price must be a number" }),
    bathrooms: z.number({ message: "Bathrooms must be a number" }),
    bedrooms: z.number({ message: "Bedrooms must be a number" }),
    furnished: z.boolean({ message: "Furnished must be a boolean" }),
    parking: z.boolean({ message: "Parking must be a boolean" }),
    type: z.string({ message: "Type must be a string" }),
    offer: z.boolean({ message: "Offer must be a boolean" }),
    image_urls: z.array(z.string(), {
      message: "Image URLs must be an array of strings",
    }),
    user_ref: z.string({ message: "User reference must be a string" }),
  })
  .refine(
    (data) => {
      if (
        data.regular_price &&
        data.discount_price &&
        data.regular_price >= data.discount_price
      ) {
        return { message: "Discount price should be less than regular price" };
      }
      return true;
    },
    { message: "Invalid prices" }
  );
module.exports = {
  store: async function (req, res, next) {
    const input = req.body;

    try {
      const listingData = ListingSchema.parse(input);

      const newListing = new Listing(listingData);
      await newListing.save();
      res.status(code.created).json({
        success: listingOperations.create.success.created,
        data: newListing,
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        next(error);
      } else {
        res.status(code.internalServerError).json({
          status: false,
          message: listingOperations.create.error.error,
          error: error.errors || "Internal Server Error",
        });
      }
    }
  },
};
