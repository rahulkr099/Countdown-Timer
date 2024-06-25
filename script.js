const date = document.getElementById('date');
//set the Minimum condition of input of Date
const setMinDate = new Date().toISOString().split('T')[0];
date.setAttribute('min', setMinDate);
//Understand this process of getting Internation Standard Time and Date
//console.log('new Date().toISOString():',new Date().toISOString());
//console.log('new Date().toISOString().split("T"):',new Date().toISOString().split('T'));
console.log('new Date().toISOString().split("T")[0]:', new Date().toISOString().split('T')[0]);

const countdownForm = document.getElementById('countdown-form');
let userDate = new Date();//it is converted to date constructor bcoz we have to use it in subtraction with another date
let currentDate = new Date();
let myInterval;

let title;
const timeUpdate = document.querySelector('.timer'); console.log(timeUpdate);
const counterBox = document.querySelector('.counter-box');
const counterTime = document.querySelector('.counter-days');
const updateTitle = document.querySelector('.counter-days h3');
const reset = document.querySelector('.reset');
const complete = document.querySelector('.complete');
const newCountDownBtn = document.querySelector('#new-countdown');
let storeData;
function calcTime(e) {
    myInterval = setInterval(function (e) {

        // Recalculate the differenceDate, so that our calcTime can be updated at every 1 sec
        userDate= new Date(userDate).getTime();
        differenceDate = userDate - new Date().getTime();
        if (differenceDate < 0) {
            complete.style.display = ""; counterBox.style.display = "none"; counterTime.style.display = "none";

        } else {
            const second = 1000;
            const minute = 60 * second;
            const hour = 60 * minute;
            const day = 24 * hour;

            let days = Math.floor(differenceDate / day); console.log('days', days);
            let hours = Math.floor((differenceDate % day) / hour); console.log('hours', hours);
            let minutes = Math.floor((differenceDate % hour) / minute); console.log('minutes', minutes);
            let seconds = Math.floor((differenceDate % minute) / second); console.log('seconds', seconds);
            counterBox.style.display = "none";
            
            updateTitle.textContent=`${title}`;
            timeUpdate.children[0].childNodes[1].textContent = `${days}`;
            timeUpdate.children[1].childNodes[1].textContent = `${hours}`;
            timeUpdate.children[2].childNodes[1].textContent = `${minutes}`;
            timeUpdate.children[3].childNodes[1].textContent = `${seconds}`;
            counterTime.style.display = "";
            
        }
    }, 1000);
}console.log(counterTime);
function checkValue(e) {
    const inputDate = e.target[1].value;
    if (inputDate === '') {
        alert("select a date");
    } else {
        calcTime(e);
    }
}
function restorePreviousCountdown(){
    if(localStorage.getItem('countdown'))
        {
            counterBox.style.display="none";
            counterTime.style.display="";
            complete.style.display="none";
            storeData=JSON.parse(localStorage.getItem('countdown'));
            title = storeData.userTitle;console.log('rktitle',title);
            userDate=storeData.mydate;console.log('rkdate',userDate);
            calcTime();
        }
}

function Reset() {
    counterTime.style.display = "none";
    complete.style.display="none";
    counterBox.style.display = "";
    clearInterval(myInterval);
    title ="";
    userDate="";
    localStorage.removeItem('countdown');
}

function getInputValue(e) {
    e.preventDefault();
    console.log('title:', e.target[0].value);
    title=e.target[0].value;
    console.log('entered date:', e.target[1].value);
    // userDate = e.target[1].value;
    // userDate = new Date(userDate).getTime();
    // userDate = new Date(e.target[1].value).getTime();
    userDate = e.target[1].value;
    currentDate = new Date().getTime();
    console.log('millisec value of currentDate from 1 Jan 1970:', currentDate);
    console.log('millisec value of entered userDate from 1 Jan 1970:', userDate);
    let differenceDate = userDate - currentDate;
    //this differenceDate remains constant because it’s calculated only once when the form is submitted.
    //This differenceDate is not going to setInterval, you have to calculate the difference again in setInterval
    checkValue(e);
    storeData = {
        userTitle: title,
        mydate: userDate,
        /*when you want to get the value from localStorage 
        storeData=JSON.parse(localStorage.getItem('countdown'));
        title = storeData.userTitle;
        console.log('rktitle',title);
        userDate=storeData.mydate;
        console.log('rkdate',userDate);*/
    }
    console.log(storeData);
    localStorage.setItem('countdown',JSON.stringify(storeData));
}
countdownForm.addEventListener('submit', getInputValue);
reset.addEventListener('click', Reset);
newCountDownBtn.addEventListener('click',Reset);
restorePreviousCountdown();