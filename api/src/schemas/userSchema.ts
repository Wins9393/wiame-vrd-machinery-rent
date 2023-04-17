export const createUserSchema = {
  body: {
    type: "object",
    required: ["firstName", "lastName", "email"],
    properties: {
      firstName: { type: "string" },
      lastName: { type: "string" },
      email: { type: "string", format: "email" },
    },
  },
  response: {
    201: {
      type: "object",
      properties: {
        id: { type: "number" },
        firstName: { type: "string" },
        lastName: { type: "string" },
        email: { type: "string" },
      },
    },
  },
};

export const getUserSchema = {
  params: {
    type: "object",
    properties: {
      id: { type: "string" },
    },
    required: ["id"],
  },
  response: createUserSchema.response,
};

export const updateUserSchema = {
  params: getUserSchema.params,
  body: {
    type: "object",
    properties: {
      firstName: { type: "string" },
      lastName: { type: "string" },
      email: { type: "string", format: "email" },
    },
  },
  response: createUserSchema.response,
};

export const deleteUserSchema = {
  params: getUserSchema.params,
  response: {
    200: {
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
  },
};
