import Mail from './../models/mail.js';
import User from '../models/user.js';
const mailController = {};

let flag;

mailController.specificMail = async (req, res) => {
    const mail = await Mail.findById(req.params.mid).populate('from', 'name');
    let recievedMails = await Mail.find({ to: req.params.id }).populate('from', 'name');
    flag = 2;
    const { id } = req.params;
    res.render('./user/mailbox.ejs', { recievedMails, mail, flag, id });
};

mailController.mailForm = async (req, res) => {
    flag = 1;
    const { id } = req.params;
    const recievedMails = await Mail.find({ to: req.params.id }).populate('from', 'name');
    res.render('./user/mailbox.ejs', { flag, id, recievedMails });
}

mailController.mailbox = async (req, res) => {
    const { id } = req.params;
    const sentMails = await Mail.find({ from: req.params.id }).populate('to', 'name');
    const recievedMails = await Mail.find({ to: req.params.id }).populate('from', 'name');
    let mail = null;
    flag = 0;
    res.render('./user/mailbox.ejs', { sentMails, recievedMails, mail, flag, id });
};

mailController.sendMail = async (req, res) => {
    const { id } = req.params;
    const createdMail = new Mail();
    createdMail.from = res.locals.currentUser._id;
    const reciveingUser = await User.findOne({ username: req.body.to });
    if (reciveingUser) {
        createdMail.to = reciveingUser._id;
        createdMail.content = req.body.mailData;
        createdMail.read = false;
        await createdMail.save();
        req.flash('success', `Mail sent successfully to ${reciveingUser.name}`)
    }
    else {
        req.flash('error', 'Mail not sent, Invalid recipient username');
    }
    res.redirect(`/user/${id}/mailbox`);
};

mailController.markasread = async (req, res) => {
    const { mid, id } = req.params;
    const mail = await Mail.findByIdAndUpdate(mid, { read: true });
    res.redirect(`/user/${id}/mailbox/${mid}`);
}

mailController.deleteMail = async (req, res) => {
    const { mid, id } = req.params;
    const mail = await Mail.findByIdAndDelete(mid);
    res.redirect(`/user/${id}/mailbox`);
}

export { mailController };