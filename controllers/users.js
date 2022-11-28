const fs = require('fs');
const regName = new RegExp('/[A-Za-z ]/+');

const registration = ((req, res) => {
    let { name, email, pass, city } = req.body;
    if (name === '' || email === '' || pass === '' || city === '') {
        res.render('register', { errMsg: "Fields are missing!" });
    }
    // else if (!regName.test(name) && ){

    // }
    else if (fs.existsSync(`./users/${email}.txt`)) {
        res.render('register', { errMsg: 'Email Already Registered..' });
    } else {
        fs.writeFile(`./users/${email}.txt`, `${name}\n${email}\n${pass}\n${city}`, (err) => {
            if (err) {
                res.render('register', { errMsg: 'Someting went wrong' });
            } else {
                res.redirect("/users/welcome/" + email);
            }
        })
    }
})


const login = ((req, res) => {
    let { user, pass } = req.body;

    if (user == '' || pass == '') {
        res.render('login', { errMsg: "Fields are missing!" })
    } else {
        if (fs.existsSync(`./users/${user}.txt`)) {
            let data = fs.readFileSync(`./users/${user}.txt`);
            data = data.toString().split('\n');
            if (user === data[1] && pass === data[2]) {
                res.render('loginhome');
            } else {
                res.render('login', { errMsg: "Enter correct email or password!" });

            }
        } else {
            res.render('login', { errMsg: "Please Register first!" })
        }
    }
    // res.send("Login Done");
});

module.exports = {
    registration,
    login
}