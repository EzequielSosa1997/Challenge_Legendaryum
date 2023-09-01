import CoinCron from "./coinCron";

export const initCron = () => {
  try {
    const serviceCoinCron = new CoinCron();
    serviceCoinCron.createCoin.start()
  } catch (error) { }
};
