const inquirer = require("inquirer")
const Manager = require("./lib/Manager")
const Intern = require("./lib/Intern")
const Engineer = require("./lib/Engineer")
const fs = require("fs")
let id = 1
let allEmployee = []


const firstHalfHtml = `
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Team Generator</title>

    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
        integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">

    <style>

    body {
        background-color: #ffe6ff;
    }

    h1 {
        background-color: #993399;
        color: #ffffff;
    }

    p {
        color: #993399;
    }

    </style>

</head>

<body>

<h1 class="text-center">My Team</h1>
    <div class="container">
        <div class="row">

            <div class="col-sm-12">
`

const lastHtml = `

</div>
</div>

</div>

</body>

</html>
`

let card = ""
function menu() {
    inquirer.prompt({
        type: "list",
        message: "What do you want to do?",
        choices: ["Add Manager", "Add Engineer", "Add Intern", "Quit"],
        name: "addEmployee"
    }).then(function (input) {
        switch (input.addEmployee) {
            case "Add Manager":
                addManager()
                break
            case "Add Engineer":
                addEngineer()
                break
            case "Add Intern":
                addIntern()
                break
                case "Quit":
                    writeFile()
                    break
        }
    })
}

function addManager() {
    inquirer.prompt([{
        type: "input",
        message: "What is your name?",
        name: "employeeName"
    },
    {
        type: "input",
        message: "What is your email?",
        name: "employeeEmail"
    },
    {
        type: "input",
        message: "What is your office number",
        name: "employeeNumber"
    }

    ]).then(function(input){
      
         let manager = new Manager(input.employeeName, id++, input.employeeEmail, input.employeeNumber)
         allEmployee.push(manager)
         console.log(allEmployee)
         menu()
    })

}

function addEngineer() {
    inquirer.prompt([
        {
        type: "input",
        message: "What is your name?",
        name: "engineerName"
    },
    {
        type: "input",
        message: "What is your email?",
        name: "engineerEmail"
    },
    {
        type: "input",
        message: "what is yout github username?",
        name: "engineerGithub"
    }
]).then(function(input){
    let engineer = new Engineer(input.engineerName, id++, input.engineerEmail, input.engineerGithub)
    allEmployee.push(engineer)
    console.log(allEmployee)
    menu()
})

}

function addIntern() {
    inquirer.prompt([
        {
            type: "input",
            message: "What is your name?",
            name: "internName"
        },
        {
            type: "input",
            message: "what is your email?",
            name: "internEmail"
        },
        {
            type: "input",
            message: "what is your school name?",
            name: "internSchool"
        }
    ]).then(function(input){
        let intern = new Intern(input.internName, id++, input.internEmail, input.internSchool)
        allEmployee.push(intern)
        console.log(allEmployee)
        menu()
    })

}

function writeFile(){
      for (let index = 0; index < allEmployee.length; index++) {
          
           if (allEmployee[index].getRole()==="Manager"){
               card += `
                      <div class='card'>
                        <div class='card-header'>
                               <p class="text-center">Name: ${allEmployee[index].getName()}</p>
                               <p class="text-center">Role: ${allEmployee[index].getRole()}</p>
                        </div>

                        <div class='card-body'>
                        <h5 class="card-title">ID: ${allEmployee[index].getId()}</h5>  
                        <h5 class="card-title">Email: ${allEmployee[index].getEmail()}</h5>
                        <h5 class="card-title">Office Number: ${allEmployee[index].getOfficeNumber()}</h5>

                        </div>
                      </div>
               `
           }
          
      }

      fs.writeFile("./output/index.html",firstHalfHtml+card+lastHtml,function(err){
         if(err)
           {
               console.log(err)
           } 
           
           console.log("success")
      })
}


menu()