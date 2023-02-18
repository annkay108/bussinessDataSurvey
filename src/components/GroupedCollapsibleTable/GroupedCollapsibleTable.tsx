import React, { FC, ReactNode } from 'react'
import {
  CheckboxVisibility,
  DetailsHeader,
  DetailsList,
  IColumn,
  IDetailsHeaderBaseProps,
  IDetailsHeaderProps,
  IGroup,
  IRenderFunction,
} from '@fluentui/react'

export type IItem = { [key: string]: string }

interface IGroupedCollapsibleTableProps {
  items: IItem[]
  groups: IGroup[]
  columns: IColumn[]
}

const GroupedCollapsibleTable: FC<IGroupedCollapsibleTableProps> = ({ items, groups, columns }) => {
  const _onRenderColumn = (item?: IItem, index?: number, column?: IColumn): ReactNode => {
    if (!item || !column) return
    const value = item && column && column.fieldName ? `${item[column.fieldName as keyof IItem] || ''}` : ''

    return (
      <div data-is-focusable>
        <span>{value}</span>
      </div>
    )
  }

  const _onRenderDetailsHeader: IRenderFunction<IDetailsHeaderProps> = props => {
    const detailsHeaderProps = {
      ...props,
      ariaLabelForToggleAllGroupsButton: 'Expand collapse groups',
    } as IDetailsHeaderBaseProps

    return (
      <div>
        <DetailsHeader {...detailsHeaderProps} />
      </div>
    )
  }

  return (
    <DetailsList
      items={items}
      groups={groups}
      columns={columns}
      onRenderItemColumn={_onRenderColumn}
      onRenderDetailsHeader={_onRenderDetailsHeader}
      groupProps={{
        showEmptyGroups: true,
        isAllGroupsCollapsed: true,
      }}
      compact
      checkboxVisibility={CheckboxVisibility.hidden}
    />
  )
}

export default GroupedCollapsibleTable
