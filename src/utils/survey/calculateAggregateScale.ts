const maxScale = 5

export const calculateAggregateScale = (scaleData: number[]): number =>{
  const dataLength = scaleData.length
  if(dataLength === 0) return 0
  
  const sumScale = scaleData.reduce((acc, element)=> acc+element ,0)
  return Math.floor(sumScale/dataLength/maxScale*100)
}