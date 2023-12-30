const { log } = require('console')
const session = require('express-session')
const fs=require('fs')
const userData=JSON.parse(fs.readFileSync('./model/data.json'))


module.exports={
    loginGet:(req,res)=>{
        if(req.session.email){
            res.redirect('/')
        }else{
            res.status(200).render('login',{error:''})
        }
    },
    loginPost:(req,res)=>{
        const {email,password} =req.body    
        // console.log(req.body);
        const data=userData.find((val)=>val.email === email && val.password === password)
        if(data){
            req.session.email=data.email
            if(req.session.email){
                res.render('home',{userData})
            }else{
                res.redirect('/login')
            }
        }else{
            res.render('login',{error:'invalid Username or Password'})
        }
    },
    signupGet:(req,res)=>{
        if(req.session.email){
            // res.status(200).render('home',{userData})
            res.redirect('/')
        }else{
            // const errorMessage = req.query.error || null;
            
            let msg = req.session.errorMessage
            req.session.errorMessage =''
            res.status(200).render('signup', { error: msg });
        }
    },
    signupPost:(req,res)=>{
        const {fullName,email,password,confirm_Password}=req.body
        const passwordSymbols = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        const emailCheck=emailRegex.test(email)
        const passwordSymbolCheck = passwordSymbols.test(password);
        const confirmPassword=confirm_Password===password;
        const existUser=userData.find((val)=>val.email===email)
        
        if (!fullName && !email && !password && !confirm_Password) {
            req.session.errorMessage = 'All fields are required'
            res.redirect('/signup');
        } else if (existUser) {
            req.session.errorMessage = 'User already exists. Please login to your account.'
            res.redirect('/signup');
        } else if (!emailCheck) {
            req.session.errorMessage = 'Please enter a valid email address'
            res.redirect('/signup');
        } else if (!passwordSymbolCheck) {
            req.session.errorMessage = 'Invalid password format'
            res.redirect('/signup');
        } else if (!confirmPassword) {
            req.session.errorMessage = 'Password and confirm password must be equal'
            res.redirect('/signup');
        } else {
            userData.push(req.body)
            fs.writeFile('./model/data.json',JSON.stringify(userData,null,2),(error,data)=>{
                if(error){
                    res.render('error')
                }else{
                    res.redirect('/login')
                }
            })
        }
    },
    homeGet:(req,res)=>{
            if(req.session.email){
                res.status(200).render('home',{userData})
            }else{
                res.redirect('/login')
            }
        
    },
    logout:(req,res)=>{
        req.session.destroy(()=>{
            res.redirect('/login')
        })
    }
}
