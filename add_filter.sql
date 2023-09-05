
frappe.query_reports["Cashflow Report"] = {
	"filters": [
		{
			fieldname:"from_date",
			label: __("From Date"),
			fieldtype: "Date",
			default: frappe.datetime.add_months(frappe.datetime.month_start(), -1),
			reqd: 1
		},
		{
			fieldname:"to_date",
			label: __("To Date"),
			fieldtype: "Date",
			default: frappe.datetime.add_days(frappe.datetime.month_start(),-1),
			reqd: 1
		},
	        {
			"fieldname": "project",
			"label": __("Project"),
			"fieldtype": "Link",
			"options": "Project",
			"default": "Dodolla Construction of Site Works - Infra",
			"reqd": 1
		},
	]
}


//payroll filtering

frappe.query_reports["Employees Payroll Report"] = {
    "filters": [
        {
            "fieldname": "payroll_date",
            "label": __("Payroll Date"),
            "fieldtype": "Date",
            "width": "80"
        }
    ]
}
