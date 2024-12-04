export const uid = function(){
  return Date.now();
};

export const generateRandom = function(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
