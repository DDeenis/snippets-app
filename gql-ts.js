/* eslint-disable @typescript-eslint/no-var-requires */
const {generateTypeScriptTypes} = require('graphql-schema-typescript');
const {importSchema} = require('graphql-import');

const schema = importSchema('schema.graphql');

generateTypeScriptTypes(schema, 'src/graphql.schema.ts')
  .then(() => {
    console.log('Success');
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
