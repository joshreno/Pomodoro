import React, { Component } from 'react';

import { StyleSheet, Text, View, TouchableOpacity, TextInput, Alert } from 'react-native';

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
      minutes_Counter: time.activeMinutes,
      seconds_Counter: time.activeSeconds,
      text: 'Add text here',
      period: 'Active',
      buttonText: 'Start'
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
        // TODO: API call here
        let data = new FormData();
        data.append('timestamp', Date.now());
        data.append('label', this.state.text);
        data.append('userid', 'Noobmaster69');

        let xhr = new XMLHttpRequest();
        xhr.open('POST', '10.128.0.4:8000/api/records', true);
        xhr.onload = function() {
          console.log(this.responseText);
        }
        xhr.send(data);
        clearInterval(this.state.timer);
        this.setState({
          period: 'Active',
          minutes_Counter: time.activeMinutes,
          seconds_Counter: time.activeSeconds,
          buttonText: 'Start'
        });
      }
    }, 1000);
    this.setState({ timer });
  }

  onButtonStart = () => {
    console.log('LOG')
    console.log(this.state.buttonText)
    console.log(this.state.minutes_Counter)
    console.log(this.state.seconds_Counter)
    console.log(this.state.period)
    console.log('    ')

    if (this.state.buttonText == 'Start') {
      this.setState({ buttonText: 'Stop'});
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
          if (this.state.period != "Resting") {

            Alert.alert(
              'Resting Time',
              "It's time to rest!",
              [{text: 'Start resting period', onPress: () => this.startRestPeriod()}]
              )

            // this.startRestPeriod()
          } else {
            this.setState({
              period: 'Active',
              minutes_Counter: time.activeMinutes,
              seconds_Counter: time.activeSeconds,
              buttonText: 'Start'
            });
          }
        }
      }, 1000);
      this.setState({ timer });
    } else {
      console.log('Clearning')
      clearInterval(this.state.timer);
      this.setState({ buttonText: 'Start'});
    }
  }

  onButtonClear = () => {
    clearInterval(this.state.timer);
    this.setState({
      timer: null,
      minutes_Counter: time.activeMinutes,
      seconds_Counter: time.activeSeconds,
      period: 'Active',
      buttonText: 'Start'
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
          style={[styles.button, { backgroundColor: '#FF6F00' }]}>

          <Text style={styles.buttonText}>{this.state.buttonText}</Text>

        </TouchableOpacity>

        <TouchableOpacity
          onPress={this.onButtonClear}
          activeOpacity={0.6}
          style={[styles.button, { backgroundColor: '#FF6F00' }]}>
 
          <Text style={styles.buttonText}>Clear</Text>
 
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