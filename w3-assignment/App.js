import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Card } from 'react-native-paper';
import Title from './components/Title.js';

const CHOICES = [
  {
    name: 'rock',
    uri: 'http://pngimg.com/uploads/stone/stone_PNG13622.png',
  },
  {
    name: 'paper',
    uri: 'https://www.stickpng.com/assets/images/5887c26cbc2fc2ef3a186046.png',
  },
  {
    name: 'scissors',
    uri:
      'http://pluspng.com/img-png/png-hairdressing-scissors-beauty-salon-scissors-clipart-4704.png',
  },
];
const Button = props => (
  <TouchableOpacity
    style={styles.buttonStyle}
    onPress={() => props.onPress(props.name)}>
    <Text style={styles.buttonText}>
      {props.name.charAt(0).toUpperCase() + props.name.slice(1)}
    </Text>
  </TouchableOpacity>
);
const ChoiceCard = ({ player, choice: { name, uri } }) => {
  const title = name && name.charAt(0).toUpperCase() + name.slice(1);
  return (
    <View style={styles.choiceContainer}>
      <Text style={styles.playerName}> {player} </Text>
      <Image source={uri} resizeMode="contain" style={styles.choiceImage} />
      <Text>{title}</Text>
    </View>
  );
};
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'Choose your weapon!',
      computerChoice: CHOICES[0],
      playerChoice: CHOICES[0],
    };
  }

  onPress = userChoice => {
    const [result, compChoice] = this.getRoundOutcome(userChoice);
    const newUserChoice = CHOICES.find(choice => choice.name === userChoice);
    const newComputerChoice = CHOICES.find(
      choice => choice.name === compChoice
    );
    this.setState({
      title: result,
      playerChoice: newUserChoice,
      computerChoice: newComputerChoice,
    });
  };
  getRoundOutcome = userChoice => {
    const computerChoice = this.randomComputerChoice().name;
    let result;

    if (userChoice === 'rock') {
      result = computerChoice === 'scissors' ? 'Victory!' : 'Defeat!';
    }
    if (userChoice === 'paper') {
      result = computerChoice === 'rock' ? 'Victory!' : 'Defeat!';
    }
    if (userChoice === 'scissors') {
      result = computerChoice === 'paper' ? 'Victory!' : 'Defeat!';
    }

    if (userChoice === computerChoice) result = 'Tie game!';
    return [result, computerChoice];
  };
  randomComputerChoice = () => {
    return CHOICES[Math.floor(Math.random() * CHOICES.length)];
  };
  getResultColor = () => {
    if (this.state.title === 'Victory!') return 'green';
    if (this.state.title === 'Defeat!') return 'red';
    return null;
  };
  render() {
    return (
      <View style={styles.container}>
        <Text
          style={{
            fontSize: 20,
            color: this.getResultColor,
            textAlign: 'center',
          }}>
          <Title title={this.state.title} />
        </Text>
        <Card style={styles.cardContainer}>
          <ChoiceCard player="You:" choice={this.state.playerChoice} />
          <Text style={{ color: 'red', fontSize: 25, textAlign: 'center' }}>
            vs
          </Text>
          <ChoiceCard player="Computer:" choice={this.state.computerChoice} />
        </Card>
        <View>
          {CHOICES.map(choice => {
            return (
              <Button
                key={choice.name}
                name={choice.name}
                onPress={this.onPress}
              />
            );
          })}
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  cardContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    padding: '10px',
    marginTop: '10px',
    marginBottom: '10px',
    width: '100%',
  },
  choiceContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    textAlign: 'center',
    width: '100%',
    margin: '10px'
  },
  choiceImage: {
    width: '100px',
    height: '100px',
  },
  buttonStyle: {
    backgroundColor: '#212733',
    marginTop: '5px',
    marginBottom: '5px',
    padding: '5px',
    textAlign: 'center',
    borderRadius: '4px',
  },
  buttonText: {
    color: 'white',
  },
  playerName: {
    fontWeight: 'bold',
  },
});
