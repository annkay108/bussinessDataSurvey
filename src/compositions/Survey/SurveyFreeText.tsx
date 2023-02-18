import React, { FC } from 'react'
import { Stack } from '@fluentui/react'

import { GroupedCollapsibleTable } from '../../components'
import { useSurveyDataContext } from '../../contexts/SurveyDataContext'

export const SurveyFreeText: FC = () => {
  const { surveyData, getFormattedSurveyDetails } = useSurveyDataContext()

  const { items, groups, columns } = getFormattedSurveyDetails(surveyData.questions)

  return (
    <Stack data-testid="FreeTextTable">
      <GroupedCollapsibleTable items={items} groups={groups} columns={columns} />
    </Stack>
  )
}
