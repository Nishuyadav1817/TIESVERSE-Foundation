const Validator = require('validator');

let ValidatorUser = (data) => {
  // Mandatory fields
  const mandatoryFields = ["FullName", "EmailId", "password"];

  // Check missing fields
  const missingFields = mandatoryFields.filter(field => !data[field]);
  if (missingFields.length > 0) {
    throw new Error("Missing fields: " + missingFields.join(", "));
  }

  // Validate email
  if (!Validator.isEmail(String(data.EmailId))) {
    throw new Error("EmailId is not valid");
  }

  // Validate password length
  if (!data.password || data.password.length < 6) {
    throw new Error("Password must be at least 6 characters");
  }

  // Validate FullName length
  if (data.FullName.length < 3) {
    throw new Error("FullName must be at least 3 characters");
  }
};

module.exports = ValidatorUser;