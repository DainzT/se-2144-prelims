const Display = document.querySelector<HTMLInputElement>("#Display")
const History = document.querySelector<HTMLInputElement>("#History")

//toggle for when equal is entered, resets it to zero when a new digit is clicked.
let input = false;
//toggle stores the display value
let history: any = "";
let checkIfbye: boolean = false;
let Checkdecimal: boolean = true;

//Resets the Calculator
const AC = document.querySelector<HTMLButtonElement>("#AC")
AC?.addEventListener("click", () => {
    if (Display) Display.value = "0";
    if (History) History.value = "";

    if (checkIfbye) {
        Enabled();
        Display?.classList.remove("background");
        History?.classList.remove("background");
        Display?.classList.remove("textanimation");
        clearTimeout(1000);
    } 
});;

//Stores the id of the numbers in an array
const Buttons = ["b0", "b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9", "Dec"];
Buttons.forEach(num => { //goes through the array
    const button = document.querySelector<HTMLButtonElement>(`#${num}`) //queries over the document id to search for the button  
    button?.addEventListener("click", () => {  //check if specific button is clicked it displays its value
        if (input) {
            Display!.value = "0";
            input=false;
        }
        if ( Display && Display!.value.length < 16) {
            if (Display!.value === "0") {
                if (num === "Dec") {
                    if (!Display.value.includes(".")) {
                        Checkdecimal = false
                        Display!.value += "."; //adds the decimal instead of replacing the 0
                    }
                } else {
                    Display!.value = num[1];
                    console.log("hi")
                }
            } else {
                if (num === "Dec") {
                    const check = ["1", "2", "3", "4", "5", "6", "7","8","9","10","0"].includes(Display!.value.charAt(Display!.value.length - 1))
                    if (check && Checkdecimal) {
                        Checkdecimal = false
                        Display!.value += "."; //prevents from having two decimals
                    } else if (Checkdecimal) {
                        Checkdecimal = false
                        Display!.value += "."
                    }
                } else Display!.value += num[1];
            }
        }
        history = Display!.value;
        console.log(Checkdecimal)
    })
});

//takes the last index of the text and deletes it
const Del = document.querySelector<HTMLButtonElement>("#Del")
Del?.addEventListener("click", () => {
    if (input) {
        Display!.value = "0"
    }
    if (["."].includes(Display!.value.charAt(Display!.value.length - 1)) && Checkdecimal === false) Checkdecimal = true 
  
    if (Display!.value.length > 1) Display!.value = `${Display?.value.slice(0, -1)}`;
    else Display!.value = "0";
    console.log(Display!.value.charAt(Display!.value.length - 1))
});

//id of operations are stored in an array
const Operations = ["Add", "Sub", "Div", "Multiply"]
Operations.forEach(signs => {
    const Operaters = document.querySelector<HTMLButtonElement>(`#${signs}`) //goes over them and quqeries over them in the document
    Operaters?.addEventListener("click", () => { //check displays the operation when clicked, on screen.
            const lastchar = Display!.value.charAt(Display!.value.length -1 )
            const check = ["+", "−", "÷", "×"].includes(lastchar)
            if (!check && Display!.value.length < 16) {
                if (greetings.includes(Display!.value)) {
                    Display!.value = "0"
                }
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
            Checkdecimal = true
            console.log(Checkdecimal)
            }
        })
    })

//performs the solving
const Enter = document.querySelector<HTMLButtonElement>("#Equal")
Enter?.addEventListener("click", () => { 
    if (Display!.value === "0") {
        Display!.value = "0"
    } else {
        Checkdecimal = true
        console.log(history)
        const solved = history.replaceAll("−", "-").replaceAll("÷", "/").replaceAll("×", "*")
        console.log(solved)
        Display!.value = `${eval(solved)}`.slice(0,16);
        History!.value = `${history} = ${Display!.value}`;
        input = true;
    }
});

//says the goodbye message on screen
const Bye = document.querySelector<HTMLButtonElement>("#Bye")
 Bye?.addEventListener("click", ()=> {
    Display!.value = "Sasageyoo!";
    Display?.classList.add("textanimation");
    setTimeout(Off, 2000);
    Disabled();
 });


function Off() {
    History?.classList.add("background");
    Display?.classList.add("background"); 
    if (AC) {AC.disabled = false};
};


//Disables all Button
function Disabled() {
    checkIfbye = true
    Operations.forEach(signs => {
        const Operaters = document.querySelector<HTMLButtonElement>(`#${signs}`) //goes over them and quqeries over them in the document
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
        const Operaters = document.querySelector<HTMLButtonElement>(`#${signs}`) //goes over them and quqeries over them in the document
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

