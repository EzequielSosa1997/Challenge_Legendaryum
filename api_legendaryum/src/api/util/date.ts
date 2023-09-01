
export const hourInMiliseconds = 3600000;

export const getDateNowAddOneHour = () => new Date(new Date().getTime() + hourInMiliseconds);
