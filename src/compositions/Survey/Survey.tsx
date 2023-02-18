import React from 'react'
import { FontIcon, initializeIcons, Stack } from '@fluentui/react'

import { SurveyFreeText } from './SurveyFreeText'
import { useSurveyDataContext } from '../../contexts/SurveyDataContext'
initializeIcons()

const Survey = () => {
  const { surveyData, getHappinessScore, getTotalCandidate } = useSurveyDataContext()

  const createdDate = new Date(surveyData.created_at).toLocaleString().split(',')[0]
  const totalCandidate = getTotalCandidate(surveyData.questions)

  return (
    <Stack className="m-10 w-full">
      <h1>
        <FontIcon iconName="ClipboardList" className="mr-4" />
        {surveyData.survey_title}
      </h1>

      <span className="mt-4">
        This survey was started on {createdDate}. Overall, {totalCandidate} people participated in the survey
      </span>

      <h1 data-testid="happinessScore" className="mt-4">
        <FontIcon iconName="ChatBot" className="mr-4" />
        {getHappinessScore(surveyData.questions)} / 100
      </h1>
      <Stack>
        <SurveyFreeText />
      </Stack>
    </Stack>
  )
}

export default Survey
