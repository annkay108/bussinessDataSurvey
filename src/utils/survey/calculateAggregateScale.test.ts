import { calculateAggregateScale } from "./calculateAggregateScale"

describe('calculateAggregateScale', () =>{
  it('returns aggregate opinion happiness scale', ()=>{
    expect(calculateAggregateScale([5,5,5,5,5,5])).toEqual(100)
  })

  it('returns 0 when the input array is empty', ()=>{
    expect(calculateAggregateScale([])).toEqual(0)
  })
})