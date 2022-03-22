import SinfoniaClient from './sinfonia-client'

const sinfoniaClient = new SinfoniaClient(import.meta.env.VITE_BITSONG_CONFIG_URL)

export { sinfoniaClient }