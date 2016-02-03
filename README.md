
# cordova-plugin-nslookup

[![NPM version](https://img.shields.io/npm/v/cordova-plugin-nslookup.svg)](https://www.npmjs.org/package/cordova-plugin-nslookup)

This plugin implements the [`nslookup` software utility](https://en.wikipedia.org/wiki/Nslookup).

## Installation

> cordova plugin add cordova-plugin-nslookup

or

> cordova plugin add https://github.com/t1st3/cordova-plugin-nslookup.git

## Usage

This plugin defines a global `NsLookup` object.
Although the object is in the global scope, it is not available until after the `deviceready` event.

### query a domain

By default, querying a domain will return the domains associated IPv4 address. Here is an example of a query for the domain `wikipedia.org`:

```js
document.addEventListener('deviceready', onDeviceReady, false);
function onDeviceReady() {
  var n, success, err, query;
  query = ['wikipedia.org'];
  success = function (results) {
    console.log(results);
  };
  err = function (e) {
    console.log('Error: ' + e);
  };
  n = new NsLookup();
  n.nslookup(query, success, err);
}
```

### query a domain's specific record (here, `A` records)

You can specify which type of DNS record will be queried. Here is an example of a query on an `A` record of the domain `wikipedia.org`:

```js
document.addEventListener('deviceready', onDeviceReady, false);
function onDeviceReady() {
  var n, success, err, query;
  query = [{query: 'wikipedia.org', type: 'A'}];
  success = function (results) {
    console.log(results);
  };
  err = function (e) {
    console.log('Error: ' + e);
  };
  n = new NsLookup();
  n.nslookup(query, success, err);
}
```

NOTE: The following records are currently supported:

* A
* AAAA
* CNAME
* MX
* NS
* PTR
* SOA
* SRV
* TXT


### Multiple queries

You can also mix queries. Here is an example of multiple queries (for each supported record) mixed together:

```js
document.addEventListener('deviceready', onDeviceReady, false);
function onDeviceReady() {
  var n, success, err, query;
  query = [
    'wikipedia.org',
    {query: 'google.com', type: 'A'},
    {query: 'google.com', type: 'AAAA'},
    {query: 'www.tiste.org', type: 'CNAME'},
    {query: 'google.com', type: 'MX'},
    {query: 'google.com', type: 'NS'},
    {query: '192.174.198.91.in-addr.arpa', type: 'PTR'},
    {query: 'google.com', type: 'SOA'},
    {query: '_xmpp-server._tcp.gmail.com', type: 'SRV'},
    {query: 'google.com', type: 'TXT'}
  ];
  success = function (results) {
    console.log(results);
  };
  err = function (e) {
    console.log('Error: ' + e);
  };
  n = new NsLookup();
  n.nslookup(query, success, err);
}
```

## Methods

- NsLookup.nslookup

## NsLookup.nslookup

This method takes the following arguments:

* queries: an array of queries
* success: a callback function that handles success
* err: a callback function that handles error

The callback function for success takes one argument, which is a JSON array of results. Here a comprehensive sample of results for each type of supported record, matching the multiple queries described above:

```json
[
  {
    "query": "wikipedia.org",
    "type": "",
    "result": "wikipedia.org/91.198.174.192"
  },
  {
    "query": "google.com",
    "type": "A",
    "result": [
      {
        "address": "google.com/216.58.211.110"
      }
    ]
  },
  {
    "query": "google.com",
    "type": "AAAA",
    "result": [
      {
        "address": "google.com/2a00:1450:4007:80b::200e"
      }
    ]
  },
  {
    "query": "www.tiste.org",
    "type": "CNAME",
    "result": [
      {
        "target": "github.map.fastly.net.",
        "alias": "github.map.fastly.net."
      }
    ]
  },
  {
    "query": "google.com",
    "type": "MX",
    "result": [
      {
        "target": "alt1.aspmx.l.google.com.",
        "priority": 20
      },
      {
        "target": "alt4.aspmx.l.google.com.",
        "priority": 50
      },
      {
        "target": "aspmx.l.google.com.",
        "priority": 10
      }
    ]
  },
  {
    "query": "google.com",
    "type": "NS",
    "result": [
      {
        "target": "ns4.google.com."
      },
      {
        "target": "ns3.google.com."
      },
      {
        "target": "ns1.google.com."
      }
    ]
  },
  {
    "query": "192.174.198.91.in-addr.arpa",
    "type": "PTR",
    "result": [
      {
        "target": "text-lb.esams.wikimedia.org."
      }
    ]
  },
  {
    "query": "google.com",
    "type": "SOA",
    "result": [
      {
        "host": "ns2.google.com.",
        "admin": "dns-admin.google.com.",
        "serial": 113752958,
        "refresh": 900,
        "retry": 900,
        "expire": 1800,
        "minimum": 60
      }
    ]
  },
  {
    "query": "_xmpp-server._tcp.gmail.com",
    "type": "SRV",
    "result": [
      {
        "target": "alt1.xmpp-server.l.google.com.",
        "port": 5269,
        "priority": 20,
        "weight": 0
      },
      {
        "target": "alt4.xmpp-server.l.google.com.",
        "port": 5269,
        "priority": 20,
        "weight": 0
      },
      {
        "target": "xmpp-server.l.google.com.",
        "port": 5269,
        "priority": 5,
        "weight": 0
      }
    ]
  },
  {
    "query": "google.com",
    "type": "TXT",
    "result": [
      {
        "strings": "v=spf1 include:_spf.google.com ~all"
      }
    ]
  }
]
```

### Supported Platforms

- Android


*****

## License

This project is licensed under the [MIT license](https://opensource.org/licenses/MIT). Check the [LICENSE.md file](https://github.com/t1st3/cordova-plugin-nslookup/blob/master/LICENSE.md).

## Dependencies

For the Android part, this project depends on [dnsjava](http://www.dnsjava.org/), which is distributed under the [BSD license](http://www.dnsjava.org/dnsjava-current/README).
