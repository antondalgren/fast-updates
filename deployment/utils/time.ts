import { time } from '@nomicfoundation/hardhat-network-helpers'
import type { HardhatRuntimeEnvironment } from 'hardhat/types'

/**
 * Increase time to the given timestamp for hardhat networks.
 * Note: will fail if using on a non-hardhat network.
 */
async function increaseTimeTo(timestampSec: number): Promise<void> {
    const currentBlockTime = await time.latest()
    if (timestampSec <= currentBlockTime) {
        console.log(
            `Already ahead of time, not increasing time: current ${currentBlockTime}, requested ${timestampSec}`
        )
        return
    }

    await time.increaseTo(timestampSec)
}

/**
 * Update time to now for hardhat networks.
 * If the time is too far in the past we get issues when calculating price epoch ids.
 */
export async function syncTimeToNow(
    hre: HardhatRuntimeEnvironment
): Promise<void> {
    if (isHardhatNetwork(hre)) {
        const now = Math.floor(Date.now() / 1000)
        await increaseTimeTo(now)
    }
}

function isHardhatNetwork(hre: HardhatRuntimeEnvironment): boolean {
    const network = hre.network.name
    return (
        network === 'local' || network === 'localhost' || network === 'hardhat'
    )
}
