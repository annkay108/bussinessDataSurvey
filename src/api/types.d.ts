import { SurveyQuestionType } from "../constants/SuveryQuestionType"

export interface IQuestion {
  question_text: string
  type: SurveyQuestionType
  responses: string[] | number[]
}

export interface ISurveyData {
  created_at: string
  survey_title: string
  questions: IQuestion[]
}