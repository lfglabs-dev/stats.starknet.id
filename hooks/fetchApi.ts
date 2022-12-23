import Ajv from 'ajv';
import addFormats from 'ajv-formats';
import { forEach } from 'lodash';

import { JSONSchema7 } from '../types/JSONSchema7';

export const methods = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
};

const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const ajv = new Ajv();
addFormats(ajv);

function validateResponse(validationSchema: JSONSchema7, data: unknown) {
  const validate = ajv.compile(validationSchema);
  let isValid = false;
  let invalidIndex;

  if (Array.isArray(data)) {
    forEach(data, (el, idx) => {
      isValid = validate(el);

      if (!isValid) {
        invalidIndex = idx;
        return false;
      }
    });
  } else {
    isValid = validate(data);
  }

  if (!isValid && validate.errors?.length) {
    const customErrorMessage =
      invalidIndex !== undefined
        ? `Validation error at index ${invalidIndex}:`
        : 'Validation error:';
    const error = new Error(
      `${customErrorMessage} ${validate.errors[0].message}`,
    );
    throw error;
  }
}

type FetchApiArgs = {
  uri: string;
  validationSchema?: JSONSchema7;
  body?: unknown | undefined;
} & Omit<RequestInit, 'body'>;

export const fetchApi = async ({
  uri,
  validationSchema,
  method = methods.GET,
  body,
  ...restRequestInit
}: FetchApiArgs) => {
  let response;
  try {
    response = await fetch(`${BASE_URL}${uri}`, {
      method,
      mode: 'cors',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
      ...restRequestInit,
    });
  } catch (error) {
    throw error;
  }

  if (!response.ok) {
    const error = new Error(response.statusText);
    throw error;
  }

  const responseIsJson = response.headers
    .get('content-type')
    ?.includes('application/json');

  if (responseIsJson) {
    const data = await response.json();

    if (validationSchema) {
      validateResponse(validationSchema, data);
    }

    return data;
  }
};
