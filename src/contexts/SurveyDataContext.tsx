import React, { createContext, useContext, PropsWithChildren, FC, ReactNode } from 'react'

import { IReturnType } from '../hooks/useSurvey'

interface ISurveyDataContextProviderProps {
  children: ReactNode
  data: IReturnType
}

const SurveyDataContext = createContext<IReturnType>({} as IReturnType)

export const useSurveyDataContext = (): IReturnType => useContext<IReturnType>(SurveyDataContext)

export const SurveyDataContextProvider: FC<PropsWithChildren<ISurveyDataContextProviderProps>> = ({
  children,
  data,
}) => <SurveyDataContext.Provider value={data}>{children}</SurveyDataContext.Provider>
