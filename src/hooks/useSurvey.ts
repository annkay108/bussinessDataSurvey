import { useEffect, useState } from 'react'
import { IColumn, IGroup } from '@fluentui/react'

import { getMockSurveyData } from '../api'
import { IQuestion, ISurveyData } from '../api/types'
import { SurveyQuestionType } from '../constants/SuveryQuestionType'
import { calculateAggregateScale } from '../utils/survey/calculateAggregateScale'
import { IItem } from '../components/GroupedCollapsibleTable/GroupedCollapsibleTable'

export interface ISurveyDetails {
  items: IItem[]
  groups: IGroup[]
  columns: IColumn[]
}

export interface IReturnType {
  isLoading: boolean
  surveyData: ISurveyData
  getHappinessScore: (questions: IQuestion[]) => number
  getTotalCandidate: (questions: IQuestion[]) => number
  getFormattedSurveyDetails: (questions: IQuestion[]) => ISurveyDetails
}

const useSurvey = (): IReturnType => {
  const [surveyData, setSurveyData] = useState<ISurveyData>({} as ISurveyData)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  useEffect(() => {
    fetchSurveyData()
  }, [])

  const fetchSurveyData = async () => {
    setIsLoading(true)
    try {
      const response: ISurveyData = await getMockSurveyData(true)
      setSurveyData(response)
    } catch (error) {
      console.error(error)
    }
    setIsLoading(false)
  }

  const getFormattedSurveyDetails = (questions: IQuestion[]): ISurveyDetails => {
    const orderedSurveyItem: IItem[] = []
    const groups: IGroup[] = []
    const columns: IColumn[] = [{ key: 'response', name: 'Text answers', fieldName: 'response', minWidth: 120 }]

    let startIndex = 0

    questions
      .filter(question => question.type === SurveyQuestionType.TEXT)
      .forEach(({ question_text, responses }, index) => {
        groups.push({ key: `grouped${index}`, name: question_text, startIndex, count: responses.length })
        startIndex += responses.length

        if (responses.length === 0) orderedSurveyItem.push({ questionTitle: question_text, response: '' })
        responses.forEach(response => {
          if (typeof response === 'string') orderedSurveyItem.push({ questionTitle: question_text, response })
        })
      })

    return { items: orderedSurveyItem, groups, columns }
  }

  const getHappinessScore = (questions: IQuestion[]): number => {
    const responseOpinionScale: number[] = []
    questions
      .filter(question => question.type === SurveyQuestionType.NUMBER)
      .forEach(({ responses }) => {
        responses.forEach(response => {
          if (typeof response === 'number') responseOpinionScale.push(response)
        })
      })
    return calculateAggregateScale(responseOpinionScale)
  }

  const getTotalCandidate = (questions: IQuestion[]): number =>
    questions.find(({ type }) => type === SurveyQuestionType.NUMBER)?.responses.length || 0

  return {
    isLoading,
    surveyData,
    getFormattedSurveyDetails,
    getHappinessScore,
    getTotalCandidate,
  }
}

export default useSurvey
