// num 13

function objectValues(object) {
   var array= [];
    for (var keys in object) {
        array.push(object[keys]); 
    
    }   return array;
} 

// num 14 

function keysToString(object) {
   return Object.keys(object).join(" ");
    
}

//num 15

function valuesToString(object) {
    var array = [];
    for (var keys in object) {
        if (typeof object[keys] === 'string') {
     array.push(object[keys]);
        }  
    }  return array.join(" "); 
    
}

//num 16 

function arrayOrObject(arg) {
    if(Array.isArray(arg)) {
        return 'array';
    } 
    else if(arg === null || arg instanceof Date) {
        return ""; 
    }
    else if (typeof arg === 'object') {
        return 'object';
    }
}

//num 17 

function capitalizeWord(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
    
}

//num 18 

function capitalizeAllWords(string) {
    
    string = string.toLowerCase();
    var array = string.split(' ');
    for(var i = 0; i <array.length; i++) {
        array[i] = array[i][0].toUpperCase() + array[i].substring(1);
    }return array.join(' ');
    
   
}

//num 19 

function welcomeMessage(object) {
    
    return 'Welcome ' + object.name.charAt(0).toUpperCase() + object.name.slice(1) + '!';
}

//num 20

function profileInfo(object) {
    
    return object.name.charAt(0).toUpperCase() + object.name.slice(1) + ' is a ' + object.species.charAt(0).toUpperCase() + object.species.slice(1);
}


//num 21

function maybeNoises(object) {
  //  var array = [];
    if (object.hasOwnProperty("noises") && Array.isArray(object.noises)){
        if(object.noises.length > 0){
             return object.noises.join(" "); 
          }return 'there are no noises';
    } return 'there are no noises';
}
 
 //num 22 
 
function hasWord(string, word) {
    
    if(string.indexOf(word) > -1) {
        return true;
    }  else {
        return false; 
        }
}
    
//num 23 
function addFriend(name, object) {
   object.friends.push(name);
    return object;    
}
 
//num 24
function isFriend(name, object) {
   
   if(Array.isArray(object.friends) && object.hasOwnProperty("friends")){
   for (var i = 0; i < object.friends.length; i++) {
     if(name  === object.friends[i]) {
         return true;
   }}}
     return false; 
}        
     

//num 25 
 

function nonFriends(name, list) {

var friends = [];
var everyoneElse = [];

for(var i = 0; i < list.length; i++){
    if(list[i].name === name){
     friends = list[i].friends;
     break;
}

  } for(var i = 0; i < list.length; i++){
    if(list[i].name !== name){
      everyoneElse.push(list[i].name);
    }
  }
  
var notFriends = difference(everyoneElse, friends);
  return notFriends;
}

function difference(list1, list2) {
  var result = [];
  for (var i = 0; i < list1.length; i++) {
    if (list2.indexOf(list1[i]) === -1) {
      result.push(list1[i]);
    }
  }
  return result;
}

//num 26

function updateObject(object, key, value) {
    object[key] = value; 
     return object;
    
}

//num 27 

function removeProperties(object, stringArray) {
   
    for(var i = 0; i < stringArray.length; i++) {
         if(object.hasOwnProperty(stringArray[i])) {
             delete object[stringArray[i]];
        }
    }
}

//num 28 

function dedup(array) {
    var result = [];
    for (var i = 0; i < array.length; i++) {
        if (array.indexOf(array[i]) === i) {
            result.push(array[i]);
        }
    }
    return result;
}