const express = require('express');
const router = express.Router();
const contacts = require('../../models/contact');

router.get('/admin/all-emails', (req, res) => {
    contacts.find({}, (error, emails) => {
        if(error){
            console.log('cant send emails to admin');
        }else{
            res.render('admin_all_emails', {
                emails
            });
        }
    });
    
});

module.exports = router; 