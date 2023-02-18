import React, { FC } from 'react'

import useSurvey from './hooks/useSurvey'
import Survey from './compositions/Survey'
import { SurveyDataContextProvider } from './contexts/SurveyDataContext'

const App: FC = () => {
  const surveyHookData = useSurvey()

  const { surveyData, isLoading } = surveyHookData

  if (isLoading) return <>Loading...</>

  if (Object.keys(surveyData).length === 0) return <>No Data Available</>

  return (
    <SurveyDataContextProvider data={surveyHookData}>
      <Survey />
    </SurveyDataContextProvider>
  )
}

export default App
