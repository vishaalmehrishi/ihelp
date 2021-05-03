// @ts-check
import { initSchema } from '@aws-amplify/datastore';
import { schema } from './schema';



const { HOSPITAL } = initSchema(schema);

export {
  HOSPITAL
};