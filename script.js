let start_conteiner = document.querySelector('.start') 
let main_conteiner = document.querySelector('.main') 
let question_field = document.querySelector('.question')
let answer_butt = document.querySelectorAll('.answer')
let start_btn = document.querySelector('.start-btn')
let container_h3 = document.querySelector('.h3')

function randint(min, max){
    return Math.round(Math.random() * (max - min) + min)
}

let signs = ['+','-','*','/']

function getRandomSigns(){
    return signs[randint(0,3)]
}

function shuffle(array){
    let ci = array.length, randomIndex;

    while(ci != 0){
        randomIndex = Math.floor(Math.random() * ci);
        ci --;
        [array[ci], array[randomIndex]] = 
        [array[randomIndex], array[ci]];
    }
    return array;
}

class Question{
    constructor(){
        let a = randint(1, 30)
        let b = randint(1, 30)
        let sign = getRandomSigns()
        this.question = `${a} ${sign} ${b}`
        if(sign == '+'){ this.correct = a+b}
        else if(sign == '-'){ this.correct = a-b}
        else if(sign == '*'){ this.correct = a*b}
        else if(sign == '/'){ this.correct = Number((a / b).toFixed(2))}
        this.answers = [
           randint(this.correct - 15, this.correct + 1),
           randint(this.correct - 15, this.correct + 1),
           this.correct,
           randint(this.correct - 15, this.correct + 15),
           randint(this.correct - 15, this.correct + 15),
        ]
        shuffle(this.answers)
    }

    display(){
        question_field.innerHTML = this.question

        for(let i = 0; i < this.answers.length; i += 1){
            answer_butt[i].innerHTML = this.answers[i]
        }
    }
}

let total_answer_given = 0
let correct_answer_given = 0
let current_q

start_btn.addEventListener('click', function(){
    main_conteiner.style.display='flex'
    start_conteiner.style.display='none'
    current_q = new Question()
    current_q.display()

    correct_answer_given = 0
    total_answer_given = 0

    setTimeout(function(){
        main_conteiner.style.display='none'
        start_conteiner.style.display='flex'
        container_h3.innerHTML=`<h3>Ви дали ${correct_answer_given} 
        правильних відповідей із ${total_answer_given}. 
        Точність - ${Math.round(correct_answer_given * 100 / total_answer_given)}
        %.</h3>` 
    }, 5000)
})



for (let i = 0; i < answer_butt.length; i+=1){
    answer_butt[i].addEventListener('click', function(){
        if(answer_butt[i].innerHTML == current_q.correct){
            correct_answer_given+=1
            answer_butt[i].classList.add('correct')
            setTimeout(() => {
                answer_butt[i].classList.remove('correct')
            }, 300)

        }
        else{
            answer_butt[i].classList.add('incorrect')
            setTimeout(() => {
                answer_butt[i].classList.remove('incorrect')
            }, 300)
            
        }


        total_answer_given += 1
        current_q = new Question()
        current_q.display()
    })
}


