import * as ImagePicker from 'expo-image-picker';

export let openImagePickerAsync = async () => {
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert("Không được cấp quyền truy cập vào máy ảnh !");
      return;
    }
    let pickerResult = await ImagePicker.launchImageLibraryAsync();

    if(!pickerResult.cancelled){
      //console.log(pickerResult);
      return pickerResult;
    }
    else{
        return {uri:null};
    }
} 