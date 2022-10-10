let randomCountryElement = document.querySelector('#random-country');
let userAnswerElement = document.querySelector("#user-answer");
let submitButton = document.querySelector("#submit-answer");
let resultTextElement = document.querySelector('#result');
let playAgainButton = document.querySelector("#play_again");

// Declaring URL as a global variable
let url = ""

// finish the script to challenge the user about their knowledge of capital cities.
// An array of country codes is provided in the countries.js file. 
// Your browser treats all JavaScript files as one big file,
// organized in the order of the script tags so the countriesAndCodes array is available to this script.

// console.log(countriesAndCodes)  // You don't need to log countriesAndCodes - just proving it is available 

// Function to pick a random country
function loadRandomCountry() {
let random_country_code = countriesAndCodes[Math.floor(Math.random() * countriesAndCodes.length)];
console.log(random_country_code)
let countryCode = random_country_code["alpha-2"];
console.log(countryCode)
url = 'https://api.worldbank.org/v2/country/' + countryCode + '?format=json';
console.log(url)

// Display the country's name in the randomCountryElement 
randomCountryElement.innerHTML = random_country_code.name;
// Returns the URL
return url;
}

// When the page loads, select an element at random from the countriesAndCodes array
loadRandomCountry(url);
console.log(url)

// When the user clicks the button,
//  * read the text from the userAnswerElement 
//  * Use fetch() to make a call to the World Bank API with the two-letter country code (from countriesAndCodes, example 'CN' or 'AF')
//  * Verify no errors were encountered in the API call. If an error occurs, display an alert message. 
//  * If the API call was successful, extract the capital city from the World Bank API response.
//  * Compare it to the user's answer. 
//      You can decide how correct you require the user to be. At the minimum, the user's answer should be the same
//      as the World Bank data - make the comparison case insensitive.
//      If you want to be more flexible, include and use a string similarity library such as https://github.com/hiddentao/fast-levenshtein 
//  * Finally, display an appropriate message in the resultTextElement to tell the user if they are right or wrong. 
//      For example "Correct! The capital of Germany is Berlin" or "Wrong - the capital of Germany is not G, it is Berlin"

submitButton.addEventListener('click', function () {
    fetch(url).then( (response) => {
        if (response.ok){
            return response.json();
        } else {
            resultTextElement.innerHTML = "Error: This data isn't available at the time.";
            throw new Error("This data isn't available at the time.");
        }

    }).then((json) =>{
        //access second array in json
        let json_array = json[1];
        //access object in second array in json
        let object = json_array[0];
        //access the capital city in the object
        let capital_city = object["capitalCity"];

        if (userAnswerElement.value.toLowerCase() === capital_city.toLowerCase()){
            resultTextElement.innerHTML = "Correct";
        }
        else{
            resultTextElement.innerHTML = "Incorrect the answer was " + capital_city;
        }
    }).catch((error) =>{
        resultTextElement.innerHTML = "Error: This data isn't available at the time.";
    })
});

// Clear the user's answer, select a new random country, 
// display the country's name, handle the user's guess. 
playAgainButton.addEventListener('click',function () {
    // Loads random country again
    loadRandomCountry(url)

    //clear current entry
    userAnswerElement.value = '';

    //focus back onto the user entry text box
    userAnswerElement.focus();

    //clear the previous result text
    resultTextElement.innerHTML = '';
});