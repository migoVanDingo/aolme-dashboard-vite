import { createGlobalStyle } from "styled-components"

export const light = {
    color: {
        color_1: "#f5f5f5",
        color_2: "#fafafa",
        color_3: "#e6e6e6",
        color_4: "#cccccc",
        color_5: "#b3b3b3",
        color_6: "white"
    },
    header:{
        backgroundColor: "#fafafa",
        boxShadow: "#dadada",
        buttonColor: "#bdbdbd",
        buttonColorHover:"#787878",
        height: "40px"
    },
    body:{
        backgroundColor:"#f0f0f0"
    },
    text:{
        color:"#242424"
    },
    spacing:{
        edges: "30px"
    },
    profile:{
        card:{
            width: "300px",
            height:"400px",
            border: "1px solid #bdbdbd",
            borderRadius: "12px"  
        }
    },
    accent:{
        color_1: "#21b57c",
        color_1_dim: "#15a36d",
        color_2: "#35beec",
        
    },
    container: {
        borderRadius:{
            sm:"4px",
            md: "8px",
            lg: "12px",
            xlg: "20px"
        }
    },
    button: {
        branch: {
            neutral: "#f0f0f0",
            hover: "#fafafa",
            active: "",
            border:"#787878",
            borderHover:"#787878"
        },
        text: {
            neutral:"#787878",
            hover:"",
            contrast: "#f5f5f5"
        }
    }, 
    input:{
        text:{
            height:{
                sm:"",
                md:"",
                lg:"",
            },
            width:{
                sm:"",
                md:"",
                lg:"",
            },
            padding:"",
            margin:""

        }
    }
}

export const dark = {
    color: {
        
        color_1: "#242424",
        color_2: "#262626",
        color_3: "#1a1a1a",
        color_4: "#0a0a0a",
        color_5: "#303030",
        color_6: "black",
        contrast: {
            color_1: "#adadad",
            color_2: "#bababa",
            color_3: "#c9c9c9"
        }
    },
    header:{
        backgroundColor: "#1a1a1a",
        boxShadow: "#0a0a0a",
        buttonColor: "#8a8a8a",
        buttonColorHover:"#e3e3e3",
        height: "40px"
    },
    body:{
        backgroundColor:"#2e2e2e"
    },
    text:{
        color:"#8a8a8a",
        colorHover: "#e3e3e3",
        contrast: "#e3e3e3",
        contrast2: "#c9c9c9"
    },
    spacing:{
        edges: "30px"
    },
    profile:{
        card:{
            width: "300px",
            height:"400px",
            border: "1px solid #8a8a8a",
            borderRadius: "12px" 
        }
    },
    accent:{
        color_1: "#21b57c",
        color_1_dim: "#15a36d",
        color_2: "#35beec",
    },
    container: {
        borderRadius:{
            sm:"4px",
            md: "8px",
            lg: "12px",
            xlg: "20px"
        }
    },
    button: {
        branch: {
            neutral: "#2e2e2e",
            hover: "#262626",
            active: "",
            border:"#8a8a8a",
            borderHover:"#e3e3e3",
        },
        text: {
            neutral:"#8a8a8a",
            hover:"#e3e3e3",
            contrast: "#e3e3e3"
        }
    }, 
    input:{
        text:{
            height:{
                sm:"",
                md:"",
                lg:"",
            },
            width:{
                sm:"",
                md:"",
                lg:"",
            },
            padding:"",
            margin:""

        }
    }
    

}

