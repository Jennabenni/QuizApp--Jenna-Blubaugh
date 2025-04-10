import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import QuestionComponent from './questionComponent';
import SummaryComponent from './summaryComponent';





const Stack = createStackNavigator();


/*The answers are
red
ostrich, emu
tomato
false
red and yellow





*/

const questions = [
  {
    "prompt": "What color is a stop sign",
    "type": "multiple-choice",
    "choices": ["red", "orange", "green", "blue"],
    "correct": [0]
  },
  {
    "prompt": "Which of these can't fly",
    "type": "multiple-answer",
    "choices": ["ostrich", "canary", "emu", "blue jay"],
    "correct": [0, 2]
  },
  {
    "prompt": "Which of these is a fruit?",
    "type": "multiple-choice",
    "choices": ["corn", "carrot", "tomato", "squid"],
    "correct": [2]
  },
  {
    "prompt": "Pluto is a planet",
    "type": "true-false",
    "choices": ["True", "False"],
    "correct": [1]
  },
  {
  "prompt": "Which two colors make orange",
    "type": "multiple-answer",
    "choices": ["red", "white", "yellow", "black"],
    "correct": [0, 2]
  },
];

const App = () => {
  return (

    /*this here shows both screens, the question screen and the summary screen

    this also shows what params it takes
    while the data is here, the formatting for what is sent to summary and the correct and incorrect answers are passed between components


    */

    <NavigationContainer>
      <Stack.Navigator initialRouteName="Question">
        <Stack.Screen
          name="Question"
          component={QuestionComponent}
          initialParams={{ questions, currentQuestionIndex: 0, answers: [] }}
          options={{headerLeft: null,}}

        />
        <Stack.Screen
          name="Summary"
          component={SummaryComponent}
         options={{title: 'Quiz Summary',
         headerLeft: null,
         }}
        />
      </Stack.Navigator>
    </NavigationContainer>

  );
};

export default App;
