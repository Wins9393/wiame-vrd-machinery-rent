export const createEngineSchema = {
  body: {
    type: "object",
    required: ["name", "reference", "price", "availability", "description"],
    properties: {
      name: { type: "string" },
      reference: { type: "string" },
      price: { type: "number" },
      availability: { type: "boolean" },
      description: { type: "string" },
    },
  },
  response: {
    201: {
      type: "object",
      properties: {
        id: { type: "number" },
        name: { type: "string" },
        reference: { type: "string" },
        price: { type: "number" },
        availability: { type: "boolean" },
        description: { type: "string" },
      },
    },
  },
};

export const getEngineSchema = {
  params: {
    type: "object",
    properties: {
      id: { type: "string" },
    },
    required: ["id"],
  },
  response: createEngineSchema.response,
};

export const updateEngineSchema = {
  params: getEngineSchema.params,
  body: createEngineSchema.body,
  response: createEngineSchema.response,
};

export const deleteEngineSchema = {
  params: getEngineSchema.params,
  response: {
    200: {
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
  },
};
