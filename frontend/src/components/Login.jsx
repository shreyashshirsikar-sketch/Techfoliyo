import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {

const navigate = useNavigate();

const [formData,setFormData]=useState({
email:"",
password:"",
rememberMe:false
})

const handleChange=(e)=>{
const {name,value,type,checked}=e.target
setFormData({...formData,[name]:type==="checkbox"?checked:value})
}

const handleSubmit=(e)=>{
e.preventDefault()
console.log(formData)
}

return(
<>

<style>{`

*{
margin:0;
padding:0;
box-sizing:border-box;
font-family: 'Inter', sans-serif;
}

@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

.page{
display:flex;
height:100vh;
}

/* LEFT SIDE - Blue gradient colors */
.left{
width:50%;
background:linear-gradient(135deg,#2F6FE4,#5B8FF9);
color:white;
padding:60px 80px;
display:flex;
flex-direction:column;
justify-content:space-between;
}

.logo{
font-size:20px;
font-weight:600;
font-family: 'Plus Jakarta Sans', sans-serif;
}

.hero{
margin-top:40px;
}

.hero h1{
font-size:54px;
line-height:1.05;
font-weight:800;
margin-bottom:24px;
font-family: 'Plus Jakarta Sans', sans-serif;
}

.hero p{
font-size:18px;
line-height:1.6;
opacity:.95;
max-width:460px;
font-family: 'Inter', sans-serif;
}

/* Illustration */

.illustration{
margin-top:55px;
width:460px;
padding:28px;
border-radius:24px;
background:rgba(255,255,255,0.15);
backdrop-filter:blur(10px);
border:1px solid rgba(255,255,255,.3);
}

.profile{
display:flex;
gap:14px;
align-items:center;
margin-bottom:20px;
}

.avatar{
width:48px;
height:48px;
border-radius:50%;
background:rgba(255,255,255,0.25);
border:2px solid white;
display:flex;
align-items:center;
justify-content:center;
font-size:24px;
}

/* User icon set to black */
.avatar .user-icon{
font-size:28px;
color: #000000;
font-weight:normal;
line-height:1;
}

.bar{
height:8px;
background:white;
opacity:.7;
border-radius:5px;
margin:6px 0;
}

.rowCards{
display:flex;
gap:20px;
margin-top:18px;
}

.smallCard{
flex:1;
height:85px;
border-radius:16px;
background:rgba(255,255,255,.25);
}

.footer{
font-size:13px;
opacity:.8;
}


/* RIGHT SIDE */

.right{
width:50%;
background:white;
display:flex;
align-items:center;
justify-content:center;
}

/* LOGIN CARD */

.card{
width:460px;
background:white;
}

/* BADGE - Same blue as left side */
.badge{
display:inline-block;
padding:0;
background:transparent;
color: #2F6FE4;
font-size:14px;
font-weight:600;
letter-spacing:0.5px;
margin-bottom:12px;
text-transform:uppercase;
font-family: 'Inter', sans-serif;
}

/* TITLE */

.card h2{
font-size:32px;
font-weight:700;
color: #0A0A0A;
margin-bottom:8px;
font-family: 'Plus Jakarta Sans', sans-serif;
letter-spacing:-0.02em;
}

/* SUBTITLE */

.subtitle{
color:#6B7280;
font-size:14px;
margin-bottom:32px;
font-family: 'Inter', sans-serif;
}

/* LABEL */

label{
font-size:14px;
font-weight:500;
color: #0A0A0A;
margin-bottom:6px;
display:block;
font-family: 'Inter', sans-serif;
}

/* INPUT */

.inputBox{
margin-bottom:20px;
}

input{
width:100%;
padding:12px 14px;
border-radius:0px;
border:1px solid #E5E7EB;
background:white;
font-size:14px;
outline:none;
transition: all 0.2s ease;
font-family: 'Inter', sans-serif;
}

input:focus{
border-color: #2F6FE4;
box-shadow: 0 0 0 4px rgba(47, 111, 228, 0.1);
}

input::placeholder{
color:#9CA3AF;
font-size:14px;
}

/* REMEMBER ME & FORGOT PASSWORD ROW */

.optionsRow{
display:flex;
align-items:center;
justify-content:space-between;
margin:16px 0 24px 0;
}

.checkboxLabel{
display:flex;
align-items:center;
gap:8px;
cursor:pointer;
color:#6B7280;
font-size:14px;
}

.checkbox{
width:16px;
height:16px;
cursor:pointer;
accent-color: #2F6FE4;
}

.forgotLink{
color: #2F6FE4;
font-size:14px;
font-weight:500;
cursor:pointer;
text-decoration:none;
transition:color 0.2s ease;
}

.forgotLink:hover{
color: #5B8FF9;
text-decoration:underline;
}

/* LOGIN BUTTON - SQUARE */

.button{
margin-top:8px;
width:100%;
padding:14px 20px;
border-radius:0px;
border:none;
background: #0A0A0A;
color: white;
font-size:15px;
font-weight:500;
cursor:pointer;
transition: all 0.2s ease;
font-family: 'Inter', sans-serif;
box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.button:hover{
background: #1A1A1A;
transform: translateY(-2px);
box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
}

/* DIVIDER */

.divider{
position:relative;
text-align:center;
margin:24px 0;
}

.divider::before{
content:'';
position:absolute;
top:50%;
left:0;
right:0;
height:1px;
background:#E5E7EB;
z-index:1;
}

.divider span{
background:white;
padding:0 16px;
color:#6B7280;
font-size:12px;
font-weight:500;
position:relative;
z-index:2;
font-family: 'Inter', sans-serif;
text-transform:uppercase;
letter-spacing:0.5px;
}

/* SOCIAL BUTTONS */

.socialRow{
display:flex;
gap:12px;
margin:20px 0 28px 0;
}

.social{
flex:1;
padding:16px;
border-radius:0px;
border:1px solid #E5E7EB;
background:#F9FAFB;
color:#374151;
font-weight:600;
cursor:pointer;
transition:0.2s;
display:flex;
align-items:center;
justify-content:center;
gap:8px;
}

.social:hover{
background:white;
border:1px solid #D1D5DB;
transform:translateY(-2px);
}

.social-icon{
font-size:16px;
}

/* SIGNUP LINK - Now Blue */

.signup-text{
margin-top:20px;
text-align:center;
font-size:14px;
color:#6B7280;
font-family: 'Inter', sans-serif;
}

.signup-link{
color: #2F6FE4;
cursor:pointer;
font-weight:600;
margin-left:4px;
transition: color 0.2s ease;
}

.signup-link:hover{
color: #5B8FF9;
text-decoration:underline;
}

`}</style>


<div className="page">


{/* LEFT - Same as Signup page */}

<div className="left">

<div>

<div className="logo">
Techfoliyo
</div>

<div className="hero">

<h1>
Showcase Your<br/>
Projects with Techfoliyo
</h1>

<p>
Stop sharing just code. Make your work in action.</p>

<div className="illustration">

<div className="profile">

{/* AVATAR CIRCLE - with black user icon */}
<div className="avatar">
<span className="user-icon">👤</span>
</div>

<div>
<div className="bar" style={{width:"140px"}}></div>
<div className="bar" style={{width:"100px"}}></div>
</div>

</div>


<div className="rowCards">

<div className="smallCard"></div>
<div className="smallCard"></div>

</div>

</div>

</div>

</div>

<div className="footer">
© 2024 Techfoliyo Inc. All rights reserved.
</div>

</div>



{/* RIGHT - Login Form */}

<div className="right">

<div className="card">

{/* Badge */}
<div className="badge">
WELCOME BACK
</div>

<h2>Sign In</h2>

<div className="subtitle">
Access your portfolio and continue your journey.
</div>


<form onSubmit={handleSubmit}>

<label>Email Address</label>

<div className="inputBox">
<input
type="email"
name="email"
placeholder="alex@example.com"
value={formData.email}
onChange={handleChange}
required
/>
</div>


<label>Password</label>

<div className="inputBox">
<input
type="password"
name="password"
placeholder="••••••••"
value={formData.password}
onChange={handleChange}
required
/>
</div>


{/* Remember Me & Forgot Password */}
<div className="optionsRow">

<label className="checkboxLabel">
<input 
type="checkbox"
name="rememberMe"
className="checkbox"
checked={formData.rememberMe}
onChange={handleChange}
/>
<span>Remember me</span>
</label>

<span className="forgotLink" onClick={()=>alert("Password reset functionality")}>
Forgot password?
</span>

</div>


{/* Sign In Button */}
<button className="button" type="submit">
Sign In →
</button>

</form>


<div className="divider">
<span>OR CONTINUE WITH</span>
</div>


{/* Social Buttons */}
<div className="socialRow">

<button className="social" type="button">
<span className="social-icon"></span>
<span>Google</span>
</button>

<button className="social" type="button">
<span className="social-icon"></span>
<span>GitHub</span>
</button>

</div>


<div className="signup-text">

Don't have an account?
<span className="signup-link" onClick={()=>navigate("/signup")}>
Sign up
</span>

</div>


</div>

</div>

</div>

</>
)

}

export default Login;