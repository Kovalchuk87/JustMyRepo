const loginSchema = {
  type: 'object',
  properties: {
    errors: { type: 'boolean' },
    message: { type: 'string' },
  },
  required: ['errors', 'message'],

};

module.exports = loginSchema;
