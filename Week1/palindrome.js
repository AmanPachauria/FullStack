/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.

  Once you've implemented the logic, test your code by running
  - `npm run test-palindrome`
*/

function isPalindrome(str) {
  
    str = str.toLowerCase();
    str = str.split(' ').join('');
  
    var left = 0;
    var right = str.length-1;
  
    while( left <= right ){
        if( str[left] < 'a' || str[left] > 'z'){
            left++;
        }
        else if( str[right] < 'a' || str[right] > 'z' ){
            right--;
        }
        else if( str[left] != str[right] ){
             return false;
        }
  
        left++;
        right--;
    }
  
    return true;
  }
  
  module.exports = isPalindrome;
  