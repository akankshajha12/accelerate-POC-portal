import React from 'react';
import { 
    Button, Snackbar, Grid,
    Card, Avatar, CardActionArea, Typography,
} from '@material-ui/core';

import log from '../../utils/logger.service'
import {Link} from 'react-router-dom';
import { store } from '../../store';
import './ProviderProfile.css';
import MailIcon from '@material-ui/icons/Mail';
import SmartphoneIcon from '@material-ui/icons/Smartphone';
import HomeIcon from '@material-ui/icons/Home';
import WorkIcon from '@material-ui/icons/Work';
import FiberManualRecordIcon from '@material-ui/icons/FiberManualRecord';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import CreateOutlinedIcon from '@material-ui/icons/CreateOutlined';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from "@material-ui/core/styles";
import CreditCardOutlinedIcon from '@material-ui/icons/CreditCardOutlined';

import Sharefunctionality from '../Home/Sharefunctionality';



import HeaderContainer from '../../containers/headerContainer';
import Background from '../../assets/img/newbg.jpg';


var share_link={}


const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      padding: '2px 5px 2px 5px',
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #dadde9',
    },
  }))(Tooltip);


export default class ProviderProfile extends React.Component {

    constructor(props){
        super();
        this.state = {
            providerData:[],
            cityData:[],
            city:''
        }   
    }
    
    
    componentDidMount() {
       let demo= window.location.search;
       let  myParam = demo.split("=");
       let Id = myParam[1];
       var pcity = '';
        fetch('/api/provider/'+Id, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then(res=> {
                if(res.status === 200) {
                    return res.json().then(res=> {
                        this.setState({
                            providerData:res,
                            city:res.City
                        }) 
                        this.CitySelect()
                        pcity = this.state.providerData.City
                        console.log("Pcityy==",pcity)

                    })
                } 
            }).catch(err=> {
               console.log(err);
            })


           
             
            }

            CitySelect = () => {
                fetch('/api/provider/city/'+this.state.city, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(res=> {
                    console.log("response is=======", res)
                    if(res.status === 200) {
                        return res.json().then(res=> {
                            this.setState({
                                cityData:res
                                
                            })           
    
                        })
                    } 
                }).catch(err=> {
                   console.log(err);
                })
    
                //console.log("ityyyyyy data is ---", this.state.cityData)
             
            }  
               
                
    
        

        
        

            
          
    

    
    render() {
    
            return(

               

                <div style={{width: '100%', marginTop: '100px'}}>


                <HeaderContainer />


                <div class="profile_container">
                    

                    <div class="left_profile_container ">

                    <div class="box_shadow" style={{paddingBottom: '20px'}}>
                        <div style={{width: '100%', height: '120px', backgroundImage: `url(${Background})`, backgroundSize: '100% 100%'}}>

                            <span style={{display: 'none'}}>{share_link=`/provider/profile?id=${this.state.providerData.partnerId}`}</span>

                            <Link style={{float: 'right', marginRight:'15px',color: '#fff' ,fontSize: '20px'}} ><Sharefunctionality  brand={share_link} style={{fontSize: '20px'}}/></Link>
                            
                        </div>

                        <div style={{width: '96%', marginLeft: '2%', textAlign: 'left', marginTop:'-60px'}}>

                            <img src ={this.state.providerData.providerIdentityImg} class="rounded_image"></img>
                            <br/>
                            {this.state.providerData.approved == true ? 
                                    (
                                        <CheckCircleIcon style={{ backgroundColor: '#fff',color: '#0077b3', fontSize: '18px',border: '1px solid #fff', borderRadius: '50%', marginLeft: '50px', marginTop:'-25px'}}/>
                                    )
                                    :
                                    (
                                        ""
                                    )
                            }
                            
                            <br/>
                            <Typography color="text" variant="button" style={{fontSize: '16px'}}>
                                {this.state.providerData.fullName }&nbsp;||&nbsp;
                                {this.state.providerData.partnerId }&nbsp;
                            </Typography>

                            
                            <br/>

                            <Typography color="text" variant="caption" style={{fontSize: '13px'}}>
                                <WorkIcon style={{fontSize: '12px', color: '#666666'}}/>&nbsp;
                                {this.state.providerData.OrganizationName },&nbsp;
                                {this.state.providerData.OrganizationAddress },&nbsp;
                                {this.state.providerData.City } <br/>
                                <CreditCardOutlinedIcon style={{fontSize: '12px', color: '#666666'}}/>&nbsp;
                                Fees : {this.state.providerData.Fees }
                            </Typography>

                            <Typography  color="text" variant="caption" style={{float: 'right'}}>
                                Joined on &nbsp;
                                {
                                this.state.providerData.createdOn!=undefined?
                                (
                                    this.state.providerData.createdOn.substr(0,4)
                                )
                                :
                                (
                                    ""
                                )
                                }
                            </Typography>

                        </div>
                    </div>



                    <div class="bottom_container box_shadow">
                    <div style={{width: '96%', marginLeft: '2%', textAlign: 'left'}}>

                        <Typography color="text" variant="body" style={{fontSize: '18px'}}>
                            Contact Info
                            <DescriptionOutlinedIcon style={{float: 'right',fontSize: '17px', color: '#006699'}}/>
                        </Typography>
                        <br/>

                        <Typography color="text" variant="caption" style={{fontSize: '13px'}}>
                            <MailIcon style={{fontSize: '12px', color: '#666666'}}/>&nbsp;{this.state.providerData.email } <br/>
                            <SmartphoneIcon style={{fontSize: '12px', color: '#666666'}}/>&nbsp;{this.state.providerData.mobileNumber } <br/>
                            <HomeIcon style={{fontSize: '14px', color: '#666666'}}/>&nbsp;{this.state.providerData.City },&nbsp;
                            {this.state.providerData.country }, &nbsp;
                            {this.state.providerData.ALineOne }, &nbsp;
                            {this.state.providerData.ALineTwo }, &nbsp;
                            Pin Code - {this.state.providerData.PinCode }
                        </Typography>

                        </div>
                    </div>


                </div>





                    <div class="right_profile_container box_shadow">
                        <div style={{width: '94%', marginLeft: '3%', textAlign: 'left'}}>

                            <Typography color="text" variant="body" style={{fontSize: '18px'}}>
                                Work Info
                                <DescriptionOutlinedIcon style={{float: 'right',fontSize: '17px', color: '#006699'}}/>
                            </Typography>

                            <div style={{width: '100%', padding: '5%', backgroundColor: 'rgba(236, 242, 249,0.7)', marginTop: '10px'}}>
                                <Typography color="Primary" variant="caption">Organisation Info</Typography><br/>
                               
                                <Typography color="text" variant="caption">
                                    <FiberManualRecordIcon style={{fontSize: '8px', color: '#666666'}}/>&nbsp;
                                    Co. Type {this.state.providerData.idType} <br/> 
                                    <FiberManualRecordIcon style={{fontSize: '8px', color: '#666666'}}/>&nbsp;
                                    GST No. {this.state.providerData.OrganizationRegNumber} &nbsp; 
                                </Typography>
                            </div>


                            <div style={{width: '100%', padding: '5%', backgroundColor: 'rgba(236, 242, 249,0.7)', marginTop: '10px'}}>
                                <Typography color="Primary" variant="caption">Services</Typography><br/>
                                {this.state.providerData.servicesOffered!=undefined  && this.state.providerData.servicesOffered.map((expertise)=> {                 
                                    return (
                                    <span>
                                        <Typography color="text" variant="caption">
                                            {expertise.name}&nbsp;
                                        </Typography>    
                                    </span>
                                    
                                )})                               
                                }
                            </div>

                            <div style={{width: '100%', padding: '5%', backgroundColor: 'rgba(236, 242, 249,0.7)', marginTop: '5px'}}>
                                <Typography color="Primary" variant="caption">Expertise</Typography><br/>
                                
                                {this.state.providerData.partnerType!=undefined ?
                                (
                                    this.state.providerData.partnerType.length > 1  ? 
                                    (
                                    <HtmlTooltip
                                    placement="top-start"
                                    title={
                                    <React.Fragment>
                                            
                                        {this.state.providerData.partnerType!=undefined && this.state.providerData.partnerType.map((expertise)=>{
                                            return(
                                                <span>{expertise.name},&nbsp;</span>
                                            )
                                        })
                                        }
                                           
                                        </React.Fragment>
                                        }
                                    >
                                        <Link underlineNone style={{color: '#0077b3', textDecoration: 'none'}}>
                                            &nbsp; &  more
                                        </Link>
                                    </HtmlTooltip>
                                    )
                                    :
                                    (
                                    ""
                                    )
                                )
                                :
                                (
                                ""
                                )

                              }
                            </div>


                        </div>
                    </div>

                </div> 

                








                <div class="similar_container box_shadow">
                    hello
                    {console.log('hey rani ka ho !', this.state.cityData)}

                    {
                        (this.state.cityData && this.state.cityData.length)? this.state.cityData.map((item,idx)=>{
                            return (
                                <div>
                                    {item.fullName}
                                
                                 </div>

                            )
                            
                        }): <span> No nearby providers found.</span>
                    }


                </div> 
                <br/><br/>

            



            </div>       
               
            )
    }
}

