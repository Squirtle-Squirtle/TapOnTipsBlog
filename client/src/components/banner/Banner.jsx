import { Typography, Box, styled } from "@mui/material"

const image = {
    background: "url(https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg) center/55% repeat-x #000",
    width: "100%",
    height: "50vh",
    display: "flex",           
    alignItems: "center",       
    justifyContent: "center", 
    flexDirection: "column"     
};

const Heading=styled(Typography)`
    font-size: 70px;
    color: #FFFFFF;
    line-height:1
`
const SubHeading=styled(Typography)`
    font-size: 20px;
    background: #FFF;
    // color: #FFFFFF;
    // line-height:1
`

const Banner = () => {
    return (
        <Box sx={image}>
            <Heading>
                Blog
            </Heading>
            <SubHeading>
                Code For Interview
            </SubHeading>

        </Box>
    )
}

export default Banner