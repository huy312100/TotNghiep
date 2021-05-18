import React,{ useState,useEffect} from "react";
import { View, Text, ScrollView, StyleSheet,TouchableOpacity,TouchableWithoutFeedback,Keyboard,ImageBackground } from "react-native";
import{Input,Icon} from "react-native-elements";
import * as ImagePicker from 'expo-image-picker';
import RNPickerSelect from "react-native-picker-select";
import { useDispatch, useSelector  } from "react-redux";

import * as universityActions from "../../../store/actions/University";
import * as profileActions from "../../../store/actions/Profile";

import RoundedImage from "../../components/profile/main/RoundedImage";


function ChangeProfileScreen({navigation}) {
  const token = useSelector((state) => state.authen.token);
  const dispatch = useDispatch();

  const uniName = useSelector((state) => state.university.universityInfo);
  const profile=useSelector((state) => state.profile.profile);

  const [fullname,setFullname] = useState(profile[0].HoTen);
  const [idUni,setIdUni] = useState(profile[0].MaTruong);
  const [idFaculty,setIdFaculty] = useState(profile[0].MaKhoa);  
  const [image, setImage] = useState('');


  const [itemNameUniversity,setItemNameUniversity] = useState([]);
  const [itemFacultyName,setItemFacultyName] = useState([]);


  useEffect(() => {
    const getAllUniNames = () => {
      dispatch(universityActions.getAllInfoUniversity());
      //console.log(uniName);   
        
      const temp=[];
      for (const key in uniName) {
        temp.push({
          label: uniName[key].name,
          value: uniName[key].id,
        });
      }
      removeUniDuplicateName(temp);
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

  const removeUniDuplicateName = (arr) =>{
    for(const item in arr){
      if(arr[item].value === profile[0].MaTruong){
        arr.splice(item,1);
        return;
      }
    }
  };

  const removeFaculDuplicateName = (arr) =>{
    for(const item in arr){
      if(arr[item].value === profile[0].MaKhoa){
        arr.splice(item,1);
        return;
      }
    }
  };


  const getAllFacultyName = (idUni) => {
    let details = {
      MaTruong: idUni,
    };

    let formBody = [];

    for (let property in details) {
      let encodedKey = encodeURIComponent(property);
      let encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    fetch("https://hcmusemu.herokuapp.com/faculty/getname", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: formBody,
      }).then((response) => {
          const statusCode = response.status;
          const dataRes = response.json();
          return Promise.all([statusCode, dataRes]);
      }).then(([statusCode, dataRes])=>{
        //console.log(dataRes);
        const temp=[];

        for (const key in dataRes) {
          temp.push({
            label: dataRes[key].TenKhoa,
            value: dataRes[key].MaKhoa,
          });
        }

        removeFaculDuplicateName(temp);

        console.log(temp);
        setItemFacultyName(temp);

      }).done();
  };

  const editProfile = async() =>{
    let details = {
      HoTen: fullname,
      MaTruong: idUni,
      MaKhoa:idFaculty,   
    };

    let formBody = [];

    for (let property in details) {
      let encodedKey = encodeURIComponent(property);
      let encodedValue = encodeURIComponent(details[property]);
      formBody.push(encodedKey + "=" + encodedValue);
    }
    formBody = formBody.join("&");

    await fetch("https://hcmusemu.herokuapp.com/profile/edit", {
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
        console.log(dataRes);
        if(statusCode === 200){
          dispatch(profileActions.editProfile());
          getProfile();
          navigation.navigate("Profile");
        }
      }).done();

  }

  const getProfile = async() =>{
    //console.log(token);
    var myHeaders = new Headers();
    myHeaders.append("Authorization", `bearer ${token}`);

    var requestOptions = {
    method: 'GET',
    headers: myHeaders,
    redirect: 'follow'
    };

    await fetch("https://hcmusemu.herokuapp.com/profile/view",requestOptions)
      .then((response) => response.json())
      .then((json) => {
        //console.log(json);

        //console.log(dataUniversity);
        dispatch(profileActions.getProfile(json));
      }).catch((err) => console.log(err, "error"));
  }


  const checkInfo = () => {
    if(fullname === profile[0].HoTen && idUni=== profile[0].MaTruong && idFaculty===profile[0].MaKhoa){
      return false;
    }
    return true;
  }

  return (
    <TouchableWithoutFeedback onPress={() =>{
      Keyboard.dismiss();
    }}>

      <ScrollView style={styles.container}>

        <View style={styles.infoView}>
          <TouchableOpacity onPress={openImagePickerAsync}>
            <RoundedImage
              source={{uri: image !=="" ? image :undefined}}>
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
          <Input
            onChangeText={(fullname)=>setFullname(fullname)}
          >{profile[0].HoTen}</Input>

          <View style={styles.emailLabel}>
            <Text style={styles.labelText}>Email</Text>
            <Text style={{marginLeft:10,color:'red'}}>(Không thể thay đổi)</Text>
          </View>
          <Input disabled={true}>{profile[0].Email}</Input>
        
        <Text style={styles.labelText}>Chọn trường</Text>
          <RNPickerSelect
              style={pickerSelectStyles}
              onValueChange={(value) => {
                getAllFacultyName(value);
                setIdUni(value);

              }}
              placeholder={{
                label:profile[0].TenTruongDH,
                value:profile[0].MaTruong
              }}
              useNativeAndroidPickerStyle={false}
              items={itemNameUniversity}/>

        <Text style={styles.labelText}>Chọn khoa</Text>
          <RNPickerSelect
              style={pickerSelectStyles}
              onValueChange={(value) => {
                if(value!=null){
                  setIdFaculty(value);
                }
              }}
              placeholder={{
                label:profile[0].TenKhoa,
                value:profile[0].MaKhoa,
              }}
              useNativeAndroidPickerStyle={false}
              items={itemFacultyName}/>
        
       { checkInfo() ? <TouchableOpacity
                //disabled={true}
                style={[styles.button,{backgroundColor:'green'}]}
                onPress={() => {editProfile()}}>
                <Text style={styles.textBtnConnect}>Chỉnh sửa</Text>
        </TouchableOpacity>
        : 
        <TouchableOpacity
                disabled={true}
                style={[styles.button,{backgroundColor:'grey'}]}
                onPress={() => {editProfile()}}>
                <Text style={styles.textBtnConnect}>Chỉnh sửa</Text>
        </TouchableOpacity>}
      </ScrollView>
    </TouchableWithoutFeedback>

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
  emailLabel:{
    flexDirection:'row',
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

  button:{
    //backgroundColor: "green",
    margin:40,
    borderRadius:20,
    padding:10
  },
  
  textBtnConnect: {
    color: "white",
    fontSize: 15,
    textAlign: "center",
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
