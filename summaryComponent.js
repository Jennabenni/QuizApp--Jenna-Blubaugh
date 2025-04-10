import React from 'react';
import { View, Text } from 'react-native';
import { StyleSheet } from 'react-native';




const styles = StyleSheet.create({


  //the styles, of course
  //the font has to be small so the user doesn't have to scroll
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




//receives users answers and the quiz data (params)

//if it's empty, no data (online tutorial recommended)
const SummaryComponent = ({ route }) => {
  const { answers = [], questions = [] } = route.params || {};

  if (!answers.length || !questions.length) {
    return <Text>No quiz data available.</Text>;
  }

  //total, start at zero
  let totalScore = 0;

  //determines if the person is correct, checks their answer and whatnot
  //gets an "isCorrect" property
  const updatedAnswers = answers.map(answer => {
    const question = questions[answer.questionIndex];

    //multiple-answer or single-answer??
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


  //this is the format of the summary, and shows the bolds and cross outs
// I added other styles here too to try and make it look nicer
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


            <Text style={styles.answerStyle}>{answer.isCorrect ? "Correct" : "Incorrect"}
            </Text>
          </View>
        );
      })}
    </View>
    //the is correct or is incorrect shows at the bottom of the results
  );
};

export default SummaryComponent;