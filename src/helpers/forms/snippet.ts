import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup/dist/yup';

export interface SnippetForm {
  name: string;
  code: string;
  language: string;
}

const snippetSchema = yup.object({
  name: yup.string().max(50).required(),
  code: yup.string().max(500).required(),
  language: yup.string().required(),
});

export const snippetResolver = yupResolver(snippetSchema);
