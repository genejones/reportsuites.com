let reportsuitesRequest = {"report_suites":[
	{"rsid":"illuminati2012de","site_title":"Bavarian Enlightenment - German site"},
	{"rsid":"illuminati2014global", "site_title":"Bavarian Enlightenment"},
	{"rsid":"illuminati2014en", "site_title":"Bavarian Enlightenment - English site"},
]};

let selectedFormDataAll = '{"rsid_list":["illuminati2014global","illuminati2014en","illuminati2012de"]}';
let selectedFormDataPartial = '{"rsid_list":["illuminati2014global","illuminati2012de"]}';

let evars = [
	{
		"rsid":"illuminati2014global",
		"site_title":"Bavarian Enlightenment",
		"evars":[
			{
				"name":"Tracking Code",
				"type":"text_string",
				"id":"trackingcode",
				"expiration_type":"month",
				"expiration_custom_days":"1",
				"allocation_type":"most_recent_last"
			},
			{
				"name":"Page Name",
				"description":"Captures pageName",
				"type":"text_string",
				"enabled":true,
				"id":"evar1",
				"expiration_type":"visit",
				"expiration_custom_days":"1",
				"allocation_type":"most_recent_last"
			},
			{
				"name":"isMember",
				"description":"Captures if the user is logged in or not",
				"type":"text_string",
				"enabled":true,
				"id":"evar2",
				"expiration_type":"visit",
				"expiration_custom_days":"1",
				"allocation_type":"most_recent_last"
			}
		]
	},
	{
		"rsid":"illuminati2014en",
		"site_title":"Bavarian Enlightenment - English site",
		"evars":[
			{
				"name":"Tracking Code",
				"type":"text_string",
				"id":"trackingcode",
				"expiration_type":"month",
				"expiration_custom_days":"1",
				"allocation_type":"most_recent_last"
			},
			{
				"name":"Page Name",
				"description":"Captures pageName",
				"type":"text_string",
				"enabled":true,
				"id":"evar1",
				"expiration_type":"visit",
				"expiration_custom_days":"1",
				"allocation_type":"most_recent_last"
			},
			{
				"name":"isMember",
				"description":"Captures if the user is logged in or not",
				"type":"text_string",
				"enabled":true,
				"id":"evar2",
				"expiration_type":"visit",
				"expiration_custom_days":"1",
				"allocation_type":"most_recent_last"
			}
		]
	},
	{
		"rsid":"illuminati2012de",
		"site_title":"Bavarian Enlightenment - German site",
		"evars":[
			{
				"name":"Tracking Code",
				"type":"text_string",
				"id":"trackingcode",
				"expiration_type":"month",
				"expiration_custom_days":"1",
				"allocation_type":"most_recent_last"
			},
			{
				"name":"Page Name",
				"description":"Captures pageName",
				"type":"text_string",
				"enabled":true,
				"id":"evar1",
				"expiration_type":"visit",
				"expiration_custom_days":"1",
				"allocation_type":"most_recent_last"
			},
			{
				"name":"TBD",
				"description":"Reserved for future implementations",
				"type":"text_string",
				"enabled":false,
				"id":"evar2",
				"expiration_type":"never",
				"expiration_custom_days":"1",
				"allocation_type":"most_recent_last"
			}
		]
	}
];


