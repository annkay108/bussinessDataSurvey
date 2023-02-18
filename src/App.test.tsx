import React from 'react'
import { Stack } from '@fluentui/react'
import { render, RenderResult } from '@testing-library/react'

import { ISurveyDetails } from './hooks/useSurvey'
import { GroupedCollapsibleTable } from './components'

describe('Survey Data rendered properly', () => {
  const mockSurveyDetails: ISurveyDetails = {
    items: [{ questionTitle: 'What data is NOT always reliable and correct?', response: 'none' }],
    groups: [{ key: 'group1', name: 'What data is NOT always reliable and correct?', startIndex: 0, count: 1 }],
    columns: [{ key: 'response', name: 'Text answers', fieldName: 'response', minWidth: 120 }],
  }

  const { items, groups, columns } = mockSurveyDetails

  const renderSurveyFreeText = (): RenderResult =>
    render(
      <Stack data-testid="FreeTextTable">
        <GroupedCollapsibleTable items={items} groups={groups} columns={columns} />
      </Stack>,
    )

  it('Correctly group data and show table', () => {
    const { getByTestId } = renderSurveyFreeText()
    expect(getByTestId('FreeTextTable').textContent).toMatch(/What data is NOT always reliable and correct\?\(1\)/)
  })
})
