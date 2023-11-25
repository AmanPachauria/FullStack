function isAnagram(str1, str2) {

    let s1 = str1.split(" ").join("");
    let s2 = str2.split(" ").join("");
 
    s1 = s1.toLowerCase();
    s2 = s2.toLowerCase();
 
    s1 = s1.split("").sort().join("");
    s2 = s2.split("").sort().join("");
    console.log(s1);
    console.log(s2);
    return ( s1 === s2 );
 
 }

 console.log(isAnagram('listen', 'silent'));