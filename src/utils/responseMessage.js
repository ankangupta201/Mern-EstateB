module.exports = {
  newUser: {
    success: {
      created: "User created successfully",
      logedIn: "User logged in successfully",
      updated: "Updated Succesfully",
      deleted: "Deleted Succesfully",
    },
    error: {
      error: "error",
      alreadyRegistered: "You are already registered. Please login!",
      invalidID: "Please try again with valid id.",
      invalidUrl: "Please provide a valid url",
      percentage: "Percentage can never be greater than 100 or less than 0",
      endDate: "End date cannot be smaller than start date",
    },
  },
  updateUser: {
    success: {
      updated: "User updated successfully",
    },
    error: {
      error: "Error updating user",
      invalidID: "Please try again with a valid ID",
      userNotFound: "User not found",
      invalidFields: "Invalid fields provided for update",
      passwordMatch: "Wrong Password Entered",
      permissionDenied: "Permission denied. You cannot update this user",
    },
  },
  listingOperations: {
    create: {
      success: {
        created: "Listing created successfully",
      },
      error: {
        error: "Error creating listing",
        invalidFields: "Invalid fields provided for creation",
        permissionDenied: "Permission denied. You cannot create this listing",
      },
    },
    update: {
      success: {
        updated: "Listing updated successfully",
      },
      error: {
        error: "Error updating listing",
        invalidID: "Please try again with a valid ID",
        listingNotFound: "Listing not found",
        invalidFields: "Invalid fields provided for update",
        permissionDenied: "Permission denied. You cannot update this listing",
      },
    },
    delete: {
      success: {
        deleted: "Listing deleted successfully",
      },
      error: {
        error: "Error deleting listing",
        invalidID: "Please try again with a valid ID",
        listingNotFound: "Listing not found",
        permissionDenied: "Permission denied. You cannot delete this listing",
      },
    },
  },
};
