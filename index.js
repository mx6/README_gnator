const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
    return inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "What is the title of your project?"
        },
        // {
        //     type: "input",
        //     name: "contents",
        //     message: "Describe the elements of the project"
        // },
        {
            type: "input",
            name: "installation",
            message: "How is this installed, are there any installation instructions?"
        },
        {
            type: "input",
            name: "usage",
            message: "How is this used, what are the specific instructions?"
        },
        {
            type: "input",
            name: "contribution",
            message: "Who contributed to this project?"
        },
        {
            type: "input",
            name: "tests",
            message: "What tests have been conducted?"
        },
        {
            type: "list",
            name: "license",
            message: "What kind of license should your project have?",
            choices: ["MIT", "APACHE 2.0", "GPL 3.0", "BSD 3", "None"]
        },
        {
            type: "input",
            name: "contact",
            message: "Enter your email address."
        },
        {
            type: "input",
            name: "github",
            message: "Enter your GitHub User Name."
        },
        {
            type: "input",
            name: "linkedin",
            message: "Enter your LinkedIn URL."
        }
    ]);
}

function generateReadme (answers) {
    return `
    
![License](https://img.shields.io/badge/license-${answers.license}-blue.svg "License Badge")

# ${answers.title}.

## Table of Contents 

- [Installation](#installation)
- [Contributions](#contribution)
- [Tests](#tests)
- [License](#license)
- [Contact Me](#contact)

## installation 
## Installation instructions are as follows: 
    ${answers.installation}.
## Contribution
## Contribution Requirements for contribution are as follows: 
    ${answers.contribution}.
## tests
## Conducted tests are as follows: 
    ${answers.tests}.
## License:
## For more information about the License, please follow the following link:
    (https://opensource.org/licenses/${answers.license}).


## Contact
[contact] You can find more information about me at the following links:
Email: ${answers.contact}
Please view my GitHub profile: ${"https://www.github.com/" + answers.github}.
Please connect with me on LinkedIn: ${answers.linkedin}. `  

;
}

promptUser()
    .then(function (answers) {
        const markdown = generateReadme (answers);

        return writeFileAsync("readme.md", markdown);
    })
    .then(function () {
        console.log("Successfully wrote to readme.md");
    })
    .catch(function (err) {
        console.log(err);
    });