let props = [
	{
		"rsid":"illuminati2014global",
		"site_title":"Bavarian Enlightenment",
		"props":[
			{
				"id":"prop1",
				"name":"Site Hierarcy - Section",
				"enabled":true,
				"description":"Which section is the user current on?",
				"pathing_enabled":true,
				"list_enabled":false,
				"participation_enabled":false,
				"case_insensitive":false,
				"case_insensitive_date_enabled":null
			},
			{
				"id":"prop2",
				"name":"New or Repeat Visitors",
				"enabled":true,
				"description":"New or Repeat Visitors",
				"pathing_enabled":false,
				"list_enabled":false,
				"participation_enabled":false,
				"case_insensitive":false,
				"case_insensitive_date_enabled":null
			},
			{
				"id":"prop3",
				"name":"Days Since Last Visit",
				"enabled":true,
				"description":"Days Since Last Visit",
				"pathing_enabled":false,
				"list_enabled":false,
				"participation_enabled":false,
				"case_insensitive":false,
				"case_insensitive_date_enabled":null
			}
		]
	},
	{
		"rsid":"illuminati2014en",
		"site_title":"Bavarian Enlightenment - English site",
		"props":[
			{
				"id":"prop1",
				"name":"Site Hierarcy - Section",
				"enabled":true,
				"description":"Which section is the user current on?",
				"pathing_enabled":true,
				"list_enabled":false,
				"participation_enabled":false,
				"case_insensitive":false,
				"case_insensitive_date_enabled":null
			},
			{
				"id":"prop2",
				"name":"New or Repeat Visitors",
				"enabled":true,
				"description":"New or Repeat Visitors",
				"pathing_enabled":false,
				"list_enabled":false,
				"participation_enabled":false,
				"case_insensitive":false,
				"case_insensitive_date_enabled":null
			},
			{
				"id":"prop3",
				"name":"Days Since Last Visit",
				"enabled":true,
				"description":"Days Since Last Visit",
				"pathing_enabled":false,
				"list_enabled":false,
				"participation_enabled":false,
				"case_insensitive":false,
				"case_insensitive_date_enabled":null
			}
		]
	},
	{
		"rsid":"illuminati2012de",
		"site_title":"Bavarian Enlightenment - German site",
		"props":[
			{
				"id":"prop1",
				"name":"Site Hierarcy - Section",
				"enabled":true,
				"description":"Which section is the user current on?",
				"pathing_enabled":true,
				"list_enabled":false,
				"participation_enabled":false,
				"case_insensitive":false,
				"case_insensitive_date_enabled":null
			},
			{
				"id":"prop2",
				"name":"TBD",
				"enabled":false,
				"description":"Reserved for future configuration",
				"pathing_enabled":false,
				"list_enabled":false,
				"participation_enabled":false,
				"case_insensitive":false,
				"case_insensitive_date_enabled":null
			},
			{
				"id":"prop3",
				"name":"Days Since Last Visit",
				"enabled":true,
				"description":"Days Since Last Visit",
				"pathing_enabled":false,
				"list_enabled":false,
				"participation_enabled":false,
				"case_insensitive":false,
				"case_insensitive_date_enabled":null
			}
		]
	}
];

