const gradeForm = document.getElementById("gradeForm");

const errorMessage = document.getElementById("errorMessage");

const resultCard = document.getElementById("result");

const totalDisplay = document.getElementById("total");
const percentageDisplay = document.getElementById("percentage");
const gradeDisplay = document.getElementById("grade");
const statusDisplay = document.getElementById("status");


gradeForm.addEventListener("submit", function (event) {

    // Prevent page reload
    event.preventDefault();

    errorMessage.textContent = "";


    // Get input values
    const marks = [
        document.getElementById("mml").value,
        document.getElementById("dsa").value,
        document.getElementById("oops").value,
        document.getElementById("python").value,
        document.getElementById("ic").value
    ];


    // Convert strings into numbers
    const parsedMarks = marks.map(function (mark) {
        return parseFloat(mark);
    });


    // Validation
    for (let i = 0; i < parsedMarks.length; i++) {

        if (
            marks[i].trim() === "" ||
            isNaN(parsedMarks[i]) ||
            parsedMarks[i] < 0 ||
            parsedMarks[i] > 100
        ) {

            errorMessage.textContent =
                "Please enter valid marks between 0 and 100 for every subject.";

            resultCard.classList.remove("show");

            return;
        }
    }


    // Calculate total
    const total =
        parsedMarks[0] +
        parsedMarks[1] +
        parsedMarks[2] +
        parsedMarks[3] +
        parsedMarks[4];


    // Calculate percentage
    const percentage = (total / 500) * 100;


    // Grade calculation
    let grade;

    if (percentage >= 90) {
        grade = "A+";
    }
    else if (percentage >= 80) {
        grade = "A";
    }
    else if (percentage >= 70) {
        grade = "B";
    }
    else if (percentage >= 60) {
        grade = "C";
    }
    else if (percentage >= 50) {
        grade = "D";
    }
    else if (percentage >= 40) {
        grade = "E";
    }
    else {
        grade = "F";
    }


    // Pass / Fail
    const status = percentage >= 40
        ? "PASS ✓"
        : "FAIL";


    // Display results
    totalDisplay.textContent = `${total.toFixed(2)} / 500`;

    percentageDisplay.textContent =
        `${percentage.toFixed(2)}%`;

    gradeDisplay.textContent = grade;

    statusDisplay.textContent = status;


    // Show result
    resultCard.classList.remove("show");

    // Restart animation
    void resultCard.offsetWidth;

    resultCard.classList.add("show");

});