import { Pool, UserPoolView } from "@/types/pool"

export const newCoin = (symbol: string, name="") =>
{
    return {
        name,
        symbol,
        iconUrl: "https://i.scdn.co/image/ab6761610000e5eb608e188abbae6409698b8f5a",
        price: Math.random() * 1.5,
        marketCap: Math.random() * 15000000000,
        volumeLastDay: Math.random() * 60000000,
        lastDayGain: (Math.random() - 0.5) * 20,
        lastNDaysPrice: [],
    }
}

export const newPool = ():Pool =>
{
    return {
        name: "Pool 2",
        coin1: newCoin("$CLAY"),
        coin2: newCoin("BTSG"),
        APR: Math.random() * 110,
        liquidity: Math.random() * 20000000,
        swapFee: 0,
    }
}

export const newMyPool = (): UserPoolView =>
{
    return {
        pool: newPool(),
        user: {liquidity: 0, bonded: Math.random()*1500}
    }
}