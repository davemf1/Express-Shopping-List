const express = require("express");
const items = require("./fakeDb");
const { request } = require("./app");
const router = new express.Router();

router.get("", function(req, res) {
    return res.send(items);
});

router.post("", function(req, res) {
    items.push({name: req.body.name, price: req.body.price});
    return res.send({"added":{name: req.body.name, price: req.body.price}});
});

router.get('/:iname', function(req, res){
    let singleItem = items.find(element => element["name"] == req.params.iname);
    return res.send(singleItem);
});

router.patch("/:iname", function(req, res) {
    let singleItem = items.find(element => element["name"] == req.params.iname);
    singleItem.name = req.body.name;
    singleItem.price = req.body.price;
    return res.send({"updated": singleItem});
});

router.delete("/:iname", function(req, res){
    let index = items.findIndex(p => p.name == req.params.iname);
    if (index > -1) {
        items.splice(index, 1); 
    }
    return res.send({"message": "Deleted"});
})


module.exports = router;