
let generatedOtpNumber;
let otpExpiration = false;
let intervalId;
let expairdOtpMassage;


function expairedOtp(){
    const interval = 1000;
    const totalTime = 15000;
    let slice = 15000 / 1000;

    expairdOtpMassage = document.getElementById("display-otp-pepired");
    intervalId = setInterval(()=>{
        expairdOtpMassage.innerText = `Your OTP is going to expair withen ${slice} seconds`;
        slice = slice -1;
    },interval);

      setTimeout(()=>{
       if(!otpExpiration){
        clearInterval(intervalId);
        expairdOtpMassage.innerText = `Your OTP is Expaired`;
        otpGeneration();
       }
    },totalTime);
}



function tackleOtpbox(){
    const otpBoxElements = document.getElementById("otp-boxes-list-id");
    otpBoxElements.addEventListener("input",(event)=>{
            const target = event.target;
            const value = target.value;
            if(isNaN (value)){
                target.value = "";
                return;
            }
            const nextElement = target.nextElementSibling;
            if(nextElement){
                nextElement.focus();
            }
            validateOtp();
    });
};

function otpGeneration(){
    if(!otpExpiration){
    const displayOtp = document.getElementById("display-otp");
    generatedOtpNumber = Math.floor(1000 + Math.random() * 9000);
    displayOtp.innerText = `Your OTP: ${generatedOtpNumber}`;
    expairedOtp();
    }
}

function validateOtp(){
    let otpBoxesValue = "";
    const otpBoxElement = document.getElementById("otp-boxes-list-id");
        [...otpBoxElement.children].forEach((element)=>{
            otpBoxesValue = otpBoxesValue + element.value;
        });
        console.log(otpBoxesValue);
        const displayOtpMessage = document.getElementById("display-otp-massage");
        const compareOtpValue = (generatedOtpNumber === parseInt(otpBoxesValue, 10));

        const tatoggleOtpMessage = (isSuccess, message)=>{
            displayOtpMessage.innerText = message;
            displayOtpMessage.classList.toggle("success",isSuccess);
            displayOtpMessage.classList.toggle("fail",!isSuccess);
        };
        if(compareOtpValue){
            tatoggleOtpMessage(true, "Your OTP sucessfully inserted");
            otpExpiration = true;
            clearInterval(intervalId);
            expairdOtpMassage.innerText = "";
        } else{
            tatoggleOtpMessage(false, "Invalid OTP Number");
        }
}






function init(){
    console.log("Your JS file is successfully running...");
    tackleOtpbox();
    setTimeout(otpGeneration,2000);
};

init();