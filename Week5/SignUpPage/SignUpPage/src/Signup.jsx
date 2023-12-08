function Signup(){
    
    // div element is used to group and structure html content 
    return <div>

        <center>
            <div style={{
                marginTop: 150,
                marginBottom: 10,
            }}>
                Welcome to cousera. Sign up below
            </div>
        </center>

        <center>

            <div style={{
                border: "2px solid black",
                width: 400,
            }}>

                Username - <input type="username" />
                <br />
                Password - <input type="password" />
                <br />
                <button>Sign up</button>
            </div>

        </center>
          
           
    </div>

}


export default Signup;