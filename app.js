const express = require("express");
const bodyParser = require("body-parser");
const app = express();

var userInputs = [];
//keeps checkedInputs so that when added a new task can reload.
var checkedInputs = []; 


app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.set('view engine', 'ejs');

app.get("/", (req,res) => { 

  let today = new Date();
  let options = {
    weekday: 'long',
    day: 'numeric',
    month: "long"
  };

  let date = today.toLocaleDateString("en-US", options);
 
  
  res.render("list", {kindOfDay: date, newListItem: userInputs});

})
// time to add a simple array to even store checked tasks , so that when a new task is added , the previously checked tasks are checked and do not fade when reloaded


app.post("/", (req,res) => { 
   let userInput = req.body.newItem ; 
   userInputs.push(userInput);
   console.log("User added: " + userInput);
  res.redirect("/");
})



app.listen(3000, () => { 
  console.log("The server is up and running at port 3000"); 
})