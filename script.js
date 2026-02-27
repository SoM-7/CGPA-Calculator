function generateSemesters() {

    const container = document.getElementById("semesterContainer");
    container.innerHTML = "";

    const semesterCount = parseInt(document.getElementById("semesterCount").value);

    if (isNaN(semesterCount) || semesterCount <= 0) return;

    for (let i = 1; i <= semesterCount; i++) {

        const semesterDiv = document.createElement("div");
        semesterDiv.classList.add("semester-box");
        semesterDiv.setAttribute("id", "semester" + i);

        semesterDiv.innerHTML = `
            <h2>Semester ${i}</h2>

            <label>Number of Subjects:</label>
            <input type="number" min="1" id="subjectCount${i}" 
                onchange="generateSubjects(${i})"
                placeholder="Enter subjects">

            <button class="refresh-btn" onclick="refreshSemester(${i})">
                Refresh Semester
            </button>

            <div id="subjectsContainer${i}"></div>

            <button onclick="calculateSGPA(${i})">Calculate SGPA</button>
            <div class="sgpa-text" id="sgpaResult${i}"></div>
        `;

        container.appendChild(semesterDiv);
    }
}

function generateSubjects(semesterNo) {

    const subjectContainer = document.getElementById("subjectsContainer" + semesterNo);
    subjectContainer.innerHTML = "";

    const subjectCount = parseInt(document.getElementById("subjectCount" + semesterNo).value);

    if (isNaN(subjectCount) || subjectCount <= 0) return;

    for (let j = 1; j <= subjectCount; j++) {

        let creditOptions = `<option value="">Credit</option>`;
        for (let c = 1; c <= 10; c++) {
            creditOptions += `<option value="${c}">${c}</option>`;
        }

        const subjectRow = document.createElement("div");
        subjectRow.classList.add("subject-row");

        subjectRow.innerHTML = `
            <label>Subject ${j}</label>

            <select class="credit">
                ${creditOptions}
            </select>

            <select class="grade">
                <option value="">Select Grade</option>
                <option value="10">O (10)</option>
                <option value="9">E (9)</option>
                <option value="8">A (8)</option>
                <option value="7">B (7)</option>
                <option value="6">C (6)</option>
                <option value="5">D (5)</option>
                <option value="2">F (2)</option>
            </select>
        `;

        subjectContainer.appendChild(subjectRow);
    }
}

function calculateSGPA(semesterNo) {

    const semester = document.getElementById("semester" + semesterNo);

    const credits = semester.getElementsByClassName("credit");
    const grades = semester.getElementsByClassName("grade");

    let totalCredits = 0;
    let totalPoints = 0;

    for (let i = 0; i < credits.length; i++) {

        const credit = parseFloat(credits[i].value);
        const grade = parseFloat(grades[i].value);

        if (!isNaN(credit) && !isNaN(grade)) {
            totalCredits += credit;
            totalPoints += credit * grade;
        }
    }

    if (totalCredits === 0) {
        document.getElementById("sgpaResult" + semesterNo).innerText = "";
        return;
    }

    const sgpa = (totalPoints / totalCredits).toFixed(2);

    document.getElementById("sgpaResult" + semesterNo).innerText =
        "SGPA: " + sgpa;
}

function calculateCGPA() {

    const semesters = document.getElementsByClassName("semester-box");

    let totalCredits = 0;
    let totalPoints = 0;

    for (let sem of semesters) {

        const credits = sem.getElementsByClassName("credit");
        const grades = sem.getElementsByClassName("grade");

        for (let i = 0; i < credits.length; i++) {

            const credit = parseFloat(credits[i].value);
            const grade = parseFloat(grades[i].value);

            if (!isNaN(credit) && !isNaN(grade)) {
                totalCredits += credit;
                totalPoints += credit * grade;
            }
        }
    }

    if (totalCredits === 0) {
        document.getElementById("cgpaResult").innerText = "";
        return;
    }

    const cgpa = (totalPoints / totalCredits).toFixed(2);

    document.getElementById("cgpaResult").innerText = "CGPA: " + cgpa;
}

function refreshSemester(semesterNo) {
    document.getElementById("subjectCount" + semesterNo).value = "";
    document.getElementById("subjectsContainer" + semesterNo).innerHTML = "";
    document.getElementById("sgpaResult" + semesterNo).innerText = "";
}

function refreshAll() {
    document.getElementById("semesterCount").value = "";
    document.getElementById("semesterContainer").innerHTML = "";
    document.getElementById("cgpaResult").innerText = "";
}
