import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import { ButtonGroup } from 'react-native-elements';
import { StyleSheet } from 'react-native';






const styles = StyleSheet.create({

  questionHeader: {
    fontSize: '2em',
    textAlign: "center",
    backgroundColor: "#b0ffb8",
    fontFamily: "Georgia",
  },
  backgroundStyle:{
    backgroundColor: "#346b49",
    width: "700px",
    marginLeft: "auto",
    marginRight: "auto",
    border: "solid 4px black"
  },
  buttonStyle:{
    backgroundColor: "#c7ffdc",
    width: "700px",
    marginLeft: "auto",
    marginRight: "auto",
    textAlign: "center",
    padding: "10px"

  },
  buttonSelected: {
backgroundColor: "#38d975",
  },
  buttonText:{
color: "black"
  },
  textSelected:{
    color: "white"
  },

  })









const QuestionComponent = ({ route, navigation }) => {
  const { questions, currentQuestionIndex, answers } = route.params;
  const [selectedIndex, setSelectedIndex] = useState([]);

  const question = questions[currentQuestionIndex];

  const handleNextQuestion = () => {
    if (selectedIndex.length === 0) {
      alert('Please select at least one answer before proceeding.');
      return;
    }

    const updatedAnswers = [...answers];
    updatedAnswers.push({
      questionIndex: currentQuestionIndex,
      selectedAnswer: Array.isArray(selectedIndex) ? selectedIndex : [selectedIndex],
      correctAnswer: question.correct,
    });

    if (currentQuestionIndex + 1 < questions.length) {
      navigation.push('Question', {
        questions,
        currentQuestionIndex: currentQuestionIndex + 1,
        answers: updatedAnswers,
      });
    } else {
      navigation.navigate('Summary', {
        answers: updatedAnswers,
        questions,
      });
    }
  };

  const handleAnswerChange = (index) => {
    if (question.type === 'multiple-answer') {
      // Toggle selection for multiple-answer questions
      if (selectedIndex.includes(index)) {
        setSelectedIndex(selectedIndex.filter(i => i !== index));
      } else {
        setSelectedIndex([...selectedIndex, index]);
      }
    } else {
      // Single selection for single-answer questions
      setSelectedIndex([index]);
    }
  };

  return (
    <View style={styles.backgroundStyle}>
      <Text style={styles.questionHeader}>{question.prompt}</Text>
      <ButtonGroup
        buttons={question.choices}
        selectedIndexes={selectedIndex} // Use selectedIndexes for multiple selections
        onPress={handleAnswerChange}
        testID="choices"
        vertical
        buttonStyle={styles.buttonStyle}
        selectedButtonStyle={styles.buttonSelected}
        textStyle={styles.buttonText}
        selectedTextStyle={styles.textSelected}
      />
      <View>
      <Button
        title="Next Question"
        onPress={handleNextQuestion}
        testID="next-question"



      />
      </View>
    </View>
  );
};

export default QuestionComponent;