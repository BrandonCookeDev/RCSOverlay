'use strict';

let {format} = require('util');
let express = require('express');
let router = express.Router();
let JsonFile = require('./JsonFile');

router.get('/score/increment/:playerNumber', function(req, res){
    try{
        let playerNumber = req.params.playerNumber;
        let properties = ['p%s_games', 'p%s_games_s4', 'p%s_games_ultimate'];
        let formatted = properties.map(e => format(e, playerNumber));
        
        formatted.forEach(e => {
            let val = JsonFile.get(e);
            val++;

            JsonFile.update(e, val);
        })
        
        return res.status(200).send({'message': 'successfully incremented scores!'});
    } catch(e){
        console.error(e);
        res.status(500).send(e);
    }
})

router.get('/score/decrement/:playerNumber', function(req, res){
    try{
        let playerNumber = req.params.playerNumber;
        let properties = ['p%s_games', 'p%s_games_s4', 'p%s_games_ultimate'];
        let formatted = properties.map(e => format(e, playerNumber));
        
        formatted.forEach(e => {
            let val = JsonFile.get(e);
            val--;
            
            JsonFile.update(e, val);
        })
        
        return res.status(200).send({'message': 'successfully decremented scores!'});
    } catch(e){
        console.error(e);
        res.status(500).send(e);
    }
})


router.get('/score/incrementTeam/:playerNumber', function(req, res){
    try{
        let playerNumber = req.params.playerNumber;
        let properties = ['team%s_games', 'team%s_games_s4', 'team%s_games_ultimate'];
        let formatted = properties.map(e => format(e, playerNumber));
        
        formatted.forEach(e => {
            let val = JsonFile.get(e);
            val++;

            JsonFile.update(e, val);
        })
        
        return res.status(200).send({'message': 'successfully incremented scores!'});
    } catch(e){
        console.error(e);
        res.status(500).send(e);
    }
})

router.get('/score/decrementTeam/:playerNumber', function(req, res){
    try{
        let playerNumber = req.params.playerNumber;
        let properties = ['team%s_games', 'team%s_games_s4', 'team%s_games_ultimate'];
        let formatted = properties.map(e => format(e, playerNumber));
        
        formatted.forEach(e => {
            let val = JsonFile.get(e);
            val--;
            
            JsonFile.update(e, val);
        })
        
        return res.status(200).send({'message': 'successfully decremented scores!'});
    } catch(e){
        console.error(e);
        res.status(500).send(e);
    }
})

module.exports = router;