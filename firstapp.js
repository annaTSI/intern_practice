var name = "Arul";
var age = 25;
var hasHobby = true;

function displayUser(userName, userAge, userHasHobby) {
    return 'username is ' + userName + '\n' +
           'age is ' + userAge + '\n' +
           'has Hobby? ' + userHasHobby;
}

console.log(displayUser(name, age, hasHobby));          