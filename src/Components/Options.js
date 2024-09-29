import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { MessageSquareWarning, Phone, PhoneCall, UserRound, Users } from 'lucide-react-native'

const Options = ({styleMain,styleInner}) => {
  return (
    <View style={[styles.container,styleMain]}>
        <View style={[styleInner,styles.Box]}>
            <View style={styles.content}>
                <Users size={20} color={'#000'} />
                <Text style={styles.text}>Members</Text>
            </View>
            <View style={styles.line}></View>
            <View style={styles.content}>
                <Phone size={20} color={'#000'} />
                <Text style={styles.text}>Share Number</Text>
            </View>
            <View style={styles.line}></View>

            <View style={styles.content}>
                <MessageSquareWarning size={20} color={'#000'} />
                <Text style={styles.text}>Report</Text>
            </View>
        </View>
      
    </View>
  )
}

export default Options

const styles = StyleSheet.create({
    container:{
        backgroundColor:'#fff',
        // borderRadius:20,
        borderRadius:5,

        elevation:5,
    },
    Box:{
        flexDirection:'column',
         borderRadius:5,
         
         gap:10,
        // alignItems:'center'
    },
    line:{
        width:'100%',
        height:0.5,
        backgroundColor:'gray',
    },
    content:{
        flexDirection:'row',
        alignItems:'center',
        gap:10,
        paddingHorizontal:20,
        paddingVertical:10,

    },
    text:{
        color:'#000'
    }
})