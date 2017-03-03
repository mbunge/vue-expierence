// state management

const dataStore = {
    questions: [
        {
            id: 'q_1',
            title: 'Bier um halb vier',
            active: true,
            choices: [
                {
                    id: 'choice_1',
                    title: 'Jup, lass laufen',
                    count: 42
                },
                {
                    id: 'choice_2',
                    title: 'Nee, muss noch wech',
                    count: 0
                },
                {
                    id: 'choice_3',
                    title: 'Ich weiß nicht, treffe nachher noch ein Mädel :/ <- Pussy',
                    count: 0
                }
            ]
        },
        {
            id: 'q_2',
            title: 'Bier um vier',
            active: true,
            choices: [
                {
                    id: 'choice_1',
                    title: 'Jup, lass laufen',
                    count: 42
                },
                {
                    id: 'choice_2',
                    title: 'Nee, muss noch wech',
                    count: 0
                },
                {
                    id: 'choice_3',
                    title: 'Ich weiß nicht, treffe nachher noch ein Mädel :/ <- Pussy',
                    count: 0
                }
            ]
        },
        {
            id: 'q_3',
            title: 'Bier für immer',
            active: false,
            choices: [
                {
                    id: 'choice_1',
                    title: 'Jup, lass laufen',
                    count: 42
                },
                {
                    id: 'choice_2',
                    title: 'Nee, muss noch wech',
                    count: 0
                },
                {
                    id: 'choice_3',
                    title: 'Ich weiß nicht, treffe nachher noch ein Mädel :/ <- Pussy',
                    count: 0
                }
            ]
        }

    ]
};

const store = new Vuex.Store({
    state: dataStore,
    getters: {
        /**
         * Returns active questions
         *
         * @param state
         * @returns {Array.<T>}
         */
        activeQuestions: state => {
            return state.questions.filter(question => question.active);
        }
    },
    mutations: {
        vote(state, choiceId, questionId){

        }
    },
    actions: {
        vote(context, choiceId, questionId){
            console.log('Persist data');
            context.commit('vote', choiceId, questionId)
        }
    }
});

// components

// local component
// use v-bind:{prop name in child}="{varname of parent}
// for propagate data from parent to child
const votes = {
    template: '<div><div v-for="question in questions">' +
    '<h2>{{ question.title }}</h2>' +
    '<choices v-bind:question="question"></choices>' +
    '</div></div>',
    computed: {
        questions() {
            console.log(this.$store);
            return this.$store.getters.activeQuestions
        }
    }
};

Vue.component('votes', votes);

const choices = {
    template: '<div><p>Votes: {{voteCount}}</p><ul v-for="choice in question.choices">' +
    '<choice v-bind:choice="choice" v-bind:question="question"></choice>' +
    '</ul></div>',
    props: [
        'question'
    ],
    computed: {
        voteCount(){
            console.log(this.question);
            let count = 0;


            this.question.choices.forEach(choice => count = count + choice.count);

            return count;
        }
    }
};

Vue.component('choices', choices);

const choice = {
    template: '<li>{{ choice.title }} <span>{{ choice.count }}</span><button v-on:click="vote(choice)">Vote</button></li>',
    props: [
        'choice',
        'question'
    ],
    methods: {
        vote(choice, event){
            choice.count++;
        }
    }
};

Vue.component('choice', choice);

//entry point may something like boot or start

const app = new Vue({
    el: '#app',
    store,
    data: {
        local: {},
        shared: store.state
    }
});

