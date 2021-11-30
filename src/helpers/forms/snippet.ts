import * as yup from 'yup';

export interface SnippetForm {
  name: string;
  code: string;
  language: string;
}

export const snippetSchema = yup.object({
  name: yup.string().max(50).required(),
  code: yup.string().max(500).required(),
  language: yup.string().required(),
});
