import { Pool, UserPoolView } from "@/types/pool"
import { User } from "@/types/user"

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

export const newUserCoin = (symbol: string, name="") =>
{
    const total = Math.random() * 5000
    return {
        coin: newCoin(symbol, name),
        total,
        bonded: Math.min(total, Math.random() * 5000),
    }
}

export const newUser = ():User =>
{
    const total = Math.random() * 30000
    const i = [
        ["Bitsong", "BTSG"],
        ["Adam Clay", "$CLAY"],
        ["Fonti", "$FONTI"],
        ["Del Vento", "$DLVNT"],
    ]
    return {
        totalAssets: total,
        bondedAssets: Math.min(total, Math.random() * 20000),
        coins: i.map(i => {
            return {
                coin: newCoin(i[1], i[0]),
                total: Math.random() * 20000000,
                bonded: Math.random() * 200000000,
            }
        }),
    }
}