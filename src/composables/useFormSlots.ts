export function useFormSlots() {
  return {
    // 2-Column Row Slots (1 to 20)
    first: 'field-1-1',
    second: 'field-1-2',
    third: 'field-2-1',
    fourth: 'field-2-2',
    fifth: 'field-3-1',
    sixth: 'field-3-2',
    seventh: 'field-4-1',
    eighth: 'field-4-2',
    ninth: 'field-5-1',
    tenth: 'field-5-2',
    eleventh: 'field-6-1',
    twelfth: 'field-6-2',
    thirteenth: 'field-7-1',
    fourteenth: 'field-7-2',
    fifteenth: 'field-8-1',
    sixteenth: 'field-8-2',
    seventeenth: 'field-9-1',
    eighteenth: 'field-9-2',
    nineteenth: 'field-10-1',
    twentieth: 'field-10-2',

    // Full-Width Row Slots (Rows 1 to 10)
    firstFull: 'field-1-full',
    secondFull: 'field-2-full',
    thirdFull: 'field-3-full',
    fourthFull: 'field-4-full',
    fifthFull: 'field-5-full',
    sixthFull: 'field-6-full',
    seventhFull: 'field-7-full',
    eighthFull: 'field-8-full',
    ninthFull: 'field-9-full',
    tenthFull: 'field-10-full',
  } as const;
}
