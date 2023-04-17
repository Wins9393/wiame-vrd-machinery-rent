export const createBookingSchema = {
  body: {
    type: "object",
    required: ["engine_id", "user_id", "start_date", "end_date"],
    properties: {
      engine_id: { type: "number" },
      user_id: { type: "number" },
      start_date: { type: "string", format: "date" },
      end_date: { type: "string", format: "date" },
    },
  },
  response: {
    201: {
      type: "object",
      properties: {
        id: { type: "number" },
        engine_id: { type: "number" },
        user_id: { type: "number" },
        start_date: { type: "string", format: "date" },
        end_date: { type: "string", format: "date" },
      },
    },
  },
};

export const getBookingSchema = {
  params: {
    type: "object",
    properties: {
      id: { type: "string" },
    },
    required: ["id"],
  },
  response: createBookingSchema.response,
};

export const updateBookingSchema = {
  params: getBookingSchema.params,
  body: createBookingSchema.body,
  response: createBookingSchema.response,
};

export const deleteBookingSchema = {
  params: getBookingSchema.params,
  response: {
    200: {
      type: "object",
      properties: {
        message: { type: "string" },
      },
    },
  },
};
