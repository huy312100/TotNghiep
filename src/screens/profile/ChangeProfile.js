import React,{ useState,useEffect} from "react";
import { View, Text, ScrollView, StyleSheet,TouchableOpacity,ImageBackground } from "react-native";
import{Input,Icon} from "react-native-elements";
import * as ImagePicker from 'expo-image-picker';
import RNPickerSelect from "react-native-picker-select";
import { useDispatch, useSelector  } from "react-redux";

import * as universityActions from "../../../store/actions/University";

import RoundedImage from "../../components/profile/main/RoundedImage";



function ChangeProfileScreen() {
  const [image, setImage] = useState('');
  const [itemNameUniversity,setItemNameUniversity] = useState([]);

  const dispatch = useDispatch();

  const uniName = useSelector((state) => state.university.universityInfo);

  useEffect(() => {
    const getAllUniNames = () => {
      dispatch(universityActions.getAllInfoUniversity());
      console.log(uniName);   
        
      const temp=[];
      for (const key in uniName) {
        temp.push({
          label: uniName[key].name,
          value: uniName[key].id,
        });
      }
      console.log(temp);
      setItemNameUniversity(temp);
    };
    getAllUniNames();
  },[])

  let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let pickerResult = await ImagePicker.launchImageLibraryAsync();

    if(!pickerResult.cancelled){
      setImage(pickerResult.uri);
      console.log(pickerResult);
    }
    
  }
  return (
    <ScrollView style={styles.container}>

      <View style={styles.infoView}>
        <TouchableOpacity onPress={openImagePickerAsync}>
          <RoundedImage
            source={{uri: image !=="" ? image :undefined}}
          >
            <View
              style={styles.backgroundOpacity}>
                <Icon name="camera-plus" 
                type="material-community"  
                size={35}
                color="#fff"
                style={styles.iconCamera} />
            </View>
          </RoundedImage>
        </TouchableOpacity>
      </View>
      
        <Text style={styles.labelText}>Họ và tên</Text>
        <Input/>

        <Text style={styles.labelText}>Email</Text>
        <Input/>
      
      <Text style={styles.labelText}>Chọn trường</Text>
        <RNPickerSelect
            style={pickerSelectStyles}
            onValueChange={(value) => console.log(value)}
            useNativeAndroidPickerStyle={false}
            items={itemNameUniversity}/>

      <Text style={styles.labelText}>Chọn khoa</Text>
        <RNPickerSelect
            style={pickerSelectStyles}
            onValueChange={(value) => console.log(value)}
            useNativeAndroidPickerStyle={false}
            items={[
                { label: 'Football', value: 'football' },
                { label: 'Baseball', value: 'baseball' },
                { label: 'Hockey', value: 'hockey' },
            ]}/>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginLeft:15,
    marginRight: 15,
  },

  infoView: {
    alignItems: "center",
    paddingBottom:20
  }, 
  labelText: {
    paddingLeft:10,
    fontWeight: "bold",
  },
  inputText: {
    paddingLeft:15,
    paddingRight:15
  },

  backgroundOpacity:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  iconCamera:{
    opacity: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  },

});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    marginVertical:15,
    marginHorizontal:8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.8,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    marginVertical:15,
    marginHorizontal:5,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.8,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});

export default ChangeProfileScreen;
