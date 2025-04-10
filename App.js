import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet } from 'react-native';
import QuestionComponent from './questionComponent';
import SummaryComponent from './summaryComponent';










const Stack = createStackNavigator();

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
