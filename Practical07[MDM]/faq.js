const questions = document.querySelectorAll(".faq-question");


questions.forEach(function (question) {

    question.addEventListener("click", function () {

        const answer = question.nextElementSibling;


        // Close other FAQ answers
        questions.forEach(function (otherQuestion) {

            if (otherQuestion !== question) {

                otherQuestion.classList.remove("active");

                otherQuestion.nextElementSibling.classList.remove("active");
            }

        });


        // Toggle selected answer
        question.classList.toggle("active");

        answer.classList.toggle("active");

    });

});