
import _ from 'lodash';
import XDate from 'xdate';
import React, {useState,useEffect} from 'react';
import {Platform, StyleSheet, View, Text, TouchableOpacity, Button,Alert} from 'react-native';
import {ExpandableCalendar, Timeline, CalendarProvider,LocaleConfig} from 'react-native-calendars';
import {sameDate} from './dateutils';

import {useDispatch,useSelector} from 'react-redux';
import * as calendarActions from '../../../../store/actions/Calendar';

LocaleConfig.locales['vn'] = {
  monthNames: ['Tháng 1','Tháng 2','Tháng 3','Tháng 4','Tháng 5','Tháng 6','Tháng 7','Tháng 8','Tháng 9','Tháng 10','Tháng 11','Tháng 12'],
  monthNamesShort: ['Thg 1','Thg 2','Thg 3','Thg 4','Thg 5','Thg 6','Thg 7.','Thg 8','Thg 9','Thg 10','Thg 11','Thg 12'],
  dayNames: ['Chủ nhật','Thứ 2','Thứ 3','Thứ 4','Thứ 5','Thứ 6','Thứ 7'],
  dayNamesShort: ['CN','T2','T3','T4','T5','T6','T7'],
  today: 'Hôm nay'
};
LocaleConfig.defaultLocale = 'vn';

const EVENTS = [
  {
    start: '2021-05-20 00:30:00',
    end: '2021-05-20 23:59:00',
    title: 'Dr. Mariana Joseph',
    summary: '3412 Piedmont Rd NE, GA 3032',
    color: '#e6add8'
  },
  {
    start: '2021-05-21 00:00:00',
    end: '2021-05-21 12:30:00',
    title: 'Dr. Mariana Joseph',
    summary: '3412 Piedmont Rd NE, GA 3032',
    color: '#e6add8'
  },
  {
    start: '2021-05-20 00:30:00',
    end: '2021-05-20 12:30:00',
    title: 'Visit Grand Mother',
    summary: 'Visit Grand Mother and bring some fruits.',
    color: '#ade6d8'
  },
  {
    start: '2021-05-20 00:30:00',
    end: '2021-05-20 12:30:00',
    title: 'Dr. Mariana Joseph',
    summary: '3412 Piedmont Rd NE, GA 3032',
    color: '#e6add8'
  },
  {
    start: '2021-05-20 00:30:00',
    end: '2021-05-20 12:30:00',
    title: 'Tea Time with Dr. Hasan',
    summary: 'Tea Time with Dr. Hasan, Talk about Project'
  },
  {
    start: '2021-05-20 00:30:00',
    end: '2021-05-20 12:30:00',
    title: 'Dr. Mariana Joseph',
    summary: '3412 Piedmont Rd NE, GA 3032'
  },
  {
    start: '2017-09-07 14:30:00',
    end: '2017-09-07 16:30:00',
    title: 'Meeting Some Friends in ARMED',
    summary: 'Arsalan, Hasnaat, Talha, Waleed, Bilal',
    color: '#d8ade6'
  },
  {
    start: '2017-09-08 01:40:00',
    end: '2017-09-08 02:25:00',
    title: 'Meet Sir Khurram Iqbal',
    summary: 'Computer Science Dept. Comsats Islamabad',
    color: '#e6bcad'
  },
  {
    start: '2017-09-08 04:10:00',
    end: '2017-09-08 04:40:00',
    title: 'Tea Time with Colleagues',
    summary: 'WeRplay'
  },
  {
    start: '2017-09-08 00:45:00',
    end: '2017-09-08 01:45:00',
    title: 'Lets Play Apex Legends',
    summary: 'with Boys at Work'
  },
  {
    start: '2017-09-08 11:30:00',
    end: '2017-09-08 12:30:00',
    title: 'Dr. Mariana Joseph',
    summary: '3412 Piedmont Rd NE, GA 3032'
  },
  {
    start: '2017-09-10 12:10:00',
    end: '2017-09-10 13:45:00',
    title: 'Merge Request to React Native Calendards',
    summary: 'Merge Timeline Calendar to React Native Calendars'
  }
];

