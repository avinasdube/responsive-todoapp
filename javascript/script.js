// triggering event after the page loads

window.addEventListener('load', () => {

    getfromlocaltasklist();

    // getting required variables for adding functionalities

    const form = document.querySelector("#taskform");
    const inputs = document.querySelector("#newtin");
    const tasklist = document.querySelector("#tasks");
    const warn = document.querySelector("#warn");

    // adding event function after the add task button is clicked, which triggers submit event

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // getting the value entered in input and storing it in the constant task variable

        const task = inputs.value;

        // function to trigger warning if user tries to add a blank task (submit blank input)

        if (!task) {
            warn.style.display = 'block';
            setTimeout(() => {
                warn.style.display = 'none';
            }, 2000);
            return;
        }

        // creating a new task template with blank content

        const newtask = document.createElement("div");
        newtask.classList.add("task");

        const newtask_content = document.createElement("div");
        newtask_content.classList.add("content");

        // adding the content from input to new task template

        const taskinput = document.createElement("input");
        taskinput.classList.add("text");
        taskinput.type = "text";
        taskinput.value = task;
        taskinput.setAttribute("readonly", "readonly");

        // appending the new task template and contents to task list 

        newtask_content.append(taskinput);
        newtask.append(newtask_content);
        tasklist.append(newtask);

        // creating the action buttons(edit and delete) to add on task template

        const actionbtn = document.createElement("div");
        actionbtn.classList.add("actions");

        const editbtn = document.createElement("button");
        editbtn.classList.add("edit");
        editbtn.innerHTML = "Edit";

        const deletebtn = document.createElement("button");
        deletebtn.classList.add("delete");
        deletebtn.innerHTML = "Delete";

        // appending the above created buttons to task template

        actionbtn.append(editbtn);
        actionbtn.append(deletebtn);
        newtask.append(actionbtn);

        // adding functionalities to created buttons 

        // ---- edit button ---- //

        editbtn.addEventListener('click', () => {
            if (editbtn.innerText.toLowerCase() == "edit") {
                taskinput.removeAttribute("readonly");
                taskinput.focus();
                editbtn.innerText = "Save";
            }
            else {
                taskinput.setAttribute("readonly", "readonly");
                editbtn.innerText = "Edit";
            }
        })

        // ---- delete button ---- //

        deletebtn.addEventListener('click', () => {
            deletefromlocaltasklist(taskinput);
            newtask.remove();
        })
        
        // calling savetolocaltasklist function to save the 
        // user input in local storage of browser using dev tools

        savetolocaltasklist(taskinput.value);

        // making the input field blank after user adds the new task

        inputs.value = '';
    })
})

// function to save the task written in input to the localstorage

function savetolocaltasklist(task) {

    // check if a tasklist already exists

    let tasklist;
    if (localStorage.getItem("tasklist") === null) {
        tasklist = [];
    }
    else {
        tasklist = JSON.parse(localStorage.getItem("tasklist"));
    }

    // pushing the passed task into localstorage

    tasklist.push(task);
    localStorage.setItem("tasklist", JSON.stringify(tasklist));
}

// function to get back the saved tasks to the app homepage

function getfromlocaltasklist()
{
    const notaskimg = document.querySelector("#notaskimg");

    // check if a tasklist array of string already exists or not

    let tasklist;
    if(localStorage.getItem("tasklist") === null)
    {
        tasklist = [];
        if(localStorage.getItem("tasklist") === []){
            notaskimg.style.display = 'grid';
        }
    }
    else
    {
        tasklist = JSON.parse(localStorage.getItem("tasklist"));
        notaskimg.style.display = 'none';
    }

    // getting the already created tasklist after page reload to 
    // the home page of app ( this function will be called
    // just after the page reloads)

    tasklist.forEach(function(tasked){

        // getting all the required variables for tasks be reloaded

        const form = document.querySelector("#taskform");
        const inputs = document.querySelector("#newtin");
        const tasklist = document.querySelector("#tasks");
        const warn = document.querySelector("#warn");
        
        // creating a new task template with blank content

        const newtask = document.createElement("div");
        newtask.classList.add("task");

        const newtask_content = document.createElement("div");
        newtask_content.classList.add("content");

        // adding the content from saved input to new task template 

        const taskinput = document.createElement("input");
        taskinput.classList.add("text");
        taskinput.type = "text";
        taskinput.value = tasked;
        taskinput.setAttribute("readonly", "readonly");

        // appending the new task template and contents to task list 

        newtask_content.append(taskinput);
        newtask.append(newtask_content);
        tasklist.append(newtask);

        // creating the buttons to add on task template

        const actionbtn = document.createElement("div");
        actionbtn.classList.add("actions");

        const editbtn = document.createElement("button");
        editbtn.classList.add("edit");
        editbtn.innerHTML = "Edit";

        const deletebtn = document.createElement("button");
        deletebtn.classList.add("delete");
        deletebtn.innerHTML = "Delete";

        // appending the above created buttons to task template

        actionbtn.append(editbtn);
        actionbtn.append(deletebtn);
        newtask.append(actionbtn);

        // adding functionalities to created buttons 

        // ---- edit button ---- //

        editbtn.addEventListener('click', () => {
            if (editbtn.innerText.toLowerCase() == "edit") {
                taskinput.removeAttribute("readonly");
                taskinput.focus();
                editbtn.innerText = "Save";
            }
            else {
                taskinput.setAttribute("readonly", "readonly");
                editbtn.innerText = "Edit";
            }
        })

        // ---- delete button ---- //

        deletebtn.addEventListener('click', () => {
            
            // calling deletefromlocatasklit() to also delete the 
            // task list actually from localstorage array tasklist
            // member 

            deletefromlocaltasklist(taskinput);
            newtask.remove();
        })
    });
}

function deletefromlocaltasklist(task)
{
    // check if a task already exists

    let tasklist;
    if (localStorage.getItem("tasklist") === null) {
        tasklist = [];
    }
    else {
        tasklist = JSON.parse(localStorage.getItem("tasklist"));
    }

    // to check and get the index and innertext of input 
    // stored in tasklist in localstorage

    // printing the clicked task actual string saved in
    // localstorage along with it's index no. on console
    // just to check if it going on right

    console.log(task.value);
    console.log(tasklist.indexOf(task.value));

    // storing the fetched index no. of clicked task
    // in a separate constant variable

    const curindex = tasklist.indexOf(task.value);

    // using the splice function to remove the specific
    // string of provided index no. actually from localstorage

    tasklist.splice(curindex,1);

    // saving the final configuration to get the changes done
    
    localStorage.setItem("tasklist", JSON.stringify(tasklist));
   
}