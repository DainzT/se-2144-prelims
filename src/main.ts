// Note to self: GET RID OF REDUNDANT CODES

const Display = document.querySelector<HTMLInputElement>("#Display")
const History = document.querySelector<HTMLInputElement>("#History")

// toggle for when equal is entered, resets it to zero when a new digit is clicked.
let input = false;
// toggle stores the display value
let history: any = "";
let checkIfBye: boolean = false;
let checkDecimal: boolean = true;
let checkZero: boolean = false;
let tracker: any = ""; // tracks when the first index of the rows of digits is a zero

// Resets the Calculator
const AC = document.querySelector<HTMLButtonElement>("#AC")
AC?.addEventListener("click", () => {
    if (Display) Display.value = "0";
    if (History) History.value = "";
    checkDecimal = true;
    input = false;
    history = "";
    tracker = "";
    checkZero = false;
    if (checkIfBye) {
        Enabled();
        Display?.classList.remove("background");
        History?.classList.remove("background");
        Display?.classList.remove("textanimation");
        clearTimeout(1000);
    } 
});;

// Stores the id of the numbers in an array
const Buttons = ["b0", "b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9", "Dec"];
Buttons.forEach(num => { // goes through the array
    const button = document.querySelector<HTMLButtonElement>(`#${num}`) // queries over the document id to search for the button  
    button?.addEventListener("click", () => {  // check if specific button is clicked it displays its value
        let preValue = Display!.value;

        if (input) {
            Display!.value = "0";
            checkDecimal = true
            input=false;
        }
        if ( Display && Display!.value.length < 16) {
            if (Display!.value === "0") {
                if (num === "Dec") {
                    if (!Display.value.includes(".")) {
                        checkDecimal = false
                        Display!.value += "."; // adds the decimal instead of replacing the 0
                        tracker = "0."
                    }
                } else {
                    Display!.value = num[1];
                    tracker = num[1]
                }
            } else {
                if (num === "Dec") {
                    const check = ["1", "2", "3", "4", "5", "6", "7","8","9","10","0"].includes(Display!.value.charAt(Display!.value.length - 1))
                    if (check && checkDecimal) {
                        checkDecimal = false
                        Display!.value += "."; // prevents from having two decimals
                        tracker += "."
                    } else if (checkDecimal) {
                        checkDecimal = false
                        Display!.value += "."
                        tracker += "."
                    } 
                    if (!(Display!.value.split(/[−÷×+]/).slice(-1).join("").split("").includes("."))){
                        Display!.value += "."
                        tracker += "."
                    } 
                } else if (!checkZero){ 
                    Display!.value += num[1];
                    tracker += num[1]
                }
            }
        }

        if (Display!.value.split(/[−÷×+]/).slice(-1)[0][0] == "0" || (Display!.value.split(/[−÷×+]/).slice(-1).join("").includes("−0")) ) {
            checkZero = true
        } else {
            checkZero = false;
        }   
        
        if (tracker[1] == "." || (Display!.value.split(/[−÷×+]/).slice(-1)[0][0] == "0" && Display!.value.split(/[−÷×+]/).slice(-1)[0][1] == ".")) {
            checkZero = false;
        }
        
        let checkError = Display!.value


        if (preValue === checkError) {
            Display!.style.color = "rgb(250,128,114)"
        }  else {
            Display!.style.color = "rgb(248, 248, 248)"
        }

        if (Display!.value[0] === "0") Display!.style.color = "rgb(248, 248, 248)"
        
        history = Display!.value;
    })
});



// takes the last index of the text and deletes it
const Del = document.querySelector<HTMLButtonElement>("#Del")
Del?.addEventListener("click", () => {
    let preValue = Display!.value;

    if (input) {
        Display!.value = "0";
    }

    if (["+", "−", "÷", "×"].includes(Display!.value.charAt(Display!.value.length - 1)) && checkDecimal) {
        checkDecimal = false; 
    }

    if (["."].includes(Display!.value.charAt(Display!.value.length - 1)) && !checkDecimal) checkDecimal = true;
  
    if (Display!.value.length > 1) {
        Display!.value = `${Display?.value.slice(0, -1)}`;
    } else {
        Display!.value = "0";
    }

    tracker = tracker.slice(0, -1);

    if (Display!.value.split(/[−÷×+]/).slice(-1)[0][0] == "0") {
        checkZero = true
    } else {
        checkZero = false;
    }   

    if (tracker[1] == ".") {
        checkZero = false;
    }

    let checkError = Display!.value

    if (preValue === checkError) {
        Display!.style.color = "red"
    }  else {
        Display!.style.color = "rgb(248, 248, 248)"
    }

    console.log(tracker)
});

