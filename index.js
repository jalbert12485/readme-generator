const { constants } = require("buffer");
const fs = require("fs");
const inquirer = require("inquirer");
const answer=[];
let readMeContent="";

// array of questions for user
const questions = ["What is the title of this project?",
    "Write a short summary of what this project does.",
    "What is your github user name?", 
    "What is your github project name?", 
    "What is your email?",
    "Write a short summary of how to use this project.",
    "What license does this project have?"
];

// An array to use with inquirer that will create the prompts.
const promptArray=[];

for(let i=0; i< questions.length; i++){
    promptArray.push({
        type: "input",
        message: questions[i],
        name: `answer${i}`
    })
}

// Sectoins that will be in the readme.
const sections=[{name: ""},{name: "Table of Contents"},{ name: "About"},{name: "Installation"},{name: "Usage"},{name: "Contributing"},{name: "License"}];

// Creating content for the table contents
let contents="";
for(let i=2; i< sections.length; i++){
    contents=contents+`* [${sections[i].name}](#${sections[i].name}) \n `;
  }

sections[1].content=contents;

// Gets the information that is required from the user.
inquirer
  .prompt(
    promptArray
  )
  .then(function(response) {

   for(let i=0; i < questions.length; i++){
    answer.push(response[`answer${i}`]);
   }
   assignContent();
   generateMarkdown();

  });

// Add a key to the array of sections that gives the content of sections and assigns the name of the project.
function assignContent(){
  sections[0].name=answer[0];
  sections[2].content=`${answer[1]} \n ![](Screenshot.png)`;
  sections[3].content=`1. Clone this repository at [GitHub](https://github.com/${answer[2]}/${answer[3]}.git) \n`+"```sh \n"+
  `git clone https://github.com/${answer[2]}/${answer[3]}.git` +"\n ``` \n"+`2. Install packages using \n` +"```sh \n"+
  `npm i` +"\n ``` \n";
  sections[4].content=answer[5];
  sections[5].content=`If you would like to contribute to this package, please contact the author via [email](mailto:${answer[4]}).  Provide any details about your proposed chagnes so that your contribution can be made.`

  if(answer[6]=="mit"){
    sections[6].content=`MIT License \n \n Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the /'Software/'), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions: \n \n The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.  \n  \n THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.`
  }else{
    sections[6].content=`This is free and unencumbered software released into the public domain. Anyone is free to copy, modify, publish, use, compile, sell, or distribute this software, either in source code form or as a compiled binary, for any purpose, commercial or non-commercial, and by any means. \n \n In jurisdictions that recognize copyright laws, the author or authors of this software dedicate any and all copyright interest in the software to the public domain. We make this dedication for the benefit of the public at large and to the detriment of our heirs and successors. We intend this dedication to be an overt act of relinquishment in perpetuity of all present and future rights to this software under copyright law. \n \n THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE. \n \n For more information, please refer to <https://unlicense.org>`
  }
}

// function to write README file
function writeToFile(data) {
    
fs.writeFile("README.md", data, function(err) {

    if (err) {
      return console.log(err);
    }
  
  
  });
    
}



// Creates the data to send to the writeFile function.
function generateMarkdown(){
    readMeContent=`# ${sections[0].name} \n`;

    for(let i=1; i<sections.length; i++){
      readMeContent=readMeContent + `## ${sections[i].name} \n ${sections[i].content} \n`
    }

    writeToFile(readMeContent);

}





