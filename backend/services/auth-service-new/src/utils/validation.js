import Joi from "joi";

export const validateSignup = (data) => {
  const schema = Joi.object({
    email: Joi.string()
      .email()
      .required()
      .messages({
        "string.email": "Please provide a valid email address",
        "any.required": "Email is required"
      }),
    
    password: Joi.string()
      .min(8)
      .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
      .required()
      .messages({
        "string.min": "Password must be at least 8 characters long",
        "string.pattern.base": "Password must contain at least one uppercase letter, one lowercase letter, and one number",
        "any.required": "Password is required"
      }),
    
    fullName: Joi.string()
      .min(2)
      .max(100)
      .required()
      .messages({
        "string.min": "Full name must be at least 2 characters long",
        "string.max": "Full name cannot exceed 100 characters",
        "any.required": "Full name is required"
      }),
    
    phone: Joi.string()
      .pattern(/^[0-9]{10}$/)
      .optional()
      .messages({
        "string.pattern.base": "Phone number must be 10 digits"
      }),
    
    source: Joi.string()
      .valid("website", "referral", "linkedin", "job_board", "other")
      .optional()
  });

  return schema.validate(data);
};

export const validateLogin = (data) => {
  const schema = Joi.object({
    email: Joi.string()
      .email()
      .required()
      .messages({
        "string.email": "Please provide a valid email address",
        "any.required": "Email is required"
      }),
    
    password: Joi.string()
      .required()
      .messages({
        "any.required": "Password is required"
      })
  });

  return schema.validate(data);
};
