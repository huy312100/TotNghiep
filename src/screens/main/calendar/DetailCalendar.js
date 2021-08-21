import React,{useState,useEffect,useRef} from 'react';
import { View,Text,FlatList,StyleSheet,TouchableOpacity,Linking,ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';

import { Entypo,AntDesign } from '@expo/vector-icons';

import * as dateUtils from '../../../utils/Date';


const DetailCalendarScreen = ({ navigation }) => {
  const token = useSelector((state) => state.authen.token);
  const unmounted = useRef(false);

  const [data, setData] = useState([]);
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [year, setYear] = useState(new Date().getFullYear());
  const [isLoading, setIsLoading] = useState(true);

  const currentTimestamp = new Date().getTime();

  useEffect(() => {
    getAllDeadlineInMonth();
    return () => {
      unmounted.current = true;
    };
  }, [month, year]);

  const getAllDeadlineInMonth = async () => {
    setIsLoading(true);
    let details = {
      month: month,
      year: year,
    };

    let formBody = [];

    for (let property in details) {
      let encodedKey = encodeURIComponent(property);
      let encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    console.log(formBody);

    await fetch("https://hcmusemu.herokuapp.com/deadlinemoodle/month/parent", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `bearer ${token}`,
      },
      body: formBody,
    })
      .then((response) => {
        const statusCode = response.status;
        const dataRes = response.json();
        return Promise.all([statusCode, dataRes]);
      })
      .then(([statusCode, dataRes]) => {
        if (statusCode === 200) {
          console.log(dataRes);
          setData(dataRes);
        }
        setIsLoading(false);
        //tmp.concat(json)
      })
      .catch((err) => console.log(err, "error"));
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => {
        Linking.openURL(item.url);
      }}
    >
      <View style={styles.info}>
        <View>
          <Text style={styles.title}>{item.nameCourese}</Text>
          <Text style={[styles.title, { fontWeight: "normal", marginTop: 10 }]}>
            {item.decription}
          </Text>
        </View>

        <Entypo
          style={styles.onTheRight}
          name="chevron-thin-right"
          size={20}
          color="silver"
        />
      </View>

      <View tyle={[styles.info, { marginBottom: 20 }]}>
        <Text style={[styles.date,{color: currentTimestamp > item.duedate * 1000 ? "silver" :"red"}]}>
          Hạn chót: {dateUtils.ConvertTimestampToVNTime(item.duedate)}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>

      <View
        style={{
          flexDirection: "row",
          paddingVertical: 15,
          justifyContent: "center",
          alignItems: "center",
          borderBottomColor: "#222222",
          borderBottomWidth: 0.5,
          backgroundColor: "#f2f2f2",
        }}
      >
        <TouchableOpacity
          onPress={() => {
            const changed = dateUtils.PreviousMonth(month, year);
            setMonth(changed[0]);
            setYear(changed[1]);
            setData([]);
          }}
        >
          <AntDesign name="arrowleft" size={18} color="#006666" />
        </TouchableOpacity>

        <TouchableOpacity>
          <Text style={{ marginHorizontal: 70, fontSize: 15, color: "#006666" }}>
            Tháng {month} , {year}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => {
            const changed = dateUtils.NextMonth(month, year);
            setMonth(changed[0]);
            setYear(changed[1]);
            setData([]);
          }}
        >
          <AntDesign name="arrowright" size={18} color="#006666" />
        </TouchableOpacity>
      </View>

      {isLoading && data.length === 0 && <View style={{flex:1,justifyContent: 'center',alignItems: 'center'}}>
          <ActivityIndicator size="large" color="orange"/>
      </View>}

      {!isLoading && data.length === 0 && (
        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={{ color: "#BBBBBB" }}>
            Không có sự kiện nào trong tháng này
          </Text>
        </View>
      )}

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  card: {
    borderRadius: 20,
    backgroundColor: "white",
    paddingBottom: 10,
    marginHorizontal: 15,
    marginTop: 15,
    borderWidth: 1,
    borderColor: "#dddddd",
  },

  onTheRight: {
    position: "absolute",
    right: 5,
  },

  title: {
    fontWeight: "bold",
    marginRight: 30,
    marginLeft: 15,
  },

  info: {
    justifyContent: "center",
    marginVertical: 10,
  },

  date: {
    marginRight: 30,
    marginLeft: 15,
    fontSize: 12,
  },
});

export default DetailCalendarScreen;
