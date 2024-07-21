export const example = `
    {
        currentStockPrice: number,
        changeAmount: number,
        changePercentage: number,
        indicators: {
          stockPrice: {
            currentValue: number,
            previousDayValue: number,
            changeValue: number,
            changePercentage: number
          },
          investmentIndex: {
            currentValue: number,
            previousDayValue: number,
            changeValue: number,
            changePercentage: number
          },
          profitability: {
            currentValue: number,
            previousDayValue: number,
            changeValue: number,
            changePercentage: number
          },
          growthPotential: {
            currentValue: number,
            previousDayValue: number,
            changeValue: number,
            changePercentage: number
          },
          interestLevel: {
            currentValue: number,
            previousDayValue: number,
            changeValue: number,
            changePercentage: number
          }
        },
        analysis: string, // in Korean
        investmentOutlook: string // in Korean
      }
`;
