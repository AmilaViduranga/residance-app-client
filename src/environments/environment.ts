// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  BASESERVICE: "http://localhost:8080/",
  //user routes
  USER_CREATE: "user/create",
  USER_UPDATE: "user/update/",
  USER_GET_ALL: "user/get/all",
  USER_GET_SINGLE: "user/get/",
  USER_DELETE: "user/delete/",
  USER_LOGIN: "user/login",
  
  //roles routes
  ROLE_CREATE: "role/create",
  ROLE_UPDATE: "role/update/",
  ROLE_GET_ALL: "role/get/all",
  ROLE_GET_SINGLE: "role/get/",
  ROLE_DELETE: "role/delete/",
  ROLE_GET_LIST: "role/roles-only",

  //gas bill routes
  GAS_BILL_CREATE: "gasbill/create",
  GAS_BILL_UPDATE: "gasbill/update/",
  GAS_BILL_GET_SINGLE: "gasbill/get/",
  GAS_BILL_GET_ALL: "gasbill/get/all",
  GAS_BILL_GET_BY_QUERY: "gasbill/get/by-query",
  GAS_BILL_DELETE: "gasbill/delete/",
  GAS_BILL_GET_PAY_SLIP: "gasbill/get/pay_slip",

  //tenant routes
  TENANT_CREATE: "tenant/create",
  TENANT_UPDATE: "tenant/update/",
  TENANT_GET_ALL: "tenant/get/all",
  TENANT_GET_By_QUERY: "tenant/get/by-query",
  TENANT_GET_SINGLE: "tenant/get/",
  TENANT_DELETE: "tenant/delete/",

  //unit routes
  UNIT_CREATE: "unit/create",
  UNIT_UPDATE: "unit/update/",
  UNIT_GET_ALL: "unit/get/all",
  UNIT_GET_BY_QUERY: "unit/get/by-query",
  UNIT_GET_SINGLE: "unit/get/",
  UNIT_DELETE: "unit/delete/"
};
