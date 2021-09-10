import React, { useState } from "react"
import {View,Text, StyleSheet, Dimensions, FlatList, TouchableOpacity, ScrollView, Button} from "react-native"

function Screen(){
    const key =[1,2,3,"+",4,5,6,"-",7,8,9,"*","clear","0","=","/"]
    const[firstNumber,setFirstNumber]=useState("");
    const[secondNumber,setSecondNumber]=useState("");
    const[operation,setOperation]=useState("");
    const[history,setHistory]=useState("");
    const[show,setShow]=useState(history);

    
    function ButtonPress(item){
        if(item=="clear"){
            setFirstNumber("");
            setHistory("");
            setSecondNumber("");
            setShow("");
            setOperation("");
            return;
        }
      
     if(Number.isInteger(item)){
         
            
            if(firstNumber=="" || operation==""){
                  console.log(item)
                let temp=firstNumber==""?item:firstNumber*10+item;
                setFirstNumber(temp);
            }
            else {
                 let temp=secondNumber==""?item:secondNumber*10+item;
                setSecondNumber(temp);
            }

     }
     else {
         if(firstNumber!="" && secondNumber!=""){
              setFirstNumber(getAnswer());
              if(item!="=")setOperation(item);
              setSecondNumber("");
         }
         else{
             if(item=="")return;
             setOperation(item);
         }
     }
    }
    function getAnswer(){
       let s="\n"+ firstNumber+""+operation+""+secondNumber+""
        let temp="\n"+ firstNumber+"\n"+operation+"\n"+secondNumber+""
       let all=show+temp+"\n-------------------";
       setShow(all);
       setHistory(s);
       
        switch(operation){
            case "-":
                return firstNumber-secondNumber;
            case "*":
                return firstNumber*secondNumber;
            case "/":
                return firstNumber/secondNumber;
            default:
                return firstNumber+secondNumber;
        }
    }

    return(
        <View style={styles.fullHeight}>
            <View  style={{backgroundColor:"white",maxHeight:Dimensions.get("window").height*1/7}}>
                <Button onPress={()=>setHistory(show)} title="history"></Button>
            </View>
            <ScrollView  
            
      style={{backgroundColor:"white",maxHeight:Dimensions.get("window").height*2/7}}>
            {/* <Text>
                Hello
            </Text> */}
            <Text style={{textAlign:"right",fontSize:25,color:"grey",marginRight:"5%"}}>
                {history}
            </Text>

      
            </ScrollView>
          <View style={{backgroundColor:"white",maxHeight:Dimensions.get("window").height*0.5/7}}>
              <Text style={{textAlign:"right",fontSize:30,fontWeight:"bold",marginBottom:2,marginRight:6}}>
                    <Text>{firstNumber}</Text>
            <Text>{operation}</Text>
            <Text>{secondNumber}</Text>
              </Text>
              </View>
            <View style={styles.keyPad}>
            <FlatList data={key} numColumns="4"  style={styles.keys}    renderItem={({item})=>
               <TouchableOpacity onPress={()=>ButtonPress(item)} style={[styles.singleKey,Number.isInteger(item)==false&& {backgroundColor:"black"}]}>
 <Text style={{color:Number.isInteger(item)?"black":"white",fontSize:25}}>
                    {item}
                </Text>
               </TouchableOpacity>
               
              
           }/>
            </View>
  

        </View>
    )
}
const styles = StyleSheet.create({
    fullHeight:{
        flex: 1,

        width: "100%",
        height:Dimensions.get("window").height,
        backgroundColor:"green"
    },
    keyPad:{
        // flex:1,
        // flexDirection:'row'

    },
    keys:{
        
    
        backgroundColor:"white",
        width: "100%",
        height:Dimensions.get("window").height*5/7,
    
        


    },
    singleKey:{
       
    
        height:5/7*Dimensions.get("window").height/4,
        // fontSize:30,

        width:"25%",
        alignItems:"center",
        alignContent:"center",
        justifyContent:"center",
        textAlign:"center",
        alignSelf:"center",
        textAlignVertical:"center",
        borderWidth:1,
        borderColor:"lightgrey",
        // marginTop:"3%"
        backgroundColor:"whitesmoke"
        
    
        
        

    }
})
export default Screen;
