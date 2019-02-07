const { NlpManager } = require('node-nlp');

const manager = new NlpManager({ languages: ['fr'] });

manager.addDocument('fr', 'Appelles Manu maintenant', 'ph.appel');
manager.addDocument('fr', 'Appeller Simon de toute urgence', 'ph.appel');
manager.addDocument('fr', 'Tu peux appeler Simon ?', 'ph.appel');
manager.addDocument('fr', 'Tu peux appeler Simon ?', 'ph.appel');
manager.addDocument('fr', 'Appeller', 'ph.appel');
manager.addDocument('fr', 'Appelles', 'ph.appel');


manager.addDocument('fr', 'Ecris à Manu : je suis en bas', 'ph.sms');
manager.addDocument('fr', 'Dis à Simon : tu es le plus grand', 'ph.sms');
manager.addDocument('fr', 'Appeller Simon de toute urgence', 'ph.sms');
manager.addDocument('fr', 'Tu peux dire à Simon que on plat est prêt', 'ph.sms');
manager.addDocument('fr', 'Tu peux dire à Manu que le client est là ?', 'ph.sms');
manager.addDocument('fr', 'Ecrire', 'ph.sms');
manager.addDocument('fr', 'texto', 'ph.sms');
manager.addDocument('fr', 'sms', 'ph.sms');





// Train and save the model.
(async () => {
    await manager.train(); //training & save
    manager.save();
    const response = await manager.process('fr', 'Tu peux appeller le 0674585648 ?');
    console.log(response);
})();