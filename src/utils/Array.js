export const removeDuplicateName = (arr,str) =>{
    for(const item in arr){
        if(arr[item].value === str){
        arr.splice(item,1);
        return;
        }
    }
};

export const reverseArr = (arr) => {
    return arr.reverse();
}