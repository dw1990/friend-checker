interface statistics{
    minimums: {
        [key: string]: string[] //mapping of trait name to people with the lowest rating, array if multiple have the same lowest
        
    }
    maximums: {
        [key: string]: string[] //mapping of trait name to people with the highest rating, array if multiple have the same highest
    }
    avgs: {
        [key: string]: string // mapping of trait name to its avg value among all people
    }

    lowestAvg: string[] //field to get the trait with the lowest avg rating
    highestAvg: string[] //fiel to get the trait with the highest avg rating

}