const bandQuery = (pools: boolean, opq: string, exp: string) => `
  compatibilities(
    pagination: { size: 999 },
    filters: [
      { field: "opqPercentile", ${opq}: 50 },
      { field: "overallExpScore", ${exp}: 3 },
      ${
        pools
          ? `{
        anyOf: [
          { field: "opqBand", equals: "1" }
          { field: "opqBand", equals: "2" }
        ]
      }`
          : ""
      }
    ]
    sorting: [
      { field: "leaderLastName" },
      { field: "leaderFirstName" },
      { field: "opqPercentile" }
    ]
  ) {
    itemsCount
  }
`;

export const LEVERAGE = (pools: boolean) => bandQuery(pools, "gt", "gte");
export const INVEST = (pools: boolean) => bandQuery(pools, "gt", "lt");
export const RECONSIDER = (pools: boolean) => bandQuery(pools, "lte", "lt");
export const REDIRECT = (pools: boolean) => bandQuery(pools, "lte", "gte");

export const INSIGHT_ITEMS = (pools: boolean = false) => `
  items {
    id
    name
    profileName
    createdAt
    band1Compatibilities: compatibilities(
      filters: [{ field: "opqBand", equals: "1" }]
    ) {
      itemsCount
    }
    band2Compatibilities: compatibilities(
      filters: [{ field: "opqBand", equals: "2" }]
    ) {
      itemsCount
    }
    leverage: ${LEVERAGE(pools)}
    invest: ${INVEST(pools)}
    redirect: ${REDIRECT(pools)}
    reconsider: ${RECONSIDER(pools)}
    allLeaders: compatibilities {
      itemsCount
      items {
        leaderId
      }
    }
  }
`;
