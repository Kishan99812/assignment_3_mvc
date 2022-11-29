const fs = require('fs');

const registration = ((req, res) => {
    const regName = new RegExp(/^([a-zA-Z ]){2,30}$/);
    const regMail = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
    const regPass = new RegExp(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/);
    const regcontact = new RegExp(/^\d{10}$/);


    let { name, email, pass, contact } = req.body;

    let data = fs.readFileSync('./users/userdetails.txt').toString().split('\n');

    if (name === '' || email === '' || pass === '' || contact === '') {
        res.render('register', { errMsg: "Fields are missing!" });
    }
    else {
        if (regName.test(name) && regMail.test(email) && regPass.test(pass) && regcontact.test(contact)) {
            for (let i = 0; i < data.length - 1; i++) {
                let info = data[i].split(',');
                if (email != info[1]) {
                    fs.appendFile('./users/userdetails.txt', `${name},${email},${pass},${contact}\n`, (err) => {
                        if (err) {
                            res.render('register', { errMsg: 'Someting went wrong' });
                        } else {
                            res.redirect("/users/welcome/" + email);
                        }
                    })
                }else{
                    res.send('User Exist');
                }
            }
        }
        else {
            res.render('register', { errMsg: "Please Fill all field in proper way!" });
        }
    }
})



const login = ((req, res) => {
    const regMail = new RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);
    const regPass = new RegExp(/^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/);
    let user = req.body.user;
    let pass = req.body.pass;
    let data = fs.readFileSync('./users/userdetails.txt').toString().split('\n');

    if (user == '' || pass == '') {
        res.render('login', { errMsg: "Fields are missing!" })
    } else {
        // let user = req.body.user;
        // let pass = req.body.pass;

        if (regMail.test(user) && regPass.test(pass)) {
            for (let i = 0; i < data.length - 1; i++) {
                let info = data[i].split(',');
                // console.log('user',info[1]);
                // console.log('pass',info[2]);
                // console.log('user1',user);
                // console.log('pass1',pass);
                if (user == info[1] && pass == info[2]) {
                    res.render('loginhome');
                }
                else {
                    res.render('login', { errMsg: "Enter correct email or password!" });
                }
            }
            res.render('login', { errMsg: "Please Register first!" })
        }
    }
    // res.send("Login Done");
});

module.exports = {
    registration,
    login
}