// id of operations are stored in an array
const Operations = ["Add", "Sub", "Div", "Multiply"]
Operations.forEach(signs => {
    const Operaters = document.querySelector<HTMLButtonElement>(`#${signs}`) // goes over them and quqeries over them in the document
    Operaters?.addEventListener("click", () => { // check displays the operation when clicked, on screen.
            const lastchar = Display!.value.charAt(Display!.value.length -1 )
            const check = ["+", "−", "÷", "×", "."].includes(lastchar)
            const check1 = ["+", "÷", "×"].includes(lastchar)
            if (!check && Display!.value.length < 16) {
                if (greetings.includes(Display!.value) || Display!.value == "Error" || Display!.value == "NaN") {
                    Display!.value = "0"
                }
                if (signs === "Add") {
                    Display!.value += "+";
                }
                if (signs === "Sub" && Display!.value === "0") {
                    Display!.value = "−";
                } else if (signs === "Sub") {
                    Display!.value += "−";
                }
                if (signs === "Div") {
                    Display!.value += "÷";
                }
                if (signs === "Multiply") Display!.value += "×";
            input = false
            checkDecimal = true
            tracker = ""
            console.log(check)
            } else if (!check && Display!.value.length >= 16) {
                Display!.value = `${Display?.value.slice(0, -8)}`;
                if (signs === "Add") {
                    Display!.value += "+";
                }
                if (signs === "Sub") {
                    Display!.value += "−";
                }
                if (signs === "Div") {
                    Display!.value += "÷";
                }
                if (signs === "Multiply") Display!.value += "×";
                input = false
            } else if (check1) {
                if (signs === "Sub") {
                    Display!.value += "−";
                }
            }
        })
    })

// performs the solving
const Enter = document.querySelector<HTMLButtonElement>("#Equal")
Enter?.addEventListener("click", () => { 
    if (Display!.value === "0") {
        Display!.value = "0"
    } else {
        checkDecimal = true
        const solved = history.replaceAll("−", "-").replaceAll("÷", "/").replaceAll("×", "*")
        Display!.value = `${eval(solved)}`.slice(0,16);
        History!.value = `${history} = ${Display!.value}`;
        Fix() 
        ILY()
        input = true;
    }
});

// says the goodbye message on screen
const Bye = document.querySelector<HTMLButtonElement>("#Bye")
 Bye?.addEventListener("click", ()=> {
    Display!.value = "Sasageyoo!";
    Display?.classList.add("textanimation");
    setTimeout(Off, 2000);
    Disabled();
 });

// animation when clicked on the Bye button
function Off() {
    History?.classList.add("background");
    Display?.classList.add("background"); 
    if (AC) {AC.disabled = false};
};


// Disables all Button
function Disabled() {
    checkIfBye = true;
    Operations.forEach(signs => {
        const Operaters = document.querySelector<HTMLButtonElement>(`#${signs}`) // iterates each and queries them over in the document
        if (Operaters) Operaters.disabled = true;
    });
    Buttons.forEach(num => {
        const button = document.querySelector<HTMLButtonElement>(`#${num}`)
        if (button) button.disabled = true;
    });

    if (Hello) Hello.disabled = true;
    if (AC) AC.disabled = true;
    if (Enter) Enter.disabled = true;
    if (Del) Del.disabled = true;
}

//Enables all Button
function Enabled() {
    
    Operations.forEach(signs => {
        const Operaters = document.querySelector<HTMLButtonElement>(`#${signs}`) // iterates each and queries them over in the document
        if (Operaters) Operaters.disabled = false;
    })
    Buttons.forEach(num => {
        const button = document.querySelector<HTMLButtonElement>(`#${num}`)
        if (button) button.disabled = false;
    })
    
    if (AC) AC.disabled = false;
    if (Hello) Hello.disabled = false;
    if (Enter) Enter.disabled = false;
    if (Del) Del.disabled = false;
}

const greetings = ["Hola", "Kamusta", "Konichiwa", "Ciao", "Salaam", "Namaste", "Hallo", "Bonjour"]
const Hello = document.querySelector<HTMLButtonElement>("#Hello")
Hello?.addEventListener("click", () => {
    input=true;
    Display!.value = greetings[Math.floor(Math.random() * 8)];
});

// Integrate keys in calcualtor 
document.addEventListener("keydown", (event) => {
    if (event.key >= '0' && event.key <= '9') {
        const button = document.querySelector<HTMLButtonElement>(`#b${event.key}`)
        button?.click();
    }
    if (event.key == 'Backspace') {
        const button =  document.querySelector<HTMLButtonElement>(`#Del`)
        button?.click();
    }
    if (event.key == 'Enter') {
        const button =  document.querySelector<HTMLButtonElement>(`#Equal`)
        button?.click();
    }
    if (event.key == '+') {
        const button =  document.querySelector<HTMLButtonElement>(`#Add`)
        button?.click();
    }
    if (event.key == '-') {
        const button =  document.querySelector<HTMLButtonElement>(`#Sub`)
        button?.click();
    }
    if (event.key == '/') {
        const button =  document.querySelector<HTMLButtonElement>(`#Div`)
        button?.click();
    }
    if (event.key == '*') {
        const button =  document.querySelector<HTMLButtonElement>(`#Multiply`)
        button?.click();
    }
    if (event.key == 'a') {
        const button =  document.querySelector<HTMLButtonElement>(`#AC`)
        button?.click();
    }
    if (event.key == 'h') {
        const button =  document.querySelector<HTMLButtonElement>(`#Hello`)
        button?.click();
    }
    if (event.key == 'b') {
        const button =  document.querySelector<HTMLButtonElement>(`#Bye`)
        button?.click();
    }
    if (event.key == '.') {
        const button =  document.querySelector<HTMLButtonElement>(`#Dec`)
        button?.click();
    }
})

function Fix() {
    if (Display!.value === "Infinity") {
        Display!.value = "Error"
        History!.value = `${history} = ${Display!.value}`;
    }
}

function ILY() {
    if (Display!.value === "143"){
        History!.value =`${history} = I LOVE YOU`
    }
}