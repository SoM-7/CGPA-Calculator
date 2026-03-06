const MAX_CREDIT = 10
const MIN_CREDIT = 1

function generateSemesters(){

const container = document.getElementById("semesterContainer")
container.innerHTML=""

const semesterCount = parseInt(document.getElementById("semesterCount").value)

if(!semesterCount || semesterCount<1){

document.getElementById("warning").innerText="Enter valid semester number"
return

}

document.getElementById("warning").innerText=""

for(let i=1;i<=semesterCount;i++){

const semesterDiv=document.createElement("div")
semesterDiv.classList.add("semester-box")
semesterDiv.id="semester"+i

semesterDiv.innerHTML=`

<div class="semester-header">

<h2 class="semester-title">Semester ${i}</h2>

<button class="refresh-btn" onclick="refreshSemester(${i})">
<i class="fa-solid fa-arrows-rotate"></i> Refresh
</button>

</div>

<label>Number of Subjects</label>

<input type="number" min="1"
class="subject-input"
id="subjectCount${i}"
onchange="generateSubjects(${i})">

<div id="subjectsContainer${i}"></div>

<div class="sgpa-row">

<button onclick="calculateSGPA(${i})">
Calculate SGPA
</button>

<div class="sgpa-box" id="sgpaResult${i}"></div>

</div>

`

container.appendChild(semesterDiv)

}

}

function generateSubjects(semesterNo){

const container=document.getElementById("subjectsContainer"+semesterNo)
container.innerHTML=""

const subjectCount=parseInt(document.getElementById("subjectCount"+semesterNo).value)

if(!subjectCount || subjectCount<1){

alert("Enter valid subject count")
return

}

for(let j=1;j<=subjectCount;j++){

let creditOptions=`<option value="">Credit</option>`

for(let c=MIN_CREDIT;c<=MAX_CREDIT;c++){

creditOptions+=`<option value="${c}">${c}</option>`

}

const row=document.createElement("div")
row.classList.add("subject-row")

row.innerHTML=`

<label class="subject-label">Subject ${j}</label>

<select class="credit">
${creditOptions}
</select>

<select class="grade">

<option value="">Grade</option>
<option value="10">O (10)</option>
<option value="9">E (9)</option>
<option value="8">A (8)</option>
<option value="7">B (7)</option>
<option value="6">C (6)</option>
<option value="5">D (5)</option>
<option value="2">F (2)</option>

</select>

`

container.appendChild(row)

}

}

function calculateSGPA(semesterNo){

const semester=document.getElementById("semester"+semesterNo)

const credits=semester.getElementsByClassName("credit")
const grades=semester.getElementsByClassName("grade")

let totalCredits=0
let totalPoints=0

for(let i=0;i<credits.length;i++){

const credit=parseFloat(credits[i].value)
const grade=parseFloat(grades[i].value)

if(!isNaN(credit) && !isNaN(grade)){

totalCredits+=credit
totalPoints+=credit*grade

}

}

if(totalCredits===0){

alert("Enter subject data")
return

}

const sgpa=(totalPoints/totalCredits).toFixed(2)

document.getElementById("sgpaResult"+semesterNo).innerText="SGPA : "+sgpa

}

function calculateCGPA(){

const semesters=document.getElementsByClassName("semester-box")

let totalCredits=0
let totalPoints=0

for(let sem of semesters){

const credits=sem.getElementsByClassName("credit")
const grades=sem.getElementsByClassName("grade")

for(let i=0;i<credits.length;i++){

const credit=parseFloat(credits[i].value)
const grade=parseFloat(grades[i].value)

if(!isNaN(credit)&&!isNaN(grade)){

totalCredits+=credit
totalPoints+=credit*grade

}

}

}

if(totalCredits===0){

alert("Enter grades first")
return

}

const cgpa=(totalPoints/totalCredits).toFixed(2)

document.getElementById("cgpaResult").innerText="CGPA : "+cgpa

}

function refreshSemester(semesterNo){

document.getElementById("subjectCount"+semesterNo).value=""
document.getElementById("subjectsContainer"+semesterNo).innerHTML=""
document.getElementById("sgpaResult"+semesterNo).innerText=""

}

function refreshAll(){

document.getElementById("semesterCount").value=""
document.getElementById("semesterContainer").innerHTML=""
document.getElementById("cgpaResult").innerText=""
document.getElementById("warning").innerText=""

}