const CalendarScreen =()=> {

  const getCurrenDay = ()=>{
    var today = new Date(); 
    var day= today.getDate();
    return day;
  };

  const getCurrentMonth =()=> {
    var today = new Date();
    var month = today.getMonth() + 1;
    return month; 
  };

  const getCurrentYear = () => {
    var today = new Date(); 
    var year= today.getFullYear();
    return year;
  }
  
  const getCurrentDate = () =>{
    var day= getCurrenDay();
    var year= getCurrentYear();
    let month= getCurrentMonth();
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
  };

  const token = useSelector((state) => state.authen.token);

  const [currentDate,setCurrentDate] = useState(getCurrentDate());
  const [monthChanged,setMonthChanged] = useState(getCurrentMonth());
  const [yearChanged,setYearChanged] = useState(getCurrentYear());

  const dispatch = useDispatch();

  useEffect(() => {
        //console.log(token);
        let details = {
            year: yearChanged,
            month: monthChanged,
          };
      
          let formBody = [];
      
          for (let property in details) {
            let encodedKey = encodeURIComponent(property);
            let encodedValue = encodeURIComponent(details[property]);
            formBody.push(encodedKey + "=" + encodedValue);
          }
          formBody = formBody.join("&");

          fetch("https://hcmusemu.herokuapp.com/calendar/getthismonth", {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
              "Authorization": `bearer ${token}`
            },
            body: formBody,
        }).then((response) => {
            const statusCode = response.status;
            const dataRes = response.json();
            return Promise.all([statusCode, dataRes]);
        }).then(([statusCode, dataRes])=>{
            console.log(dataRes,statusCode); 
            dispatch(calendarActions.getCalendarOfMonth(dataRes));
        }).catch(error => console.log('error', error));
  },[]);


  const onDateChanged = (date) => {
    // console.warn('ExpandableCalendarScreen onDateChanged: ', date, updateSource);
    // fetch and set data for date + week ahead
    console.log(date);
    setCurrentDate(date);
  };

  const onMonthChange = (/* month, updateSource */) => {
    // console.warn('ExpandableCalendarScreen onMonthChange: ', month, updateSource);
  };


  const renderEmptyItem = () => {
    return (
      <View style={styles.emptyItem}>
        <Text style={styles.emptyItemText}>No Events Planned</Text>
      </View>
    );
  }

  const renderItem = ({item}) => {
    if (_.isEmpty(item)) {
      return this.renderEmptyItem();
    }

    return (
      <TouchableOpacity style={styles.item}>
        <View>
          <Text style={styles.itemHourText}>{item.hour}</Text>
          <Text style={styles.itemDurationText}>{item.duration}</Text>
        </View>
        <Text style={styles.itemTitleText}>{item.title}</Text>
        <View style={styles.itemButtonContainer}>
          <Button title={'Info'} />
        </View>
      </TouchableOpacity>
    );
  };

  const getTheme = () => {
    const themeColor = '#0059ff';
    const lightThemeColor = '#e6efff';
    const disabledColor = '#a6acb1';
    const black = '#20303c';
    const white = '#ffffff';

    return {
      // arrows
      arrowColor: black,
      arrowStyle: {padding: 0},
      // month
      monthTextColor: black,
      textMonthFontSize: 16,
      textMonthFontFamily: 'HelveticaNeue',
      textMonthFontWeight: 'bold',
      // day names
      textSectionTitleColor: black,
      textDayHeaderFontSize: 12,
      textDayHeaderFontFamily: 'HelveticaNeue',
      textDayHeaderFontWeight: 'normal',
      // today
      todayBackgroundColor: lightThemeColor,
      todayTextColor: themeColor,
      // dates
      dayTextColor: themeColor,
      textDayFontSize: 18,
      textDayFontFamily: 'HelveticaNeue',
      textDayFontWeight: '500',
      textDayStyle: {marginTop: Platform.OS === 'android' ? 2 : 4},
      // selected date
      selectedDayBackgroundColor: themeColor,
      selectedDayTextColor: white,
      // disabled date
      textDisabledColor: disabledColor,
      // dot (marked date)
      dotColor: themeColor,
      selectedDotColor: white,
      disabledDotColor: disabledColor,
      dotStyle: {marginTop: -2}
    };
  };


    return (
      
      <CalendarProvider
// date={ITEMS[0].title}
        date={currentDate}
        onDateChanged={(date)=>onDateChanged(date)}
        onMonthChange={(month)=>onMonthChange(month)}
        theme={{todayButtonTextColor: 'blue'}}
        showTodayButton
        disabledOpacity={0.6}
        // todayBottomMargin={16}
      >
  
        <ExpandableCalendar
          // horizontal={false}
          // hideArrows
          // disablePan
           //hideKnob
           //initialPosition={ExpandableCalendar.positions.OPEN}
          firstDay={1}
          // markedDates={this.getMarkedDates()} // {'2019-06-01': {marked: true}, '2019-06-02': {marked: true}, '2019-06-03': {marked: true}};
          // markedDates={() => {}} // {'2019-06-01': {marked: true}, '2019-06-02': {marked: true}, '2019-06-03': {marked: true}};
          theme={getTheme()}
          // leftArrowImageSource={require('../img/previous.png')}
          // rightArrowImageSource={require('../img/next.png')}
          // calendarStyle={styles.calendar}
          // headerStyle={styles.calendar} // for horizontal only
          // disableWeekScroll
        />
        <Timeline
          format24h={true}
          eventTapped={e => Alert.alert(e.title)}
          events={EVENTS.filter(event => sameDate(XDate(event.start), XDate(currentDate)))}
          // scrollToFirst={true}
          // start={0}
          // end={24}
        />

      
      </CalendarProvider>
     

      
    );
  }

const styles = StyleSheet.create({
  calendar: {
    paddingLeft: 20,
    paddingRight: 20
  },
  section: {
    backgroundColor: '#f0f4f7',
    color: '#79838a'
  },
  item: {
    padding: 20,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#e8ecf0',
    flexDirection: 'row'
  },
  itemHourText: {
    color: 'black'
  },
  itemDurationText: {
    color: 'grey',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4
  },
  itemTitleText: {
    color: 'black',
    marginLeft: 16,
    fontWeight: 'bold',
    fontSize: 16
  },
  itemButtonContainer: {
    flex: 1,
    alignItems: 'flex-end'
  },
  emptyItem: {
    paddingLeft: 20,
    height: 52,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e8ecf0'
  },
  emptyItemText: {
    color: '#79838a',
    fontSize: 14
  }
});

export default CalendarScreen;