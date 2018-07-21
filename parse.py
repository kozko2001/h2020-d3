import pandas as pd

df = pd.read_csv('raw.csv', sep=';')

## drop text and non important columns
columns = ['rcn', 'id', 'acronym', 'status', 'programme',
           'totalCost', 'ecMaxContribution',
           'fundingScheme']

df = df[columns]

## Parse numbers on costs
def convertToNumber(df, col):
    x = df[col].map(lambda x: str(x).split(",")[0])
    x = pd.to_numeric(x, errors="coerce")

    df[col] = x

convertToNumber(df, "totalCost")
convertToNumber(df, "ecMaxContribution")

## Parse fundingScheme
def convertFundingScheme(scheme):
    schemes = ["RIA", "MSCA", "ERC", "FTI", "IA", "CSA", "SME", "EJP", "PPI", "PCP", "EEN", "ERA"]

    for s in schemes:
        if s in scheme:
            return s

    return scheme

df.fundingScheme = df.fundingScheme.map(convertFundingScheme)

df.to_csv('h2020.csv')
