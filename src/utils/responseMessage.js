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
};
