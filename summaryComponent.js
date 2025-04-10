import React from 'react';
import { View, Text } from 'react-native';
import { StyleSheet } from 'react-native';




const styles = StyleSheet.create({

summaryStyle:{
fontSize: "1.1em",
textAlign: "center",
backgroundColor: "#d6ffa1",
padding: "10px",
width: "500px",
border: "solid 2px black",
borderRadius: "25px",
marginLeft: "auto",
marginRight: "auto"


},
answerStyle:{
fontSize: "14px",
marginLeft: "auto",
marginRight: "auto",


},
backgroundSummary:{
  backgroundColor: "#f1fade",
},
summaryTitle:{
marginLeft: "auto",
marginRight: "auto",
fontSize: "2em"
}





})










const SummaryComponent = ({ route }) => {
  const { answers = [], questions = [] } = route.params || {};

  if (!answers.length || !questions.length) {
    return <Text>No quiz data available.</Text>;
  }

  // Calculate total score
  let totalScore = 0;

  const updatedAnswers = answers.map(answer => {
    const question = questions[answer.questionIndex];

    // Check if the question is multiple-answer or single-answer
    const isCorrect = Array.isArray(question.correct)
      ? Array.isArray(answer.selectedAnswer) &&
        question.correct.length === answer.selectedAnswer.length &&
        question.correct.every(correctIndex => answer.selectedAnswer.includes(correctIndex))
      : question.correct === answer.selectedAnswer;

    if (isCorrect) {
      totalScore += 1;
    }

    return {
      ...answer,
      isCorrect,
    };
  });

  return (
    <View style={styles.backgroundSummary}>
      <Text testID="total" style={styles.summaryTitle}>Total Score: {totalScore}</Text>

      {updatedAnswers.map((answer, index) => {
        const question = questions[answer.questionIndex];

        return (
          <View key={index}>
            <Text style={styles.summaryStyle}>{question.prompt}</Text>

            {question.choices.map((choice, idx) => {
              let style = {

fontSize: "14px",
marginLeft: "auto",
marginRight: "auto"
              };
              let choiceText = choice;

              if (Array.isArray(question.correct)) {
                if (question.correct.includes(idx) && Array.isArray(answer.selectedAnswer) && answer.selectedAnswer.includes(idx)) {
                  style = { fontWeight: 'bold' ,
fontSize: "14px",
marginLeft: "auto",
marginRight: "auto"



                  }; // Correct choice selected by user
                } else if (Array.isArray(answer.selectedAnswer) && answer.selectedAnswer.includes(idx)) {
                  style = { textDecorationLine: 'line-through' ,




fontSize: "14px",
marginLeft: "auto",
marginRight: "auto"



                  }; // Incorrect choice selected by user
                }
                if (question.correct.includes(idx)) {
                  style = { ...style, fontWeight: 'bold',




fontSize: "14px",
marginLeft: "auto",
marginRight: "auto"



                   };
                }
              } else {
                if (idx === question.correct && idx === answer.selectedAnswer) {
                  style = { fontWeight: 'bold',

fontSize: "14px",
marginLeft: "auto",
marginRight: "auto"




                   }; // Correct answer selected by user
                } else if (idx === answer.selectedAnswer) {
                  style = { textDecorationLine: 'line-through',


fontSize: "14px",
marginLeft: "auto",
marginRight: "auto"




                   }; // Incorrect answer selected by user
                }
              }

              return (
                <Text key={idx} style={style} >
                  {choiceText}

                </Text>
              );
            })}

            <Text style={styles.answerStyle}>{answer.isCorrect ? "Correct" : "Incorrect"}</Text>
          </View>
        );
      })}
    </View>
  );
};

export default SummaryComponent;