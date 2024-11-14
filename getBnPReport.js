const msal = require("@azure/msal-node");

const mydataasync = function (odata_url){
  
    console.log("access request running..");
    let dataval = "";
    //config parameters..
    const msalconfig = {
      auth:{
        clientId:"7b5db71f-f402-45f4-b693-838a5f19b32b",
        authority:"https://login.microsoftonline.com/765bb9c7-c916-4c22-8206-591682876419",
        clientSecret:"ZKK8Q~4DLqRxKIqL4lv1Pf1lhXZCGZOJDBA1BbOZ",
        tenantId:"765bb9c7-c916-4c22-8206-591682876419",
        Audience: '7b5db71f-f402-45f4-b693-838a5f19b32b'
      }
    }
    //initialize the deamon
    const cca = new msal.ConfidentialClientApplication(msalconfig);
    const tokenRequest = {
      scopes:['https://tpi.api.crm6.dynamics.com/.default'],
    };
    cca.acquireTokenByClientCredential(tokenRequest).then((response)=>{
      //console.log(response);
      fetch(odata_url,{
        headers: {
          Authorization: 'Bearer '+response.accessToken,
          
        }
      }).then((data)=>{
        //data.json().then(dat=>console.log(dat))
        data.json().then((dat)=>{
            dataval = dat;
        });
      }).catch((err)=>{
        //res.send(err);
        console.log(err);
      })
      
    }).catch((err)=>{
      console.log(err);
    });

    
    return new Promise(resolve=>{
       setTimeout(function(){
            resolve(dataval);
        },2000);
       
    });
    
  
}


module.exports = mydataasync;




