import React, { Component } from 'react';

import { StyleSheet, Text, View, TouchableOpacity, TextInput } from 'react-native';

const time = {
  restingMinutes: '00',
  restingSeconds: '05',
  activeMinutes: '00',
  activeSeconds: '03'
}

export default class StopWatch extends Component {

  constructor(props) {
    super(props);

    this.state = {
      timer: null,
      minutes_Counter: null,
      seconds_Counter: null,
      startDisable: false,
      text: 'Add text here',
      period: 'Active'
    }

  }

  componentWillUnmount() {
    clearInterval(this.state.timer);
  }

  startRestPeriod = () => {
    console.log('Resting')

    this.setState({
      minutes_Counter: time.restingMinutes,
      seconds_Counter: time.restingSeconds,
      period: 'Resting'
    });

    let timer = setInterval(() => {

      var num = (Number(this.state.seconds_Counter) - 1).toString(),
        count = this.state.minutes_Counter;

      if (Number(this.state.seconds_Counter) == 0) {
        count = (Number(this.state.minutes_Counter) - 1).toString();
        num = '59';
      }

      this.setState({
        minutes_Counter: count.length == 1 ? '0' + count : count,
        seconds_Counter: num.length == 1 ? '0' + num : num
      });

      if (Number(this.state.seconds_Counter) == 0 && Number(this.state.minutes_Counter) == 0) {
        this.setState({startDisable : false})
        clearInterval(this.state.timer);
      }
    }, 1000);
    this.setState({ timer });

    this.setState({startDisable : true})

  }

  onButtonStart = () => {
    clearInterval(this.state.timer);
    this.setState({
      minutes_Counter: time.activeMinutes,
      seconds_Counter: time.activeSeconds,
      period: 'Active'
    });

    let timer = setInterval(() => {

      var num = (Number(this.state.seconds_Counter) - 1).toString(),
        count = this.state.minutes_Counter;

      if (Number(this.state.seconds_Counter) == 0) {
        count = (Number(this.state.minutes_Counter) - 1).toString();
        num = '59';
      }

      this.setState({
        minutes_Counter: count.length == 1 ? '0' + count : count,
        seconds_Counter: num.length == 1 ? '0' + num : num
      });

      if (Number(this.state.seconds_Counter) == 0 && Number(this.state.minutes_Counter) == 0) {
        clearInterval(this.state.timer);
        this.startRestPeriod()
      }
    }, 1000);
    this.setState({ timer });

    this.setState({startDisable : true})
  }

  onButtonStop = () => {
    clearInterval(this.state.timer);
    this.setState({startDisable : false})
  }


  onButtonClear = () => {
    this.setState({
      timer: null,
      minutes_Counter: '00',
      seconds_Counter: '00',
    });
  }

  render() {

    return (
      <View style={styles.MainContainer}>

        <Text style={styles.counterText}>{this.state.minutes_Counter} : {this.state.seconds_Counter}</Text>

        <Text style={{fontWeight: 'bold'}}>
          <Text style={{color: this.state.period == 'Active' ? 'green' : 'orange'}}>
            {this.state.period}
          </Text>
        </Text>

        <TextInput
          value={this.state.text}
          onChangeText={text => this.setState({ text })}
        />

        <TouchableOpacity
          onPress={this.onButtonStart}
          activeOpacity={0.6}
          style={[styles.button, { backgroundColor: this.state.startDisable ? '#B0BEC5' : '#FF6F00' }]} 
          disabled={this.state.startDisable} >

          <Text style={styles.buttonText}>START</Text>

        </TouchableOpacity>

        <TouchableOpacity
          onPress={this.onButtonStop}
          activeOpacity={0.6}
          style={[styles.button, { backgroundColor:  '#FF6F00'}]} >

          <Text style={styles.buttonText}>STOP</Text>

        </TouchableOpacity>

        <TouchableOpacity
          onPress={this.onButtonClear}
          activeOpacity={0.6}
          style={[styles.button, { backgroundColor: this.state.startDisable ? '#B0BEC5' : '#FF6F00' }]} 
          disabled={this.state.startDisable} >

          <Text style={styles.buttonText}> CLEAR </Text>

        </TouchableOpacity>

      </View>

    );
  }
}



const styles = StyleSheet.create({
  MainContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  button: {
    width: '80%',
    paddingTop:8,
    paddingBottom:8,
    borderRadius:7,
    marginTop: 10
  },
  buttonText:{
      color:'#fff',
      textAlign:'center',
      fontSize: 20
  },
  counterText:{

    fontSize: 28,
    color: '#000'
  }
});