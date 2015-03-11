var Discover = require('node-discover');

var d = Discover();

d.on("promotion", function () {
    /* 
     * Launch things this master process should do.
     * 
     * For example:
     *  - Monitior your redis servers and handle failover by issuing slaveof
     *    commands then notify other node instances to use the new master
     *  - Make sure there are a certain number of nodes in the cluster and 
     *    launch new ones if there are not enough
     *  - whatever
     * 
     */

    console.log("I was promoted to a master.");
});

d.on("demotion", function () {
    /*
     * End all master specific functions or whatever you might like. 
     *
     */

    console.log("I was demoted from being a master.  ");
});

d.on("added", function (obj) {
    console.log("A new node has been added.");
});

d.on("removed", function (obj) {
    console.log(" A node has been removed.");
});

d.on("master", function (obj) {
    /*
     * A new master process has been selected
     * 
     * Things we might want to do:
     *  - Review what the new master is advertising use its services
     *  - Kill all connections to the old master
     */

    console.log("A new master is in control");
});
