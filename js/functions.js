lengthCheck = function(str, size){
  return (str.length <= parseInt(size));
},
isPalindrom = function(str){
  return(str.toLowerCase() === str.toLowerCase().split('').reverse().join(''));
},
findDigits = function(str){
  const r = /\d+/g;
  let result = '';
  str.toString().split('').forEach(element => {
    if(element.match(r) != null){
      result += element;
    };
  });
  return (result === '') ? NaN : parseInt(result);
}
