import {useQuery} from '@apollo/client';
import {GetLanguages, GetLanguagesResponse} from '../query/language';

export const useLanguages = () => {
  const {data} = useQuery<GetLanguagesResponse>(GetLanguages);

  return data?.queryLanguage;
};
