const { test, expect } = require('@playwright/test');
const Ajv = require('ajv');
const { getUrlByEnv } = require('../../helpers/urls');
const loginSchema = require('../../testData/login.JSON.schema');

test('Login response should be 200 OK and have correct schema', async ({ request }) => {
  const url = await getUrlByEnv();
  const ajv = new Ajv();

  const response = await request.post(`${url}customer/ajax/login/`, {
    headers: {
      'X-Requested-With': 'XMLHttpRequest',
    },
    data: {
      username: 'oqohy@mailto.plus',
      password: 'Ab374363!',
      form_key: 'CFUPOPRNDO6pXJ24',
      redirect_url: `${url}`,
    },
  });
  const responseBody = await response.json();
  const validate = ajv.compile(loginSchema);
  const valid = validate(responseBody);
  expect(response.status()).toBe(200);
  expect(valid).toBeTruthy();
});