let events = [
	{
		"rsid":"illuminati2014global",
		"site_title":"Bavarian Enlightenment",
				"events":[
			{
				"id":"event1",
				"name":"Hostile takeover",
				"description":"Fire whenever the Illuminati take over a country (despite not existing for several hundred year).",
				"type":"enabled",
				"default_metric":false,
				"participation":"disabled",
				"serialization":"always_record",
				"polarity":"positive",
				"visibility":"everywhere"
			},
			{
				"id":"event2",
				"name":"Form submit",
				"description":"Fire on a form submission",
				"type":"enabled",
				"default_metric":false,
				"participation":"disabled",
				"serialization":"always_record",
				"polarity":"positive",
				"visibility":"everywhere"
			},
			{
				"id":"revenue",
				"name":"Revenue",
				"description":"",
				"type":"currency",
				"default_metric":false,
				"participation":"enabled",
				"serialization":"unavailable",
				"polarity":"positive",
				"visibility":"everywhere"
			},
			{
				"id":"orders",
				"name":"Orders",
				"description":"",
				"type":"counter",
				"default_metric":false,
				"participation":"enabled",
				"serialization":"unavailable",
				"polarity":"positive",
				"visibility":"everywhere"
			},
			{
				"id":"units",
				"name":"Units",
				"description":"",
				"type":"counter",
				"default_metric":false,
				"participation":"enabled",
				"serialization":"unavailable",
				"polarity":"positive",
				"visibility":"everywhere"
			},
			{
				"id":"carts",
				"name":"Carts",
				"description":"",
				"type":"counter",
				"default_metric":false,
				"participation":"disabled",
				"serialization":"record_once_per_visit",
				"polarity":"positive",
				"visibility":"everywhere"
			},
			{
				"id":"cartviews",
				"name":"Cart Views",
				"description":"",
				"type":"counter",
				"default_metric":false,
				"participation":"disabled",
				"serialization":"always_record",
				"polarity":"positive",
				"visibility":"everywhere"
			},
			{
				"id":"instances",
				"name":"Instances",
				"description":"",
				"type":"counter",
				"default_metric":false,
				"participation":"disabled",
				"serialization":"unavailable",
				"polarity":"positive",
				"visibility":"everywhere"
			},
			{
				"id":"checkouts",
				"name":"Checkouts",
				"description":"",
				"type":"counter",
				"default_metric":false,
				"participation":"enabled",
				"serialization":"always_record",
				"polarity":"positive",
				"visibility":"everywhere"
			},
			{
				"id":"cartadditions",
				"name":"Cart Additions",
				"description":"",
				"type":"counter",
				"default_metric":false,
				"participation":"enabled",
				"serialization":"always_record",
				"polarity":"positive",
				"visibility":"everywhere"
			},
			{
				"id":"cartremovals",
				"name":"Cart Removals",
				"description":"",
				"type":"counter",
				"default_metric":false,
				"participation":"disabled",
				"serialization":"always_record",
				"polarity":"positive",
				"visibility":"everywhere"
			},
			{
				"id":"visits",
				"name":"Visits",
				"description":"",
				"type":"counter_no_subrelations",
				"default_metric":true,
				"participation":"unavailable",
				"serialization":"unavailable",
				"polarity":"positive",
				"visibility":"everywhere"
			},
			{
				"id":"pageviews",
				"name":"Page Views",
				"description":"",
				"type":"counter_no_subrelations",
				"default_metric":true,
				"participation":"unavailable",
				"serialization":"unavailable",
				"polarity":"positive",
				"visibility":"everywhere"
			},
			{
				"id":"visitorsdaily",
				"name":"Daily Unique Visitors",
				"description":"",
				"type":"counter_no_subrelations",
				"default_metric":false,
				"participation":"unavailable",
				"serialization":"unavailable",
				"polarity":"positive",
				"visibility":"everywhere"
			},
			{
				"id":"uniquevisitors",
				"name":"Unique Visitors",
				"description":"",
				"type":"counter_no_subrelations",
				"default_metric":true,
				"participation":"unavailable",
				"serialization":"unavailable",
				"polarity":"positive",
				"visibility":"everywhere"
			}
		]
	},
	{
		"rsid":"illuminati2014en",
		"site_title":"Bavarian Enlightenment - English site",
		"events":[
			{
				"id":"event1",
				"name":"Hostile takeover",
				"description":"Fire whenever the Illuminati take over a country (despite not existing for several hundred year).",
				"type":"enabled",
				"default_metric":false,
				"participation":"disabled",
				"serialization":"always_record",
				"polarity":"positive",
				"visibility":"everywhere"
			},
			{
				"id":"event2",
				"name":"Form submit",
				"description":"Fire on a form submission",
				"type":"enabled",
				"default_metric":false,
				"participation":"disabled",
				"serialization":"always_record",
				"polarity":"positive",
				"visibility":"everywhere"
			},
			{
				"id":"revenue",
				"name":"Revenue",
				"description":"",
				"type":"currency",
				"default_metric":false,
				"participation":"enabled",
				"serialization":"unavailable",
				"polarity":"positive",
				"visibility":"everywhere"
			},
			{
				"id":"orders",
				"name":"Orders",
				"description":"",
				"type":"counter",
				"default_metric":false,
				"participation":"enabled",
				"serialization":"unavailable",
				"polarity":"positive",
				"visibility":"everywhere"
			},
			{
				"id":"units",
				"name":"Units",
				"description":"",
				"type":"counter",
				"default_metric":false,
				"participation":"enabled",
				"serialization":"unavailable",
				"polarity":"positive",
				"visibility":"everywhere"
			},
			{
				"id":"carts",
				"name":"Carts",
				"description":"",
				"type":"counter",
				"default_metric":false,
				"participation":"disabled",
				"serialization":"record_once_per_visit",
				"polarity":"positive",
				"visibility":"everywhere"
			},
			{
				"id":"cartviews",
				"name":"Cart Views",
				"description":"",
				"type":"counter",
				"default_metric":false,
				"participation":"disabled",
				"serialization":"always_record",
				"polarity":"positive",
				"visibility":"everywhere"
			},
			{
				"id":"instances",
				"name":"Instances",
				"description":"",
				"type":"counter",
				"default_metric":false,
				"participation":"disabled",
				"serialization":"unavailable",
				"polarity":"positive",
				"visibility":"everywhere"
			},
			{
				"id":"checkouts",
				"name":"Checkouts",
				"description":"",
				"type":"counter",
				"default_metric":false,
				"participation":"enabled",
				"serialization":"always_record",
				"polarity":"positive",
				"visibility":"everywhere"
			},
			{
				"id":"cartadditions",
				"name":"Cart Additions",
				"description":"",
				"type":"counter",
				"default_metric":false,
				"participation":"enabled",
				"serialization":"always_record",
				"polarity":"positive",
				"visibility":"everywhere"
			},
			{
				"id":"cartremovals",
				"name":"Cart Removals",
				"description":"",
				"type":"counter",
				"default_metric":false,
				"participation":"disabled",
				"serialization":"always_record",
				"polarity":"positive",
				"visibility":"everywhere"
			},
			{
				"id":"visits",
				"name":"Visits",
				"description":"",
				"type":"counter_no_subrelations",
				"default_metric":true,
				"participation":"unavailable",
				"serialization":"unavailable",
				"polarity":"positive",
				"visibility":"everywhere"
			},
			{
				"id":"pageviews",
				"name":"Page Views",
				"description":"",
				"type":"counter_no_subrelations",
				"default_metric":true,
				"participation":"unavailable",
				"serialization":"unavailable",
				"polarity":"positive",
				"visibility":"everywhere"
			},
			{
				"id":"visitorsdaily",
				"name":"Daily Unique Visitors",
				"description":"",
				"type":"counter_no_subrelations",
				"default_metric":false,
				"participation":"unavailable",
				"serialization":"unavailable",
				"polarity":"positive",
				"visibility":"everywhere"
			},
			{
				"id":"uniquevisitors",
				"name":"Unique Visitors",
				"description":"",
				"type":"counter_no_subrelations",
				"default_metric":true,
				"participation":"unavailable",
				"serialization":"unavailable",
				"polarity":"positive",
				"visibility":"everywhere"
			}
		]
	},
	{
		"rsid":"illuminati2012de",
		"site_title":"Bavarian Enlightenment - German site",
		"events":[
			{
				"id":"event1",
				"name":"Hostile takeover",
				"description":"Fire whenever the Illuminati take over a country (despite not existing for several hundred year).",
				"type":"enabled",
				"default_metric":false,
				"participation":"disabled",
				"serialization":"always_record",
				"polarity":"positive",
				"visibility":"everywhere"
			},
			{
				"id":"event2",
				"name":"TBD",
				"description":"",
				"type":"disabled",
				"default_metric":false,
				"participation":"disabled",
				"serialization":"always_record",
				"polarity":"positive",
				"visibility":"everywhere"
			},
			{
				"id":"revenue",
				"name":"Revenue",
				"description":"",
				"type":"currency",
				"default_metric":false,
				"participation":"enabled",
				"serialization":"unavailable",
				"polarity":"positive",
				"visibility":"everywhere"
			},
			{
				"id":"orders",
				"name":"Orders",
				"description":"",
				"type":"counter",
				"default_metric":false,
				"participation":"enabled",
				"serialization":"unavailable",
				"polarity":"positive",
				"visibility":"everywhere"
			},
			{
				"id":"units",
				"name":"Units",
				"description":"",
				"type":"counter",
				"default_metric":false,
				"participation":"enabled",
				"serialization":"unavailable",
				"polarity":"positive",
				"visibility":"everywhere"
			},
			{
				"id":"carts",
				"name":"Carts",
				"description":"",
				"type":"counter",
				"default_metric":false,
				"participation":"disabled",
				"serialization":"record_once_per_visit",
				"polarity":"positive",
				"visibility":"everywhere"
			},
			{
				"id":"cartviews",
				"name":"Cart Views",
				"description":"",
				"type":"counter",
				"default_metric":false,
				"participation":"disabled",
				"serialization":"always_record",
				"polarity":"positive",
				"visibility":"everywhere"
			},
			{
				"id":"instances",
				"name":"Instances",
				"description":"",
				"type":"counter",
				"default_metric":false,
				"participation":"disabled",
				"serialization":"unavailable",
				"polarity":"positive",
				"visibility":"everywhere"
			},
			{
				"id":"checkouts",
				"name":"Checkouts",
				"description":"",
				"type":"counter",
				"default_metric":false,
				"participation":"enabled",
				"serialization":"always_record",
				"polarity":"positive",
				"visibility":"everywhere"
			},
			{
				"id":"cartadditions",
				"name":"Cart Additions",
				"description":"",
				"type":"counter",
				"default_metric":false,
				"participation":"enabled",
				"serialization":"always_record",
				"polarity":"positive",
				"visibility":"everywhere"
			},
			{
				"id":"cartremovals",
				"name":"Cart Removals",
				"description":"",
				"type":"counter",
				"default_metric":false,
				"participation":"disabled",
				"serialization":"always_record",
				"polarity":"positive",
				"visibility":"everywhere"
			},
			{
				"id":"visits",
				"name":"Visits",
				"description":"",
				"type":"counter_no_subrelations",
				"default_metric":true,
				"participation":"unavailable",
				"serialization":"unavailable",
				"polarity":"positive",
				"visibility":"everywhere"
			},
			{
				"id":"pageviews",
				"name":"Page Views",
				"description":"",
				"type":"counter_no_subrelations",
				"default_metric":true,
				"participation":"unavailable",
				"serialization":"unavailable",
				"polarity":"positive",
				"visibility":"everywhere"
			},
			{
				"id":"visitorsdaily",
				"name":"Daily Unique Visitors",
				"description":"",
				"type":"counter_no_subrelations",
				"default_metric":false,
				"participation":"unavailable",
				"serialization":"unavailable",
				"polarity":"positive",
				"visibility":"everywhere"
			},
			{
				"id":"uniquevisitors",
				"name":"Unique Visitors",
				"description":"",
				"type":"counter_no_subrelations",
				"default_metric":true,
				"participation":"unavailable",
				"serialization":"unavailable",
				"polarity":"positive",
				"visibility":"everywhere"
			}
		]
	}
];

exports.modules = {evars, reportsuitesRequest, selectedFormDataAll, selectedFormDataPartial, props, events};