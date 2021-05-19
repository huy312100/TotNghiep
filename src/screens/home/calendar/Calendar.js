import React, {Component} from 'react';
import {Alert, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { Agenda } from 'react-native-calendars';

const testIDs = require('./testIDs');

import {LocaleConfig} from 'react-native-calendars';

LocaleConfig.locales['vn'] = {
  monthNames: ['Tháng 1','Tháng 2','Tháng 3','Tháng 4','Tháng 5','Tháng 6','Tháng 7','Tháng 8','Tháng 9','Tháng 10','Tháng 11','Tháng 12'],
  monthNamesShort: ['Thg 1','Thg 2','Thg 3','Thg 4','Thg 5','Thg 6','Thg 7.','Thg 8','Thg 9','Thg 10','Thg 11','Thg 12'],
  dayNames: ['Chủ nhật','Thứ 2','Thứ 3','Thứ 4','Thứ 5','Thứ 6','Thứ 7'],
  dayNamesShort: ['CN','T2','T3','T4','T5','T6','T7'],
  today: 'Hôm nay'
};
LocaleConfig.defaultLocale = 'vn';


export default class CalendarScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      items: {}
    };
  };

  getCurrentDate = () =>{
    var today = new Date(); 
    var day= today.getDate();
    var year= today.getFullYear();
    var month= today.getMonth() + 1;
    if(month < 10 && day > 10){
      let date =year+'-'+'0'+month+'-'+day;
      return date;
    }
    else if(month < 10 && day < 10){
      let date = year+'-'+'0'+month+'-'+'0'+day;
      return date;
    }
    else if(month > 10 && day < 10){
      let date = year+'-'+month+'-'+'0'+day;
      return date;
    }
    else{
      let date =year+'-'+month+'-'+day;
      return date;
    }
   
  }

  render() {
    return (
      <Agenda
        testID={testIDs.agenda.CONTAINER}
        items={this.state.items}
        loadItemsForMonth={this.loadItems.bind(this)}
        selected={this.getCurrentDate()}
        renderItem={this.renderItem.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
        minDate={'2021-05-01'}
  // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
        maxDate={'2021-05-30'}
        pastScrollRange={50}
      />
    );
  }

  loadItems(day) {
    setTimeout(() => {
      for (let i = -15; i < 85; i++) {
        const time = day.timestamp + i * 24 * 60 * 60 * 1000;
        const strTime = this.timeToString(time);
        if (!this.state.items[strTime]) {
          this.state.items[strTime] = [];
          const numItems = Math.floor(Math.random() * 3 + 1);
          for (let j = 0; j < numItems; j++) {
            this.state.items[strTime].push({
              name: 'Item for ' + strTime + ' #' + j,
              height: Math.max(50, Math.floor(Math.random() * 150))
            });
          }
        }
      }
      const newItems = {};
      Object.keys(this.state.items).forEach(key => {
        newItems[key] = this.state.items[key];
      });
      this.setState({
        items: newItems
      });
    }, 1000);
  }

  renderItem(item) {
    return (
      <TouchableOpacity
        testID={testIDs.agenda.ITEM}
        style={[styles.item, {height: item.height}]}
        onPress={() => Alert.alert(item.name)}
      >
        <Text>{item.name}</Text>
      </TouchableOpacity>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}>
        <Text>This is empty date!</Text>
      </View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'white',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex: 1,
    paddingTop: 30
  }
});