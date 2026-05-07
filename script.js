// ================= LOGIN & SIGNUP =================

function showSignup(){

document.getElementById("signupForm").style.display="block";

document.getElementById("loginForm").style.display="none";

}

function showLogin(){

document.getElementById("signupForm").style.display="none";

document.getElementById("loginForm").style.display="block";

}

// SIGNUP

document.getElementById("signupForm").addEventListener("submit",function(event){

event.preventDefault();

let username=document.getElementById("signupUsername").value;

let email=document.getElementById("signupEmail").value;

let password=document.getElementById("signupPassword").value;

let message=document.getElementById("message");

let usernamePattern=/^[A-Za-z0-9_]{4,15}$/;

if(!usernamePattern.test(username)){

message.style.color="red";

message.innerHTML="Invalid Username.";
return;

}

if(password.length<6){

message.style.color="red";

message.innerHTML="Password must contain 6 characters.";
return;

}

if(localStorage.getItem(username)){

message.style.color="red";

message.innerHTML="User already exists.";
return;

}

let userData={

email:email,
password:password

};

localStorage.setItem(username,JSON.stringify(userData));

message.style.color="green";

message.innerHTML="Signup Successful. Please Login.";

});

// LOGIN

document.getElementById("loginForm").addEventListener("submit",function(event){

event.preventDefault();

let username=document.getElementById("loginUsername").value;

let password=document.getElementById("loginPassword").value;

let storedUser=localStorage.getItem(username);

let message=document.getElementById("message");

if(!storedUser){

message.style.color="red";

message.innerHTML="User not found.";
return;

}

let userData=JSON.parse(storedUser);

if(userData.password!==password){

message.style.color="red";

message.innerHTML="Wrong Password.";
return;

}

document.getElementById("authContainer").style.display="none";

document.getElementById("website").style.display="block";

});

// ================= SCROLL =================

function scrollToAbout(){

document.getElementById("about").scrollIntoView({
behavior:"smooth"
});

}

// ================= FRAUD CHECKER =================

function checkFraud(){

let input=document.getElementById("fraudInput").value.toLowerCase();

let result=document.getElementById("fraudResult");

if(input===""){

result.style.color="red";

result.innerHTML="Please enter a message.";
return;

}

if(
input.includes("otp") ||
input.includes("bank") ||
input.includes("click link") ||
input.includes("win money") ||
input.includes("urgent")
){

result.style.color="red";

result.innerHTML=`
⚠ Suspicious Message Detected<br><br>

Possible Scam Type:
Banking / OTP Fraud<br><br>

Risk Level:
HIGH RISK<br><br>

Possible Source:
Unknown Fraud SMS or WhatsApp Scam<br><br>

Recommended Action:
Do NOT share personal information,
OTP or banking details.
`;

}

else{

result.style.color="green";

result.innerHTML=`
✅ Message Looks Safe<br><br>

No dangerous fraud keywords detected.<br><br>

Still avoid sharing sensitive information online.
`;

}

}

// ================= NUMBER SCANNER =================

function scanNumber(){

let number=document.getElementById("phoneInput").value;

let result=document.getElementById("phoneResult");

if(number.length<10){

result.style.color="red";

result.innerHTML="Invalid Number.";
return;

}

if(number.startsWith("999")){

result.style.color="red";

result.innerHTML=`
⚠ Fraud Alert<br><br>

Number Status:
Reported Suspicious Number<br><br>

Possible Source:
Fake Banking / Prize Scam Calls<br><br>

Risk Level:
HIGH<br><br>

Recommendation:
Block and Report this number immediately.
`;

}

else{

result.style.color="green";

result.innerHTML=`
✅ Number Looks Safe<br><br>

No fraud reports found for this number.
`;

}

}

// ================= QUIZ SYSTEM =================

let currentQuestion=0;

let score=0;

const quizData=[

{
question:"What should you do if someone asks for your OTP?",
options:[
"Share OTP",
"Ignore and Block",
"Send ATM PIN",
"Click Link"
],
correct:1
},

{
question:"Which password is strongest?",
options:[
"123456",
"password",
"faheem123",
"F@H#92!kL"
],
correct:3
},

{
question:"What is phishing?",
options:[
"Cyber Attack",
"Game",
"Phone App",
"Bank Service"
],
correct:0
},

{
question:"Should you trust unknown banking calls?",
options:[
"Yes",
"No",
"Sometimes",
"Only at Night"
],
correct:1
},

{
question:"What should you check before clicking links?",
options:[
"Source",
"Nothing",
"Randomly Click",
"Ignore Security"
],
correct:0
}

];

// LOAD QUESTION

function loadQuestion(){

document.getElementById("question").innerHTML=
quizData[currentQuestion].question;

document.getElementById("btn0").innerHTML=
quizData[currentQuestion].options[0];

document.getElementById("btn1").innerHTML=
quizData[currentQuestion].options[1];

document.getElementById("btn2").innerHTML=
quizData[currentQuestion].options[2];

document.getElementById("btn3").innerHTML=
quizData[currentQuestion].options[3];

}

// CHECK ANSWER

function checkAnswer(selected){

let result=document.getElementById("quizResult");

if(selected===quizData[currentQuestion].correct){

score++;

result.style.color="green";

result.innerHTML="✅ Correct Answer";

}

else{

result.style.color="red";

result.innerHTML="❌ Wrong Answer";

}

document.getElementById("scoreBoard").innerHTML=
"Score: "+score;

currentQuestion++;

if(currentQuestion>=quizData.length){

currentQuestion=0;

result.innerHTML+="<br><br>🎉 Quiz Restarted";

}

setTimeout(()=>{

loadQuestion();

result.innerHTML="";

},1500);

}

loadQuestion();

// ================= CHAT =================

function openChat(){

document.getElementById("chatBox").style.display="flex";

}

function closeChat(){

document.getElementById("chatBox").style.display="none";

}

// ================= AI CHAT =================

function sendMessage(){

let input=document.getElementById("userInput");

let message=input.value;

let chatBody=document.getElementById("chatBody");

if(message.trim()==="") return;

let userDiv=document.createElement("div");

userDiv.className="user";

userDiv.innerHTML=message;

chatBody.appendChild(userDiv);

let botDiv=document.createElement("div");

botDiv.className="bot";

let lower=message.toLowerCase();

let reply="";

if(lower.includes("otp")){

reply="Never share OTP with anyone.";

}

else if(lower.includes("bank")){

reply="Banks never ask for passwords or PIN.";

}

else if(lower.includes("fraud")){

reply="Verify before making payments online.";

}

else if(lower.includes("phishing")){

reply="Avoid suspicious links and unknown emails.";

}

else if(lower.includes("password")){

reply="Use strong passwords with symbols and numbers.";

}

else{

reply="Stay alert online and avoid suspicious activity.";

}

botDiv.innerHTML=reply;

chatBody.appendChild(botDiv);

input.value="";

chatBody.scrollTop=chatBody.scrollHeight;

}