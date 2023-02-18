import { ISurveyData } from './types';
import data from '../data/survey_results.json'

export const getMockSurveyData = (success: boolean):Promise<ISurveyData> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if(success) {
        resolve(data as ISurveyData);
      } else {
        reject({message: 'Error'});
      }
    }, 0);
  });
}